import React, { createContext, useContext } from "react";
import { useCrypto } from "@/adapters/hooks/useCrypto.js";

const CryptoContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function CryptoProvider({ children }) {
	const cryptoState = useCrypto();

	return (
		<CryptoContext.Provider value={cryptoState}>
			{children}
		</CryptoContext.Provider>
	);
}

export function useCryptoContext() {
	const context = useContext(CryptoContext);

	if (!context) {
		throw new Error("useCryptoContext must be used within a CryptoProvider");
	}
	return context;
}
