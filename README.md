# Budget.App

## Docker

### Docker Setup:

* `docker build -t {my-budget-app} .` //builds the image
* `docker-compose up` //makes the container 
* run `./scripts/run_build_docker.sh` to automate the above steps^

### Container Run & Stop

* `docker-compose up` will build the container
* `./scripts/stop_container.sh` will stop the container