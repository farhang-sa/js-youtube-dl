chmod 777 .
rm *.js
rm *.json
rm ./.gitignore
rm ./.babelrc
mv ./dist/scripts ./scripts
mv ./dist/styles ./styles
mv ./dist/*.* .
rm *.txt
rm -r .git
rm -r development
rm -r dist
rm *.bat
chmod 777 *.js
echo ----------------
echo ----------------
echo deploy Finished
echo do a 'node server.js &' to start as background-service
echo server default port is : 8080
echo ----------------
echo ----------------