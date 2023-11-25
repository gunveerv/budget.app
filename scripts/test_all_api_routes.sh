#!/bin/bash

# test all api called in index.js

echo "Running all api calls"

curl -X GET http://10.0.0.244:3000/api/status 
echo

curl -X GET http://10.0.0.244:3000/api/record
echo

curl -X GET http://10.0.0.244:3000/api/categories
echo

curl -X POST -H "Content-Type: application/json" -d '{"key": "value"}' http://10.0.0.244:3000/api/record
echo

echo "Completed all api calls"