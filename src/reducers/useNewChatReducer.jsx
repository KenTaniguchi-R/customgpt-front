import { useReducer } from 'react';

const useNewChatReducer = () => {

  let initialState = {
    texts: [],
    refs: [],
    session_key: '',
    isOpen: false,
    showExtracted: false,
    isLoading: false,
    isError: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'MODAL_OPEN':
        return {
          ...state,
          isOpen: true,
        };
      case 'MODAL_CLOSE':
        return {
          ...state,
          isOpen: false,
        };
      case 'SEND_REQUEST':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'ERROR':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'SHOW_EXTRACTED':
        return {
          ...state,
          isLoading: false,
          showExtracted: true,
        };
      case 'CANCEL_EXTRACTED':
        return {
          ...state,
          texts: [],
          refs: [],
          showExtracted: false,
        };
      case 'RESET':
        return {
          ...state,
          isOpen: false,
          showExtracted: false,
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

export default useNewChatReducer;