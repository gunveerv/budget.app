#!/bin/bash

#stops container (or just use crt + c)

# Get the absolute path of the directory containing the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR/..

# Source the environment file
if [ -f .env ]; then
    echo "Sourcing the environment file"
    source .env
else
    echo "Error: No .env file found."
    exit 1
fi

echo "Stopped Docker Container $CONTAINER_NAME"
docker stop $CONTAINER_NAME