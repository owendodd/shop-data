import { loadFontsAsync, traverseNode} from "@create-figma-plugin/utilities";
import { Products } from "../types";


export async function setContent( node: SceneNode, data: Products, nodeCount: number ) {
  const result: Array<TextNode> = [];
  const index = Math.floor(Math.random() * nodeCount);
  const product = data.productSearchV2.nodes[index];
  console.log("Hello!");
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = product.title;
      child.characters = text;
      result.push(child as TextNode);
      console.log("Check 1");
    } else if (child.type === "RECTANGLE") {
      console.log("Check 2");
      const imageUrl = product.images[0].url;
      const response = await fetch(imageUrl);
      const imageBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageBuffer);
      const image = figma.createImage(imageData);
      child.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
    }
  });
  return;
}