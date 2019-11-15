#!/bin/bash
echo "Setup Kubernetes For Meals Service .... "
kubectl create -f db-service.yaml
kubectl create -f db-deployment.yaml
kubectl create -f redis-service.yaml
kubectl create -f redis-deployment.yaml
kubectl create -f web-service.yaml
kubectl create -f web-deployment.yaml
kubectl create -f web-claim0-persistentvolumeclaim.yaml
echo "Finished."
