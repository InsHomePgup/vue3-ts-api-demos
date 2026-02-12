<template>
  <div class="container">
    <h2>CSS Transform Demo</h2>
    <p>Hover over the boxes to see the transformations.</p>

    <div class="grid">
      <!-- Translate -->
      <div class="card">
        <h3>Translate</h3>
        <p>transform: translate(20px, 20px)</p>
        <div class="demo-box translate-box"></div>
      </div>

      <!-- Scale -->
      <div class="card">
        <h3>Scale</h3>
        <p>transform: scale(1.2)</p>
        <div class="demo-box scale-box"></div>
      </div>

      <!-- Rotate -->
      <div class="card">
        <h3>Rotate</h3>
        <p>transform: rotate(45deg)</p>
        <div class="demo-box rotate-box"></div>
      </div>

      <!-- Skew -->
      <div class="card">
        <h3>Skew</h3>
        <p>transform: skew(20deg)</p>
        <div class="demo-box skew-box"></div>
      </div>

      <!-- Origin -->
      <div class="card">
        <h3>Transform Origin</h3>
        <p>rotate from top-left</p>
        <div class="demo-box origin-box"></div>
      </div>

      <!-- 3D Rotate -->
      <div class="card">
        <h3>3D Rotate</h3>
        <p>rotateY(180deg)</p>
        <div class="demo-box rotate-3d-box">
            <div class="face front">Front</div>
            <div class="face back">Back</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for pure CSS demos
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  max-width: 1000px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 1.1rem;
    color: #374151;
  }

  p {
    margin-bottom: 20px;
    font-size: 0.85rem;
    color: #6b7280;
    font-family: monospace;
    background: #f3f4f6;
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.demo-box {
  width: 80px;
  height: 80px;
  background-color: #3b82f6;
  border-radius: 8px;
  transition: transform 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  
  &::after {
    content: 'Box';
  }
}

/* Specific Transforms on Hover of the Card */
.card:hover {
  .translate-box {
    transform: translate(20px, 20px);
  }

  .scale-box {
    transform: scale(1.2);
  }

  .rotate-box {
    transform: rotate(45deg);
  }

  .skew-box {
    transform: skew(20deg);
  }

  .origin-box {
    transform-origin: top left;
    transform: rotate(45deg);
  }
}

/* 3D Rotate Specifics */
.rotate-3d-box {
  background-color: transparent;
  perspective: 1000px; /* Enable 3D space */
  transform-style: preserve-3d; /* Children preserve 3D position */
  position: relative;
  
  &::after {
    content: none;
  }
}

.card:hover .rotate-3d-box {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Hide back face when rotated */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  color: white;
}

.front {
  background-color: #3b82f6;
}

.back {
  background-color: #ef4444;
  transform: rotateY(180deg);
}
</style>