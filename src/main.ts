import {
  once,
  on,
  showUI,
  loadFontsAsync,
} from "@create-figma-plugin/utilities";
import { CloseHandler, CreatePopulateDataHandler } from "./types";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";
import { setContent } from "./utilities/set-content";

export default function () {
  on<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function (value) {
    const nodes = getSelectedProductNodes();
    const query = `
    query Search {
      productSearchV2(query: "${value}" first: 3) {
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
      await setContent(node, dataMap);
    });
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 200,
    width: 240,
  });
}