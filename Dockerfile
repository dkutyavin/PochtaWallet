FROM node:12.13.0-alpine as installer

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn
RUN yarn add expo-cli

FROM installer AS build

EXPOSE 19000
EXPOSE 19001

WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY .expo .expo
COPY api api
COPY app app
COPY components components
COPY assets assets
COPY screens screens
COPY types types
COPY utils utils
COPY app.json app.json
COPY App.tsx App.tsx
COPY babel.config.js babel.config.js

RUN npx expo start
