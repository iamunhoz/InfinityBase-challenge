#!/bin/bash

set -e -x

docker build -f ./Dockerfile.postgres -t discord_clone_postgres .