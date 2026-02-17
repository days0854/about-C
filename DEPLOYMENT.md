# About C 플랫폼 - CI/CD 배포 가이드

## 📋 개요
GitHub 저장소와 네이버 클라우드 서버 (175.106.96.86) 간 자동 배포 환경을 구축합니다.

---

## 🚀 서버 초기 설정

### 1. SSH 접속
```bash
ssh your_username@175.106.96.86
```

### 2. Node.js 설치 (18.x 이상)
```bash
# Node.js 18.x 설치
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 버전 확인
node -v
npm -v
```

### 3. PM2 설치
```bash
sudo npm install -g pm2

# PM2 시작 시 자동 실행 설정
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

### 4. Nginx 설치 (선택사항)
```bash
sudo apt update
sudo apt install nginx -y
```

### 5. Git 설정
```bash
# Git 설치 확인
git --version

# Git 사용자 설정
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 📁 서버에 프로젝트 배포

### 1. 프로젝트 클론
```bash
cd /home/$USER
git clone https://github.com/days0854/about-C.git cert-platform
cd cert-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
```bash
# .env.production 파일 생성
cp .env.production.example .env.production
nano .env.production

# 필수 환경 변수 입력:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_TOSS_CLIENT_KEY
```

### 4. 빌드
```bash
npm run build
```

### 5. PM2로 실행
```bash
# ecosystem.config.js 파일 수정
nano ecosystem.config.js
# cwd 경로를 실제 경로로 수정

# PM2 시작
pm2 start ecosystem.config.js --env production
pm2 save
```

### 6. Nginx 설정 (선택사항)
```bash
# Nginx 설정 파일 복사
sudo cp nginx.conf /etc/nginx/sites-available/aboutc
sudo ln -s /etc/nginx/sites-available/aboutc /etc/nginx/sites-enabled/

# Nginx 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

---

## 🔐 GitHub Secrets 설정

GitHub 저장소에서 다음 Secrets를 추가하세요:

1. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

필수 Secrets:
- `SERVER_HOST`: `175.106.96.86`
- `SERVER_USER`: SSH 사용자명 (예: `ubuntu`)
- `SERVER_SSH_KEY`: SSH 개인키 전체 내용
- `SERVER_PORT`: `22` (기본값)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `NEXT_PUBLIC_TOSS_CLIENT_KEY`: Toss Payments Client Key

### SSH 키 생성 (없는 경우)
```bash
# 로컬에서 실행
ssh-keygen -t ed25519 -C "github-actions"

# 공개키를 서버에 복사
ssh-copy-id -i ~/.ssh/id_ed25519.pub your_username@175.106.96.86

# 개인키 내용을 GitHub Secret에 추가
cat ~/.ssh/id_ed25519
```

---

## 🔄 자동 배포 플로우

1. **로컬에서 코드 수정**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **GitHub Actions 자동 실행**
   - 코드 체크아웃
   - 의존성 설치
   - 빌드
   - SSH로 서버 접속
   - 서버에서 배포 스크립트 실행

3. **서버에서 자동 배포**
   - Git pull
   - npm install
   - npm build
   - PM2 재시작

4. **배포 완료**
   - http://175.106.96.86:3000 (포트 3000)
   - http://175.106.96.86 (Nginx 설정 시)

---

## 🛠️ 수동 배포 (필요 시)

서버에서 직접 배포:
```bash
cd /home/$USER/cert-platform
bash scripts/deploy.sh
```

---

## 📊 모니터링

### PM2 상태 확인
```bash
pm2 status
pm2 logs about-c-platform
pm2 monit
```

### Nginx 로그
```bash
sudo tail -f /var/log/nginx/aboutc_access.log
sudo tail -f /var/log/nginx/aboutc_error.log
```

---

## 🔧 문제 해결

### GitHub Actions 실패 시
1. GitHub Actions 탭에서 로그 확인
2. Secrets 설정 확인
3. 서버 SSH 접근 가능 여부 확인

### PM2 프로세스 재시작
```bash
pm2 restart about-c-platform
pm2 logs --lines 100
```

### Nginx 재시작
```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

### 포트 확인
```bash
# 3000 포트가 사용 중인지 확인
sudo netstat -tlnp | grep 3000
```

---

## 🔒 SSL 인증서 설치 (선택사항)

도메인이 있는 경우 Let's Encrypt로 무료 SSL 인증서 설치:

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급
sudo certbot --nginx -d your_domain.com

# 자동 갱신 설정
sudo certbot renew --dry-run
```

---

## 📝 체크리스트

서버 설정:
- [ ] Node.js 18.x 이상 설치
- [ ] PM2 설치 및 자동 실행 설정
- [ ] Nginx 설치 (선택)
- [ ] 프로젝트 클론
- [ ] 환경 변수 설정
- [ ] PM2로 앱 실행

GitHub 설정:
- [ ] GitHub Secrets 추가
- [ ] SSH 키 설정
- [ ] GitHub Actions 워크플로우 확인

배포 테스트:
- [ ] 수동 배포 테스트
- [ ] GitHub Actions 자동 배포 테스트
- [ ] 브라우저에서 접속 확인

---

## 📞 참고 링크

- [PM2 공식 문서](https://pm2.keymetrics.io/)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Nginx 문서](https://nginx.org/en/docs/)
