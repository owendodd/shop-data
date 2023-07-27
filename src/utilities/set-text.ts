import { loadFontsAsync } from "@create-figma-plugin/utilities";
import { DataMap, Product } from "../types";

export async function setText(
  nodes: Array<TextNode>,
  dataMap: DataMap
): Promise<void> {
  await loadFontsAsync(nodes);
  for (const node of nodes) {
    const layerName = node.name;
    console.log(layerName);
    const data = dataMap[layerName];
    if (data && layerName) {
      const randomIndex = Math.floor(Math.random() * data.length);
      node.characters = data[randomIndex];
    }
  }
}