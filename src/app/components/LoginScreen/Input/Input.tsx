import "./Input.css";
interface ISearchInput{
    setUserIdInput: React.Dispatch<React.SetStateAction<string>>,
}

export default function Input({setUserIdInput}:ISearchInput){
    return(
        <input type="text" placeholder="Ваш id" className="search_field" onChange={(e) => setUserIdInput(e.target.value)} required/>
    )
}