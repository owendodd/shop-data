import { loadFontsAsync, traverseNode} from "@create-figma-plugin/utilities";
import { Products } from "../types";


export async function setContent( node: SceneNode, data: Products, index: number ) {
  const result: Array<TextNode> = [];
  const product = data.productSearchV2.nodes[index];
  console.log("Hello!");
  traverseNode(node, async (child) => {
    if (child.type === "TEXT" && child.name === "productName") {
      await loadFontsAsync([child]);
      const text = product.title;
      child.characters = text;
      result.push(child as TextNode);
    }
    else if (child.type === "TEXT" && child.name === "productPrice") {
      await loadFontsAsync([child]);
      const text = product.price.amount;
      child.characters = text;
      result.push(child as TextNode);
    }
    else if (child.type === "TEXT" && child.name === "merchantName") {
      await loadFontsAsync([child]);
      const text = product.shop.name;
      child.characters = text;
      result.push(child as TextNode);
    }
     else if (child.type === "RECTANGLE" && child.name === "productImage") {
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