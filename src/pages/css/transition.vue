<template>
  <div class="container">
    <h3>Position Transition Demo</h3>
    <p>Click the button to animate the box position.</p>

    <div class="position-relative demo-area">
      <div
        class="box position-absolute"
        :class="{ moved: isMoved }"
      ></div>
    </div>

    <button class="btn" @click="isMoved = !isMoved">
      {{ isMoved ? 'Reset' : 'Move' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMoved = ref(false)
</script>

<style scoped>
.container {
    padding: 20px;
}

.demo-area {
    width: 100%;
    height: 300px;
    border: 1px dashed #ccc;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    /* Ensure position-relative is effective if class not available */
    position: relative;
}

.box {
    width: 60px;
    height: 60px;
    background-color: #3b82f6;
    border-radius: 8px;

    /* Initial Position */
    top: 20px;
    left: 20px;

    /* Transition Property */
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    /* Ensure position-absolute is effective if class not available */
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
}

.box::after {
    content: 'Box';
}

.moved {
    /* Target Position */
    top: 200px;
    left: 80%;
    background-color: #ef4444;
    transform: rotate(45deg);
}

.btn {
    padding: 8px 16px;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn:hover {
    background-color: #059669;
}
</style>
