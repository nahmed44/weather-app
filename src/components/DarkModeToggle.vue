<template>
  <div id="page" v-bind:class="{ 'theme-dark': $store.state.toggleValue }" title="Dark Mode Toggle">
    <input
      type="checkbox"
      id="theme-toggle"
      v-model="$store.state.toggleValue"
      @change="$store.dispatch('storeUserPreference')"
    />
    <label for="theme-toggle"><span></span></label>
  </div>
</template>

<script>
export default {
  name: "DarkModeToggle",
};
</script>

<style lang="scss" scoped>
#theme-toggle {
  display: none;

  & + label {
    font-size: var(--toggle-size);
    display: flex;
    height: var(--switch-h);
    width: var(--switch-w);
    border-radius: calc(var(--switch-h) / 2);
    background-size: auto 8em;
    background-position: bottom;
    background-image: linear-gradient(
      180deg,
      #021037 0%,
      #20206a 19%,
      #4184b1 66%,
      #62e7f7 100%
    );
    transition: var(--switch-transition-duration);
    border: 0.125em solid hsl(207, 30%, 95%);
    overflow: hidden;

    span {
      background: #fffad8;
      border-radius: 50%;
      height: var(--switch-h);
      width: var(--switch-h);
      transform: translateX(var(--switch-off-handle-x))
        scale(var(--switch-handle-scale));
      transition: var(--switch-transition-duration);
      cursor: pointer;
      box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
        inset -0.25em -0.25em 0 0 #fbee8e,
        inset -0.3125em -0.3125em 0 0.625em #fff5b2;
      margin-top: var(--switch-off-handle-x);
    }
  }

  &:checked {
    font-size: var(--switch-font-size);

    & + label {
      background-position: top;
      border-color: hsl(207, 30%, 50%);

      span {
        background: transparent;
        transform: translateX(var(--switch-on-handle-x))
          scale(var(--switch-handle-scale));
        box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
          inset -0.5625em -0.5625em 0 0 #fffff7;
      }
    }
  }
}

#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}
</style>