import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';

const Start = memo(({ data }) => {
    return (
        <>

            <div><strong>{data.step.name}</strong></div>
            <Handle
                type="source"
                position="bottom"
                style={{ background: '#555' }}
            />
        </>
    );
});

export default Start;
