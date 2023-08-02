import {
  once,
  on,
  showUI,
  loadFontsAsync,
} from "@create-figma-plugin/utilities";
import { CloseHandler, CreatePopulateDataHandler } from "./types";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { setContent } from "./utilities/set-content";

export default function () {
  on<CreatePopulateDataHandler>("CREATE_POPULATE_DATA", async function (value) {
    const nodes = getSelectedProductNodes();
    const nodeCount = nodes.length;
    const query = `
    query Search {
      productSearchV2(query: "${value}" first: ${nodeCount}) {
        nodes {
          id
          title
          price {
            amount
          }
          shop {
            name
          }
          images {
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
        'X-Device-Id': 'graphiql-WEB',
      },
      body: JSON.stringify({ query }),
    });
    const {data} = await response.json();

    nodes.forEach(async (node, index) => {
      await setContent(node, data, index); 
      console.log(data);
    });
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 190,
    width: 240,
  });
}