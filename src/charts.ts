import { Column } from "@hpcc-js/chart";
import * as dconst from "dojo/dom-construct";

export function simpleColumn(domNode) {
    dconst.empty(domNode);
    const column: Column = new Column();
    dconst.place("<div id=\"gjs\" style=\"width:640px;height:320px\"></div>", domNode);
    column.target("gjs")
        .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
        .data([
            ["English", 5, 43, 41, 92],
            ["English II", 17, 43, 83, 93],
            ["English III", 6, 43, 64, 93],
            ["Geography", 7, 45, 52, 83],
            ["Geography II", 16, 73, 52, 83],
            ["Geography III", 26, 83, 11, 72],
            ["Science", 66, 60, 85, 6],
            ["Science II", 46, 20, 53, 7],
            ["Science III", 46, 20, 38, 7],
            ["Math", 98, 30, 23, 13],
            ["Math II", 76, 30, 34, 6],
            ["Math III", 80, 30, 27, 8]
        ])
        .render()
        ;
}
