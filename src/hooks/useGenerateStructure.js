export default function useGenerateStructure() {
    return (steps) => {
        let elements = [];
        steps.map(step => {
            switch (step.type) {

                case 'start':
                    elements.push({
                        id: `${step.id}`,
                        data: {
                            step: {
                                id: `${step.id}`,
                                name:step.name,
                                acceptTo:`${step.acceptTo}`,
                                isSaved: true,
                                shouldUp: false,
                                type:'start'
                            }
                        },
                        position: {
                            x: step.position.x,
                            y: step.position.y
                        },
                        style: {
                            border: "3px solid #80ffff",
                            height: "4rem",
                            width: "10rem"
                        },
                        type: "Start"
                    });
                    break;

                case 'common':
                    elements.push({
                        id: `${step.id}`,
                        data: {
                            step: {
                                id: `${step.id}`,
                                name:step.name,
                                acceptTo:`${step.acceptTo}`,
                                isSaved: true,
                                shouldUp: false,
                                type:'common'
                            }
                        },
                        position: {
                            x: step.position.x,
                            y: step.position.y
                        },
                        style: {
                            border: "3px solid brown",
                            height: "4rem",
                            width: "10rem"
                        },
                        type: "Common"
                    });
                    break;

                case 'conditional':
                    elements = [
                        ...elements,
                        {
                            id: `${step.id}`,

                            data: {
                                step: {
                                    id: `${step.id}`,
                                    name:step.name,
                                    acceptTo:`${step.acceptTo}`,
                                    rejectTo:`${step.rejectTo}`,
                                    isSaved: true,
                                    shouldUp: false,
                                    type:'conditional'
                                }
                            },
                            position: {
                                x: step.position.x,
                                y: step.position.y
                            },
                            style: {
                                border: "3px solid red",
                                height: "4rem",
                                width: "10rem"
                            },
                            type: "Conditional"
                        },
                        {
                            id: `${step.id}-yes`,
                            data: { label: 'yes' },
                            position: {
                                x: step.position.xYes,
                                y: step.position.yYes
                            },
                            style: {
                                border: "3px dashed green",
                                borderRadius: "1.5rem",
                                height: "3rem",
                                width: "3rem"
                            },
                            type: "YesNode"
                        },
                        {
                            id: `${step.id}-no`,
                            data: { label: 'no' },
                            position: {
                                x: step.position.xNo,
                                y: step.position.yNo
                            },
                            style: {
                                border: "3px dashed red",
                                borderRadius: "1.5rem",
                                height: "3rem",
                                width: "3rem"
                            },
                            type: "NoNode"
                        },
                        {
                            id: `${step.id}-${step.id}-no`,
                            source: `${step.id}`,
                            target: `${step.id}-no`,
                            arrowHeadType: 'arrowclosed',

                            type: 'step'
                        },
                        {
                            id: `${step.id}-${step.id}-yes`,
                            source: `${step.id}`,
                            target: `${step.id}-yes`,
                            arrowHeadType: 'arrowclosed',
                            type: 'step'
                        }
                    ]
                    break;

                case 'successfulEnd':
                    elements.push({
                        id: `${step.id}`,
                        data: {
                            step: {
                                name: step.name,
                                isSaved: true,
                                shouldUp: false,
                                id: `${step.id}`,
                                type: 'successfulEnd'
                            }
                        },
                        position: {
                            x: step.position.x,
                            y: step.position.y
                        },
                        style: {
                            border: "3px solid #33cc33",
                            height: "4rem",
                            width: "10rem"
                        },
                        type: "SuccessfulEnd"
                    });
                    break;

                case 'notSuccessfulEnd':
                    elements.push({
                        id: `${step.id}`,
                        data: {
                            step: {
                                name: step.name,
                                isSaved: true,
                                shouldUp: false,
                                id: `${step.id}`,
                                type: 'notSuccessfulEnd'
                            }
                        },
                        position: {
                            x: step.position.x,
                            y: step.position.y
                        },
                        style: {
                            border: "3px solid #ff0066",
                            height: "4rem",
                            width: "10rem"
                        },
                        type: "NotSuccessfulEnd"
                    });
                    break;

                default:
                    break;
            }
            return step;
        });
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].type === 'start' || steps[i].type === 'common') {
                elements.push(
                    {
                        id: `${steps[i].id}-${steps[i].acceptTo}`,
                        source: `${steps[i].id}`,
                        type: 'step',
                        arrowHeadType: 'arrowclosed',
                        target: `${steps[i].acceptTo}`
                    }
                );

            } else if (steps[i].type === 'conditional') {
                elements = [
                    ...elements,
                    {
                        id: `${steps[i].id}-${steps[i].acceptTo}`,
                        source: `${steps[i].id}-yes`,
                        type: 'step',
                        arrowHeadType: 'arrowclosed',
                        target: `${steps[i].acceptTo}`
                    },
                    {
                        id: `${steps[i].id}-${steps[i].rejectTo}`,
                        source: `${steps[i].id}-no`,
                        type: 'step',
                        arrowHeadType: 'arrowclosed',
                        target: `${steps[i].rejectTo}`
                    }
                ];

            }
        }
        console.log('elements');

        console.log(elements);
        return elements;
    }
}