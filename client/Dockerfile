# base image
FROM node:9.6.1

LABEL Nhat Trinh

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# start app
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