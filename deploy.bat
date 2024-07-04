@echo off
del *.js
del *.json
del *.gitignore
del *.babelrc
move .\dist\scripts .\scripts
move .\dist\styles .\styles
move .\dist\*.* .
del *.txt
rmdir /S /Q .git
rmdir /S /Q src
rmdir /S /Q dist
del *.sh
echo ----------------
echo ----------------
echo deploy Finished
echo do a 'node server.js' 
echo you can also install forever.js and do 'forever start server.js'
echo server default port is : 8080
echo ----------------
echo ----------------