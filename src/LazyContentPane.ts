import * as ContentPane from "dijit/layout/ContentPane";
import * as declare from "dojo/_base/declare";
import * as dconst from "dojo/dom-construct";

import "dijit/a11yclick";

declare("dijit.layout.LazyContentPane", [ContentPane], {
	async onShow() {
		if (this.get("content") === "") {
			this.set("content", this.onDownloadStart());

			const title = this.get("title");
			if (title === "Calendar") {
				const calendar = await import("dijit/Calendar");
				this.set("content", new calendar({}));
			} else if (title === "Color Palette") {
				const colorPallete = await import("dijit/ColorPalette");
				this.set("content", "<div></div>");
				new colorPallete({}, this.containerNode.firstChild);
			} else if (title === "Editor") {
				const editor = await import("dijit/Editor");
				dconst.empty(this.domNode);
				(new editor({
					plugins: ["bold", "italic", "|", "cut", "copy", "paste", "|", "insertUnorderedList"]
				})).placeAt(this.domNode);
			} else if (title === "Chart") {
				const charts = await import("./charts");
				charts.simpleColumn(this.domNode);
			}
		}
	}
});
