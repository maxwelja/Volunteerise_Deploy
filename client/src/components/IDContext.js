import React, { createContext, useState } from 'react';
import axios from 'axios';

const IDContext = createContext();

const IDContextProvider = ({children}) => {
    const [activeID, setActiveID] = useState("");
    const [userType, setUserType] = useState("Donor");

    // check if ID is volunteer or organization and update accordingly
    const updateID = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4000/api/users/${id}`);
            if (res.data) {
                setActiveID(id);
                setUserType(res.data);
            }
        } catch (error) {
            console.log(error, "User not found");
        }
    }

    return (
        <IDContext.Provider value={{ activeID, userType, updateID }}>
            {children}
        </IDContext.Provider>
    )
}

export { IDContext, IDContextProvider };