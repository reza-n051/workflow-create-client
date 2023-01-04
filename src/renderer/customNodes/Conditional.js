import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
const Conditional = memo(({ data }) => {
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
                style={{ background: '#555' }}
                isConnectable={false}
            />
        </>
    );
});

export default Conditional;
