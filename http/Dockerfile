FROM ubuntu:16.04

WORKDIR /app

RUN apt-get update \
    && apt-get install curl --yes \
    && curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh \
    && bash nodesource_setup.sh \
    && rm nodesource_setup.sh \
    && apt-get install nodejs --yes
    
COPY www /var/www
COPY node_http .

RUN npm install
    
EXPOSE 3000

CMD ["npm", "start"]