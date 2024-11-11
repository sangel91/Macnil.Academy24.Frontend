# Development image
FROM node:16 as development

# Build image
FROM node:16 as build
# set working directory
WORKDIR /home/node/frontend
# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH
# Handle dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./
# install app dependencies
RUN npm install
# add app
COPY ./frontend ./
# build app
RUN npm run build
# Production image
FROM nginx:1.21.6-alpine as production
# Copy builded app
COPY --from=build /home/node/frontend/build /usr/share/nginx/html
# Copy NGINX config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
