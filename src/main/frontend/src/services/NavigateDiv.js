import { useNavigate } from "react-router-dom";

export const NavigateDiv = ({children}) => {
    const navigate = useNavigate();

    const handleNav = () => {
        console.log("끄어엄");
        navigate("/login");
    }

    return (
        <div onClick = {() => handleNav()}>
            {children}
        </div>
    )
}