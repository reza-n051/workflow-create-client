import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const Common = memo(({ data }) => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
            />
            <div><strong>{data.step.name}</strong></div>
            <Handle
                type="source"
                position="bottom"
                style={{ background: '#e03669' }}
            />
        </>
    );
});

export default Common;
