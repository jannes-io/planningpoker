# Planning Poker app

A remote planning poker application with multiple and customisable card decks.

[Live version](https://poker.jannes.io)

![License](https://img.shields.io/badge/license-CC%20(Apache)-yellow)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/) 
[![Code Style](https://img.shields.io/badge/code%20style-airbnb-FF5A5F?logo=airbnb)](https://github.com/airbnb/javascript)

## Self-hosting

### Docker
This application comes with a docker-compose.yml and a Dockerfile for both backend and frontend.
Simply run it with the desired parameters or export these to the env first.
```bash
BACKEND_PORT=8080 BACKEND_URL=http://example.org FRONTEND_PORT=80 docker-compose up -d --build
```

### Manual
This guide assumes the server already has nodejs installed.

#### Backend
```console
npm install
npm run build
```
Use a .env file or export the following variables to the env.
```
ENV=prod
PORT=8080
```
Then run the server using node or, if auto-restart on crash is desired, pm2
```console
pm2 start ./dist/index.js
```

#### Frontend
Configure the environment prior to building, since React injects env vars during the build process:
```
REACT_APP_BACKEND_URL=http://example.org
```
Then install dependencies and build.
```console
npm install
npm run build
```
Finally, serve the files with a webserver like nginx, apache, serve,... For this example serve was used
```console
npm install -g serve
serve -p 80 ./build
```

## Development

#### Backend
Copy .env.example
```console
cp .env.example .env
```
Install dependencies and run using nodemon
```console
npm install
npm run watch
```

#### Frontend
Install dependencies and start dev server
```console
npm install
npm run start
```
