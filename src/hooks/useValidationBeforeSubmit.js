import useValidateNames from "./useValidateNames"
import useValidateNotDeterminedSteps from "./useValidateNotDeterminedSteps";

export default function useValidationBeforeSubmit() {
    const validateNames = useValidateNames();
    const validateNotDeteminedSteps = useValidateNotDeterminedSteps();
    return (workflow) => {

        if (!validateNames(workflow)) {
            return {
                isOk: false,
                message: 'لطفا برای گردش کار یا گام ها یک نام قرار دهید'
            }
        } else if (!validateNotDeteminedSteps(workflow.steps)) {
            return {
                isOk: false,
                message: 'لطفا توجه کنید که گام ها به یکدیگر متصل شده باشند'
            }
        }
        return {
            isOk: true
        }

    }
}