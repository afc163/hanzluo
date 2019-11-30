# Hanz Luo

* This is the source code of [hanzluo.com](https://hanzluo.com)

### Deploy

1. CD into app directory if not already in it
```bash
$  cd ~/web/hanzluo`
```
2. Pull the latest version. `git pull` is not inside `./deploy.sh` because `./deploy.sh` itself may be changed
```bash
$ git pull
```
3. Run deploy scripts
```bash
$ ./deploy.sh
```

### Update Deploy

1. CD into app directory if not already in it
```bash
$  cd ~/web/hanzluo`
```
2. Run update deploy scripts inside container. If `settings.js` is modified, manual update inside container is needed
```bash
$ sudo docker exec -it hanzluo bash -c "./deploy-update.sh"
```

### Other

```
Create external MongoDB volume
```
$ docker volume create --name=mongo_volume
```
Docker volume doc: https://docs.docker.com/storage/volumes/
