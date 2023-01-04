import React from 'react';

export default function Aside(props){
    return(
        <aside 
            className="flex flex-col w-2/12 mt-8 box-content bg-gray-300 pl-2 border-l-2 border-purple-800 h-full overflow-auto">
            {props.children}
        </aside>
    );
}