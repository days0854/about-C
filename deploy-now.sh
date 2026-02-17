#!/bin/bash
cd /root/cert-platform
git pull origin main
pm2 delete all
pm2 start ecosystem.config.js --env production
pm2 save
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y nginx
cp /root/cert-platform/nginx.conf /etc/nginx/sites-available/aboutc
ln -sf /etc/nginx/sites-available/aboutc /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
systemctl enable nginx
echo "=== Deployment Complete ==="
pm2 list
systemctl status nginx --no-pager -l
curl -I http://localhost:3000
echo "Visit: http://aboutc.pro"
