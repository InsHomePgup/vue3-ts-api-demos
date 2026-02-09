<template>
  <div class="container">
    <h2>CSS transition-behavior Demo</h2>
    <p>This demo compares <code>normal</code> behavior vs <code>allow-discrete</code> when transitioning the <code>display</code> property.</p>

    <!-- Case 1: Normal Behavior -->
    <div class="demo-section">
      <h3>1. Normal (Default)</h3>
      <p>
        Standard transition on <code>display</code>. When hiding, it disappears immediately. 
        When showing, it appears immediately (no fade-in).
      </p>
      <button @click="showNormal = !showNormal" class="btn">
        {{ showNormal ? 'Hide' : 'Show' }}
      </button>
      <div class="box normal-box" :class="{ hidden: !showNormal }">
        Normal Behavior
      </div>
    </div>

    <!-- Case 2: Allow Discrete -->
    <div class="demo-section">
      <h3>2. Allow Discrete</h3>
      <p>
        Using <code>transition-behavior: allow-discrete</code>. 
        The browser waits for the opacity transition to finish before applying <code>display: none</code>.
        It also supports entry animations using <code>@starting-style</code>.
      </p>
      <button @click="showDiscrete = !showDiscrete" class="btn">
        {{ showDiscrete ? 'Hide' : 'Show' }}
      </button>
      <div class="box discrete-box" :class="{ hidden: !showDiscrete }">
        Allow Discrete
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showNormal = ref(true)
const showDiscrete = ref(true)
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
}

.demo-section {
  margin-bottom: 40px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

h3 {
  margin-top: 0;
  color: #1f2937;
}

p {
  color: #4b5563;
  margin-bottom: 16px;
  line-height: 1.5;
}

code {
  background-color: #f3f4f6;
  padding: 2px 4px;
  border-radius: 4px;
  color: #ef4444;
  font-family: monospace;
}

.btn {
  margin-bottom: 16px;
  padding: 8px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #2563eb;
}

.box {
  width: 100%;
  height: 100px;
  background-color: #8b5cf6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
}

/* 
  Case 1: Normal Behavior 
  Even though we specify transition for opacity and display,
  display is not an interpolable property by default.
  So it snaps to 'none' instantly when class is added, hiding the element immediately.
*/
.normal-box {
  opacity: 1;
  display: flex;
  transition: opacity 1s, display 1s; 
}

.normal-box.hidden {
  opacity: 0;
  display: none;
}

/* 
  Case 2: Allow Discrete 
  We enable discrete transitions for display.
*/
.discrete-box {
  opacity: 1;
  display: flex;
  /* 
    Shorthand syntax: property duration easing behavior 
    OR
    transition-property: display, opacity;
    transition-duration: 1s;
    transition-behavior: allow-discrete, normal;
  */
  transition: opacity 1s, display 1s allow-discrete;
}

/* 
  @starting-style allows the element to transition FROM these values
  when it is first rendered (switching from display: none).
*/
@starting-style {
  .discrete-box {
    opacity: 0;
  }
}

.discrete-box.hidden {
  opacity: 0;
  display: none;
}
</style>