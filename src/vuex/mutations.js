export const userStatus = (state,user) => {
    if(user){
        state.currentUser = user;
        state.isLogin = true;
    }else if(user ==null){
        localStorage.setItem("userName",null);
        localStorage.setItem("userToken","");
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
        localStorage.setItem('userid',userId)
    }else if(userId ==null){
        localStorage.setItem("userName",null);
        localStorage.setItem("userToken","");
        state.userId=null;
        state.currentUser =null;
        state.isLogin =false;
        state.token="";
    }
}