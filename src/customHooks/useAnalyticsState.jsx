import { useCustomState } from './useCustomState';

const BASE_API_ENDPOINT = import.meta.env.VITE_BASE_API_ENDPOINT;

export const useAnalyticsState = ({source_id}) =>{
  const [analytics, setAnalytics] = useCustomState({
    init: {"total_messages": 0, "weekly_counts": []},
    url: `${BASE_API_ENDPOINT}api/analytics/get_analytics/${source_id}`,
  })

  return analytics;
}