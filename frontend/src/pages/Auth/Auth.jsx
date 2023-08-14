import React, { useState } from 'react'
import './Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, signUp } from '../../actions/AuthAction';

const Auth = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state)=>state.authReducer.loading)

    const [isSignUp, setIsSignUp] = useState(true);
    const [data, setData] = useState({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" });
    const [confirmpass, setConfirmPass] = useState(true);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
        }else {
            dispatch(login(data));
        }
    }

    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: ""
        });
    }

    return (
        <div className="Auth">
            {/* Left Side - Logo */}
            <div className="a-left">
                {/* <img src={Logo} alt="" /> */}
                <div className="Webname">
                    <h1>SK Media</h1>
                    <h6>Explore this ideas throughout the world</h6>
                </div>
            </div>
            {/* Right Side - SignUp */}
            <div className="a-right">
                <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign Up" : "Login"}</h3>

                    {isSignUp &&
                        <div>
                            <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname} />
                            <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange} value={data.lastname} />
                        </div>
                    }


                    <div>
                        <input type="text" className="infoInput" placeholder='User Name' name='username' onChange={handleChange} value={data.username} />
                    </div>

                    <div>
                        <input type="password" className='infoInput' placeholder='Password' name='password' onChange={handleChange} value={data.password} />
                        {isSignUp &&
                            <input type="password" className='infoInput' placeholder='Confirm Password' name='confirmpass' onChange={handleChange} value={data.confirmpass} />
                        }
                    </div>
                    <span style={{ display: confirmpass ? "none" : "block", color: 'red', fontSize: '12px', alignSelf: "flex-end", marginRight: "5px" }}>
                        *Confirm Password is Not same
                    </span>
                    <div>
                        <span style={{ fontSize: "12px", cursor: "pointer" }} onClick={() => { setIsSignUp((prev) => !prev); resetForm() }}>
                            {isSignUp ? "Already have an account. Login" : "Don't have an Account? SingUp"}
                        </span>
                    </div>
                    <button className="button infoButton" type='submit' disabled={loading}>
                        {loading? "Loading..." : isSignUp ? "SignUp" : "Login"}

                    </button>
                </form>
            </div>
        </div>
    )
};


export default Auth