import "./MainScreen.css";
import Sidebar from "../../app/components/MainScreen/Sidebar/Sidebar";
import ChatWindow from "../../app/components/MainScreen/ChatWindow/ChatWindow";
import useUserData from "../../entities/UserData.load";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
    const { id } = useUserData();
    const navigate = useNavigate();
    useEffect(() => {
        if(!id) navigate("/");
    }, [id])
    return (
        <div className="chat">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}
