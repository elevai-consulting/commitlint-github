#!/bin/sh

npm run clean \
 && npm install \
 && npm run clean:packages \
 && npm run link:packages \
 && npm run build:packages \
 && npm run test:packages