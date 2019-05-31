import ulick
  from 'https://cdn.jsdelivr.net/gh/huozhi/ulick@master/ulick.js'

const animatingClsSelector = 'touch__point--flicking'
const fadingClsSelector = 'hover__pad--fading'
const appNode = document.querySelector('#app')
const touchPadNode = document.querySelector('.touch__pad')
const hoverPadNode = document.querySelector('.hover__pad')

function flicking(e) {
  const touchPoint = document.createElement('div')
  touchPoint.style.top = e.pageY + 'px'
  touchPoint.style.left = e.pageX + 'px'
  touchPoint.className = 'touch__point'
  touchPoint.style.backgroundColor = (e instanceof window.MouseEvent) ? 'aquamarine' : 'orange'

  touchPadNode.appendChild(touchPoint)

  touchPoint.classList.add(animatingClsSelector)
  touchPoint.addEventListener('animationend', () => {
    touchPadNode.removeChild(touchPoint)
  })
}

function fading(isIn) {
  if (isIn) {
    hoverPadNode.classList.add(fadingClsSelector)
  } else {
    hoverPadNode.classList.remove(fadingClsSelector)
  }
}

ulick(appNode, {
  onTouchClick(e) { flicking(e) },
  onMouseClick(e) { flicking(e) },
})

ulick(hoverPadNode, {
  onHoverEnter(e) { fading(true) },
  onHoverLeave(e) { fading(false) },
})
