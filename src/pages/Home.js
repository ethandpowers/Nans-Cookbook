import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import SettingsIcon from '@mui/icons-material/Settings';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import Search from '../components/Search.js'
import Recipes from '../components/Recipes.js'
import Settings from '../components/Settings.js'

function Home() {
    const [pageState, setPageState] = React.useState(
        {
            renderSearch: false,
            renderRecipes: true,
            renderSettings: false,
        }
    )
    const [authState, setAuthState] = React.useState(true);
    const [bottomNavValue, setBottomNav] = React.useState(1);
    const navRef = React.useRef('navRef');

    const auth = getAuth();
    onAuthStateChanged(auth, (user => {
        if (!user) {
            authState = false
        }
    }))

    const handleBottomNav = (event, newValue) => {
        setBottomNav(newValue);
        if (newValue === 0) {
            pageState.renderSearch = true;
            pageState.renderRecipes = false;
            pageState.renderSettings = false;


        } else if (newValue === 1) {

            pageState.renderSearch = false;
            pageState.renderRecipes = true;
            pageState.renderSettings = false;


        } else {

            pageState.renderSearch = false;
            pageState.renderRecipes = false;
            pageState.renderSettings = true;


        }
    }

    if (!authState) {
        return <Navigate to="/signin"></Navigate>
    } else {
        return (
            <div className='container'>

                <Search render={pageState.renderSearch} bottomPadding={navRef.current.clientHeight}/>
                <Recipes render={pageState.renderRecipes} />
                <Settings render={pageState.renderSettings} />

                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, }} elevation={3} ref={navRef} >
                    <BottomNavigation
                        showLabels
                        value={bottomNavValue}
                        onChange={handleBottomNav}
                    >
                        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                        <BottomNavigationAction label="Recipes" icon={<RestaurantIcon />} />
                        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default Home;