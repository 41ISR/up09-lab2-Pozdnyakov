import "./LoginScreen.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../app/components/LoginScreen/Button/Button";
import Input from "../../app/components/LoginScreen/Input/Input";
import MessengerAPI from "../../shared/MessengerApi/MessengerApi";
import useUserData from "../../entities/UserData.load";

export default function Main() {
    const [userIdInput, setUserIdInput] = useState<string>("");
    const navigate = useNavigate();
    const { id, addID, removeID } = useUserData();
    useEffect(() => {
        if (id) navigate("/chat");
    }, [id])
    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await MessengerAPI.authUser(userIdInput);
            addID(userIdInput);
            navigate("/chat");
        } catch (error) {
            removeID();
            console.error("Ошибка при запросе:", error);
            alert("Не удалось выполнить авторизацию");
        }
    };

    return (
        <div className="auth_form">
            <form onSubmit={handleAuth}>
                <h1>Авторизация</h1>
                <Input setUserIdInput={setUserIdInput} />
                <Button />
            </form>
        </div>
    );
}
