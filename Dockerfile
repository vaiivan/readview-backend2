FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 8888
CMD yarn install && \ 
    yarn knex migrate:latest &&\
    npx ts-node ./src/main.ts 