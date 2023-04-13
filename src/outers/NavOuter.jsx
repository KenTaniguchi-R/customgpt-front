import { Outlet } from "react-router-dom";

import Navbar from '../Navbar'

function NavOuter() {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default NavOuter;