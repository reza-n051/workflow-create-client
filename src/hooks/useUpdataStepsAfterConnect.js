export function useUpdateStepsAfterConnect() {
    return ({ source, target }, steps) =>

        steps.map(step => {
            if ((step.type === 'common' || step.type === 'start') && step.id === source) {
                return {
                    ...step,
                    shouldUp: true,
                    acceptTo: target
                }
            }

            if (step.type === 'conditional' && (source === `${step.id}-yes` || source === `${step.id}-no`)) {
                if (source === `${step.id}-yes`) {
                    return {
                        ...step,
                        shouldUp: true,
                        acceptTo: target
                    }
                } else {
                    return {
                        ...step,
                        shouldUp: true,
                        rejectTo: target
                    }
                }
            }
            return step;
        });

}
export function useUpdateElsAfterConnect() {
    return ({ source, target }, els) => {
        const elements =  els.map(element => {
            if ((element.type === 'Common' || element.type === 'Start') && element.id === source) {
                return {
                    ...element,
                    data: {
                        step: {
                            ...element.data.step,
                            shouldUp: true,
                            acceptTo: target
                        }
                    }
                }
            }

            if (element.type === 'Conditional' && (source === `${element.id}-yes` || source === `${element.id}-no`)) {
                if (source === `${element.id}-yes`) {
                    return {
                        ...element,
                        data: {
                            step: {
                                shouldUp: true,
                                ...element.data.step,
                                acceptTo: target
                            }
                        }
                    }
                } else {
                    return {
                        ...element,
                        data: {
                            step: {
                                ...element.data.step,
                                shouldUp: true,
                                rejectTo: target
                            }
                        }
                    }
                }
            }
            return element;
        });
        console.log(elements);

        return elements
    
    }


}