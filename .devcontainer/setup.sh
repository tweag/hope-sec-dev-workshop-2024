#!/bin/bash

# Install NPM
apk add --update nodejs npm

# Install SonarCloud CLI
npm install -g sonarsource/sonar-scanner-cli

# Install BFG Repo-Cleaner
sudo wget -O /usr/local/bin/bfg https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar
sudo chmod +x /usr/local/bin/bfg
