#!/bin/bash

# Get the directory of the script
script_dir=$(dirname "$0")

# Change to the specific folder relative to the script directory
cd "$script_dir/../frontend"

# Install the dependencies
npm install

# Build the frontend
npm run build

# Change the name from dist to build
mv dist build

# Remove the old build from the backend
rm -rf ../backend/build

# Copy the build to the backend
cp -r build ../backend/
