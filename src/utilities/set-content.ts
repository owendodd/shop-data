import { DataMap } from "../types";
<<<<<<< HEAD
import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";

export async function setContent(node: SceneNode, dataMap: DataMap ) {
  const result: Array<TextNode> = [];
=======
import { loadFontsAsync, traverseNode, createImagePaint } from "@create-figma-plugin/utilities";

export async function setContent(node: SceneNode, dataMap: DataMap ) {
  const textResult: Array<TextNode> = [];
  const imageResult: Array<Uint8Array> = [];
>>>>>>> 6ae7693 (Pause)
  const index = Math.floor(Math.random() * dataMap['product'].length);
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = dataMap['product'][index][child.name];
      child.characters = text;
<<<<<<< HEAD
      result.push(child);
    } else if (child.type === "RECTANGLE") {
      console.log(child.name);
      // Do something with the image fill
    }
  });
  return result;
=======
      textResult.push(child);
    } else if (child.type === "RECTANGLE") {
      const imageUrl = dataMap['product'][index][child.name];
      const response = await fetch(imageUrl);
      const data = await response.arrayBuffer();
      const imageData = new Uint8Array(data);
      const image = figma.createImage(imageData);
      child.fills = [{type: 'IMAGE', imageHash: image.hash, scaleMode: 'FILL'}];
      console.log(child.name, imageUrl);
    }
  });
  return textResult;
>>>>>>> 6ae7693 (Pause)
}