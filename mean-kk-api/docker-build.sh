#!/bin/bash
docker kill meank-api:dev
docker rmi meank-api:dev
docker build -t meank-api:dev .
