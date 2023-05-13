import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
	const [editChar, setEditChar] = useState("");
    const [isHome, setisHome] = useState(true);

	return (
		<Context.Provider value={{ editChar, setEditChar, isHome, setisHome }}>
			{children}
		</Context.Provider>
	);
};
