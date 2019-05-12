# FROM node:9.4.0

# LABEL Nhat Trinh

# # set working directory
# WORKDIR /usr/app

# COPY package*.json ./

# RUN npm install -qy

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

#Build environment
FROM node:8-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install react-scripts -g --silent
RUN npm install --production --silent
COPY . /usr/src/app
RUN npm run build

#Production environment
FROM nginx:1.15-alpine

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN cat /etc/resolv.conf
RUN cat /etc/hosts

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
