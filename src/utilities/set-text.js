import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";
export async function setText(node, dataMap) {
    const result = [];
    const index = Math.floor(Math.random() * dataMap['product'].length);
    traverseNode(node, async (child) => {
        if (child.type === "TEXT") {
            await loadFontsAsync([child]);
            const text = dataMap['product'][index][child.name];
            child.characters = text;
            result.push(child);
        }
    });
    return result;
}
