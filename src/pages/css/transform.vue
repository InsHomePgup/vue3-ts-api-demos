<template>
  <div class="container">
    <h2>CSS Transform Comprehensive Demo</h2>
    <p>Hover over the boxes to see the transformations.</p>

    <div class="section-title">2D Transforms</div>
    <div class="grid">
      <!-- Translate -->
      <div class="card">
        <h3>Translate</h3>
        <p>translate(20px, 20px)</p>
        <div class="demo-box translate-box"></div>
      </div>

      <!-- Scale -->
      <div class="card">
        <h3>Scale</h3>
        <p>scale(1.2)</p>
        <div class="demo-box scale-box"></div>
      </div>
      
      <!-- Scale X Only -->
      <div class="card">
        <h3>Scale X</h3>
        <p>scaleX(1.5)</p>
        <div class="demo-box scale-x-box"></div>
      </div>
      
      <!-- Scale Y Only -->
      <div class="card">
        <h3>Scale Y</h3>
        <p>scaleY(0.5)</p>
        <div class="demo-box scale-y-box"></div>
      </div>

      <!-- Rotate -->
      <div class="card">
        <h3>Rotate</h3>
        <p>rotate(45deg)</p>
        <div class="demo-box rotate-box"></div>
      </div>

      <!-- Skew -->
      <div class="card">
        <h3>Skew</h3>
        <p>skew(20deg, 10deg)</p>
        <div class="demo-box skew-box"></div>
      </div>
      
      <!-- Skew X -->
      <div class="card">
        <h3>Skew X</h3>
        <p>skewX(30deg)</p>
        <div class="demo-box skew-x-box"></div>
      </div>
      
      <!-- Skew Y -->
      <div class="card">
        <h3>Skew Y</h3>
        <p>skewY(30deg)</p>
        <div class="demo-box skew-y-box"></div>
      </div>

      <!-- Matrix -->
      <div class="card">
        <h3>Matrix</h3>
        <p>matrix(1, -0.3, 0, 1, 0, 0)</p>
        <div class="demo-box matrix-box"></div>
      </div>
      
      <!-- Transform Origin -->
      <div class="card">
        <h3>Transform Origin</h3>
        <p>top left (0 0)</p>
        <div class="demo-box origin-box"></div>
      </div>
    </div>

    <div class="section-title">3D Transforms & Perspective</div>
    <div class="grid">
      <!-- Rotate X -->
      <div class="card perspective-container">
        <h3>Rotate X</h3>
        <p>rotateX(60deg)</p>
        <div class="demo-box rotate-x-box"></div>
      </div>

      <!-- Rotate Y -->
      <div class="card perspective-container">
        <h3>Rotate Y</h3>
        <p>rotateY(60deg)</p>
        <div class="demo-box rotate-y-box"></div>
      </div>
      
      <!-- Rotate Z -->
      <div class="card perspective-container">
        <h3>Rotate Z</h3>
        <p>rotateZ(60deg)</p>
        <div class="demo-box rotate-z-box"></div>
      </div>

      <!-- Translate Z -->
      <div class="card perspective-container">
        <h3>Translate Z</h3>
        <p>translateZ(50px)</p>
        <div class="demo-box translate-z-box"></div>
      </div>
      
      <!-- Translate Z Negative -->
      <div class="card perspective-container">
        <h3>Translate Z (Negative)</h3>
        <p>translateZ(-50px)</p>
        <div class="demo-box translate-z-neg-box"></div>
      </div>
      
      <!-- Scale 3D -->
      <div class="card perspective-container">
        <h3>Scale 3D</h3>
        <p>scale3d(1, 1, 2) + rotateY</p>
        <div class="demo-box scale-3d-box"></div>
      </div>
      
      <!-- Rotate 3D Vector -->
      <div class="card perspective-container">
        <h3>Rotate 3D (Vector)</h3>
        <p>rotate3d(1, 1, 1, 45deg)</p>
        <div class="demo-box rotate-3d-vector-box"></div>
      </div>

      <!-- Perspective Function -->
      <div class="card">
        <h3>Perspective Function</h3>
        <p>perspective(500px) rotateX(45deg)</p>
        <div class="demo-box perspective-func-box"></div>
      </div>

      <!-- Backface Visibility -->
      <div class="card perspective-container">
        <h3>Backface Visibility</h3>
        <p>hidden (left) vs visible (right)</p>
        <div class="demo-box backface-demo-box">
           <div class="bf-item bf-hidden">Hidden</div>
           <div class="bf-item bf-visible">Visible</div>
        </div>
      </div>

      <!-- Transform Style -->
      <div class="card perspective-container">
        <h3>Transform Style</h3>
        <p>flat (left) vs preserve-3d (right)</p>
        <div class="demo-box style-demo-box">
           <div class="style-wrapper flat-wrapper">
             <div class="style-child">Flat</div>
           </div>
           <div class="style-wrapper preserve-wrapper">
             <div class="style-child">3D</div>
           </div>
        </div>
      </div>
    </div>
    
    <div class="section-title">Complex 3D Objects</div>
    <div class="grid">
      <!-- 3D Card Flip -->
      <div class="card perspective-container">
        <h3>Card Flip</h3>
        <p>rotateY(180deg)</p>
        <div class="scene">
            <div class="card-3d">
              <div class="face front">Front</div>
              <div class="face back">Back</div>
            </div>
        </div>
      </div>

      <!-- 3D Cube -->
      <div class="card cube-card perspective-container">
        <h3>3D Cube</h3>
        <p>rotate3d(1, 1, 0, 360deg)</p>
        <div class="scene-cube">
          <div class="cube">
            <div class="cube-face front">1</div>
            <div class="cube-face back">2</div>
            <div class="cube-face right">3</div>
            <div class="cube-face left">4</div>
            <div class="cube-face top">5</div>
            <div class="cube-face bottom">6</div>
          </div>
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
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 30px 0 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
  color: #1f2937;
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
  min-height: 200px; /* Ensure uniform height */
  
  /* Add perspective for 3D children */
  &.perspective-container {
    perspective: 800px;
  }

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
    text-align: center;
  }
}

