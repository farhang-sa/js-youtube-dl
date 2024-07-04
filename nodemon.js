const nodemon = require( 'nodemon' );
const { exec } = require( 'child_process' );

nodemon({
  	script: './server.js',
  	ext: 'js jsx ts tsx json css scss html' ,
  	"ignore": [
	    ".git",
		"*.LICENSE.txt",
		"./nodemon.js",
		"./webpack.config.js",
		"./webpack.config.server.js",
		"./dist/server.js" ,
	    "./dist/scripts/app.js"
	  ]
});

// WebPack execute command
const cmd = "webpack --mode development "
		+ "-c webpack.config.js webpack.config.server.js";

nodemon.on('start', function () {
    exec( cmd , (err, stdout, stderr) => {});
	console.log('> Nodemon has started');
}).on('quit', function () {
  	console.log('> Nodemon has quit');
  	process.exit();
}).on('restart', function (files) {
  	console.log('> Nodemon restarted due to: ', files);
});