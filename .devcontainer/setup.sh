#!/bin/bash

# Install SonarCloud CLI
npm install -g sonarsource/sonar-scanner-cli

# Install GitHub CodeQL CLI
gh extension install github/gh-codeql

# Install git-secrets
git clone https://github.com/awslabs/git-secrets.git /tmp/git-secrets
cd /tmp/git-secrets
sudo make install

# Install Talisman
npm install -g talisman

# Install BFG Repo-Cleaner
wget -O /usr/local/bin/bfg https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar
chmod +x /usr/local/bin/bfg

# Clean up
rm -rf /tmp/git-secrets
