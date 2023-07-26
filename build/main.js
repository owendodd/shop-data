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

// src/utilities/set-text.ts
async function setText(nodes, dataMap2) {
  await loadFontsAsync(nodes);
  for (const node of nodes) {
    const layerName = node.name;
    console.log(layerName);
    const data = dataMap2[layerName];
    if (data && layerName) {
      const randomIndex = Math.floor(Math.random() * data.length);
      node.characters = data[randomIndex];
    }
  }
}
var init_set_text = __esm({
  "src/utilities/set-text.ts"() {
    "use strict";
    init_lib();
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

// src/utilities/get-text-nodes.ts
function getSelectedTextNodes() {
  const result = [];
  const nodes = figma.currentPage.selection.slice();
  for (const node of nodes) {
    traverseNode(node, function(node2) {
      if (node2.type === "TEXT" && node2.characters.trim().length > 0) {
        result.push(node2);
      }
    });
  }
  if (result.length === 0) {
    return [];
  }
  return sortNodesByPosition(result, "y");
}
var init_get_text_nodes = __esm({
  "src/utilities/get-text-nodes.ts"() {
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
      "#merchant-name": ["Walmart", "Target", "Amazon", "Best Buy", "Costco", "Home Depot", "Lowe's", "Walgreens", "CVS"],
      "#product-name": [
        "iPhone 13 Pro Max",
        "Samsung Galaxy S21 Ultra",
        "Sony PlayStation 5",
        "Microsoft Xbox Series X",
        "LG OLED TV",
        "Bose QuietComfort 35 II",
        "Apple AirPods Pro",
        "Fitbit Charge 5",
        "Dyson V11 Absolute",
        "Instant Pot Duo Nova",
        "Nespresso Vertuo Coffee Maker",
        "KitchenAid Stand Mixer",
        "Cuisinart Food Processor",
        "Vitamix Blender",
        "Calphalon Cookware Set",
        "iRobot Roomba Vacuum",
        "Serta Perfect Sleeper Mattress",
        "Brooklinen Luxe Sheet Set",
        "Allswell Hybrid Mattress",
        "Tuft & Needle Original Mattress"
      ]
    };
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
function main_default() {
  once("CREATE_POPULATE_DATA", async function() {
    console.log("CREATE_POPULATE_DATA event received");
    const nodes = getSelectedTextNodes();
    await setText(nodes, dataMap);
    figma.closePlugin();
  });
  once("CLOSE", function() {
    figma.closePlugin();
  });
  showUI({
    height: 165,
    width: 240
  });
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
    init_set_text();
    init_get_text_nodes();
    init_data_map();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
