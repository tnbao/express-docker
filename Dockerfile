# Fetching the minified node image on apline linux
FROM node:slim

WORKDIR /express-docker

COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
