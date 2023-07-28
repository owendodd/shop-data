import { DataMap } from "../types";
import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";

export async function setText(node: SceneNode, dataMap: DataMap, index: number) {
  const result: Array<TextNode> = [];
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      child.characters = "changed";
      result.push(child as TextNode);
    }
  });
  return result;
}