import useUserData from "../../../../../entities/UserData.load";
import "./ChatList.css";
import Dialog from "./Dialog/Dialog";
interface IChatList {
    users: { id: string }[]
}
export default function ChatList({ users }: IChatList) {
    const { id } = useUserData();
    return (
        <>
            <div className="dialogs">
                {users.map((user) => (
                    user.id == id || !user.id ? null : (
                        <Dialog key={user.id} userId={user.id} />
                    )
                ))}
            </div>
        </>
    )
}