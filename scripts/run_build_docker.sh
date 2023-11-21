#!/bin/bash

# Get the absolute path of the directory containing the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Source the environment file
if [ -f .env ]; then
    echo "Sourcing the environment file"
    source .env
else
    echo "Error: No .env file found."
    exit 1
fi

# Build the Docker image
docker build -t $IMAGE_NAME .

# Start the application using Docker Compose

# Raspberry Pi
if [ $IS_RBP == "true" ]; then
    echo "... running RBP Docker compose"
    IP=$(hostname -I | cut -f1 -d' ')
    echo -e "\e[32m Access on local network: ${IP}:3000\e[0m"
    docker compose up
# Other     
else    
    echo "... running  non-RBP Docker-compose"
    docker-compose up
fi