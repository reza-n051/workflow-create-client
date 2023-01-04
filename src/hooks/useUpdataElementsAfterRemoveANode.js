import { isNode } from 'react-flow-renderer';
export default function updateElementsAfterRemoveANode() {
    return (id, els) => {
        let yesNodeId = `${id}-yes`;
        let NoNodeId = `${id}-no`;
        let newElements = els.filter(
            el => {
                if (isNode(el)) {
                    return el.id !== id && el.id !== yesNodeId && el.id !== NoNodeId;
                } else {
                    return el.target !== id && el.source !== id && el.source !== yesNodeId && el.source !== NoNodeId;
                }
            }
        );
        return newElements;
    }
}