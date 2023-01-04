import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const YesNode = memo(() => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
            />
            <div><strong>yes</strong></div>
            <Handle
                type="source"
                position="bottom"
                style={{ background: '#555' }}
            />

        </>
    );
});
export default YesNode;