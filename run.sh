#!/usr/bin/env bash

docker run \
  -ti --rm -d \
  --name todo \
  -v $PWD:/app -w /app \
  -p 3000:3000 \
  node:16 npm start
docker logs -f todo
