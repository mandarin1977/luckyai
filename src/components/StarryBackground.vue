<template>
  <div class="starry-background">
    <div class="stars"></div>
    <div class="stars2"></div>
    <div class="stars3"></div>
  </div>
</template>

<style scoped>
.starry-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: radial-gradient(ellipse at bottom, var(--color-primary-light) 0%, var(--color-bg) 100%);
  overflow: hidden;
}

.stars, .stars2, .stars3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.stars {
  background: transparent url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIyNTAiIGN5PSIxNTAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjI1MCIgcj0iMC41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjUiLz48Y2lyY2xlIGN4PSIzNTAiIGN5PSIzNTAiIHI9IjEuNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC43Ii8+PC9zdmc+') repeat;
  animation: animStar 50s linear infinite;
}

.stars2 {
  background: transparent url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSIxLjUiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNyIvPjxjaXJjbGUgY3g9IjUwMCIgY3k9IjMwMCIgcj0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC45Ii8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iNDUwIiByPSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=') repeat;
  animation: animStar 100s linear infinite;
}

.stars3 {
  background: transparent url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxNTAiIHI9IjIiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNiIvPjxjaXJjbGUgY3g9IjcwMCIgY3k9IjUwMCIgcj0iMS41IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSI0MDAiIGN5PSI3MDAiIHI9IjEiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==') repeat;
  animation: animStar 150s linear infinite;
}

@keyframes animStar {
  from { transform: translateY(0px); }
  to { transform: translateY(-1000px); }
}
</style>
