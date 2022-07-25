import * as React from "react";
import { Spinner } from "@chakra-ui/react"
import { useNavigate, useLocation, Navigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { setCredentials } from "state/auth/authSlice";
import { useAuth } from "store/useAuth";

import { useGetCurrentUserQuery } from "services/auth";
import type { User } from "services/auth";
import { useLoginMutation } from "services/auth";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login, { data, error }] = useLoginMutation();

  const handleLogin = async ( email: string, password: string) => {
    try {
      localStorage.removeItem("token")
     
      const response = await login({ identifier: email, password }).unwrap();
      localStorage.setItem("token", response.jwt);
      dispatch(setCredentials({ user: response.user, token: response.jwt }));
      const origin = (location.state as any)?.from?.pathname || '/';
      navigate(origin)

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null}))
    localStorage.removeItem("token")
  }

  const value = {
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
        { children}
    </AuthContext.Provider>
  )
};

export const useAuthenticate = () => {
    return React.useContext(AuthContext);
}

export const ProtectedRoute = ({ children}) => {
    const { user} = useAuth();
    const location = useLocation();

    const dispatch = useAppDispatch();
    const [userProfile, setUserProfile] =  React.useState<User>()
    const [ searchParams, setSearchParams] = useSearchParams();
    const { data: currentUser, isLoading} = useGetCurrentUserQuery();

   
    // React.useEffect(()=> {
    //   setUserProfile(user)
    // }, [user])
    
    // React.useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   const userResponse = {
    //     user: currentUser,
    //     token: token || "",
    //   };
    //   dispatch(setCredentials(userResponse));
    //   setUserProfile(currentUser)
    // }, [currentUser]);
    
    if (isLoading) return <Spinner size='xl' />;


    if(!user) {
      //  setSearchParams({ id: 'signin' })
      return <Navigate to='#/signin' replace state={{ state: location}} />
    }
    
    return children;
}
