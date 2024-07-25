#! /bin/bash
echo "[INFO] Preparing Backend infrastructure ................"

cd backend/

cat .env.example >> .env

echo -e  >> .env

npm i

docker-compose up --build -d

npm run swagger:ts

echo "[INFO] Preparing Backend infrastructure done."

