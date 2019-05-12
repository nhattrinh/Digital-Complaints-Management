FROM node:9.4.0

LABEL Nhat Trinh

# set working directory
WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Production
FROM nginx:1.15-alpine

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN cat /etc/resolv.conf
RUN cat /etc/hosts

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
