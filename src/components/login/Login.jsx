import { NavLink } from "react-router-dom";
import Signing from "./Signing";

const Login = () => {
    return (
        <div id='accountWrapper'>
            <NavLink to='/'>
                <div id='loginLogo'>
                    <img src="/src/images/logo.png" alt="Logo" />
                </div>
            </NavLink>
            <div id="accountLeftSection">
                <img src="https://www.civitatis.com/blog/wp-content/uploads/2023/03/miradores-nueva-york.jpg" alt="Image" />
                <h1>Signup Or Login</h1>
                <p>Programmed and design by <br /><span>Team AnyWhere</span>.<br /> Access the full functionality of the application by signing up or logging in. Without authentication, your interaction will be limited to viewing the applications content without the ability to make changes.</p>
            </div>
            <div id="accountRightSection">
                <Signing />
            </div>
        </div>
    )
}

export default Login;