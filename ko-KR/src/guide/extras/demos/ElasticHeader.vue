<script setup>
import dynamics from 'dynamics.js'

const headerHeight = 120

let isDragging = false
const start = { x: 0, y: 0 }
let c = $ref({ x: headerHeight, y: headerHeight })

const headerPath = $computed(() => {
  return `M0,0 L320,0 320,${headerHeight}Q${c.x},${c.y} 0,${headerHeight}`
})

const contentPosition = $computed(() => {
  const dy = c.y - headerHeight
  const dampen = dy > 0 ? 2 : 4
  return {
    transform: `translate(0,${dy / dampen}px)`
  }
})

function startDrag(e) {
  e = e.changedTouches ? e.changedTouches[0] : e
  isDragging = true
  start.x = e.pageX
  start.y = e.pageY
}

function onDrag(e) {
  e = e.changedTouches ? e.changedTouches[0] : e
  if (isDragging) {
    c.x = headerHeight + (e.pageX - start.x)
    const dy = e.pageY - start.y
    const dampen = dy > 0 ? 1.5 : 4
    c.y = headerHeight + dy / dampen
  }
}

function stopDrag() {
  if (isDragging) {
    isDragging = false
    dynamics.animate(
      c,
      { x: headerHeight, y: headerHeight },
      { type: dynamics.spring, duration: 700, firction: 280 }
    )
  }
}
</script>

