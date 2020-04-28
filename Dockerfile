FROM node:alpine

WORKDIR /app
ADD ./build ./
RUN npm install -g prpl-server && npm cache clean --force

EXPOSE 8002
CMD [ "prpl-server", "--root", ".", "--config", "polymer.json", "--host", "0.0.0.0", "--port", "8002", "--bot-proxy", "https://render-tron.appspot.com/render" ]