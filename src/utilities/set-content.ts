import { DataMap } from "../types";
import { loadFontsAsync, traverseNode, createImagePaint } from "@create-figma-plugin/utilities";

export async function setContent(node: SceneNode, dataMap: DataMap ) {
  const index = Math.floor(Math.random() * dataMap['product'].length);
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = dataMap['product'][index][child.name];
      child.characters = text;
    } else if (child.type === "RECTANGLE") {
      const imageUrl = dataMap['product'][index][child.name];
      const response = await fetch(imageUrl);
      const data = await response.arrayBuffer();
      const imageData = new Uint8Array(data);
      const image = figma.createImage(imageData);
      child.fills = [{type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL'}];
    }
  });
  return;
}