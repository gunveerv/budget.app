#!/bin/bash

# test all api called in index.js

echo "Running all api calls"

curl -X GET http://10.0.0.244:8080/api/status 
echo

curl -X GET http://10.0.0.244:8080/api/record
echo

curl -X GET http://10.0.0.244:8080/api/categories
echo

curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://10.0.0.244:8080/api/record
echo

echo "Completed all api calls"