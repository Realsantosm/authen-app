import React from 'react';


export const dataContext = React.createContext();

const UserContext = ({children}) => {
    const serverUrl = "http://localhost:5173/api";
    const value = {
        serverUrl
    }
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext