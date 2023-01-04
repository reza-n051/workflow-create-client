import { useConvertElementsToStepsCompelete } from "../../hooks/useConvertElementsToSteps";
import StepRow from "./StepRow";
import useUpdateElementsAfterRemoveANode from '../../hooks/useUpdataElementsAfterRemoveANode'

export default function StepTable({
    editStep, elements,
    setElements, setIsFirst,
    setIsEnd, isAdminWantToEditStep,
    setElementsShouldDeletedStep,
    isCreate, isWantToBuild
}) {
    const removeElements = useUpdateElementsAfterRemoveANode();
    const getSteps = useConvertElementsToStepsCompelete();
    const stepss = getSteps(elements);
    
    function deleteStep(id) {
        
        const element = elements.filter(el => el.id === `${id}`)[0];
        if (element.type === "Start") {
            setIsFirst(true);
        }
        if (element.type === "SuccessfulEnd") {
            setIsEnd(true);
        }

        const newEls = removeElements(`${id}`, elements);
        if (!isWantToBuild && element.data.step.isSaved === true) {
            setElementsShouldDeletedStep(steps => steps.concat(id));
        }
        setElements(newEls);
    }

    return (
        <table className="border-2 border-teal-400 mb-4 w-full">
            <thead>
                <tr className="border-b-2 border-red-500">
                    <th className="w-4/12 border-r-2 border-blue-400">name</th>
                    <th className="w-4/12 border-r-2 border-blue-400">time expire</th>
                    <th className="w-2/12 border-r-2 border-blue-400">edit</th>
                    <th className="w-2/12 border-r-2 border-blue-400">delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    stepss.map(step => <StepRow
                        step={step}
                        key={step.id}
                        deleteStep={deleteStep}
                        editStep={editStep}
                        isAdminWantToEditStep={isAdminWantToEditStep}
                    />)
                }
            </tbody>
        </table>
    )
}
