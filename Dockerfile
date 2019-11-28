FROM node:10.16.0
WORKDIR /app
COPY package*.json /app/
RUN npm install
ENV NODE_ENV production
COPY . /app
RUN npm run build
CMD ["npm", "run", "prod"]
