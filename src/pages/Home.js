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
import { useHookstate, useState } from '@hookstate/core';
import { getUserDocID } from '../firebase';
import globalState from '../store.js';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {

    //I am well aware that this is rather messy, but IDK when I try to use a generic state, I keep gettings errors.  At least this is functional
    const auth = getAuth();
    const gState = useHookstate(globalState)
    const authState = useState(true)
    const authenticated = authState.get()
    const navRef = React.useRef({clientHeight: 55})

    onAuthStateChanged(auth, (user => {
        try {
            if (!user) {
                authState.set(false)
            } else if (!gState.get().userDocID) {
                getUserDocID().then((id) => {
                    gState.merge({
                        userDocID: id,
                    })
                })
            }
        } catch (error) { }
    }))

    const [pageState] = React.useState(
        {
            renderSearch: false,
            renderRecipes: true,
            renderSettings: false,
        }
    )

    const [bottomNavValue, setBottomNav] = React.useState(1);

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

    if (!authenticated) {
        return <Navigate to="/signin"></Navigate>
    } else if (!gState.get().userDocID) {
        return (
            <div className="container centerScreen">
                <CircularProgress />
            </div>
        )
    } else {
        return (
            <div className='container'>

                <Search render={pageState.renderSearch} bottomPadding={navRef.current.clientHeight} />
                <Recipes render={pageState.renderRecipes} bottomPadding={navRef.current.clientHeight} />
                <Settings render={pageState.renderSettings} bottomPadding={navRef.current.clientHeight} />

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