import { once, on, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler, CreatePopulateDataHandler } from "./types";
import { setText } from "./utilities/set-text";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";

export default function () {
  on<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function () {
    const nodes = getSelectedProductNodes();
    for (const node of nodes) {
      await setText(node, dataMap);
    }
    // figma.closePlugin();
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 165,
    width: 240,
  });
}