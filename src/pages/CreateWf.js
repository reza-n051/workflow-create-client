import React from 'react';
import '../tailwind.output.css';
import Page from '../layouts/Page';
import WFEditor from '../components/WFEditor';
import useCreateWF from '../api/useCreateWF';

export default function CreateWorkflow() {

    const createWorkFlow = useCreateWF();

    return (
        <Page>
            <WFEditor isWantToBuild={true} operation={createWorkFlow} />
        </Page>
    )

}
