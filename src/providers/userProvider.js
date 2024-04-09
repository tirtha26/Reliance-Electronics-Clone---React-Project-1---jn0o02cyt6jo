import { createContext, useContext, useState } from "react";

const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [getToken, setToken] = useState(localStorage.getItem('token'));
    const [getName, setName] = useState(localStorage.getItem('name'));

    const onTokenHandler = (data) => {
        setToken(data);
        localStorage.setItem('token', data);
    }

    const onNameHandler = (data) => {
        setName(data);
        localStorage.setItem('name', data);
    }

    const object = {
        getToken,
        getName,
        onTokenHandler,
        onNameHandler
    }


    return (<div>
        <UserContext.Provider value={object}>
            {children}
        </UserContext.Provider>
    </div>)
}

export function useUser() {
    return useContext(UserContext);
}