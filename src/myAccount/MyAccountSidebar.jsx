import { Link, useParams } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LockIcon from '@mui/icons-material/Lock';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const MyAccountSidebar = () => {

  const links = [
    {name: 'パスワードを変更', path: '/my-account/change-password', icon: <LockIcon />},
    {name: 'プランの変更', path: '/my-account/change-plan', icon: <LocalOfferIcon />},
    {name: 'Rooms', path: '/my-account/rooms', icon: <LockIcon />},
  ]

  return (
      <aside>
        <List sx={{ width: '100%', overflow: 'auto', maxHeight: 400,}}>
          {
            links.map((link, index) => <MyAccountSidebarLink key={index} {...link} />)
          }
        </List>
      </aside>
  );
}

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black'
};


const MyAccountSidebarLink = ({name, path, icon}) => {
  return (
    <Link to={path} style={linkStyle} >
      <ListItem disablePadding width='100%'>
          <ListItemButton>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
      </ListItem>
    </Link>
  )
}

export default MyAccountSidebar;