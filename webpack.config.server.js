var webpack = require("webpack");
var path = require('path');

module.exports = {
	// informing webpack that i'm building for nodejs not browser
	target : 'node' ,
	entry: {
		server: path.resolve(__dirname, "./server.js" ),
  	},
	output: {
	    path: path.resolve(__dirname, './dist'),
	    filename: '[name].js',
    	publicPath: "dist"
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
	      	} /* advanced SSR :) | Like NextJS
	      	, { // for Styles
	      		test : /\.css$/ ,
	      		use: ['style-loader' , 'css-loader' ]
	      	} , { // for Styles/Sass
	      		test : /\.scss$/ ,
	      		use: ['style-loader' , 'css-loader' , 'sass-loader' ]
	      	} */
	    ]
	} ,
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'DEPLOYED': true ,
			}
		}),
	],
	//mode: 'production'  // Slow In Development -> Small File In Finish
	mode: 'development' // Fast In Development -> Big File In Development!
}