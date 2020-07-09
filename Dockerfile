FROM node:12-alpine AS builder

WORKDIR /home/app/
COPY . /home/app/

RUN cd /home/app/ && npm install

RUN npm run build

FROM node:12-alpine

WORKDIR /home/app/
COPY --from=builder /home/app/dist .
COPY --from=builder /home/app/package.json package.json

RUN cd /home/app/ && npm install --production

CMD ["node", "/home/app/index.js"]

EXPOSE 9090
