import { loadFontsAsync } from "@create-figma-plugin/utilities";
import { once, showUI } from "@create-figma-plugin/utilities";

import { CloseHandler, CreatePopulateDataHandler } from "./types";

import { setText } from "./utilities/set-text";
import { getSelectedTextNodes } from "./utilities/get-text-nodes";
import { DataMap, dataMap } from "./utilities/data-map";

export default function () {
  once<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function () {
    console.log("CREATE_POPULATE_DATA event received");
    const nodes = getSelectedTextNodes();
    await setText(nodes, dataMap);
    figma.closePlugin();
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 165,
    width: 240,
  });
}