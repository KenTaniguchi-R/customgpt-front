import { useReducer } from 'react';

const useCustomReducer = () => {

  let initialState = {
    input: '',
    isLoading: false,
    isError: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'INPUT':
        return {
          ...state,
          input: action.payload,
        };
      case 'SUBMIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'SUCCESS':
        return {
          ...state,
          input: '',
          isLoading: false,
        };
      case 'ERROR':
        return {
          ...state,
          isError: true,
        };
      case 'RESET':
        return {
          ...state,
          isLoading: false,
          isError: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch]

}

export default useCustomReducer;