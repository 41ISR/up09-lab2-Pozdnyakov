import { ChatContext } from "../../../../contexts/ChatContext";
import useUserData from "../../../../entities/UserData.load";
import MessengerAPI, { socket, IMessage } from "../../../../shared/MessengerApi/MessengerApi";
import "./ChatWindow.css";
import MessageInput from "./MessageInput/MessageInput";
import { useContext, useEffect, useState } from "react";
import MessageList from "./MessageList/MessageList";

export default function ChatWindow() {
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }

    const { currentKent, setCurrentKent, activeSidebar, setActiveSidebar, update, setUpdate } = chatContext;
    const { id } = useUserData();
    const [messages, setMessages] = useState<IMessage[]>([]);

    const getMessages = async (currentKent: string) => {
        try {
            const res = await MessengerAPI.getMessages(currentKent);
            setMessages(res);
        } catch (error) {
            console.error("Ошибка при загрузке сообщений:", error);
        }
    };

    useEffect(() => {
        if (!id) return;

        socket.emit("register", id);

        if (currentKent) {
            getMessages(currentKent);
        }

        const handleMessage = (msg: IMessage) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("private_message", handleMessage);

        return () => {
            socket.off("private_message", handleMessage);
        };
    }, [currentKent, id]);

    useEffect(() => {
        socket.on("private_message", () => setUpdate(!update));
    }, [update, setUpdate])

    return (
        <div className={`chat_part ${activeSidebar && "chat_part-active"}`}>
            {currentKent ? (
                <>
                    <div className="user_info_block">
                        <div className="user_info">
                            <button onClick={() => {setCurrentKent(null); setActiveSidebar(true)}}>&lt;</button>
                            <p>{currentKent}</p>
                        </div>
                    </div>
                    <MessageList messages={messages} currentKent={currentKent} />
                    <MessageInput getMessages={getMessages} />
                </>
            ) : null}
        </div>
    );
}
