#!/bin/bash

set -e

cd /home/ubuntu/dev/library_backend

git fetch origin

git reset --hard origin/production

git checkout origin/production

npm ci
npm run build

pm2 reload LIBAPI
