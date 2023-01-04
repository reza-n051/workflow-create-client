export default function WFTypeSelector({
    wFType, setWFType
}) {
    return (
        <div className="ml-0 border-l-4 border-red-700 w-auto h-auto text-left flex flex-row">
            <p className="mt-8">please specify your workflow type : If the workflow is dynamic, you can change it when running the workflow</p>
            <select className="border-gray-900 border-2 w-32 my-8 ml-4" value={wFType} onChange={e => setWFType(e.target.value)}>
                <option value="static">static</option>
                <option value="dynamic">dynamic</option>
            </select>
        </div>
    )
}