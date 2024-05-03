
import '../styles/Login.css'
import {useState} from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar';

export function CreateAccount() {
    document.body.style = 'background: #5271ff;';
    const [selectAccount, setAccount] = useState('Volunteer')

    const history = useNavigate();

    const [volunteerName, setName] = useState('')
    const [volunteerEmail, setEmail] = useState('')
    const [volunteerPassword, setPassword] = useState('')
    const [volunteerNotifications, setVolunteerNotifications] = useState('')

    const [orgName, setOrgName] = useState('')
    const [orgEmail, setOrgEmail] = useState('')
    const [orgLink, setOrgLink] = useState('')
    const [orgPassword, setOrgPassword] = useState('')
    const [donationLink, setDonationLink] = useState('')
    const [hosted, setHosted] = useState([])
    

    async function submitVolunteer(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/registerVolunteer', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                volunteerName,volunteerEmail,volunteerPassword,volunteerNotifications
            })
        })
        
        const data = await response.json()

        console.log("Data After:",data)
        handleRedirect();
    }

    async function submitOrganization(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:4000/api/registerOrganization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orgName,orgEmail,orgLink,orgPassword,donationLink,hosted

            })
        })

        const data = await response.json()

        console.log(data)

        handleRedirect();
    }

    const accountChange = (account) => {
        setAccount(account)
    }

    const handleRedirect = () => {
        window.location.href = "/Login";
    }


    return (
        <div className="main">
            <NavBar />
            <img className="logo-image" alt="logo" src='images/logo.png'></img>   
            <div className="loginText"><h2>Select Your Account Below</h2></div>
            <div className="account-buttons-container">
                <button className="account-buttons" onClick={() => accountChange('Volunteer')}> Volunteer Account</button>
                <button className="account-buttons" onClick={() => accountChange('Organization')}> Organization Account</button>
            </div>
            
                <div className="rectangle">

                    <div className="rectangle-elements">

                        {selectAccount === 'Volunteer' && (
                            <div className="rectangle">
                                <p className="loginText">Create Volunteer Account</p>

                                <form action="POST">
                                    <div className="input">
                                        <input value={volunteerName} onChange={(e) => {setName(e.target.value)}}  placeholder="Name"/>
                                    </div>

                                    <div className="input">
                                        <input value={volunteerEmail} onChange={(e) => {setEmail(e.target.value)}} placeholder="E-mail"/>
                                    </div>


                                    <div className="input">
                                        <input type="password" value={volunteerPassword} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password"/>
                                    </div>

                                    <div className="submit">
                                        <input type="submit" onClick={submitVolunteer}  className="submit-button" value="Submit"></input>
                                    </div>
                                </form>
                                <span className = "submit">
                            <div className="accountLinks">
                                <div className="loginText2">Already Have an account? &nbsp;
                                    <Link to="/Login">Login Here.</Link>
                                </div>
                    </div>
                    </span>   
                            </div>
                        )}
                        {selectAccount === 'Organization' && (
                            <div className="rectangle">

                                <p className="loginText"> Create Organization Account</p>

                                <form action="POST">
                                    <div className="input">
                                        <input value={orgName} onChange={(e) => {setOrgName(e.target.value)}} placeholder="Organization Name"/>
                                    </div>

                                    <div className="input">
                                        <input value={orgEmail} onChange={(e) => {setOrgEmail(e.target.value)}} placeholder="Organization E-mail"/>
                                    </div>

                                    <div className="input">
                                        <input value={orgLink} onChange={(e) => {setOrgLink(e.target.value)}} placeholder="Organization Webpage Link"/>
                                    </div>

                                    <div className="input">
                                        <input type="password" value={orgPassword} onChange={(e) => {setOrgPassword(e.target.value)}} placeholder="Password"/>
                                    </div>

                                    <div className="submit">
                                        <input type="submit" onClick={submitOrganization}  className="submit-button" value="Submit"></input>
                                    </div>
                                </form>

                                <span className = "submit">
                                    <div className="accountLinks">
                                        <div className="loginText2">Already Have an account? &nbsp;
                                        <Link to="/Login">Login Here.</Link></div>
                                    </div>
                                </span>   
                                
                            </div>
                        )}
                        
                    </div>

                </div>
        
    </div>
    )
}

