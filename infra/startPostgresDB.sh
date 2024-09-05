#!/bin/bash

set -e -x

docker run -d --name discord_clone_db -p 54321:5432 discord_clone_postgres