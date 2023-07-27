import { once, on, showUI } from "@create-figma-plugin/utilities";
import { CloseHandler, CreatePopulateDataHandler } from "./types";
import { setText } from "./utilities/set-text";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";

export default function () {
  on<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function () {
    console.log("event received");
    const nodes = getSelectedProductNodes();
    nodes.forEach(async (node: SceneNode) => {
      console.log("node found");
      await setText(nodes, dataMap);
    });
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