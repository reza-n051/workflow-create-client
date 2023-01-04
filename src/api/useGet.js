import { useEffect, useReducer } from 'react';
import API from './api';
import apiStatusReducer from './statusReducer';

export default function useGetApi(id) {
    const [status, dispatch] = useReducer(apiStatusReducer, { data: {} });
    useEffect(() => {
        let unMounted = false;
        const fetch = async () => {
            try {
                dispatch({ type: "INIT" });
                const workflowResult = await API.post(`/api/Workflows/GetById`, { id: parseInt(id), userId: 0 });

                const stepResult = await API.get(`/api/Step/GetByWorkflowId/` + id);
                let steps = stepResult.data;
                steps = steps.map((e) => {
                    var pos = e.locations.split("-");
                    return {
                        acceptTo: e.acceptStepId,
                        rejectTo: e.rejectStepId,
                        id: e.stepId,
                        isSaved: false,
                        name: e.name,
                        position:
                        {
                            x: parseInt(pos[0].split(",")[0]), y: parseInt(pos[0].split(",")[1]),
                            xYes: pos.length > 1 ? parseInt(pos[1].split(",")[0]) : null, yYes: pos.length > 1 ? parseInt(pos[1].split(",")[1]) : null,
                            xNo: pos.length > 1 ? parseInt(pos[2].split(",")[0]) : null, yNo: pos.length > 1 ? parseInt(pos[2].split(",")[1]) : null,
                        },
                        timeLimitRule: "",
                        type: e.stepType === 1 ? 'start' : e.stepType === 3 ? 'successfulEnd' :
                            e.stepType === 4 ? 'notSuccessfulEnd' : e.stepType === 2 && pos.length === 1 ? 'common'
                                : 'conditional',
                    }
                });
                const ruleResult = await API.get(`api/Rule/GetAll/` + id);
                let wflow = {
                    id: id,
                    name: workflowResult.data.name,
                    steps: steps
                };
                ruleResult.data.forEach(element => {
                    if(element.entityType == 1) {
                        if(element.type == 1) wflow.timeLimitRule = element.condition;
                    } else {
                        wflow.steps.find((s) => s.id == element.referenceId).timeLimitRule = element.condition;
                    }
                });

                if (!unMounted) {
                    dispatch({ type: "SUCCESSFUL", data: wflow });
                }
            } catch (err) {
                if (!unMounted) {
                    dispatch({ type: "FAIL" });
                }
            }
        }
        fetch();

        return () => {
            unMounted = true;
        };
    }, [id]);
    return [status];
}
