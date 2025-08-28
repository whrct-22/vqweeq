#!/bin/bash

# Next.js静态网站部署脚本
# 用于部署到Nginx服务器

# 配置变量
DOMAIN="dev.leandermerten.com"
DEPLOY_PATH="/www/wwwroot/domains/slpx"
NGINX_CONFIG_PATH="/www/server/panel/vhost/nginx"
BACKUP_PATH="/www/backups/$DOMAIN"
DATE=$(date +%Y%m%d_%H%M%S)

echo "开始部署Next.js静态网站..."

# 1. 备份当前版本
if [ -d "$DEPLOY_PATH/out" ]; then
    echo "备份当前版本..."
    mkdir -p "$BACKUP_PATH"
    cp -r "$DEPLOY_PATH/out" "$BACKUP_PATH/out_$DATE"
fi

# 2. 构建Next.js静态网站
echo "构建Next.js静态网站..."
npm run build
if [ $? -ne 0 ]; then
    echo "构建失败，请检查代码"
    exit 1
fi

# 3. 导出静态文件
echo "导出静态文件..."
npm run export
if [ $? -ne 0 ]; then
    echo "导出失败"
    exit 1
fi

# 4. 复制文件到部署目录
echo "复制文件到部署目录..."
if [ -d "$DEPLOY_PATH/out" ]; then
    rm -rf "$DEPLOY_PATH/out"
fi

# 确保目标目录存在
mkdir -p "$DEPLOY_PATH"

# 复制构建结果
cp -r out "$DEPLOY_PATH/"

# 5. 设置权限
echo "设置文件权限..."
chown -R www:www "$DEPLOY_PATH/out"
chmod -R 755 "$DEPLOY_PATH/out"

# 6. 测试Nginx配置
echo "测试Nginx配置..."
nginx -t
if [ $? -ne 0 ]; then
    echo "Nginx配置测试失败，请检查配置"
    exit 1
fi

# 7. 重启Nginx
echo "重启Nginx..."
systemctl restart nginx

# 8. 清理旧备份（保留最近5个）
echo "清理旧备份..."
cd "$BACKUP_PATH"
ls -t | tail -n +6 | xargs rm -rf

echo "部署完成！"
echo "网站地址: https://$DOMAIN"