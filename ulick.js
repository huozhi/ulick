const mouseEvents = ['mousedown', 'mouseup']
const touchEvents = ['touchstart', 'touchend']
const pointerEvents = ['pointerdown', 'pointerup']
const isPointerSupported = Boolean(window.PointerEvent)
const isTouchSupported = Boolean(window.TouchEvent)

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (e instanceof window.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (e instanceof window.TouchEvent)

function ulick(node, {
  onTouchDown = () => {},
  onTouchUp = () => {},
  onTouchClick = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  onMouseClick = () => {},
}) {
  let sticking = false

  function handleDown(e) {
    sticking = true
    if (isMouseTypeEvent(e)) onMouseDown(e)
    if (isTouchTypeEvent(e)) onTouchDown(e)
  }

  function handleUp(e) {
    if (isMouseTypeEvent(e)) onMouseUp(e)
    if (isTouchTypeEvent(e)) onTouchUp(e)
    if (sticking) {
      sticking = false
      if (isMouseTypeEvent(e)) onTouchClick(e)
      if (isTouchTypeEvent(e)) onMouseClick(e)
    }
  }

  const [inEvent, outEvent] = 
    isPointerSupported ? pointerEvents : (
      isTouchSupported ? touchEvents : mouseEvents
    )
  
  node.addEventListener(inEvent, handleDown)
  node.addEventListener(outEvent, handleUp)

  return function release() {
    node.removeEventListener(inEvent, handleDown)
    node.removeEventListener(outEvent, handleUp)
  }
}

export default ulick
