import { Navigate, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../firebase.js'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from '@hookstate/core';

function Home() {
    const state = useState(
        {
            loggedIn: true,
        }
    );
    const navigate = useNavigate();
    const auth = getAuth();
    const loggedIn = state.get().loggedIn;
    onAuthStateChanged(auth, (user => {
        try{
        if(!user){
            state.merge(
                {
                    loggedIn: false,
                }
            );
        }
    }catch(error){
        
    }
    }))

    if (!loggedIn) {
        return <Navigate to="/signin"></Navigate>
    } else {
        return (<h1>home</h1>);
    }
}

export default Home;