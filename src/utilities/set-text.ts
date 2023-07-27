import { loadFontsAsync } from "@create-figma-plugin/utilities";
import { DataMap } from "../types";

export async function setText(
  node: SceneNode, 
  dataMap: DataMap
): Promise<void> {
  await loadFontsAsync(node);
  if (node.type === "TEXT" && node.name in dataMap) {
    const data = dataMap[node.name];
    node.characters = data[0];
  }

}s