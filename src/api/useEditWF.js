import API from './api';
export default function useEditWF() {
    return async (workflow) => {
        const workflowId = workflow.workflow.id;
        // update wf
        const wfUpdateRes = await API.put(`api/Workflows/Update/` + workflowId, { name: workflow.workflow.name });
        const stepsDeleteAllRes = await API.post(`api/Step/DeleteMulti/` + workflowId);
        let steps1 = workflow.workflow.steps.map((e) => {
            return {
                name: e.name,
                stepType: getStepType(e.type),
                acceptStepId: e.acceptTo,
                rejectStepId: e.rejectTo === undefined ? null : e.rejectTo,
                locations: makePosition(e.position),
            };
        });

        // create step
        if (steps1.length !== 0) {
            var stepRes = await API.post('api/Step/Add/' + workflowId, steps1);
            if(stepRes.status === 200) {
                await API.post('api/Step/UpdateAfterCreate', stepRes.data);
            }
        }
        return {
            isOk: true,
            messege: 'گردش کار با موفقیت ویرایش شد!'
        }
    };
}

function getStepType(stepType) {
    return stepType === "start" ? 1 :
        stepType === "common" || stepType === "conditional" ? 2 :
            stepType === "successfulEnd" ? 3 : 4;
}

function makePosition(position) {
    var pos = '';
    pos +=  position.x + ',' + position.y ;
    if (position.xYes != null) {
        pos += '-' + position.xYes + ',' + position.yYes;
        pos += '-' + position.xNo + ',' + position.yNo ;
    }
    return pos;
}