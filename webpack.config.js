var webpack = require("webpack");
var path = require('path');

module.exports = {
	entry: {
	    app : path.resolve(__dirname, "./src/scripts/app.js" ),
  	},
	output: {
	    path: path.resolve(__dirname, './dist/scripts'),
	    filename: '[name].js',
    	publicPath: "scripts" 
  	},
  	devServer : {
  		/*devMiddleware: { 
  			writeToDisk: true 
  		} ,
  		static: './' ,
  		port : 3000*/
  	} ,
	module: {
	    rules: [
	      	{ // for JS
		        test: /\.js$|\.jsx$/,
		        exclude: /node_modules/,
		        use: ['babel-loader']
	      	} , { // for Styles
	      		test : /\.css$/ ,
	      		use: ['style-loader' , 'css-loader' ]
	      	} , { // for Styles/Sass
	      		test : /\.scss$/ ,
	      		use: ['style-loader' , 'css-loader' , 'sass-loader' ]
	      	} 
	    ]
	},
	//mode: 'production'  // Slow In Development -> Small File In Finish
	mode: 'development' // Fase In Development -> Big File In Development!
}