import { useContext, useEffect, useState } from "react";
import "./Dialog.css";
import { ChatContext } from "../../../../../../contexts/ChatContext";
import MessengerAPI, { socket } from "../../../../../../shared/MessengerApi/MessengerApi";
import useUserData from "../../../../../../entities/UserData.load";
interface IDialog {
    userId: string
}
export default function Dialog({ userId }: IDialog) {
    const [formattedTimestamp, setFormattedTimestamp] = useState("");
    const { id } = useUserData();
    const [lastMessage, setLastMessage] = useState<{ message: string, from: string, to: string, timestamp: string }>({ message: "", from: "", to: "", timestamp: "" });
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }
    const { currentKent, setCurrentKent, update, setActiveSidebar } = chatContext;
    const getMessages = async (currentKent: string) => {
        try {
            const res = await MessengerAPI.getMessages(currentKent);
            const lm = res.filter((msg) => msg.from == id && msg.to == currentKent || msg.from == currentKent && msg.to == id).reverse()[0];
            setLastMessage(lm);
        } catch (error) {
            console.error("Ошибка при загрузке сообщений:", error);
        }
    };
    useEffect(() => {
        socket.on("private_message", () => getMessages(userId));
        getMessages(userId);
        return () => {
            socket.off("private_message");
        };
    }, [userId, update]);
    useEffect(() => {
        if (lastMessage) {
            setFormattedTimestamp(new Date(lastMessage.timestamp).toLocaleTimeString().slice(0, 5));
        }
    }, [lastMessage]);
    return (
        <button className={`dialog ${currentKent == userId ? "dialog-active" : ""}`} onClick={() => { setCurrentKent(userId); setActiveSidebar(false) }}>
            <span className="kent">{userId}</span>
            {
                lastMessage ? (
                    <span className="last-message">{(lastMessage.from == id ? "Вы: " : "") + lastMessage.message.slice(0, 20) + " - " + formattedTimestamp}</span>
                ) : null
            }
        </button >
    )
}