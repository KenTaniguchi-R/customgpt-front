import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useUsageOverviewState = () =>{
  const [usage, setUsage] = useCustomState({
    init: [],
    url: `${BASE_API_ENDPOINT}api/analytics/get_usage_overview/`,
  })

  return [usage, setUsage];
}