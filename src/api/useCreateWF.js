import API from './api';
export default function useCreateWF() {
    return async (workflow) => {
        let isOk = true;
        let steps = workflow.workflow.steps;
        const res = await API.post('api/Workflows', { name: workflow.workflow.name, creatorId: 0, description: 'desc' });
        let id = res.data.workflowId;
        let steps1 = steps.map((e) => {
            return {
                name: e.name,
                stepType: getStepType(e.type),
                acceptStepId: e.acceptTo,
                rejectStepId: e.rejectTo === undefined ? null : e.rejectTo,
                locations: makePosition(e.position),
            };
        });

        if (steps1.length !== 0) {
            var stepRes = await API.post('api/Step/Add/' + id, steps1);
            if (stepRes.status === 200) {
                await API.post('api/Step/UpdateAfterCreate', stepRes.data);
            }
        }

        if (workflow.timeLimitRule !== '') {
            let ruleRes = await API.post('api/Rule/Add', {
                name: 'timeLimit',
                condition: workflow.workflow.timeLimitRule,
                type: 1,
                entityType: 1,
                referenceId: id,
            });
        }
        // if(workflow.timeLimitRule !== '') {
        //     let ruleRes = await API.post('api/Rule/Add', {
        //         name: 'wf type',
        //         condition: workflow.workflow.wFTypeRule,
        //         type:1,
        //         entityType:1,
        //         referenceId: id,
        //     });
        // }
        for (let i = 0; i < steps.length; i++) {
            console.log('steps', steps);
            if (steps[i].timeLimitRule !== '') {
                var ruleRes = await API.post('api/Rule/Add', {
                    name: 'timeLimit',
                    condition: steps[i].timeLimitRule,
                    type: 1,
                    entityType: 2,
                    referenceId: stepRes.data[i].stepId,
                });
            }
        }

        return {
            isOk: true,
            messege: 'گردش کار با موفقیت ساخته شد!'
        }
    };

    function getStepType(stepType) {
        return stepType === "start" ? 1 :
            stepType === "common" || stepType === "conditional" ? 2 :
                stepType === "successfulEnd" ? 3 : 4;
    }

    function makePosition(position) {
        var pos = '';
        pos += position.x + ',' + position.y;
        if (position.xYes != null) {
            pos += '-' + position.xYes + ',' + position.yYes;
            pos += '-' + position.xNo + ',' + position.yNo;
        }
        return pos;
    }

}
