
import { Link } from "react-router-dom";
import NavItem from "../layouts/NavItem";

export default function Nav() {
    return (
        <ul className="flex flex-row border-gray-500 border-2 w-3/12 justify-around mx-auto ">
            <NavItem><Link to="/">home</Link></NavItem>
            <NavItem><Link to="/workflows">workflows</Link></NavItem>
            <NavItem><Link to="/create-workflow">new workflow</Link></NavItem>
        </ul>
    )
}