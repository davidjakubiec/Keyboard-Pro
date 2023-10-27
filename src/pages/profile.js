import React, { useContext } from "react"
import UserRatings from "../components/UserRatings"
import UserTestHistory from "../components/UserTestHistory"
import UserTestHistoryBarGraph from "../components/UserTestHistoryBarGraph"

export default function Profile() {

    return (
        <div className="profile-container">
            <div className='twoxtwo-container'>
                <h1>
                     David Jakubiec
                </h1>
                    <div className="twoxtwo-subcontainer">
                        <img id="profile-pic" src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"/>
                        <div>
                            <UserRatings />
                        </div>
                </div>
            </div>
            <div className="account-info-container">
                <h1>Account Info</h1>
                <div>email:</div>
                <div>authentication service: Google</div>
                <button>Delete Account</button>
            </div>
            <div>
                <UserTestHistoryBarGraph />
            </div>
            <div className="user-history-container">
                <UserTestHistory />
            </div>
        </div>

    )
};