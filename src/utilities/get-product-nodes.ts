import { traverseNode } from "@create-figma-plugin/utilities";

import { sortNodesByPosition } from "./sort-nodes-by-position";

export function getSelectedProductNodes(): Array<FrameNode> {
  const result: Array<FrameNode> = [];
  const nodes = figma.currentPage.selection.slice();
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type === "FRAME" && node.name === "product") {
        result.push(node);
      }
    });
  }
  if (result.length === 0) {
    return [];
  }
  return sortNodesByPosition(result, "y");
}
