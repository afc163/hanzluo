# Hanz Luo

* This is the source code of [hanzluo.com](https://hanzluo.com)

### Deploy

```
$  cd ~/web/hanzluo`
```
```
$ git pull
```
```
$ ./deploy.sh
```

### Other

Run Mongo Docker
```
$ sudo docker run --name mongodb --net hanz-net -p 27017:27017 -dit mongo:4.1.13-bionic mongod --bind_ip_all
```
