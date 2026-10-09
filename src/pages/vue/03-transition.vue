<template>
  <div class="container">
    <h1>Vue Transition Demo (UnoCSS Preset)</h1>

    <div class="demo-section">
      <h3>1. Basic Fade</h3>
      <button class="btn" @click="showFade = !showFade">
        Toggle Fade
      </button>
      <Transition
        enterActiveClass="animate-in fade-in duration-500"
        leaveActiveClass="animate-out fade-out duration-500"
      >
        <p v-if="showFade" class="box">
          Hello Fade
        </p>
      </Transition>
    </div>

    <div class="demo-section">
      <h3>2. Slide Fade</h3>
      <button class="btn" @click="showSlide = !showSlide">
        Toggle Slide
      </button>
      <Transition
        enterActiveClass="animate-in fade-in slide-in-from-right-8 duration-300 ease-out"
        leaveActiveClass="animate-out fade-out slide-out-to-right-8 duration-800 ease-in-out"
      >
        <p v-if="showSlide" class="box">
          Hello Slide
        </p>
      </Transition>
    </div>

    <div class="demo-section">
      <h3>3. Zoom (Replacing Bounce)</h3>
      <p class="mb-2 text-sm text-gray-500">
        Using Zoom In/Out from preset-animations
      </p>
      <button class="btn" @click="showBounce = !showBounce">
        Toggle Zoom
      </button>
      <Transition
        enterActiveClass="animate-in zoom-in duration-300"
        leaveActiveClass="animate-out zoom-out duration-300"
      >
        <div v-if="showBounce" class="box text-center">
          Zoom
        </div>
      </Transition>
    </div>

    <div class="demo-section">
      <h3>4. List Transition (TransitionGroup)</h3>
      <div class="controls">
        <button class="btn" @click="addNumber">
          Add
        </button>
        <button class="btn" @click="removeNumber">
          Remove
        </button>
        <button class="btn" @click="shuffleNumbers">
          Shuffle
        </button>
      </div>
      <TransitionGroup
        tag="ul"
        class="list-container relative"
        enterActiveClass="animate-in fade-in slide-in-from-bottom-4 duration-500"
        leaveActiveClass="animate-out fade-out slide-out-to-bottom-4 duration-500 absolute"
        moveClass="transition-transform duration-500 ease-in-out"
      >
        <li v-for="item in items" :key="item" class="list-item">
          {{ item }}
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shuffle } from 'lodash-es'
import { ref } from 'vue'

// 1. Basic Fade
const showFade = ref(true)

// 2. Slide Fade
const showSlide = ref(true)

// 3. Bounce
const showBounce = ref(true)

// 4. List Transition
const items = ref([1, 2, 3, 4, 5])
let nextNum = 6

const randomIndex = () => Math.floor(Math.random() * items.value.length)

function addNumber() {
  items.value.splice(randomIndex(), 0, nextNum++)
}

function removeNumber() {
  items.value.splice(randomIndex(), 1)
}

function shuffleNumbers() {
  items.value = shuffle(items.value)
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.btn {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #3aa876;
}

.box {
  margin-top: 10px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  display: inline-block;
}

/* 4. List Transition Styles */
.list-container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>
