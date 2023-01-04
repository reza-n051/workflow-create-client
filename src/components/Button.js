import React from 'react';
import '../tailwind.output.css';

export function CircleButton({ title, handleClick }) {
    return (
        <button
            className="rounded-full border-red-600 hover:border-teal-400 w-16 h-16"
            onClick={handleClick}
        >{title}</button>
    )
}

export function RentButton({ title, handleClick }) {
    return (
        <button
            className="my-4 mx-auto w-32 h-16 border-2 border-red-600 hover:border-teal-400"
            onClick={handleClick}
        >{title}</button>
    )
}

export function TableButton({ title, handleClick }) {
    return (
        <button
            onClick={handleClick}
            className="w-8 h-8 rounded-full border-2 border-indigo-700 hover:border-pink-700 focus:outline-none"
        >{title}</button>
    )
}

export function SquareButton({ title, handleClick }) {
    return (
        <button
            className="my-4 mx-auto w-16 h-12 border-2 border-red-600 hover:border-teal-400"
            onClick={handleClick}
        >{title}</button>
    )
}
