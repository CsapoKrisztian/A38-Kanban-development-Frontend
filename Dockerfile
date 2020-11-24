#########
# BUILD
#########

FROM node:13.12.0-alpine as build

COPY . /var/www/

RUN cd /var/www && npm install --loglevel verbose
RUN cd /var/www && npm run build

#######
# APP
#######

FROM nginx
COPY --from=build /var/www/build/ /usr/share/nginx/html/
COPY --from=build /var/www/docker/nginx/default.conf /etc/nginx/conf.d/default.conf
