<template>
  <div class="container-wrapper">
    <div class="grid-container">
        <div class="item item-1">Header</div>
        <div class="item item-2">Sidebar</div>
        <div class="item item-3">Main Content</div>
        <div class="item item-4">Footer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.container-wrapper{
    width: 100vw;
    height: 100vh;
}

.grid-container{
    display: grid;
    gap:20px;
    height: 100vh;
    padding: 10px;
    grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";

    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr 60px;
}

.item{
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-1 {
  grid-area: header;
  background-color: #ef4444;
}

.item-2 {
  grid-area: sidebar;
  background-color: #10b981;
}

.item-3 {
  grid-area: main;
  background-color: #3b82f6;
}

.item-4 {
  grid-area: footer;
  background-color: #f59e0b;
}

</style>
