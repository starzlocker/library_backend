#!/bin/bash

set -e

git fetch origin

git reset --hard origin/production

npm ci
npm run buil

pm2 reload LIBAPI
