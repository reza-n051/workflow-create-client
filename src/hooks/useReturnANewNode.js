import { v4 as uuidv4 } from 'uuid';
export function useReturnAStartNode() {
    return (id, step) => {
        const element = {
            id: id,
            type: 'Start',
            data: {
                step: step
            },
            position: { x: 470, y: 30 },
            style: { border: '3px solid #80ffff',width: '10rem', height: '4rem' }
        };
        return element;
    }
}

export function useReturnASuccessfulNode() {

    return (id, step) => {
        const element = {
            id: id,
            type: 'SuccessfulEnd',
            data: { step: step },

            position: { x: 500 - Math.floor(Math.random() * 100), y: 500 - Math.floor(Math.random() * 100) },
            style: { border: '3px solid #33cc33', width: '10rem', height: '4rem' }
        };
        return element;

    }
}

export function useReturnANotSuccessfulNode() {
    return (id, step) => {
        const element = {
            id: id,
            type: 'NotSuccessfulEnd',
            data: {
                step: step
            },
            position: { x: 500 - Math.floor(Math.random() * 100), y: 500 - Math.floor(Math.random() * 100) },
            style: { border: '3px solid  #ff0066', width: '10rem', height: '4rem' }
        };
        return element;
    }
}

export function useReturnAYesNode() {
    return (id) => {
        const element = {
            id: `${id}-yes`,
            type: 'YesNode',
            data: { label: 'yes' },
            position: { x: 600 - Math.floor(Math.random() * 100), y: 600 - Math.floor(Math.random() * 100) },
            style: { border: '3px dashed pink', width: '3rem', height: '3rem', borderRadius: '1.5rem' }
        };
        return element;
    }
}
export function useReturnANoNode() {
    return (id) => {
        const element = {
            id: `${id}-no`,
            type: 'NoNode',
            data: { label: 'no' },
            position: { x: 400 - Math.floor(Math.random() * 100), y: 600 - Math.floor(Math.random() * 100) },
            style: { border: '3px dashed green', width: '3rem', height: '3rem', borderRadius: '1.5rem' }
        };
        return element;
    }
}

export function useReturnACommonNode() {
    return (id, step) => {
        const element = {
            id: id,
            type: 'Common',
            data: {
                step: step
            },
            position: { x: 500 - Math.floor(Math.random() * 100), y: 500 - Math.floor(Math.random() * 100) },
            style: { border: '3px solid brown', width: '10rem', height: '4rem' }
        };
        return element;
    }
}

export function useReturnAConditionalNode() {
    return (id, step) => {

        const element = {
            id: id,
            type: 'Conditional',
            data: {
                step: step
            },
            position: { x: 500 - Math.floor(Math.random() * 100), y: 500 - Math.floor(Math.random() * 100) },
            style: { border: '3px solid red', width: '10rem', height: '4rem' }
        };
        return element;
    }
}

export function useReturnAYesEdge() {
    return (source, target) => {
        const yesEdge = {
            id: uuidv4(),
            type: 'step',
            arrowHeadType: 'arrowclosed',
            source: source,
            target: target
        }
        return yesEdge;
    }
}


export function useReturnANoEdge() {
    return (source, target) => {
        const yesEdge = {
            id: uuidv4(),
            type: 'step',
            arrowHeadType: 'arrowclosed',
            source: source,
            target: target
        }
        return yesEdge;
    }
}