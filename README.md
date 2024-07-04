## js-youtube-dl
A wrapper for [@yt-dlp](https://github.com/yt-dlp/) with NodeJS and React

## challenge : compiling both back-end and front-end with webpack ( like nextjs )
A practice of compiling BE/FE modules and scripts at the same time with webpack
App works like [@php-youtube-dl](https://github.com/farhang-sa/php-youtube-dl/) , but with nodejs in backend

## How it works ( for dev ) :
for compiling both BE & FE , you need to create two webpack.config files and in server.config you need to declare <code> 'target' : 'node'</code> that tells webpack to compile for nodejs not browser.
everything else is stright forward. ps. take look at nodemon.js

## How to use :
1. <code>git clone</code> to your server
2. ### do not npm start! ( it's just for dev )
3. if you did change to code ( ip,port,etc ) run <code>npm run build</code> to generate bundles
4. delete dev files and keep the product :
   - if server is windows : <code>npm run windows</code>
   - if server is linux : <code>npm run linux</code>
5. start server.js as suggested in output of step 4
6. no (1-4) : use releases to get final files and do step 5