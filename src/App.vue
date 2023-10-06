<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
    components: {},
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
html,
body {
    height: 100%;
    margin: 0; /* 기본 마진 제거 */
    padding: 0; /* 기본 패딩 제거 */
}
</style>
