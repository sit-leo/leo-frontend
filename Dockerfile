FROM node:11-alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]