# After the app was deployed, we update the build inside the container

sudo docker exec -it hanzluo bash -c "git remote set-url origin https://github.com/lhz516/hanzluo.git && git pull && npm i && npm run build"
sudo docker restart hanzluo
