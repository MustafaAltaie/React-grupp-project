import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { signinHandler } from "../../features/loginSlice";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../features/loginSlice";

const Signing = () => {
    // Switch netween signin and signup
    const [signIn, setSignIn] = useState(false);
    // Agree to the terms and condition
    const [isAgreed, setIsAgreed] = useState(false);
    // Signup inputs
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    // Submit signup
    const dispatch = useDispatch();
    const [keepSigned, setKeepSigned] = useState(true);
    const isLogedin = useSelector(state => state.login.isLogedin);
    const navigate = useNavigate();

    useEffect(() => {
        if(isLogedin){
            if(keepSigned)
            localStorage.isLogedin = true;
            navigate('/');
        }
        else console.log('Not signed in');
    }, [isLogedin, keepSigned, navigate]);

    const handleSignin = () => {
        const loginDetails = {
            email: email,
            password: password
        }
        dispatch(signinHandler(loginDetails));
    }

    const HandleSignup = () => {
        const newUser = {
            userName: userName,
            email: email,
            password: password,
            imageUrl: imageUrl
        };
        dispatch(addUser(newUser));
        setSignIn(true);
    }

    return (
        <>
        <div id='signupWrapper' style={signIn ? {left: 0, transform: 'translate(-100%, -50%)'} : {left: '50%', transform: 'translate(-50%, -50%)'}}>
            <h1>Create account</h1>
            <p style={{transform: userName ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Your full name</p>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <p style={{transform: email ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Your email address</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p style={{transform: password ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p style={{transform: imageUrl ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Image url</p>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input type="checkbox" id='rememberMe' onChange={() => setIsAgreed(!isAgreed)} />
                <label htmlFor="rememberMe">Agree to the <span>terms and conditions</span></label>
            </div>
            <button onClick={HandleSignup} style={{background: isAgreed ? '#963ebe' : '#888', pointerEvents: isAgreed ? 'unset' : 'none'}}>Create account</button>
            <div>
                <p>Already have an account? <span onClick={() => setSignIn(true)}>Sign-in</span></p>
            </div>
        </div>
        <div id="signinWrapper" style={!signIn ? {left: 0, transform: 'translate(-100%, -50%)'} : {left: '50%', transform: 'translate(-50%, -50%)'}}>
            <h1>Sign in</h1>
            <p style={{transform: email ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Your email address</p>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p style={{transform: password ? 'scale(0.9) translate(7px, -70%)' : 'scale(1) translate(12px, 50%)'}}>Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input type="checkbox" id='keepSignin' checked={keepSigned} onChange={e => e.target.checked ? setKeepSigned(true) : setKeepSigned(false)} />
                <label htmlFor="keepSignin">Keep signing in</label>
            </div>
            <button onClick={handleSignin} style={{background: email && password ? '#963ebe' : '#888', pointerEvents: email && password ? 'unset' : 'none'}}>Signin</button>
            <div>
                <p>Do not have an account? <span onClick={() => setSignIn(false)}>Sign-up</span></p>
            </div>
        </div>
        </>
    )
}

export default Signing;