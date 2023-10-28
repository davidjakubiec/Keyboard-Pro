import React, { useContext, useEffect } from "react"
import UserRatings from "../components/UserRatings"
import UserTestHistory from "../components/UserTestHistory"
import UserTestHistoryWPMLineGraph from "../components/UserTestHistoryWPMLineGraph"
import UserTestHistoryAccuracyLineGraph from "../components/UserTestHistoryAccuracyLineGraph"
import { Context } from '../App'

export default function Profile() {
    const { user, setUser } = useContext(Context);


    useEffect(() => {
        fetch('http://localhost:3000/api/user', {
            method: 'GET',
            credentials: 'include', 
          })
        .then((response) => response.json())
        .then((data) => setUser(data))
    },[])


    return (
        <div className="profile-container">
            <div className='twoxtwo-container'>
                <h1>
                     David Jakubiec {user ? JSON.stringify(user) : <div>not logged in</div>}
                </h1>
                    <div width='10vh' className="twoxtwo-subcontainer">
                        <div>
                            <UserRatings />
                        </div>
                </div>
            </div>
            <div className="account-info-container">
                <h1>Account Info</h1>
                <div>email: </div>
                <div>authentication service: Google</div>
                <button>Delete Account</button>
            </div>
            <div className="user-history-charts-container">
                <UserTestHistoryWPMLineGraph />
                <UserTestHistoryAccuracyLineGraph />
            </div>
            <div className="user-history-container">
                <UserTestHistory />
            </div>
        </div>

    )
};