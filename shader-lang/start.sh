#!/bin/bash

docker buildx build -t hotload-shader .
docker run -ti -v ./server:/home hotload-shader /home -c-1
