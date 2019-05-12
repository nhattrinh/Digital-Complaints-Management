# # Standard Node image from Docker Hub 
# FROM node:boron

# # Dockerfile Author
# LABEL Nhat Trinh

# # Directory for server code output
# RUN mkdir -p /code-output-dir

# # default working directory
# WORKDIR /code-output-dir

# # expose the port 3001 for the NGINX container
# EXPOSE 3001


FROM keymetrics/pm2:8-alpine

#Copy dependencies & config files
COPY package.json .
COPY package-lock.json .

#Install app dependencies
RUN npm install --production

#Copy app src to container _after_ npm install so that
#Application code changes don't bust the docker cache of npm install step
COPY . src/

#Set and expose port
ENV PORT 3001
EXPOSE 3001

#Show current folder structure
RUN cd src/ && ls -a

#Start PM2 Process
CMD ["pm2-runtime", "src/app.js"]