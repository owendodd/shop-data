import { once, on, showUI, } from "@create-figma-plugin/utilities";
import { setText } from "./utilities/set-text";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { dataMap } from "./utilities/data-map";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export default function () {
    on("CREATE_POPULATE_DATA", async function (value) {
        const nodes = getSelectedProductNodes();
        const client = new ApolloClient({
            uri: "https://corsproxy.io/?https://server.shop.app/graphql",
            cache: new InMemoryCache(),
        });
        const query = gql `
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
        const data = await client.query({ query });
        console.log(data);
        nodes.forEach(async (node, index) => {
            await setText(node, dataMap);
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
