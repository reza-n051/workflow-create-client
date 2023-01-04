export default function StepTypeSelector({ option, setOption }) {
    function handleSelectChange(event) {
        setOption(event.target.value);
    }
    return (
        <div className="ml-4">
            <strong>please choose a option</strong>
            <select className="border-gray-900 border-2 w-32 my-8 ml-4" value={option} onChange={handleSelectChange}>
                <option value="start">start</option>
                <option value="common">common</option>
                <option value="conditional">conditional</option>
                <option value="successfulEnd">successful end</option>
                <option value="notSuccessfulEnd">unsuccessful end</option>
            </select>
        </div>

    );
}
