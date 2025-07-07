FROM node:18-alpine AS builder

WORKDIR /app

COPY ./lares/Web_Frontend/package*.json ./

RUN npm install

COPY ./lares/Web_Frontend/ .

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8002

CMD ["nginx", "-g", "daemon off;"]