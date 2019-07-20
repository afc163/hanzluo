#!/bin/bash

set -x

sudo docker kill hanzluo
sudo docker rm hanzluo
sudo docker tag hanzluo:latest hanzluo:old
sudo docker image rm hanzluo:old
sudo docker build -t hanzluo .
sudo docker run --name hanzluo --net hanz-net -p 3000:3000 -d hanzluo:latest
