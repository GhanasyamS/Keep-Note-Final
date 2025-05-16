import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) 
{
  const [loggedIn, setLoggedIn] = useState(()=>
  {
    return !!localStorage.getItem("userId");
  });

  const login = () => setLoggedIn(true);
  const logout = () => 
    {
    localStorage.removeItem("userId"); //clearing the stored details - I have added this to create the logged in user details page
    setLoggedIn(false);
    };
    
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
