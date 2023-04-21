import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MyBreadcrumbs from '../components/MyBreadcrumbs';

import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { Card, CardContent, Button, Grid } from '@mui/material';
import { usePlanContext } from '../contexts/PlanContext';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';
import { useAuthContext } from '../contexts/AuthContext';
import { user_plans, client_plans } from '../vars/Plans';

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
};

const selectedCardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem',
  backgroundColor: '#e0e0e0',
};

const contentStyle = {
  flexGrow: 1,
  textAlign: 'center',
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  padding: '0.7rem',
  display: 'flex',
  justifyContent: 'center',
};

const buttonStyle = {
  width: '100%',
  textAlign: 'center',
  marginBottom: '1rem',
};

const ChangePlan = () => {

  const navigate = useNavigate();

  return (
    <div className='main-container__form'>
      <MyBreadcrumbs routes={['ホーム', 'マイアカウント']} current='プランの変更' />

      <h1 style={{ margin: '1rem' }}>プランの変更</h1>
      <PricingPage />
    </div>
  )
}

function PricingPage() {

  const { myPlan, setMyPlan } = usePlanContext();

  const { hasPermC } = useAuthContext();
  let plans;
  if (hasPermC){
    plans = user_plans;
  }else{
    plans = client_plans;
  }

  const handlePlanChange = async (plan_id) => {
    const res = await axios.post(`${BASE_API_ENDPOINT}api/account/my_plan/`, {
      'plan_id': plan_id });
      setMyPlan(res.data);
  }

  return (
    <Grid container spacing={2}>
      {plans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          {/* change background color if index+1 === plan */}
          <Card style={index+1 === myPlan ? selectedCardStyle : cardStyle}>
            {/* <CardHeader title={plan.title} style={titleStyle} /> */}
            <CardContent style={contentStyle}>
            <Typography variant='h2' sx={{ fontSize: 25 }} gutterBottom>
              {plan.title}
            </Typography>

            <Typography sx={{ fontSize: 30 }} gutterBottom>
              {plan.price}/月
            </Typography>

              <ul style={listStyle}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={listItemStyle}>
                    <CheckIcon color='success' /> {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <div style={buttonStyle}>
              {
                index+1 === myPlan ?
                <Button variant="contained" color="primary" disabled>
                  {`現在のプラン`}
                </Button>:
                <Button variant="contained" color="primary" onClick={()=>handlePlanChange(index+1)}>
                  {`このプランに変更`}
                </Button>
              }
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}



export default ChangePlan;