import "./Contact.css"
import { useContext } from "react";
import { ChatContext } from "../../../../../../contexts/ChatContext";
interface IContact {
    userId: string
}
export default function Contact({ userId }: IContact) {
    const chatContext = useContext(ChatContext);
    if (!chatContext) {
        return <p>Ошибка: Контекст не найден</p>;
    }
    const { currentKent, setCurrentKent, setActiveSidebar } = chatContext;
    return (
        <button className={`contact ${currentKent == userId ? "contact-active" : ""}`} onClick={() => { setCurrentKent(userId); setActiveSidebar(false) }}>
            <span className="kent">{userId}</span>
        </button >
    )
}