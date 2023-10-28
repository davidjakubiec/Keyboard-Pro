import React from 'react'

const UserRatings = () => {

    const container = document.getElementById('user-info-container');
    // const containerDimensions = Math.min(container.width, container.height)

    const containerStyle = {
        width: "100%",
        height: "100%"
      };

  return (
    <div className='user-info-container' id='user-info-container'>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>130</div>
            <div className='user-info-subcontainer-small-font'>wpm</div>
        </div>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>100</div>
            <div className='user-info-subcontainer-small-font'>%</div>
        </div>
        <div className='user-info-subcontainer'>
            <div className='user-info-subcontainer-large-font'>12</div>
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