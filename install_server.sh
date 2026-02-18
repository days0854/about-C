#!/bin/bash
set -e

echo "=== Starting Server Setup ==="

# 1. Update System & Install Basics
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y curl git nginx gnupg ufw

# 2. Install Node.js 18.x (if not present)
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js already installed: $(node -v)"
fi

# 3. Install PM2
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
    pm2 startup
fi

# 4. Setup Project Directory
mkdir -p /root/cert-platform
cd /root/cert-platform

# 5. Clone/Pull Repository
if [ -d ".git" ]; then
    echo "Pulling latest changes..."
    git pull origin main
else
    echo "Cloning repository..."
    # Backup .env if exists
    if [ -f ".env.production" ]; then
        mv .env.production .env.production.bak
    fi
    
    # Clone to temp dir and move contents because current dir might not be empty
    git clone https://github.com/days0854/about-C.git temp_repo
    shopt -s dotglob
    mv temp_repo/* .
    shopt -u dotglob
    rm -rf temp_repo
    
    # Restore .env
    if [ -f ".env.production.bak" ]; then
        mv .env.production.bak .env.production
    fi
    # Force checkout to ensure clean state
    git checkout .
fi

# 6. Install Dependencies & Build
echo "Installing dependencies..."
npm install
echo "Building..."
npm run build

# 7. PM2 Process Management
echo "Restarting PM2 processes..."
pm2 delete about-c || true
pm2 start ecosystem.config.js --env production
pm2 save

# 8. Nginx Configuration
echo "Configuring Nginx..."
cp nginx.conf /etc/nginx/sites-available/aboutc
ln -sf /etc/nginx/sites-available/aboutc /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and Restart Nginx
nginx -t
systemctl restart nginx

# 9. Firewall Setup
echo "Configuring Firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw allow 3000
echo "y" | ufw enable

# 10. SSL Setup (Certbot)
echo "Setting up SSL..."
if ! command -v certbot &> /dev/null; then
    apt-get install -y certbot python3-certbot-nginx
fi

# Attempt to obtain certificate (failure won't stop script due to '|| true')
certbot --nginx -d aboutc.pro --non-interactive --agree-tos -m admin@aboutc.pro --redirect || echo "SSL setup skipped or failed (check domain DNS)"

echo "=== Server Setup Complete ==="
