import { Route, Routes } from "react-router-dom"
import LoginScreen from "../../pages/LoginScreen/LoginScreen"
import MainScreen from "../../pages/MainScreen/MainScreen"
export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/chat" element={<MainScreen />} />
        </Routes>
    )
}