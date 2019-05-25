import React from 'react'

export default ({ blips }) => (
  <div>
    {blips.map((blip, idx) => <div key={idx}>{blip.quadrant}</div>)}
  </div>
)
