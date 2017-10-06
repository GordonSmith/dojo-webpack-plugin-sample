import * as parser from "dojo/parser";
import * as ready from "dojo/ready";

import "dijit/layout/TabContainer";
import "dojo/has!webpack?dojo-webpack-plugin/amd/dojoES6Promise";
import "lib/LazyContentPane";

import "css!dijit/themes/claro/claro.css";
import "css!theme/sample.less";

ready(function (): void {
    console.log("Ready!!!");
    parser.parse();
});
