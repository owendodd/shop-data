var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { once, on, showUI, } from "@create-figma-plugin/utilities";
import { setText } from "./utilities/set-text";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";
export default function () {
    on("CREATE_POPULATE_DATA", function (value) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = getSelectedProductNodes();
            const query = `
    query {
      productSearchV2(query: "${value}") {
        nodes {
          id
          title
          images {
            width
            height
            url
          }
        }
      }
    }
    `;
            const proxyUrl = "https://corsproxy.io/?";
            const apiUrl = "https://server.shop.app/graphql";
            const response = yield fetch(proxyUrl + apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            const data = yield response.json();
            console.log(data);
            nodes.forEach((node, index) => __awaiter(this, void 0, void 0, function* () {
                yield setText(node, dataMap);
            }));
        });
    });
    once("CLOSE", function () {
        figma.closePlugin();
    });
    showUI({
        height: 165,
        width: 240,
    });
}
