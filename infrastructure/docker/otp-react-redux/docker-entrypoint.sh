#!/usr/bin/env bash

echo "
server {
	listen 80 default_server;

	location / {
		root /var/www/html;
	}
}
" > /etc/nginx/http.d/default.conf

/usr/sbin/nginx -g "daemon off;"