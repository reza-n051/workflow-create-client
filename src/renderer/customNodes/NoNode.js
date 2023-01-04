import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';


const NoNode = memo(() => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                style={{ background: '#555' }}
            />
            <div><strong>No</strong></div>
            <Handle
                type="source"
                position="bottom"
                style={{ background: '#555' }}
            />

        </>
    );
});
export default NoNode;