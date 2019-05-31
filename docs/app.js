import ulick from '../ulick.js'
// 'https://cdn.jsdelivr.net/gh/huozhi/ulick@master/ulick.js'

const animatingClsSelector = 'touch__point--flicking'
const appNode = document.querySelector('#app')
const touchPadNode = document.querySelector('.touch__pad')

function flicking(e) {
  console.log('enter')
  const point = e//(e.touches && e.touches.length) ? e.touches[0] : e
  console.log('e.touches', point)
  const touchPoint = document.createElement('div')
  touchPoint.style.top = point.pageY + 'px'
  touchPoint.style.left = point.pageX + 'px'
  touchPoint.className = 'touch__point'
  touchPadNode.appendChild(touchPoint)

  touchPoint.classList.add(animatingClsSelector)
  touchPoint.addEventListener('animationend', () => {
    touchPadNode.removeChild(touchPoint)
  })
}

ulick(appNode, {
  onTouchClick(e) {
    flicking(e)
  },
  onMouseClick(e) {
    flicking(e)
  }
})
