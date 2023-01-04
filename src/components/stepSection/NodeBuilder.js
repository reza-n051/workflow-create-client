import { useState } from "react";
import {
    useReturnACommonNode,
    useReturnAConditionalNode,
    useReturnANoEdge,
    useReturnANoNode,
    useReturnANotSuccessfulNode,
    useReturnAStartNode,
    useReturnASuccessfulNode,
    useReturnAYesEdge,
    useReturnAYesNode
} from "../../hooks/useReturnANewNode";
import If2 from "../If2";
import AddAndCancelStep from "./AddCnacelStep";
import StepBuilder from "./StepBuilder";
import StepTypeSelector from "./StepTypeSelector";
import { v4 as uuidv4 } from 'uuid';

export default function NodeBuilder(props) {
    const {
        setIsAdminWantToEditStep,
        setElements,
        isFirst,
        isEnd,
        setIsFirst,
        setIsEnd,
        setIsCreate,
        isCreate,
        desiredStep,
    } = props;
    const [name, setName] = useState(isCreate ? '' : desiredStep.name);
    const [option, setOption] = useState(isCreate ? 'common' : desiredStep.type);
    const [timeLimit, setTimeLimit] = useState(isCreate ? '' : desiredStep.timeLimitRule);

    const createStartNode = useReturnAStartNode();
    const createCommonNoed = useReturnACommonNode();
    const createConditionalNode = useReturnAConditionalNode();
    const createYesEdge = useReturnAYesEdge();
    const createNoEdge = useReturnANoEdge();
    const createYesNode = useReturnAYesNode();
    const createNoNode = useReturnANoNode();
    const createEndSuccesNode = useReturnASuccessfulNode();
    const createEndNotSuccesNode = useReturnANotSuccessfulNode();


    function updateStep() {
        setElements(elements => elements.map(element => {
            if (element.id === `${desiredStep.id}`) {
                return {
                    ...element,
                    data: {
                        step: {
                            ...desiredStep,
                            shouldUp: true,
                            isSaved: desiredStep.isSaved,
                            id: desiredStep.id,
                            name: name,
                            timeLimitRule: timeLimit,
                            type: option
                        }
                    }
                }
            }
            return element;
        }));

    }

    function createStep() {
        if (option === 'start' && !isFirst) {
            alert('You have already made the start step');
            return;
        }
        if (option === 'successfulEnd' && !isEnd) {
            alert('You have already made the end step');
            return;
        }
        const id = uuidv4();

        let newElements = [];

        let newStep = {
            shouldUp: false,
            isSaved: false,
            id: id,
            name: name,
            type: option,
            timeLimitRule: timeLimit,
        }

        let element, noNode, yesNode, yesEdge, noEdge;
        switch (option) {
            case 'start':
                element = createStartNode(id, newStep);
                newElements = [element];
                setIsFirst(false);
                break;
            case 'common':
                element = createCommonNoed(id, newStep);
                newElements = [element];
                break;
            case 'conditional':
                element = createConditionalNode(id, newStep);
                noNode = createNoNode(id);
                yesNode = createYesNode(id);
                yesEdge = createYesEdge(id, yesNode.id);
                noEdge = createNoEdge(id, noNode.id);
                newElements = [element, noNode, yesNode, yesEdge, noEdge];
                break;

            case 'successfulEnd':

                element = createEndSuccesNode(id, newStep);
                newElements = [element];
                setIsEnd(false);

                break;
            case 'notSuccessfulEnd':

                element = createEndNotSuccesNode(id, newStep);
                newElements = [element];
                break;
            default:
                break;
        }
        setElements(els => els.concat(newElements));
    }
    function addStep() {

        if (!isCreate) {
            updateStep();
        } else {
            createStep();
        }
        setIsCreate(true);
        setIsAdminWantToEditStep(false);
    }

    function cancelStep() {
        setIsCreate(true);
        setIsAdminWantToEditStep(false);
    }

    return (
        <div className=" w-11/12 h-auto flex flex-col mx-auto">
            <If2 condition={isCreate}>
                <StepTypeSelector option={option} setOption={setOption} />
            </If2>

            <StepBuilder option={option} name={name} timeLimit={timeLimit} setName={setName} setTimeLimit={setTimeLimit} />
            <AddAndCancelStep addStep={addStep} cancelStep={cancelStep} />

        </div>
    )
}


