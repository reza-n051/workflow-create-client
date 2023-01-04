export default function WFLayout({ children }) {
    return (
        <div className="w-full h-auto box-content flex flex-row">
            {
                children
            }
        </div>
    )
}