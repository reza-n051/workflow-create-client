export default function AddStepButton({ setIsAdminWantToEditStep }) {
    return (
        <button onClick={() => setIsAdminWantToEditStep(true)}
            className="border-indigo-400 hover:border-pink-500 border-2 w-24 h-12 mx-auto"
        >add step</button>
    );

}
