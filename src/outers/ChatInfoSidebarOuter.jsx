import { Outlet } from "react-router-dom"
import { Grid } from "@mui/material"

import Sidebar from '../Sidebar'


const ChatInfoSidebarOuter = () => {
  return (
    <Grid container sx={{height:'100%'}}>
      <Grid item xs={0} md={3} lg={2} className='sidebar'
        display={{ xs: "none", md: 'block' }}
      >
        <Sidebar has_chat_info={true} />
      </Grid>
      <Grid item xs={12} md={9} lg={10}>
        <Outlet />
      </Grid>
    </Grid>

    // <main className="main-container">
    //   <Sidebar has_chat_info={true} />
    //   <Outlet />
    // </main>
  )
}

export default ChatInfoSidebarOuter;