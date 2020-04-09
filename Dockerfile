FROM node:12

WORKDIR /app
COPY . /app

RUN npm install && npm run install-deps && npm run build

EXPOSE 80
EXPOSE 8080

ENTRYPOINT ["npm run start"]
