import { DataMap } from "../types";
import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";

export async function setContent(node: SceneNode, dataMap: DataMap ) {
  const result: Array<TextNode> = [];
  const index = Math.floor(Math.random() * dataMap['product'].length);
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = dataMap['product'][index][child.name];
      child.characters = text;
      result.push(child);
    } else if (child.type === "RECTANGLE") {
      console.log(child.name);
      // Do something with the image fill
    }
  });
  return result;
}