<template>
  <div class="container mx-auto">
     <header class="sticky top-0 lg:p-4 h-16 lg:h-24">
        <slot name="header"></slot>
     </header>
     <perfect-scrollbar class="p-4">
         <slot></slot>
     </perfect-scrollbar>
     <footer class="sticky bottom-0 lg:p-4 h-16 lg:h-24">
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

<style scoped>
.ps{
   height: calc(100vh - 8rem);

}
@media (min-width: 1024px) {
   .ps{
      height: calc(100vh - 12rem);
   }
}
</style>