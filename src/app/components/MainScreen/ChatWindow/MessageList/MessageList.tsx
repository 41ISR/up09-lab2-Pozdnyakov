import "./MessageList.css"
import { IMessage } from "../../../../../shared/MessengerApi/MessengerApi"
import Message from "./Message/Message"
import useUserData from "../../../../../entities/UserData.load"
import { useContext, useEffect, useRef } from "react"
import { ChatContext } from "../../../../../contexts/ChatContext"
interface IMessageList {
    messages: IMessage[],
    currentKent: string
}

export default function MessageList({ messages, currentKent }: IMessageList) {
    const { id } = useUserData();
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }
    const { setUpdate, update } = chatContext;
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setUpdate(!update);
    }, [messages, currentKent]);
    return (
        <div className="messages">
            {messages.filter((msg) => msg.from == id && msg.to == currentKent || msg.from == currentKent && msg.to == id).map((msg, index) =>
            (
                <div key={index} className="fucking-div">
                    <Message from={msg.from == id ? "me" : "kent"} message={msg.message} timestamp={msg.timestamp} />
                </div>
            )
            )}
            <div ref={messagesEndRef} />
        </div>
    )
}