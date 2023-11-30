# Budget.App

* A simple budget app with API requests to a database to use as a financial tracker

## Docker

### Backend (./server)

#### Docker Setup:

* `docker build -t {my-budget-app} .` //builds the image
* `docker-compose up` //makes the container 
* run `./scripts/run_build_docker.sh` to automate the above steps^

* `./scripts/stop_container.sh` will stop the container 
* You can also use `crt + c` if you run compose in the terminal

### Frontend (./client)

* `docker build -t {my-budget-app} .` //builds the image
* `docker-compose up` //makes the container 
* run `./scripts/run_build_docker.sh` to automate the above steps^
* To close, use `crt + c` if you run compose in the terminal