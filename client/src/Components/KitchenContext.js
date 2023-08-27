import { useEffect, useState } from "react";
import { createContext } from "react";

import Loading from "./Loading";
import { useAuth0 } from "@auth0/auth0-react";

export const KitchenContext = createContext(null);

export const KitchenProvider = ({ children }) => {
    const { logout, user, isAuthenticated } = useAuth0
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
            fetch(`/api/user/${user._id}`)
            .then((response) => response.json())
            .then((data) =>
            {
                setCurrentStock(data.data)
                setStatus("idle")
            })
            .catch((err) => {setStatus("idle"); logout()})
        }
        else {setCurrentStock(null); setStatus("idle")}
    }, [triggerModification, isAuthenticated])

    return (
        <>
            {status === "loading" ? (
                <Loading /> ) : (
                <KitchenContext.Provider value={{ currentStock, setTriggerModification, triggerModification }}>
                    {children}
                </KitchenContext.Provider>
                )
            }
        </>

    );
};