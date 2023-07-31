import {
  once,
  on,
  showUI,
  loadFontsAsync,
} from "@create-figma-plugin/utilities";
import { CloseHandler, CreatePopulateDataHandler } from "./types";
import { setText } from "./utilities/set-text";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";

export default function () {
  on<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function (value) {
    const nodes = getSelectedProductNodes();
    const query = `
    query Search {
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
    const response = await fetch(proxyUrl + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    console.log(data);
    nodes.forEach(async (node, index) => {
      await setText(node, dataMap);
    });
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 165,
    width: 240,
  });
}