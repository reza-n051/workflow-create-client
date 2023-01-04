import { useEffect, useReducer, useState } from 'react';
import API from './api';
import apiStatusReducer from './statusReducer';

export default function useGetListApi() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [status, dispatch] = useReducer(apiStatusReducer, { data: {} });
    useEffect(() => {
        let unMounted = false;
        const fetch = async () => {
            try {
                dispatch({ type: 'INIT' });
                const result = await API.get('/api/Workflows/GetAll/0');
                let workflows = result.data;
                workflows = workflows.map(wf => ({ id: wf.workflowId, name: wf.name }));

                if (!unMounted) {
                    dispatch({ type: 'SUCCESSFUL', data: workflows });
                }
            } catch (err) {
                if (!unMounted) {
                    dispatch({ type: 'FAIL' });
                }
            }
        }
        fetch();
        return () => {
            unMounted = true;
        };
    }, [isDeleted]);

    return [status, setIsDeleted];
}