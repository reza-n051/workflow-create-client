import If2 from "../If2";
import NumberInput from "../inputs/NumberInput";
import TextInput from "../inputs/TextInput";

export default function StepBuilder({ option, name, timeLimit, setName, setTimeLimit }) {
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleTimeLimitChange = (e) => {
        setTimeLimit(e.target.value);
    }
    return (
        <>
            <TextInput
                className="flex flex-col border-red-700 border-l-4 w-64 h-16 ml-1 mt-4 mb-4"
                handleChange={handleNameChange} id="step-name" value={name} name="step name"
            />
            <If2 condition={option === 'common' || option === 'conditional'}>

                <NumberInput className="flex flex-col border-red-700 border-l-4 w-auto h-16 ml-1"
                    handleChange={handleTimeLimitChange} id="step-tl" value={timeLimit} type="number"
                    name="Step time limit rule: If the step is not approved after a few days, the next step will be executed"
                />
            </If2 >
        </>
    );
}

