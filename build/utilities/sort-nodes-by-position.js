import { getAbsolutePosition } from '@create-figma-plugin/utilities';
export function sortNodesByPosition(nodes, axis) {
    var parent = nodes[0].parent;
    if (parent === null) {
        throw new Error('Node has no parent');
    }
    var orthogonalAxis = axis === 'x' ? 'y' : 'x';
    var result = nodes
        .slice()
        .sort(function (a, b) {
        var aAbsolutePosition = getAbsolutePosition(a);
        var bAbsolutePosition = getAbsolutePosition(b);
        if (aAbsolutePosition[axis] !== bAbsolutePosition[axis]) {
            return aAbsolutePosition[axis] - bAbsolutePosition[axis];
        }
        if (aAbsolutePosition[orthogonalAxis] !== bAbsolutePosition[orthogonalAxis]) {
            return (aAbsolutePosition[orthogonalAxis] - bAbsolutePosition[orthogonalAxis]);
        }
        return 0;
    });
    return result;
}
