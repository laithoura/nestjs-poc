FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "run", "start:dev" ]