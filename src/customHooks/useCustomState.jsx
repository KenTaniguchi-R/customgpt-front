import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCustomState = ({init, url}) => {
  const [state, setState] = useState(init);

  useEffect(() => {
    const get_data = async () => {
      try {
        console.log(url)
        const res = await axios.get(url);
        setState(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    get_data();
  }, [])

  return [state, setState];
}