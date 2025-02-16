import "./Message.css";

interface IMessage {
    from: string;
    message: string;
    timestamp: string;
}

export default function Message({ from, message, timestamp }: IMessage) {
    const formattedTimestamp = new Date(timestamp).toLocaleTimeString().slice(0, 5);
    return (
        <div className={`message-block ${from === "me" ? "my-message" : ""}`}>
            <div className={`message message-${from}`}>
                {message}
                <div className="message-timestamp">{formattedTimestamp}</div>
            </div>
        </div>
    );
}
