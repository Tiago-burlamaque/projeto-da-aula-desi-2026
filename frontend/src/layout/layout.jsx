import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

export default function SomeParent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">


      <Navbar />
      <Outlet />
      </div >
  );
}
