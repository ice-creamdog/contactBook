import { userId } from "./getters"

export const setUser =({commit},user) =>{
    commit("userStatus",user)
}

export const setToken = ({commit},userToken) => {
   commit("userToken",userToken)
}

export const setId = ({commit},userId)=>{
    commit("userID",userId)
}
  