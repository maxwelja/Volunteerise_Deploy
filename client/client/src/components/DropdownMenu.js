import "bootstrap/dist/css/bootstrap.css";
import '../styles/DropdownMenu.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function DropdownMenu() {
  return (
    <div className="Dropdown">
      <header className="Dropdown-header">
         <DropdownButton id="dropdown-basic-button" title="☰">
            <Dropdown.Item href="/Home">Home Page</Dropdown.Item>
            <Dropdown.Item href="/EventCalendar">Event Calendar</Dropdown.Item>
            <Dropdown.Item href="/EventList">Event List</Dropdown.Item>
            <Dropdown.Item href="/VolunteerProfile">Volunteer Profile</Dropdown.Item>
            <Dropdown.Item href="/OrgProfile">Organization Profile</Dropdown.Item>
            <Dropdown.Item href="/Login">Login</Dropdown.Item>
            <Dropdown.Item href="/Login">Logout</Dropdown.Item>
            <Dropdown.Item href="/Test">Test</Dropdown.Item>
          </DropdownButton>
      </header>
    </div>
  );
}

export default DropdownMenu;