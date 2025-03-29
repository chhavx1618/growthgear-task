FROM node:18
#using node version 18

WORKDIR /gg
#main root directory

COPY package.json* .
#copy package.json initally to get all reqd dependencies

RUN npm i
#installing all deps

COPY . .
#copying the rest of the code and files from the workdir

EXPOSE 5000
#exposing 5000 port for running the server

CMD [ "npm", "start" ]