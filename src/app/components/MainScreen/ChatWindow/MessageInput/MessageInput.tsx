import "./MessageInput.css";
import { useContext, useState } from "react";
import { socket } from "../../../../../shared/MessengerApi/MessengerApi";
import { ChatContext } from "../../../../../contexts/ChatContext";
import useUserData from "../../../../../entities/UserData.load";
interface IMessageInput {
    getMessages: (currentKent: string) => Promise<void>
}
export default function MessageInput({ getMessages }: IMessageInput) {
    const { id } = useUserData();
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }
    const { currentKent } = chatContext;
    if (!currentKent) return;
    const [message, setMessage] = useState("");
    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getMessages(currentKent);
        if (message.trim() === "") return;
        socket.emit("private_message", { to: currentKent, message, from: id });
        setMessage("");
    };
    return (
        <>
            <div className="input_area">
                <form className="input_area" onSubmit={(e) => sendMessage(e)}>
                    <textarea
                        placeholder="Введите сообщение..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="input_field"
                    ></textarea>

                    <button type="submit" disabled={message.trim() ? false : true} className="send_button">➤</button>
                </form>

            </div>
        </>
    )
}