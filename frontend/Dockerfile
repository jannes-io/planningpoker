FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_BACKEND_URL

RUN npm run build

FROM nginx:latest
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
COPY ./.deploy /etc/nginx/conf.d
