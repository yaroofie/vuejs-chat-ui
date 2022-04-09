<template>
  <button
    class="btn btn-primary"
    :class="{ 
      'btn-circle': rounded, 
      'rounded-full': !rounded, 
      'btn-xs': xs,
      'btn-sm': sm,
      'btn-md': md,
      'btn-lg': lg,
    }"
  >
    <i
      :class="`
        ${solid ? 'fa-solid' : ''}
        ${icon ? icon : ''}
      `"
    />
    <span v-if="label" v-text="label" class="mx-2"/>
  </button>
</template>

<script>
export default {
  name: "ButtonIcon",
  props: {
    icon: {
      type: String,
    },
    label: {
      type: String,
    },
    rounded: {
      type: Boolean,
    },
    xs: {
      type: Boolean,
    },
    sm: {
      type: Boolean,
    },
    md: {
      type: Boolean,
    },
    lg: {
      type: Boolean,
    },
    solid: {
      type: Boolean,
      default: true,
    },
  },
};
</script>