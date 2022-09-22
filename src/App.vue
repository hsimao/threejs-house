<template>
  <div id="nav">
    <router-link to="/">cube</router-link> |
    <router-link to="/sphere">sphere</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
