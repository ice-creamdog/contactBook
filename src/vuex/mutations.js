export const userStatus = (state,user) => {
    if(user){
        state.currentUser = user;
        state.isLogin = true;
    }else if(user ==null){
        sessionStorage.setItem("userName",null);
        
        state.currentUser =null;
        state.isLogin =false;
        state.token="";
        state.userId=null
    }
}
export const userToken = (state,userToken) => {
    if (userToken) {
      state.token = userToken;
    } else {
      state.token = null;
    }
  }

  export const userID = (state,userId) => {
    if(userId){
        state.userId = userId;
    }else if(userId ==null){
        sessionStorage.setItem("userName",null);
        
        state.userId=null;
        state.currentUser =null;
        state.isLogin =false;
        state.token="";
    }
}