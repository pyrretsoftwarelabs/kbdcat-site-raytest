pm2 stop ./index.js
git fetch --all
git reset --hard origin/main
npm install
pm2 start ./index.js