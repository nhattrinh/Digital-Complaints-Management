# FROM node:9.4.0

# LABEL Nhat Trinh

# # set working directory
# WORKDIR /usr/app

# COPY package*.json ./

# RUN npm install -qy

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install
COPY ./ /usr/app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /usr/app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
