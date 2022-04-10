<template>
  <div>
    <header v-if="onHome">
      <nav>
        <span @click="$emit('showDeleteCity')" class="material-icons-outlined">edit</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  emits: ["showDeleteCity"],
  props: {
    onHome: Boolean,
  },
};
</script>

<style lang="scss" scoped>
nav {
  color: white;
  padding: 10px;
  text-align: end;

  span {
    cursor: pointer;
  }
}
</style>