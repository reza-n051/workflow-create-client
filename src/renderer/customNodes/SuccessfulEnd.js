import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const SuccessfulEndNode = memo(({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
            />
            <div><strong>{data.step.name}</strong></div>
        </>
    );
});

export default SuccessfulEndNode;
