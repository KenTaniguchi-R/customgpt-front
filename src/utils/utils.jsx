
const redirect_to_home = (navigate, hasPermC) => {
  if (hasPermC){
    navigate('/home/', { replace: true });
  }else{
    navigate('/client/home/', { replace: true });
  }
}


export { redirect_to_home }