import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner 
    animation='border'
    role='status'
    style={{ margin:'auto',display:'block'}}
    >
        <span class='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default Loader