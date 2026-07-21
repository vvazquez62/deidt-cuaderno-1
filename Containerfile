FROM registry.access.redhat.com/ubi9/nginx-124:latest
COPY . /tmp/src
RUN cp -r /tmp/src/index.html /tmp/src/styles.css /tmp/src/course-data.js /tmp/src/app.js /opt/app-root/src/ && \
    chmod -R g=u /opt/app-root/src
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
