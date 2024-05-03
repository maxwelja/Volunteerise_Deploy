import { Route, Routes, Navigate } from "react-router-dom";

//pages
import Home from './pages/Home';
import VolunteerProfile from './pages/VolunteerProfile';
import Login from './pages/Login';
import OrganizationProfile from './pages/OrgProfilePage';
import EventList from './pages/EventList';
import EventCalendar from './pages/EventCalendar';
import Test from './pages/Test';
import { CreateAccount } from './pages/CreateAccount';
//import { IDContextProvider } from "./components/IDContext";

function App() {

    return (
        <Routes>
            {/* Routes available to Everyone (including Donors) */}
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/CreateAccount" element={<CreateAccount/>}/>
            <Route path="/Home" element={<Home />} />

            {/* Functionality at these routes are account type dependent */}
            <Route path="/EventList" element={<EventList />} />
            <Route path="/EventCalendar" element={<EventCalendar />} />
            <Route path="/OrgProfile" element={<OrganizationProfile />} />


            {/* Route only available to Volunteers */}
            <Route path="/VolunteerProfile" element={<VolunteerProfile />} />

            {/* Debugging route */}
            <Route path="/Test" element={<Test />} />
        </Routes>
    )
}

export default App;