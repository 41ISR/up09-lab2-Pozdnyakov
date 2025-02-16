import { createContext, ReactNode, useState } from "react";

interface IChatContext {
    currentKent: string | null;
    setCurrentKent: (value: string | null) => void;
    update: boolean;
    setUpdate: (value: boolean) => void;
    activeSidebar: boolean;
    setActiveSidebar: (value: boolean) => void;
}

export const ChatContext = createContext<IChatContext | null>(null);

export default function Chat({ children }: { children: ReactNode }) {
    const [currentKent, setCurrentKent] = useState<string | null>(null);
    const [activeSidebar, setActiveSidebar] = useState<boolean>(true);
    const [update, setUpdate] = useState<boolean>(false);
    return (
        <ChatContext.Provider value={{ currentKent, setCurrentKent, update, setUpdate, activeSidebar, setActiveSidebar }}>
            {children}
        </ChatContext.Provider>
    );
}
