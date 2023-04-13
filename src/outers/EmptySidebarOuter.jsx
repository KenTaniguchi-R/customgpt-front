import { Grid } from "@mui/material"
import { Outlet } from "react-router-dom"
import { isMobile } from "react-device-detect"

import Sidebar from '../Sidebar'


const EmptySidebarOuter = () => {
  return (
    <Grid container alignItems="stretch" sx={{height:'100%'}}>
      <Grid item xs={0} md={3} lg={2} className='sidebar' display={{ xs: "none", md: 'block' }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default EmptySidebarOuter;