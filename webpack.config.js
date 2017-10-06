/*
 * (C) Copyright IBM Corp. 2012, 2016 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DojoWebpackPlugin = require("dojo-webpack-plugin");	// load locally

var path = require("path");
var webpack = require("webpack");

module.exports = {
	context: __dirname,
	entry: "lib/bootstrap",
	output: {
		path: path.join(__dirname, "release"),
		publicPath: "release/",
		pathinfo: true,
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.(png)|(gif)$/, loader: "url-loader?limit=100000"
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, {
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: './build/[name].[ext]'
					}
				}]
			}]
	},
	plugins: [
		new DojoWebpackPlugin({
			loaderConfig: require("./src/loaderConfig")("node_modules"),
			locales: ["en"]
		}),
		// For plugins registered after the DojoAMDPlugin, data.request has been normalized and
		// resolved to an absMid and loader-config maps and aliases have been applied
		new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
		new webpack.NormalModuleReplacementPlugin(
			/^css!/, function (data) {
				data.request = data.request.replace(/^css!/, "!style-loader!css-loader!less-loader!")
			}
		),
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			compress: { warnings: false },
			sourceMap: true
		})
	],
	resolveLoader: {
		modules: [
			path.join(__dirname, "node_modules")
		]
	},
	devtool: "#source-map",
	node: {
		process: false,
		global: false
	}
};
