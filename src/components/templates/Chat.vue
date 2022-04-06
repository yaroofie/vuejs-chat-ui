<template>
  <div class="container mx-auto">
     <header class="sticky top-0 p-5 h-24">
        <slot name="header"></slot>
     </header>
     <perfect-scrollbar class="p-4" style="height: calc(100vh - 12rem)">
         <slot></slot>
     </perfect-scrollbar>
     <footer class="sticky bottom-0 p-5 h-24">
         <slot name="footer"></slot>
     </footer>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
export default {
   components: {
      PerfectScrollbar
   },
}
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>