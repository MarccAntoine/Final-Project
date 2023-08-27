import { useEffect, useState } from "react";
import { createContext } from "react";

import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

export const KitchenContext = createContext(null);

export const KitchenProvider = ({ children }) => {
    const { logout, user, isAuthenticated, isLoading } = useAuth0()
    const [currentStock, setCurrentStock] = useState(null);
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
                    setCurrentStock(data.data)
                    setStatus("idle")
                })
                .catch((err) => {setStatus("idle"); console.log(err)})
        }
        else {setCurrentStock(undefined); setStatus("idle")}
    }, [isAuthenticated])

    return (
        <>
            {status === "loading" || isLoading ? (
                <Loading /> ) : (
                <KitchenContext.Provider value={{ currentStock, setTriggerModification, triggerModification }}>
                    {children}
                </KitchenContext.Provider>
                )
            }
        </>

    );
};