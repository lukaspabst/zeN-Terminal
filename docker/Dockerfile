FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts --no-audit --no-fund

COPY . .
RUN npm run build

FROM nginx:1.30.7-alpine AS runtime
RUN rm -rf /docker-entrypoint.d/* /etc/nginx/conf.d/default.conf
COPY --chown=101:101 docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html

RUN sed -i '/^[[:space:]]*user[[:space:]]/d; s|^[[:space:]]*pid[[:space:]].*;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf \
  && grep -q '^pid /tmp/nginx.pid;' /etc/nginx/nginx.conf \
  && awk '$1 == "http" && $2 == "{" { print; print "    client_body_temp_path /tmp/client_temp;"; print "    proxy_temp_path /tmp/proxy_temp;"; print "    fastcgi_temp_path /tmp/fastcgi_temp;"; print "    uwsgi_temp_path /tmp/uwsgi_temp;"; print "    scgi_temp_path /tmp/scgi_temp;"; next } { print }' /etc/nginx/nginx.conf > /tmp/nginx.conf \
  && mv /tmp/nginx.conf /etc/nginx/nginx.conf \
  && chown -R 101:101 /usr/share/nginx/html /etc/nginx /var/cache/nginx /var/log/nginx \
  && chmod -R a+rX /etc/nginx /usr/share/nginx/html

USER 101:101
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
