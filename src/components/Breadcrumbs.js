import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
    const location = useLocation();

    let currentLink = '';

    const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
        currentLink += `/${crumb}`

        return (
            <div className='breadcrumbs' key={crumb}>
                <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })

  return (
    <div>{crumbs}</div>
  )
}

export default Breadcrumbs