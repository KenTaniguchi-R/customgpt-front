import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { useNavigate } from 'react-router-dom';


const MyBreadcrumbs = ({ routes, current }) => {

  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {
        routes.map((route, index) => {
          return (
            <Typography className='pointer' onClick={()=>navigate(-1*(routes.length-index))}>{route}</Typography>
          )
        })
      }
      <Typography color="text.primary">{current}</Typography>
    </Breadcrumbs>
  )
}

export default MyBreadcrumbs;