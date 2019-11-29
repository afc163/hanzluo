#!/bin/bash

set -x

sudo docker stop hanzluo
sudo docker rm -f hanzluo
sudo docker image rm hanzluo:latest
sudo docker-compose up -d

