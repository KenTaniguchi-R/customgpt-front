import { useCustomState } from './useCustomState';

import BASE_API_ENDPOINT from '../vars/BASE_API_ENDPOINT';

export const useAnalyticsState = ({source_id}) =>{
  const [analytics, setAnalytics] = useCustomState({
    init: {"total_messages": 0, "weekly_counts": []},
    url: `${BASE_API_ENDPOINT}api/analytics/get_analytics/${source_id}`,
  })

  return analytics;
}