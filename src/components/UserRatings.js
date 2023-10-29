import React, {useContext, useEffect, useState} from 'react'
import { Context } from '../App'

const UserRatings = () => {
    const {userHistory} = useContext(Context);

    const [highestWpm, setHighestWpm] = useState(0);
    const [highestWpmAccuracy, setHighestWpmAccuracy] = useState(0);
    const [numTests, setNumTests] = useState(0);

    useEffect(() => {
        let fastestWpm = 0;
        let fastestIdx = 0;
        if (userHistory) {
            for (let i = 0; i < userHistory.length; i++) {
                if (userHistory[i].wpm > fastestWpm) {
                    fastestWpm = userHistory[i].wpm;
                    fastestIdx = i;
                }
            }
            setHighestWpm(fastestWpm)
            setHighestWpmAccuracy(userHistory[fastestIdx].accuracy)
            setNumTests(userHistory.length);
        }

    },[userHistory])

  return (
    <div className='user-info-container' id='user-info-container'>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>{highestWpm}</div>
            <div className='user-info-subcontainer-small-font'>wpm</div>
        </div>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>{highestWpmAccuracy}</div>
            <div className='user-info-subcontainer-small-font'>%</div>
        </div>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>{numTests}</div>
            <div className='user-info-subcontainer-small-font'>tests</div>
        </div>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>95</div>
            <div className='user-info-subcontainer-small-font'>%</div>
        </div>
    </div>
  )
}

export default UserRatings