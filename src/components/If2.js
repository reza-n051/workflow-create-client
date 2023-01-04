
export default function If2({ condition, children }) {
    return (
        <>
            {
                condition ? children : <></>
            }
        </>
    )
}
