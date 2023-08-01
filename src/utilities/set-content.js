var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadFontsAsync, traverseNode } from "@create-figma-plugin/utilities";
export function setContent(node, dataMap) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        const index = Math.floor(Math.random() * dataMap['product'].length);
        traverseNode(node, (child) => __awaiter(this, void 0, void 0, function* () {
            if (child.type === "TEXT") {
                yield loadFontsAsync([child]);
                const text = dataMap['product'][index][child.name];
                child.characters = text;
                result.push(child);
            }
            else if (child.type === "RECTANGLE") {
                console.log(child.name);
                // Do something with the image fill
            }
        }));
        return result;
    });
}
