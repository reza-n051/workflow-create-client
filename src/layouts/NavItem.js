

export default function NavItem({ children }) {
    return (
        <div className="text-teal-900 hover:bg-gray-200 rounded-2xl my-2 w-1/3 h-full">
            {children}
        </div>
    );
}