import React from 'react';
import Body from '../layouts/Body';
import WFEditor from '../components/WFEditor';
import { useParams } from 'react-router-dom';

import useEditWF from '../api/useEditWF';
import useGet from '../api/useGet';

export default function EditWorkflow() {
    const { id } = useParams();
    const [{ data, isLoading, isError }] = useGet(id);
    const updateWF = useEditWF();

    return (
        // <WFEditor isWantToBuild={false} operation={updateWF} workflow={wf} />
        <Body>
            {(isError || isError === undefined) && <p>something is wrong ...</p>}
            {
                (isLoading || isLoading === undefined || isLoading === null)
                    ?
                    (<p>loading</p>)
                    :
                    (<WFEditor isWantToBuild={false} operation={updateWF} workflow={data} isLoading={isLoading} />)
            }
        </Body>
    );
} 