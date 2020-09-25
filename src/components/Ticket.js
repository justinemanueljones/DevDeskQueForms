import React from 'react'

function Friend({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2>{details.title}</h2>
      <p>Description: {details.description}</p>
      <p>Curriculum: {details.curriculum}</p>
      <p>Status: {details.status}</p>

      {
        !!details.wit && !!details.wit.length &&
        <div>
          What I Tried:
          <ul>
            {details.wit.map((like, idx) => <li key={idx}>{like}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default Friend
