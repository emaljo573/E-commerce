import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({variant,children}) => {
  let variantVal=variant?variant:'info'
  return (
    <Alert variant={variantVal}>
        {children}
    </Alert>
  )
}

export default Message