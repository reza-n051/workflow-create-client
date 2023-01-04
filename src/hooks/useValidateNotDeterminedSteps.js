
export default function useValidateNotDeterminedSteps() {
    return steps => {
        console.log(steps);
        for (const step of steps) {
            if ((step.type === 'common' || step.type === 'start') && (step.acceptTo === null || step.acceptTo === undefined)) {
                console.log(155);
                return false;
            } else if (step.type === 'conditional' && (step.acceptTo === null || step.rejectTo === null || step.acceptTo === undefined || step.rejectTo === undefined)) {
                return false;
            }
        }
        return true;
    }
}