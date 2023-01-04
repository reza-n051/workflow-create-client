import { useState } from "react"
import { useUpdateElsAfterConnect } from '../../hooks/useUpdataStepsAfterConnect';
import ReactFlow, { addEdge } from 'react-flow-renderer';
import nodeTypes from './nodeTypes';
import StepTable from "./StepTable";
import AddStepButton from "./AddStepButton";
import NodeBuilder from "./NodeBuilder";


export default function StepSection({
    elements, setElements,
    setElementsShouldDeletedStep,
    isWantToBuild
}) {
    const [number, setNumber] = useState(1);
    const [desiredStep, setDesiredStep] = useState();
    const [isCreate, setIsCreate] = useState(true);       // is admin want to create a new step or edit a step
    const [isFirst, setIsFirst] = useState(true);
    const [isEnd, setIsEnd] = useState(true);
    const updateDestinationEls = useUpdateElsAfterConnect();
    const [isAdminWantToEditStep, setIsAdminWantToEditStep] = useState(false);
    function editStep(id) {
        const element = elements.filter(el => `${id}` === el.id)[0];
        console.log(element);
        setDesiredStep(element.data.step);
        setIsAdminWantToEditStep(true);
        setIsCreate(false);
    }

    const onConnect = (params) => {
        let isParalel = false;

        setElements((els) => {
            const { source } = params;
            for (let i = 0; i < els.length; i++) {
                if (els[i].source === source) {
                    isParalel = true;
                }
            }
            if (isParalel) {
                return els;
            } else {
                let elas = updateDestinationEls(params, els);
                return addEdge({
                    ...params,
                    type: 'step',
                    arrowHeadType: 'arrowclosed',
                }, elas);
            }
        });
        if (isParalel) {
            return;
        }
    };
    const onNodeDragStop = (event, node) => {
        setElements(els =>
            els.map(el => {
                if (el.id !== node.id) return el;
                return {
                    ...el,
                    position: {
                        x: node.position.x,
                        y: node.position.y,
                    }
                }
            })
        );
    };


    return (
        <div className="flex flex-col w-full mx-auto h-auto">
            <div className="flex flex-col mt-4 border-gray-500 border-2">
                <StepTable
                    elements={elements}
                    setElements={setElements}
                    setIsFirst={setIsFirst}
                    setIsEnd={setIsEnd}
                    editStep={editStep}
                    isAdminWantToEditStep={isAdminWantToEditStep}
                    setElementsShouldDeletedStep={setElementsShouldDeletedStep}
                    isWantToBuild={isWantToBuild}

                />
                {
                    isAdminWantToEditStep ?
                        <NodeBuilder
                            isFirst={isFirst}
                            isEnd={isEnd}
                            setIsFirst={setIsFirst}
                            setIsEnd={setIsEnd}
                            setIsAdminWantToEditStep={setIsAdminWantToEditStep}
                            setElements={setElements}
                            desiredStep={desiredStep}
                            isCreate={isCreate}
                            setIsCreate={setIsCreate}
                            number={number}
                            setNumber={setNumber}
                        />
                        :
                        <AddStepButton setIsAdminWantToEditStep={setIsAdminWantToEditStep} />

                }
            </div>

            <div className="flex flex-col border-teal-400 border-2 w-full mx-auto h-50rem">
                <ReactFlow
                    elements={elements}
                    nodeTypes={nodeTypes}
                    onConnect={onConnect}
                    paneMoveable={false}
                    onNodeDragStop={onNodeDragStop}
                    minZoom="1"
                    maxZoom="1"
                />
            </div>
        </div>
    )
}