<template>
  <div
    class="draggable"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @touchstart.prevent="startDrag"
    @touchmove.prevent="onDrag"
    @touchend.prevent="stopDrag"
  >
    <svg class="bg" width="320" height="560">
      <path :d="headerPath" fill="#3F51B5"></path>
    </svg>
    <div class="header">드레그 해보세요</div>
    <div class="content" :style="contentPosition">
      <a
        href="https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCBkeW5hbWljcyBmcm9tICdkeW5hbWljcy5qcydcblxuY29uc3QgaGVhZGVySGVpZ2h0ID0gMTIwXG5cbmxldCBpc0RyYWdnaW5nID0gZmFsc2VcbmNvbnN0IHN0YXJ0ID0geyB4OiAwLCB5OiAwIH1cbmxldCBjID0gJHJlZih7IHg6IGhlYWRlckhlaWdodCwgeTogaGVhZGVySGVpZ2h0IH0pXG5cbmNvbnN0IGhlYWRlclBhdGggPSAkY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gYE0wLDAgTDMyMCwwIDMyMCwke2hlYWRlckhlaWdodH1RJHtjLnh9LCR7Yy55fSAwLCR7aGVhZGVySGVpZ2h0fWBcbn0pXG5cbmNvbnN0IGNvbnRlbnRQb3NpdGlvbiA9ICRjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGR5ID0gYy55IC0gaGVhZGVySGVpZ2h0XG4gIGNvbnN0IGRhbXBlbiA9IGR5ID4gMCA/IDIgOiA0XG4gIHJldHVybiB7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlKDAsJHtkeSAvIGRhbXBlbn1weClgXG4gIH1cbn0pXG5cbmZ1bmN0aW9uIHN0YXJ0RHJhZyhlKSB7XG4gIGUgPSBlLmNoYW5nZWRUb3VjaGVzID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGVcbiAgaXNEcmFnZ2luZyA9IHRydWVcbiAgc3RhcnQueCA9IGUucGFnZVhcbiAgc3RhcnQueSA9IGUucGFnZVlcbn1cblxuZnVuY3Rpb24gb25EcmFnKGUpIHtcbiAgZSA9IGUuY2hhbmdlZFRvdWNoZXMgPyBlLmNoYW5nZWRUb3VjaGVzWzBdIDogZVxuICBpZiAoaXNEcmFnZ2luZykge1xuICAgIGMueCA9IGhlYWRlckhlaWdodCArIChlLnBhZ2VYIC0gc3RhcnQueClcbiAgICBjb25zdCBkeSA9IGUucGFnZVkgLSBzdGFydC55XG4gICAgY29uc3QgZGFtcGVuID0gZHkgPiAwID8gMS41IDogNFxuICAgIGMueSA9IGhlYWRlckhlaWdodCArIGR5IC8gZGFtcGVuXG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcERyYWcoKSB7XG4gIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgaXNEcmFnZ2luZyA9IGZhbHNlXG4gICAgZHluYW1pY3MuYW5pbWF0ZShcbiAgICAgIGMsXG4gICAgICB7IHg6IGhlYWRlckhlaWdodCwgeTogaGVhZGVySGVpZ2h0IH0sXG4gICAgICB7IHR5cGU6IGR5bmFtaWNzLnNwcmluZywgZHVyYXRpb246IDcwMCwgZmlyY3Rpb246IDI4MCB9XG4gICAgKVxuICB9XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJkcmFnZ2FibGVcIlxuICAgIEBtb3VzZWRvd249XCJzdGFydERyYWdcIlxuICAgIEB0b3VjaHN0YXJ0PVwic3RhcnREcmFnXCJcbiAgICBAbW91c2Vtb3ZlPVwib25EcmFnXCJcbiAgICBAdG91Y2htb3ZlPVwib25EcmFnXCJcbiAgICBAbW91c2V1cD1cInN0b3BEcmFnXCJcbiAgICBAdG91Y2hlbmQ9XCJzdG9wRHJhZ1wiXG4gICAgQG1vdXNlbGVhdmU9XCJzdG9wRHJhZ1wiXG4gID5cbiAgICA8c3ZnIGNsYXNzPVwiYmdcIiB3aWR0aD1cIjMyMFwiIGhlaWdodD1cIjU2MFwiPlxuICAgICAgPHBhdGggOmQ9XCJoZWFkZXJQYXRoXCIgZmlsbD1cIiMzRjUxQjVcIj48L3BhdGg+XG4gICAgPC9zdmc+XG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPuuTnOugiOq3uCDtlbTrs7TshLjsmpQ8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIDpzdHlsZT1cImNvbnRlbnRQb3NpdGlvblwiPuyViOuFlTwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG4uZHJhZ2dhYmxlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMTZweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICB3aWR0aDogMzIwcHg7XG4gIGhlaWdodDogMjQwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogMzBweCBhdXRvO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogMzAwO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xufVxuLmJnIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDA7XG59XG4uaGVhZGVyLFxuLmNvbnRlbnQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDE7XG4gIHBhZGRpbmc6IDMwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uaGVhZGVyIHtcbiAgY29sb3I6ICNmZmY7XG4gIGhlaWdodDogMTIwcHg7XG4gIGZvbnQtc2l6ZTogMmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cbjwvc3R5bGU+XG4iLCJpbXBvcnQtbWFwLmpzb24iOiJ7XG4gIFwiaW1wb3J0c1wiOiB7XG4gICAgXCJ2dWVcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvdnVlLnJ1bnRpbWUuZXNtLWJyb3dzZXIuanNcIixcbiAgICBcImR5bmFtaWNzLmpzXCI6IFwiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvZHluYW1pY3MuanNcIixcbiAgICBcInZ1ZS9zZXJ2ZXItcmVuZGVyZXJcIjogXCJodHRwczovL3NmYy52dWVqcy5vcmcvc2VydmVyLXJlbmRlcmVyLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSJ9"
        target="_blank"
        >소스 코드</a
      >
    </div>
  </div>
</template>

<style scoped>
.draggable {
  background-color: #fff;
  box-shadow: var(--vt-shadow-2);
  width: 320px;
  height: 240px;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  user-select: none;
  border-radius: 8px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.header,
.content {
  position: relative;
  z-index: 1;
  padding: 30px;
  box-sizing: border-box;
}
.header {
  color: #fff;
  height: 120px;
  font-size: 2em;
  font-weight: bold;
}
</style>
