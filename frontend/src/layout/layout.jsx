import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

export default function SomeParent() {
  return (
    <section className="flex flex-col">
    <Navbar />
      <Outlet />
    </section>
  );
}
