import '../styles/Login.css';
import {useEffect, useState, Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Row} from 'react-bootstrap';
import NavBar from '../components/NavBar';
//import { idContext } from '../components/idContext';


export function Login() {
    // const getGlobals = () => {
    //     console.log(this.context);
    //     this.context = idContext;
    //     console.log(this.context);
    // } 
    document.body.style = 'background: #5271ff;';

    const [selectAccount, setAccount] = useState('Volunteer')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        //getGlobals();
        if (auth) {
            setAuth(false);
            goToPage('/Home');
        }
    }, [auth])

    function goToPage() {
        //if (this.context.state.activeID)
        window.location.href = '/Home';
    }

    const submitVolunteer = async (event)  => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/loginVolunteer', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,password
                })
            })
                
            if (response.ok) {
                const data = await response.json();
                console.log(data._id, data);
                setAuth(true);
            } else {
                alert("Login Failed");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const submitOrg = async (event)  => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/loginOrganization', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,password
                })
            })
            
            if (response.ok) {
                const data = await response.json()
                setAuth(true);
                console.log(data);
            } else {
                alert("Login Failed")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const accountChange = (account) => {
        setAccount(account)
    }

    return (
        <div className="main">
            <NavBar />
            <img className="logo-image" alt="logo" src='images/logo.png'></img>   
            <div className="loginText"><h2>Welcome to Volunteerise!</h2></div>

            <div className="account-buttons-container">
                <button className="account-buttons" onClick={() => accountChange('Volunteer')}>Volunteer Account</button>
                <button className="account-buttons" onClick={() => accountChange('Organization')}>Organization Account</button>
            </div>
            
            <div className="rectangle">

                <div className="rectangle-elements">
                    <p className="loginText"> Login Here: </p>
                    {selectAccount === 'Volunteer' && (
                        <>
                            <form action="POST">
                                <div className="input">
                                    <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Volunteer E-mail"/>
                                </div>
    
                                <div className="input">
                                    <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                                </div>
    
                                <div className="submit">
                                    <input type="submit" onClick={submitVolunteer}  className="submit-button" value="Submit"></input>
                                </div>
                            </form>
                        </>
                    )} 
                    {selectAccount === 'Organization' && (
                        <form action="POST">
                            <div className="input">
                                <input type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Organization E-mail"/>
                            </div>

                            <div className="input">
                                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                            </div>

                            <div className="submit">
                                <input type="submit" onClick={submitOrg}  className="submit-button" value="Submit"></input>
                            </div>
                        </form>
                    )}
                    <span className = "submit">
                        <div className="accountLinks">
                            <Link to="/CreateAccount">Create Account</Link>
                        </div>
                        <Row>
                            <h3>No account? No problem!</h3>
                            <Button style={{boxShadow: "5px 5px 7px rgb(27, 27, 27)"}} href="/OrgProfile">
                                Donors Click Here!
                            </Button>
                        </Row>    
                    </span>
                </div>

            </div>
        
        </div>
    )
}

export default Login;