FROM node:13

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4445

CMD ["npm",  "run", "serve"]