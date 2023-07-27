import { DataMap } from "../types";
import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";

export async function setText(nodes: SceneNode[], dataMap: DataMap) {
  console.log("setting text");
  const result: Array<TextNode> = [];
  await loadFontsAsync(nodes);
  for (const node of nodes) {
    node.traverseNode(node, function (node: SceneNode) {
      if (node.type === 'TEXT') {
        console.log("BINGO!");
        result.push(node)
      }
    })
  }
  return result
}