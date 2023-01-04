export default function useValidateNames() {
    return (workflow) => {

        const name = workflow.name;
        if (name === '') {
            return false;
        }
        const steps = workflow.steps;
        for (const step of steps) {
            if (step.name === '') {
                return false;
            }
        }
        return true;
    }
}