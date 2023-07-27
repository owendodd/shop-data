import { traverseNode } from '@create-figma-plugin/utilities'

import { sortNodesByPosition } from './sort-nodes-by-position'

export function getSelectedTextNodes(): Array<SceneNode> {
  const result: Array<SceneNode> = []
  const nodes = figma.currentPage.selection.slice()
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type === 'TEXT' && node.characters.trim().length > 0) {
        result.push(node)
      }
    })
  }
  if (result.length === 0) {
    return []
  }
  return sortNodesByPosition(result, 'y')
}