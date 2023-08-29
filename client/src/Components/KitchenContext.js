import { useEffect, useState } from "react";
import { createContext } from "react";

import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

export const KitchenContext = createContext(null);

export const KitchenProvider = ({ children }) => {
    const { logout, user, isAuthenticated, isLoading } = useAuth0()
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");
    const [triggerModification, setTriggerModification] = useState(0)

    useEffect(() => {
        setStatus("loading")
    }, [isAuthenticated])

    useEffect(() =>
    {
        if (isAuthenticated)
        {
            fetch(`/api/user/${user.sub}`)
                .then((response) => {return response.json()})
                .then((data) =>
                {
                    setCurrentUser(data.data)
                    setStatus("idle")
                })
                .catch((err) => {setStatus("idle"); logout()})
        }
        else 
        {
            setCurrentUser(undefined); 
            if (!isLoading) {setStatus("idle")}
        }
    }, [isAuthenticated, triggerModification])

    return (
        <>
            {status === "loading" ? (
                <Loading /> ) : (
                <KitchenContext.Provider value={{ currentUser, setTriggerModification, triggerModification }}>
                    {children}
                </KitchenContext.Provider>
                )
            }
        </>

    );
};