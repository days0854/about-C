#!/bin/bash

# About C - 서버 배포 및 Nginx 설정 스크립트

echo "=== About C 서버 설정 시작 ==="

# 1. 코드 업데이트
echo "1. Git pull..."
cd /root/cert-platform
git pull origin main

# 2. PM2 정리 및 재시작
echo "2. PM2 프로세스 정리..."
pm2 delete all || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 list

# 3. Nginx 설치
echo "3. Nginx 설치..."
apt-get update
apt-get install -y nginx

# 4. Nginx 설정 파일 생성
echo "4. Nginx 설정..."
cat > /etc/nginx/sites-available/aboutc << 'EOF'
server {
    listen 80;
    server_name aboutc.pro www.aboutc.pro 175.106.96.86;

    # Logging
    access_log /var/log/nginx/aboutc_access.log;
    error_log /var/log/nginx/aboutc_error.log;

    # Static file caching
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # File upload size limit
    client_max_body_size 10M;
}
EOF

# 5. Nginx 활성화
echo "5. Nginx 활성화..."
ln -sf /etc/nginx/sites-available/aboutc /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 6. Nginx 설정 테스트
echo "6. Nginx 설정 테스트..."
nginx -t

# 7. Nginx 재시작
echo "7. Nginx 재시작..."
systemctl restart nginx
systemctl enable nginx

# 8. 상태 확인
echo "=== 배포 완료 ==="
echo "PM2 Status:"
pm2 list
echo ""
echo "Nginx Status:"
systemctl status nginx --no-pager
echo ""
echo "포트 확인:"
netstat -tlnp | grep -E '(3000|80)'
echo ""
echo "접속 가능 주소:"
echo "- http://aboutc.pro"
echo "- http://www.aboutc.pro"
echo "- http://175.106.96.86"
