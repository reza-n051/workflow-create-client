import { SquareButton } from '../Button';
export default function AddAndCancelStep({ addStep, cancelStep }) {
    return (
        <div className="w-40 h-16 flex flex-row mx-auto justify-between">
            <SquareButton handleClick={addStep} title='add' />
            <SquareButton handleClick={cancelStep} title='cancel' />
        </div>
    );
}
