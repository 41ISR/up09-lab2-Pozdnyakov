import React, { useState, useEffect } from "react";
import useUserData from "../../../../../entities/UserData.load";
import MessengerAPI from "../../../../../shared/MessengerApi/MessengerApi";
import "./ChatList.css";
import Dialog from "./Dialog/Dialog";

interface IChatList {
    users: { id: string }[];
}

export default function ChatList({ users }: IChatList) {
    const { id } = useUserData();
    const [filteredUsers, setFilteredUsers] = useState<string[]>([]);

    useEffect(() => {
        const filterUsers = async () => {
            const validUserIds: string[] = [];

            for (const user of users) {
                if (user.id !== id && user.id) {
                    try {
                        const res = await MessengerAPI.getMessages(user.id);
                        const hasMessages = res.some(
                            (msg) =>
                                (msg.from === id && msg.to === user.id) ||
                                (msg.from === user.id && msg.to === id)
                        );

                        if (hasMessages) {
                            validUserIds.push(user.id);
                        }
                    } catch (error) {
                        console.error("Ошибка при загрузке сообщений:", error);
                    }
                }
            }
            setFilteredUsers(validUserIds);
        };

        filterUsers();
    }, [users, id]);

    return (
        <>
            <div className="dialogs">
                {filteredUsers.map((userId) => (
                    <Dialog key={userId} userId={userId} />
                ))}
            </div>
        </>
    );
}
