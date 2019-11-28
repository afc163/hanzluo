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
$ sudo docker run --name mongodb --restart always --net bridge -p 27017:27017 -dit mongo:3.6.15-xenial mongod --bind_ip_all
```
