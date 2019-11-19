#!/bin/bash

set -x

sudo docker stop hanzluo
sudo docker rm hanzluo
sudo docker image rm hanzluo:latest
sudo docker build -t hanzluo .
sudo docker run --name hanzluo --net hanz-net -p 3000:3000 --restart always -dit hanzluo:latest
