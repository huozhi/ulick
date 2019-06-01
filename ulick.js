const isPointerSupported = Boolean(window.PointerEvent)
const isTouchSupported = Boolean(window.TouchEvent)
const mouseEvents = ['mousedown', 'mouseup']
const touchEvents = ['touchstart', 'touchend']
const pointerEvents = ['pointerdown', 'pointerup']

const hoverEvents = isPointerSupported ? ['pointerenter', 'pointerleave'] : ['mouseenter', 'mouseleave']

const isMouseTypeEvent = e => e.pointerType === 'mouse' || (e instanceof window.MouseEvent)
const isTouchTypeEvent = e => e.pointerType === 'touch' || (e instanceof window.TouchEvent)

function ulick(node, {
  onTouchDown = () => {},
  onTouchUp = () => {},
  onTouchClick = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  onMouseClick = () => {},
  onHoverEnter = () => {},
  onHoverLeave = () => {},
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

  function handleHoverEnter(e) {
    if (isMouseTypeEvent(e)) onHoverEnter(e)
  }

  function handleHoverLeave(e) {
    if (isMouseTypeEvent(e)) onHoverLeave(e)
  }

  const [clickInEvent, clickOutEvent] =
    isPointerSupported ? pointerEvents : (
      isTouchSupported ? touchEvents : mouseEvents
    )

  node.addEventListener(clickInEvent, handleDown)
  node.addEventListener(clickOutEvent, handleUp)

  node.addEventListener(hoverEvents[0], handleHoverEnter)
  node.addEventListener(hoverEvents[1], handleHoverLeave)

  return function release() {
    node.removeEventListener(clickInEvent, handleDown)
    node.removeEventListener(clickOutEvent, handleUp)

    node.addEventListener(hoverEvents[0], handleHoverEnter)
    node.addEventListener(hoverEvents[1], handleHoverLeave)
  }
}

export default ulick
