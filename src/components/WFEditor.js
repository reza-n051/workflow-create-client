import React, { useState } from "react";
import SubmitFormInput from './inputs/SubmitFormInput';
import Body from '../layouts/Body';
import TextInput from './inputs/TextInput';
import WFLayout from "../layouts/WFLauout";
import NumberInput from "./inputs/NumberInput";
import StepSection from "./stepSection/StepSection";
import useGenerateStructure from "../hooks/useGenerateStructure";
import { useHistory } from 'react-router-dom';
import useValidationBeforeSubmit from "../hooks/useValidationBeforeSubmit";
import { useConvertElementsToStepsCompelete, useSortSteps } from "../hooks/useConvertElementsToSteps";
import WFTypeSelector from "./inputs/WFTypeSelector";

export default function WFEditor({ isWantToBuild, operation, workflow }) {
    const [name, setName] = useState(isWantToBuild ? '' : workflow.name);
    const [timeLimit, setTimeLimit] = useState(isWantToBuild ? '' : workflow.timeLimitRule ? workflow.timeLimitRule : '');
    const generateStructure = useGenerateStructure();
    const [elements, setElements] = useState(isWantToBuild ? [] : () => generateStructure(workflow.steps));
    const [shouldDeletedStep, setElementsShouldDeletedStep] = useState([]);
    const [wFType, setWFType] = useState(isWantToBuild ? '' : workflow.typeRule ? workflow.typeRule : 'static');
    const validate = useValidationBeforeSubmit();
    const history = useHistory();
    const generateSteps = useConvertElementsToStepsCompelete();
    const sortSteps = useSortSteps();


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleTimeLimitChange(e) {
        setTimeLimit(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let stepss = generateSteps(elements);
        stepss = sortSteps(stepss);
        let newWorkFlow = {
            id: isWantToBuild ? null : workflow.id,
            name: name,
            steps: stepss,
            timeLimitRule: timeLimit,
            typeRule: wFType
        };
        const result = validate(newWorkFlow);
        if (!result.isOk) {
            window.alert(result.message);
            return;
        }
        let res = {};
        if (isWantToBuild) {
            res = await operation({ workflow: newWorkFlow });

        } else {
            res = await operation(
                {
                    workflow: newWorkFlow,
                    deletedSteps: shouldDeletedStep
                }
            );
        }
        if (!res.isOk) {
            window.alert(res.messege);
        } else {
            window.alert(res.messege);
            history.push('/');
        }
    }

    return (
        <WFLayout>
            <Body>
                <form onSubmit={handleSubmit} className="flex flex-col w-11/12 mx-auto">

                    <TextInput className="flex flex-col border-red-700 border-l-4 w-64 h-16 my-6"
                        handleChange={handleNameChange} id="wf-name" value={name} name="work flow name"
                    />

                    <NumberInput className="flex flex-col border-red-700 border-l-4 w-auto h-16 my-6"
                        handleChange={handleTimeLimitChange} id="wf-timelimit" value={timeLimit}
                        name="Workflow time limit rule : Please fill in this entry if you want the workflow to reject after a few days : "
                    />
                    <WFTypeSelector
                        wFType={wFType}
                        setWFType={setWFType}
                    />

                    <StepSection
                        elements={elements}
                        setElements={setElements}
                        shouldDeletedStep={shouldDeletedStep}
                        setElementsShouldDeletedStep={setElementsShouldDeletedStep}
                        isWantToBuild={isWantToBuild}
                    />

                    <SubmitFormInput />
                </form>
            </Body>

        </WFLayout>
    );
}
