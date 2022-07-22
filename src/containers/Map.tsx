import Amphion from '../rosnav'

import { useRef } from 'react'


export const Map = () => {
  const ref  = useRef(null)
    


//   const viewer = new Amphion.Map()
//   viewer.setContainer(ref.current)

    return(
        <div ref={ref}></div>
    )
}