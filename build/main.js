var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function once(name, handler) {
  let done = false;
  return on(name, function(...args) {
    if (done === true) {
      return;
    }
    done = true;
    handler(...args);
  });
}
function invokeEventHandler(name, args) {
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
    }
  }
}
var eventHandlers, currentId;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    if (typeof window === "undefined") {
      figma.ui.onmessage = function([name, ...args]) {
        invokeEventHandler(name, args);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const [name, ...args] = event.data.pluginMessage;
        invokeEventHandler(name, args);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/absolute-position/get-absolute-position.js
function getAbsolutePosition(node) {
  return {
    x: node.absoluteTransform[0][2],
    y: node.absoluteTransform[1][2]
  };
}
var init_get_absolute_position = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/absolute-position/get-absolute-position.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/traverse-node.js
function traverseNode(node, processNode, stopTraversal) {
  if (node.removed === true) {
    return;
  }
  if ("children" in node && (typeof stopTraversal !== "function" || stopTraversal(node) === false)) {
    for (const childNode of node.children) {
      traverseNode(childNode, processNode, stopTraversal);
    }
  }
  processNode(node);
}
var init_traverse_node = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/traverse-node.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/node/load-fonts-async.js
async function loadFontsAsync(nodes) {
  const result = {};
  for (const node of nodes) {
    switch (node.type) {
      case "CONNECTOR":
      case "SHAPE_WITH_TEXT":
      case "STICKY": {
        collectFontsUsedInNode(node.text, result);
        break;
      }
      case "TEXT": {
        collectFontsUsedInNode(node, result);
        break;
      }
    }
  }
  await Promise.all(Object.values(result).map(function(font) {
    return figma.loadFontAsync(font);
  }));
}
function collectFontsUsedInNode(node, result) {
  const length = node.characters.length;
  if (length === 0) {
    const fontName = node.fontName;
    const key = createKey(fontName);
    if (key in result) {
      return;
    }
    result[key] = fontName;
    return;
  }
  let i = -1;
  while (++i < length) {
    const fontName = node.getRangeFontName(i, i + 1);
    const key = createKey(fontName);
    if (key in result) {
      continue;
    }
    result[key] = fontName;
  }
}
function createKey(fontName) {
  return `${fontName.family}-${fontName.style}`;
}
var init_load_fonts_async = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/node/load-fonts-async.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_get_absolute_position();
    init_load_fonts_async();
    init_traverse_node();
    init_ui();
  }
});

// src/utilities/sort-nodes-by-position.ts
function sortNodesByPosition(nodes, axis) {
  const parent = nodes[0].parent;
  if (parent === null) {
    throw new Error("Node has no parent");
  }
  const orthogonalAxis = axis === "x" ? "y" : "x";
  const result = nodes.slice().sort(function(a, b) {
    const aAbsolutePosition = getAbsolutePosition(a);
    const bAbsolutePosition = getAbsolutePosition(b);
    if (aAbsolutePosition[axis] !== bAbsolutePosition[axis]) {
      return aAbsolutePosition[axis] - bAbsolutePosition[axis];
    }
    if (aAbsolutePosition[orthogonalAxis] !== bAbsolutePosition[orthogonalAxis]) {
      return aAbsolutePosition[orthogonalAxis] - bAbsolutePosition[orthogonalAxis];
    }
    return 0;
  });
  return result;
}
var init_sort_nodes_by_position = __esm({
  "src/utilities/sort-nodes-by-position.ts"() {
    "use strict";
    init_lib();
  }
});

// src/utilities/get-product-nodes.ts
function getSelectedProductNodes() {
  const result = [];
  const nodes = figma.currentPage.selection.slice();
  for (const node of nodes) {
    traverseNode(node, function(node2) {
      if (node2.name && node2.name === "ProductCard") {
        result.push(node2);
      }
    });
  }
  if (result.length === 0) {
    return [];
  }
  return sortNodesByPosition(result, "y");
}
var init_get_product_nodes = __esm({
  "src/utilities/get-product-nodes.ts"() {
    "use strict";
    init_lib();
    init_sort_nodes_by_position();
  }
});

// src/utilities/set-content.ts
async function setContent(node, data, index) {
  const result = [];
  const product = data.productSearchV2.nodes[index];
  console.log("Hello!");
  traverseNode(node, async (child) => {
    if (child.type === "TEXT" && child.name === "Product Name") {
      await loadFontsAsync([child]);
      const text = product.title;
      child.characters = text;
      result.push(child);
    } else if (child.type === "TEXT" && child.name === "Full Price") {
      await loadFontsAsync([child]);
      const text = `$${product.price.amount}`;
      child.characters = text;
      result.push(child);
    } else if (child.type === "TEXT" && child.name === "Merchant Name") {
      await loadFontsAsync([child]);
      const text = product.shop.name;
      child.characters = text;
      result.push(child);
    } else if (child.type === "RECTANGLE" && child.name === "image") {
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
var init_set_content = __esm({
  "src/utilities/set-content.ts"() {
    "use strict";
    init_lib();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  on("CREATE_POPULATE_DATA", async function(value) {
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
        "X-Device-Id": "graphiql-WEB"
      },
      body: JSON.stringify({ query })
    });
    const { data } = await response.json();
    nodes.forEach(async (node, index) => {
      await setContent(node, data, index);
      console.log(data);
    });
  });
  once("CLOSE", function() {
    figma.closePlugin();
  });
  showUI({
    height: 190,
    width: 240
  });
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_get_product_nodes();
    init_set_content();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
