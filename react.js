import React from 'react'
import ulick from './'

function Ulick({component, ...props}) {
  function forwardRef(props, ref) {
    return React.createElement(component, {...props, ref});
  }

  const RefedComponent = React.forwardRef(forwardRef)
  return React.createElement(RefedComponent, props)
}

export default Ulick
