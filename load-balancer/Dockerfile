# Standard NGINX image from Docker Hub 
FROM nginx

# Dockerfile Author
LABEL Nhat Trinh

# Copy the configuration file from the current directory and paste 
# it inside the container to use it as Nginx's default config.
COPY nginx.conf /etc/nginx/nginx.conf

# Port 8080 of the container will be exposed and then mapped to port
# 8080 of our host machine via Compose
EXPOSE 8080

# Start Nginx when the container has been provisioned
CMD ["nginx", "-g", "daemon off;"]