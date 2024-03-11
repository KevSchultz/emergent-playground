#!/bin/bash

length=${1:-128}

LC_ALL=C tr -dc 'A-Za-z0-9!#\$%&()*+,-./:;<=>?@[\]^_{|}~' </dev/urandom | head -c $length; echo