.demo-box {
  width: 80px;
  height: 80px;
  background-color: #3b82f6;
  border-radius: 8px;
  transition: transform 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &::after {
    content: 'Box';
  }
}

.origin-box {
  transform-origin: top left;
}

/* --- 2D Transforms --- */
.card:hover {
  .translate-box {
    transform: translate(20px, 20px);
  }

  .scale-box {
    transform: scale(1.2);
  }
  
  .scale-x-box {
    transform: scaleX(1.5);
  }
  
  .scale-y-box {
    transform: scaleY(0.5);
  }

  .rotate-box {
    transform: rotate(45deg);
  }

  .skew-box {
    transform: skew(20deg, 10deg);
  }
  
  .skew-x-box {
    transform: skewX(30deg);
  }
  
  .skew-y-box {
    transform: skewY(30deg);
  }

  .matrix-box {
    transform: matrix(1, -0.3, 0, 1, 0, 0);
  }

  .origin-box {
    transform: rotate(45deg);
  }
}

/* --- 3D Transforms --- */
.card:hover {
  .rotate-x-box {
    transform: rotateX(60deg);
  }

  .rotate-y-box {
    transform: rotateY(60deg);
  }
  
  .rotate-z-box {
    transform: rotateZ(60deg);
  }

  .translate-z-box {
    transform: translateZ(50px);
  }
  
  .translate-z-neg-box {
    transform: translateZ(-50px);
  }
  
  .scale-3d-box {
    /* rotate slightly to see depth/scale Z effect */
    transform: rotateY(45deg) scale3d(1, 1, 2); 
  }
  
  .rotate-3d-vector-box {
    transform: rotate3d(1, 1, 1, 45deg);
  }
  
  .perspective-func-box {
    transform: perspective(500px) rotateX(45deg);
  }
}

/* Backface Visibility */
.backface-demo-box {
  background: transparent;
  box-shadow: none;
  display: flex; /* Changed from justify-content: space-around only */
  justify-content: space-around;
  width: 100%;
  
  &::after {
    content: none;
  }
}

.bf-item {
  width: 45%;
  height: 100%;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 4px;
  transition: transform 1s;
}

.bf-hidden {
  backface-visibility: hidden;
}

.bf-visible {
  backface-visibility: visible;
}

.card:hover .bf-item {
  transform: rotateY(180deg);
}

/* Transform Style */
.style-demo-box {
  background: transparent;
  box-shadow: none;
  display: flex;
  justify-content: space-around;
  width: 100%;
  
  &::after {
    content: none;
  }
}

.style-wrapper {
  width: 45%;
  height: 100%;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 1s;
  /* The wrapper rotates when hovered */
}

.flat-wrapper {
  transform-style: flat;
}

.preserve-wrapper {
  transform-style: preserve-3d;
}

.style-child {
  width: 80%;
  height: 80%;
  background: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  /* Child is permanently rotated X */
  transform: rotateX(60deg); 
}

.card:hover .style-wrapper {
  transform: rotateY(60deg);
}


/* --- Complex 3D Objects --- */

/* Card Flip */
.scene {
  width: 100px;
  height: 140px;
  perspective: 600px;
}

.card-3d {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card:hover .card-3d {
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
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.front {
  background-color: #3b82f6;
}

.back {
  background-color: #ef4444;
  transform: rotateY(180deg);
}


/* 3D Cube */
.scene-cube {
  width: 100px;
  height: 100px;
  perspective: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(-50px); /* Push back to center rotation */
  transition: transform 1s;
}

.cube-card:hover .cube {
  transform: translateZ(-50px) rotateX(360deg) rotateY(360deg);
}

.cube-face {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: rgba(59, 130, 246, 0.8); /* Semi-transparent blue */
}

/* Positioning Cube Faces */
.cube-face.front  { transform: rotateY(0deg) translateZ(50px); background: rgba(59, 130, 246, 0.8); }
.cube-face.back   { transform: rotateY(180deg) translateZ(50px); background: rgba(239, 68, 68, 0.8); }
.cube-face.right  { transform: rotateY(90deg) translateZ(50px); background: rgba(16, 185, 129, 0.8); }
.cube-face.left   { transform: rotateY(-90deg) translateZ(50px); background: rgba(245, 158, 11, 0.8); }
.cube-face.top    { transform: rotateX(90deg) translateZ(50px); background: rgba(139, 92, 246, 0.8); }
.cube-face.bottom { transform: rotateX(-90deg) translateZ(50px); background: rgba(236, 72, 153, 0.8); }

</style>
