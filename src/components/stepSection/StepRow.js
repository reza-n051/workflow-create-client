import If2 from '../If2';
export default function StepRow({
    step,
    deleteStep,
    editStep,
    isAdminWantToEditStep
}) {
    return (
        <tr>
            <td className="w-4/12 border-r-2 border-blue-400">{step.name}</td>
            <td className="w-4/12 border-r-2 border-blue-400">{step.timeLimitRule}</td>
            <td className="w-2/12 border-r-2 border-blue-400">
                <If2 condition={!isAdminWantToEditStep}>
                    <button
                        type="button"
                        className="border-green-200 w-5 h-5 hover:border-green-800 border-2"
                        onClick={() => editStep(step.id)}
                    >*</button>
                </If2>
            </td>
            <td className="w-2/12 border-r-2 border-blue-400">
                <button
                    type="button"
                    className="border-green-200 w-5 h-5 hover:border-green-800 border-2"
                    onClick={() => deleteStep(step.id)}
                >-</button>
            </td>
        </tr>
    )
}
