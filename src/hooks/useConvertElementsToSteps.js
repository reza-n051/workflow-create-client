export function useConvertElementsToStepsCompelete() {
    return elements => {
        let steps = [];
        const noYesMap = new Map();

        for (const el of elements) {
            if (el.type === 'NoNode' || el.type === 'YesNode') {
                noYesMap.set(el.id, el.position);
            }
        }

        for (const el of elements) {
            if (
                el.type === 'Start' ||
                el.type === 'Common' ||
                el.type === 'SuccessfulEnd' ||
                el.type === 'NotSuccessfulEnd'
            ) {
                steps.push({
                    ...el.data.step,
                    position: {
                        x: el.position.x,
                        y: el.position.y,
                    }
                });
            } else if (el.type === 'Conditional') {
                const noP = noYesMap.get(`${el.id}-no`);
                const yesP = noYesMap.get(`${el.id}-yes`);
                steps.push({
                    ...el.data.step,
                    position: {
                        x: el.position.x,
                        y: el.position.y,
                        xNo: noP.x,
                        yNo: noP.y,
                        xYes: yesP.x,
                        yYes: yesP.y,
                    }
                });
            }
        }
        return steps;
    };

}

export function useSortSteps() {
    return steps => {
        let mapp = new Map();

        for (const [index, step] of steps.entries()) {
            mapp.set(step.id, index);
        }

        
        // for (const [index, step] of steps) {
        //     mapp.set(step.id, index);
        // }

        let newSteps = steps.map((step) => {
            if (step.type === 'common' || step.type === 'start') {
                return {
                    ...step,
                    id: mapp.get(step.id),
                    acceptTo: mapp.get(step.acceptTo),
                }
            } else if (step.type === 'conditional') {
                return {
                    ...step,
                    id: mapp.get(step.id),
                    acceptTo: mapp.get(step.acceptTo),
                    rejectTo: mapp.get(step.rejectTo)
                }
            } else {
                return {
                    ...step,
                    id: mapp.get(step.id),
                }
            }
        });
        return newSteps;
    };
}