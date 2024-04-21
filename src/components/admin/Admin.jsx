import Participant from "./Participant";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

const Admin = () => {
    const participants = useSelector(state => state.login.loginDatabase);

    return (
        <>
        <NavLink to='/'>
        <div id='adminLogo'>
            <img src="/src/images/logo.png" alt="Logo" />
        </div>
        </NavLink>
        <div id='adminMainContainer'>
            <div id="participantWrapper">
                <div className="participant">
                    <div>
                       <p>Participant Id</p>
                    </div>
                    <div>
                        <p>Participant Image</p>
                    </div>
                    <div>
                        <p>Participant Name</p>
                    </div>
                    <div>
                        <p>Participant Email</p>
                    </div>
                    <div>
                        <p>Participant Join Date</p>
                    </div>
                    <div>
                        <p>Settings</p>
                    </div>
                </div>
                {participants.map((participant, index) => 
                <Participant key={index} index={index} participant={participant} />)}
            </div>
        </div>
        </>
    )
}

export default Admin;