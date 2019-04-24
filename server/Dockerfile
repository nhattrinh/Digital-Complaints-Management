# Standard Node image from Docker Hub 
FROM node:boron

# Dockerfile Author
LABEL Nhat Trinh

# Directory for server code output
RUN mkdir -p /code-output-dir

# default working directory
WORKDIR /code-output-dir

# expose the port 3001 for the NGINX container
EXPOSE 3001