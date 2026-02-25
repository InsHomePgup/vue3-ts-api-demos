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
// No script logic needed for this simple demo
</script>

<style scoped>
.container-wrapper {
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
}

.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  gap: 10px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 10px;
}

.item {
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 4px;
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