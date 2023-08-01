import { traverseNode } from '@create-figma-plugin/utilities';
import { sortNodesByPosition } from './sort-nodes-by-position';
export function getSelectedTextNodes() {
    var result = [];
    var nodes = figma.currentPage.selection.slice();
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        traverseNode(node, function (node) {
            if (node.type === 'TEXT' && node.characters.trim().length > 0) {
                result.push(node);
            }
        });
    }
    if (result.length === 0) {
        return [];
    }
    return sortNodesByPosition(result, 'y');
}
