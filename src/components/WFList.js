import React from 'react';
import { Link } from 'react-router-dom';
export default function WFList({ workflows, deleteWF }) {
    
    return (
        <table className="border-2 border-black">
            <thead>
                <tr className="border-orange-400 border-b-2 mb-4">
                    <th className="border-r-2 border-yellow-600" >name</th>
                    <th>edit</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    workflows.map(workflow => <WFItem workflow={workflow} key={workflow.id} deleteWF={deleteWF} />)
                }
            </tbody>
        </table>
    );
}

function WFItem({ workflow, deleteWF }) {
    return (
        <tr className="border-b-4 border-purple-300">
            <td className="border-r-2 border-yellow-600">{workflow.name}</td>
            <td>
                <Link to={`/edit-wf/${workflow.id}`}>
                    <button className="w-8 h-8 rounded-full border-2 border-indigo-700 hover:border-pink-700 focus:outline-none">*</button>
                </Link>
            </td>
            <td>
                <button className="w-8 h-8 rounded-full border-2 border-indigo-700 hover:border-pink-700 focus:outline-none"
                    onClick={() => deleteWF(workflow.id)}
                >-</button>
            </td>
        </tr>
    );
}