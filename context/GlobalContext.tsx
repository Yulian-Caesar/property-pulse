'use client';
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type GlobalContextType = {
	unreadCount: number;
	setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

// Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Provider
export function GlobalProvider({ children }: { children: ReactNode }) {
	const [unreadCount, setUnreadCount] = useState(0)

	const { data: session } = useSession()

	useEffect(() => {
		if (session && session.user) {
			getUnreadMessageCount().then((res) => {
				if (res.count) {
					setUnreadCount(res.count)
				}
			})
		}
	}, [getUnreadMessageCount, session])

	return (
		<GlobalContext.Provider value={{
			unreadCount,
			setUnreadCount
		}}>
			{children}
		</GlobalContext.Provider>
	)
}

export function useGlobalContext() {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error("useGlobalContext must be used within a GlobalProvider");
	}

	return context;
}