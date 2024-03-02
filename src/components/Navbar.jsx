import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="flex bg-slate-200 h-16 justify-around items-center">
        <NavLink to="/" className="font-bold text-xl">
          ProMage
        </NavLink>
        <div className="space-x-4">
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </div>
  );
}
