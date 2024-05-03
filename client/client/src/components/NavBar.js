import '../styles/NavBar.css';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { Container, Image} from 'react-bootstrap';
import DropdownMenu from '../components/DropdownMenu';

function NavBar(){
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState('');
  
    useEffect(() => {
      // Define a mapping of route paths to corresponding titles
      const routeToTitleMap = {
        '/Home': 'Home',
        '/Login': 'Login',
        '/VolunteerProfile': 'Volunteer Profile',
        '/OrgProfile': 'Organization Profile',
        '/EventList': 'Event List',
        '/EventCalendar': 'Event Calendar',
        '/NavBar': 'Navigation Bar',
        '/CreateAccount': 'Create Account',
      };
  
      // Get the current route's pathname
      const currentPath = location.pathname;
  
      // Determine the title based on the current route
      const title = routeToTitleMap[currentPath] || 'Default Title';
  
      // Update the page title
      setPageTitle(title);
    }, [location.pathname]);

    return(
        <div className='NavBar'>
            <Container style={{boxShadow: "5px 5px 5px #111"}} id="nav">
                <DropdownMenu />
                <h1>{pageTitle}</h1>
                <Container id="navLogo">
                  <Image src="images/logo60.png" />
                </Container>
            </Container>
        </div>
    )

}

export default NavBar;