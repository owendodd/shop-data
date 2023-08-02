var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { once, on, showUI, } from "@create-figma-plugin/utilities";
import { getSelectedProductNodes } from "./utilities/get-product-nodes";
import { setContent } from "./utilities/set-content";
export default function () {
    on("CREATE_POPULATE_DATA", function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, nodeCount, query, proxyUrl, apiUrl, response, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nodes = getSelectedProductNodes();
                        nodeCount = nodes.length;
                        query = "\n    query Search {\n      productSearchV2(query: \"".concat(value, "\" first: ").concat(nodeCount, ") {\n        nodes {\n          id\n          title\n          price {\n            amount\n          }\n          shop {\n            name\n          }\n          images {\n            url\n          }\n        }\n      }\n    }\n    ");
                        proxyUrl = "https://corsproxy.io/?";
                        apiUrl = "https://server.shop.app/graphql";
                        return [4 /*yield*/, fetch(proxyUrl + apiUrl, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    'X-Device-Id': 'graphiql-WEB',
                                },
                                body: JSON.stringify({ query: query }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent()).data;
                        nodes.forEach(function (node, index) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, setContent(node, data, index)];
                                    case 1:
                                        _a.sent();
                                        console.log(data);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    });
    once("CLOSE", function () {
        figma.closePlugin();
    });
    showUI({
        height: 190,
        width: 240,
    });
}
