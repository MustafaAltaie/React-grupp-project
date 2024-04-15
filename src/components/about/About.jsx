import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const About = () => {
    const users = useSelector(state => state.login.loginDatabase);

    return (
        <div id='aboutMainContainer'>
            <NavLink to='/'>
                <div id='aboutLogo'>
                    <img src="/src/images/logo.png" alt="Logo" className='logo' />
                </div>
            </NavLink>
            <h1><span>Team AnyWhere.</span> Every participant involved in this project.</h1>
            <div id="userWrapper">
            {users.map(user => 
                <div key={user.id} className='user'>
                    <img src={user.imageUrl} alt="UserImage" />
                    <div>
                        <h2>{user.userName}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
            )}
            </div>
            <p>Welcome to <span>Our scrum project</span>, home to an elite team of kickass coders: <span>Ahmed, Mustafa, Ibrahim, and Moutasem.</span> Together, we form the unstoppable <span>AnyWhere team.</span> Our project is built with <b>React.js</b> using <b>Redux</b>, combining cutting-edge technology with our expertise to deliver exceptional results. With our dedication to excellence and the strength of our team, there is no limit to what we can achieve.
            </p>
        </div>
    )
}

export default About;