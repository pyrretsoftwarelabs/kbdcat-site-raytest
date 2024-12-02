pm2 stop ./index.js
git fetch --all
git reset --hard origin/main
pm2 start ./index.js