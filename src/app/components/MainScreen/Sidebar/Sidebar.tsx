import { useContext, useEffect, useState } from "react";

import { ChatContext } from "../../../../contexts/ChatContext";
import useUserData from "../../../../entities/UserData.load";
import { socket } from "../../../../shared/MessengerApi/MessengerApi";
import "./Sidebar.css";
import ChatList from "./ChatList/ChatList";
import ContactsList from "./ContactsList/ContactsList";

export default function Sidebar() {
    const { id, removeID } = useUserData();
    const [activeTab, setActiveTab] = useState<"chats" | "contacts">("chats");
    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }

    const { setCurrentKent, activeSidebar } = chatContext;
    const [users, setUsers] = useState<{ id: string }[]>([]);
    useEffect(() => {
        socket.emit("register", id);
        socket.on("users", (activeUsers) => {
            setUsers(activeUsers);
        });
        return () => {
            socket.off("users");
        }
    }, [id])
    return (
        <div className={`sidebar ${activeSidebar && "sidebar-active"}`}>
            <div className="sidebar-nav">
                <button
                    className={activeTab === "chats" ? "active" : ""}
                    onClick={() => setActiveTab("chats")}
                >
                    Чаты
                </button>
                <button
                    className={activeTab === "contacts" ? "active" : ""}
                    onClick={() => setActiveTab("contacts")}
                >
                    Контакты
                </button>
            </div>
            {activeTab === "chats" ? <ChatList users={users} /> : <ContactsList users={users}/>}
            <div className="user-info">
                <p>{id}</p>
                <button className="logout-btn" onClick={() => { removeID(); setCurrentKent("") }}>Выйти</button>
            </div>
        </div>
    );
}
