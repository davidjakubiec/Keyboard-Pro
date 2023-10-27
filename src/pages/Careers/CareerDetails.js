import React from 'react'
import { useParams, useLoaderData } from 'react-router-dom'

const CareerDetails = () => {
    const { id } = useParams();
    const career = useLoaderData();

  return (
    <div>
        <h2>{ career.title }</h2>
        <h2>{ career.salary }</h2>
        <h2>{ career.location }</h2>
    </div>
  )
}

export const careerDetailsLoader = async({ params }) => {
    const { id } = params;
    const res = await fetch('http://localhost:4000/careers/' + id)
    if(!res.ok) {
        throw Error('Could not find that career')
    }
    return res.json()
}

export default CareerDetails