import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

const PlanContext = createContext();


export const PlanProvider = ({ children }) => {

  let my_plan = 1;

  const [myPlan, setMyPlan] = useState(my_plan);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      axios.get(`${BASE_API_ENDPOINT}api/account/my_plan/`)
      .then(res => {
        setMyPlan(res.data);
      })
    }
  })

  return (
    <PlanContext.Provider value={{ myPlan, setMyPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = () => useContext(PlanContext);