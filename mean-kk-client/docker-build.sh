#!/bin/bash
docker kill meank-client:dev
docker rmi meank-client:dev
docker build -t meank-client:dev .
