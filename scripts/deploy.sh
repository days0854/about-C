#!/bin/bash

# About C Platform - Deployment Script
# This script is executed on the server during deployment

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Configuration
APP_DIR="/home/ubuntu/cert-platform"  # UPDATE THIS PATH
APP_NAME="about-c-platform"

# Navigate to app directory
cd $APP_DIR

# Pull latest code
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build application
echo "🔨 Building application..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Reload PM2 process
echo "🔄 Reloading PM2 process..."
if pm2 list | grep -q $APP_NAME; then
    pm2 reload ecosystem.config.js --env production
else
    pm2 start ecosystem.config.js --env production
fi

# Save PM2 configuration
pm2 save

# Show status
pm2 status

echo "✅ Deployment completed successfully!"
