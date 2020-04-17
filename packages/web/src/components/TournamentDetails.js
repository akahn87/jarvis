import React from 'react'

function TournamentDetails({tournament}) {
  return (
    <div data-id={tournament.id}>
      <img
        src={tournament.live_image_url}
        alt={`${tournament.name} Bracket`}
        style={{maxWidth: '100%'}}
      />
    </div>
  )
}

export default TournamentDetails
