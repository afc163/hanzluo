# Hanz Luo

* This is the source code of [hanzluo.com](https://hanzluo.com)

### Deploy

1. CD into app directory if not already in it
```console
$  cd ~/web/hanzluo`
```
2. Pull the latest version. `git pull` is not inside `./deploy.sh` because `./deploy.sh` itself may be changed
```console
$ git pull
```
3. Run deploy scripts
```console
$ ./deploy.sh
```

### Update Deploy

1. CD into app directory if not already in it
```console
$  cd ~/web/hanzluo`
```
2. Pull the latest version. `git pull` is not inside `./deploy-update.sh` because `./deploy-update.sh` itself may be changed
```console
$ git pull
```
3. Run update deploy scripts. If `settings.js` is modified, manual update inside container is needed
```console
$ ./deploy-update.sh
```

### Other

Create external MongoDB volume
```
$ docker volume create --name=mongo_volume
```
Docker volume doc: https://docs.docker.com/storage/volumes/
