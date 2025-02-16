import "./ContactsList.css"
import useUserData from "../../../../../entities/UserData.load";
import Contact from "./Contact/Contact";
interface IContactsList {
    users: { id: string }[]
}
export default function ContactsList({users}: IContactsList) {
    const { id } = useUserData();
    return (
        <>
            <div className="contacts">
                {users.map((user) => (
                    user.id == id || !user.id ? null : (
                        <Contact key={user.id} userId={user.id} />
                    )
                ))}
            </div>
        </>
    )
}