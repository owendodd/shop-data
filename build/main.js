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

<<<<<<< HEAD
=======
// src/utilities/set-content.ts
async function setContent(node, dataMap2) {
  const textResult = [];
  const imageResult = [];
  const index = Math.floor(Math.random() * dataMap2["product"].length);
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = dataMap2["product"][index][child.name];
      child.characters = text;
      textResult.push(child);
    } else if (child.type === "RECTANGLE") {
      const imageUrl = dataMap2["product"][index][child.name];
      const response = await fetch(imageUrl);
      const data = await response.arrayBuffer();
      const imageData = new Uint8Array(data);
      const image = figma.createImage(imageData);
      child.fills = [{ type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" }];
      console.log(child.name, imageUrl);
    }
  });
  return textResult;
}
var init_set_content = __esm({
  "src/utilities/set-content.ts"() {
    "use strict";
    init_lib();
  }
});

>>>>>>> 6ae7693 (Pause)
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
      if (node2.name && node2.name === "product") {
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

// src/utilities/data-map.ts
var dataMap;
var init_data_map = __esm({
  "src/utilities/data-map.ts"() {
    "use strict";
    dataMap = {
      "product": [
        {
          productName: "iPhone 13 Pro Max",
          merchantName: "Apple",
          productPrice: "1099",
          productImage: "https://cdn.pixabay.com/photo/2021/09/15/09/27/iphone-13-6627666_1280.jpg"
        },
        {
          productName: "Samsung Galaxy S21 Ultra",
          merchantName: "Samsung",
          productPrice: "1199",
          productImage: "https://cdn.pixabay.com/photo/2021/02/01/20/09/samsung-galaxy-s21-ultra-5977682_1280.jpg"
        },
        {
          productName: "Sony PlayStation 5",
          merchantName: "Best Buy",
          productPrice: "499",
          productImage: "https://cdn.pixabay.com/photo/2021/01/22/16/31/playstation-5-5949772_1280.jpg"
        },
        {
          productName: "Bose QuietComfort 35 II",
          merchantName: "Amazon",
          productPrice: "299",
          productImage: "https://cdn.pixabay.com/photo/2018/05/31/16/06/bose-3445097_1280.jpg"
        },
        {
          productName: "Nintendo Switch",
          merchantName: "Walmart",
          productPrice: "299",
          productImage: "https://cdn.pixabay.com/photo/2020/04/08/18/51/nintendo-switch-5027586_1280.jpg"
        },
        {
          productName: "LG OLED TV",
          merchantName: "Costco",
          productPrice: "1499",
          productImage: "https://cdn.pixabay.com/photo/2021/06/08/18/17/lg-oled-tv-6323071_1280.jpg"
        }
        // Add more products here
      ]
    };
  }
});

// src/utilities/set-content.ts
async function setContent(node, dataMap2) {
  const result = [];
  const index = Math.floor(Math.random() * dataMap2["product"].length);
  traverseNode(node, async (child) => {
    if (child.type === "TEXT") {
      await loadFontsAsync([child]);
      const text = dataMap2["product"][index][child.name];
      child.characters = text;
      result.push(child);
    } else if (child.type === "RECTANGLE") {
      console.log(child.name);
    }
  });
  return result;
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
<<<<<<< HEAD
    console.log("TEST");
=======
    console.log("hello");
>>>>>>> 6ae7693 (Pause)
    nodes.forEach(async (node, index) => {
      await setContent(node, dataMap);
    });
  });
  once("CLOSE", function() {
    figma.closePlugin();
  });
  showUI({
<<<<<<< HEAD
    height: 170,
=======
    height: 265,
>>>>>>> 6ae7693 (Pause)
    width: 240
  });
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
<<<<<<< HEAD
=======
    init_set_content();
>>>>>>> 6ae7693 (Pause)
    init_get_product_nodes();
    init_data_map();
    init_set_content();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
