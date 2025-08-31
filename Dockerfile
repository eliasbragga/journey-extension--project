FROM node:22.15.0 AS base
WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=base /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
