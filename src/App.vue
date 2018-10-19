<template>
  <div id="app">
     <transition name="bounce">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.bounce-enter-active {
		animation: bounce-in 0s;
	}
.bounce-leave-active {
  animation: bounce-out 0s;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
