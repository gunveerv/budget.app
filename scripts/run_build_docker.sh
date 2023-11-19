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
docker-compose up
