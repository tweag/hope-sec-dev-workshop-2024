
cd /workspaces/
wget https://github.com/github/codeql-action/releases/download/codeql-bundle-v2.17.6/codeql-bundle-linux64.tar.gz
mkdir codeqlfiles
tar -xvzf codeql-bundle-linux64.tar.gz -C codeqlfiles
cd codeqlfiles/codeql
./codeql 
./codeql resolve qlpacks
./codeql database create --language=javascript-typescript --source-root ../../hope-sec-dev-workshop-2024/part1 ../../javascript-database