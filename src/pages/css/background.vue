<template>
  <div class="container">
    <h2>CSS Background Properties Demo</h2>
    <p>Explore the power of CSS background properties.</p>

    <!-- 1. Background Color & Image -->
    <div class="section">
      <h3>1. Basic Color & Image</h3>
      <div class="grid">
        <div class="card">
          <h4>Color (Hex/RGB/HSL)</h4>
          <div class="demo-box bg-color"></div>
          <p>background-color: #3b82f6;</p>
        </div>
        <div class="card">
          <h4>Image (URL)</h4>
          <div class="demo-box bg-image"></div>
          <p>background-image: url('...');</p>
        </div>
      </div>
    </div>

    <!-- 2. Background Size -->
    <div class="section">
      <h3>2. Background Size</h3>
      <div class="grid">
        <div class="card">
          <h4>Auto (Default)</h4>
          <div class="demo-box bg-image bg-size-auto"></div>
          <p>background-size: auto;</p>
        </div>
        <div class="card">
          <h4>Cover</h4>
          <div class="demo-box bg-image bg-size-cover"></div>
          <p>background-size: cover;</p>
        </div>
        <div class="card">
          <h4>Contain</h4>
          <div class="demo-box bg-image bg-size-contain"></div>
          <p>background-size: contain;</p>
        </div>
        <div class="card">
          <h4>Specific (50px)</h4>
          <div class="demo-box bg-image bg-size-specific"></div>
          <p>background-size: 50px;</p>
        </div>
      </div>
    </div>

    <!-- 3. Background Position -->
    <div class="section">
      <h3>3. Background Position</h3>
      <div class="grid">
        <div class="card">
          <h4>Top Left (Default)</h4>
          <div class="demo-box bg-image bg-no-repeat bg-pos-tl"></div>
          <p>background-position: 0 0;</p>
        </div>
        <div class="card">
          <h4>Center</h4>
          <div class="demo-box bg-image bg-no-repeat bg-pos-center"></div>
          <p>background-position: center;</p>
        </div>
        <div class="card">
          <h4>Bottom Right</h4>
          <div class="demo-box bg-image bg-no-repeat bg-pos-br"></div>
          <p>background-position: bottom right;</p>
        </div>
        <div class="card">
          <h4>Percentage (20% 80%)</h4>
          <div class="demo-box bg-image bg-no-repeat bg-pos-percent"></div>
          <p>background-position: 20% 80%;</p>
        </div>
      </div>
    </div>

    <!-- 4. Background Repeat -->
    <div class="section">
      <h3>4. Background Repeat</h3>
      <div class="grid">
        <div class="card">
          <h4>Repeat (Default)</h4>
          <div class="demo-box bg-tiny bg-repeat"></div>
          <p>background-repeat: repeat;</p>
        </div>
        <div class="card">
          <h4>No Repeat</h4>
          <div class="demo-box bg-tiny bg-no-repeat bg-pos-center"></div>
          <p>background-repeat: no-repeat;</p>
        </div>
        <div class="card">
          <h4>Repeat X</h4>
          <div class="demo-box bg-tiny bg-repeat-x"></div>
          <p>background-repeat: repeat-x;</p>
        </div>
        <div class="card">
          <h4>Repeat Y</h4>
          <div class="demo-box bg-tiny bg-repeat-y"></div>
          <p>background-repeat: repeat-y;</p>
        </div>
        <div class="card">
          <h4>Space</h4>
          <div class="demo-box bg-tiny bg-repeat-space"></div>
          <p>background-repeat: space;</p>
        </div>
        <div class="card">
          <h4>Round</h4>
          <div class="demo-box bg-tiny bg-repeat-round"></div>
          <p>background-repeat: round;</p>
        </div>
      </div>
    </div>

    <!-- 5. Background Attachment -->
    <div class="section">
      <h3>5. Background Attachment</h3>
      <div class="grid">
        <div class="card">
          <h4>Scroll (Default)</h4>
          <div class="demo-box scroll-box bg-attach-scroll">
            <div class="content">Scroll content to see background scroll with it.</div>
          </div>
          <p>background-attachment: scroll;</p>
        </div>
        <div class="card">
          <h4>Fixed</h4>
          <div class="demo-box scroll-box bg-attach-fixed">
             <div class="content">Scroll content. Background stays fixed relative to viewport.</div>
          </div>
          <p>background-attachment: fixed;</p>
        </div>
        <div class="card">
          <h4>Local</h4>
          <div class="demo-box scroll-box bg-attach-local">
             <div class="content">Scroll content. Background scrolls with element's content.</div>
          </div>
          <p>background-attachment: local;</p>
        </div>
      </div>
    </div>

    <!-- 6. Background Clip -->
    <div class="section">
      <h3>6. Background Clip</h3>
      <div class="grid">
        <div class="card">
          <h4>Border Box (Default)</h4>
          <div class="demo-box border-dashed bg-clip-border"></div>
          <p>background-clip: border-box;</p>
        </div>
        <div class="card">
          <h4>Padding Box</h4>
          <div class="demo-box border-dashed bg-clip-padding"></div>
          <p>background-clip: padding-box;</p>
        </div>
        <div class="card">
          <h4>Content Box</h4>
          <div class="demo-box border-dashed bg-clip-content"></div>
          <p>background-clip: content-box;</p>
        </div>
        <div class="card">
          <h4>Text</h4>
          <div class="demo-box bg-clip-text">Background Clip Text</div>
          <p>background-clip: text;</p>
        </div>
      </div>
    </div>

    <!-- 7. Background Origin -->
    <div class="section">
      <h3>7. Background Origin</h3>
      <div class="grid">
        <div class="card">
          <h4>Border Box</h4>
          <div class="demo-box border-dashed bg-origin-border bg-no-repeat bg-tiny"></div>
          <p>background-origin: border-box;</p>
        </div>
        <div class="card">
          <h4>Padding Box (Default)</h4>
          <div class="demo-box border-dashed bg-origin-padding bg-no-repeat bg-tiny"></div>
          <p>background-origin: padding-box;</p>
        </div>
        <div class="card">
          <h4>Content Box</h4>
          <div class="demo-box border-dashed bg-origin-content bg-no-repeat bg-tiny">
            Content
          </div>
          <p>background-origin: content-box;</p>
        </div>
      </div>
    </div>

    <!-- 8. Gradients -->
    <div class="section">
      <h3>8. Gradients</h3>
      <div class="grid">
        <div class="card">
          <h4>Linear Gradient</h4>
          <div class="demo-box bg-linear"></div>
          <p>linear-gradient(to right, ...)</p>
        </div>
        <div class="card">
          <h4>Radial Gradient</h4>
          <div class="demo-box bg-radial"></div>
          <p>radial-gradient(circle, ...)</p>
        </div>
        <div class="card">
          <h4>Conic Gradient</h4>
          <div class="demo-box bg-conic"></div>
          <p>conic-gradient(...)</p>
        </div>
         <div class="card">
          <h4>Repeating Linear</h4>
          <div class="demo-box bg-repeat-linear"></div>
          <p>repeating-linear-gradient(...)</p>
        </div>
      </div>
    </div>

    <!-- 9. Multiple Backgrounds -->
    <div class="section">
      <h3>9. Multiple Backgrounds</h3>
      <div class="grid">
        <div class="card" style="grid-column: span 2;">
          <h4>Layering Images</h4>
          <div class="demo-box bg-multiple"></div>
          <p>background: url(small), url(large), linear-gradient(...)</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: sans-serif;
}

h2 {
  margin-bottom: 10px;
  color: #1f2937;
}

.section {
  margin-bottom: 40px;
}

h3 {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #374151;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);

  h4 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    color: #4b5563;
  }

  p {
    margin-top: 10px;
    font-size: 0.75rem;
    color: #6b7280;
    font-family: monospace;
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
    word-break: break-all;
  }
}

.demo-box {
  width: 100%;
  height: 120px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

/* --- Common Background Image (Placeholder) --- */
/* Using a CSS pattern or gradient as 'image' to avoid external dependencies if possible, 
   but for 'image' demos, let's use a reliable placeholder service or a generated svg data uri */
$bg-url: url('https://picsum.photos/id/1018/300/200');
$bg-tiny-url: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzYjgyZjYiIHN0cm9rZS13aWR0aD0iMiI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iNSIvPjwvc3ZnPg==');

.bg-color {
  background-color: #3b82f6;
}

.bg-image {
  background-image: $bg-url;
}

.bg-tiny {
  background-image: $bg-tiny-url;
  background-color: #eff6ff;
}

/* --- Size --- */
.bg-size-auto { background-size: auto; }
.bg-size-cover { background-size: cover; background-position: center; }
.bg-size-contain { background-size: contain; background-repeat: no-repeat; background-position: center; }
.bg-size-specific { background-size: 50px 50px; }

/* --- Position --- */
.bg-pos-tl { background-position: top left; }
.bg-pos-center { background-position: center; }
.bg-pos-br { background-position: bottom right; }
.bg-pos-percent { background-position: 20% 80%; }

/* --- Repeat --- */
.bg-repeat { background-repeat: repeat; }
.bg-no-repeat { background-repeat: no-repeat; }
.bg-repeat-x { background-repeat: repeat-x; }
.bg-repeat-y { background-repeat: repeat-y; }
.bg-repeat-space { background-repeat: space; }
.bg-repeat-round { background-repeat: round; }

/* --- Attachment --- */
.scroll-box {
  overflow-y: scroll;
  background-image: $bg-url;
  /* Make sure background is large enough to notice scrolling */
  background-size: cover; 
}
.bg-attach-scroll { background-attachment: scroll; }
.bg-attach-fixed { background-attachment: fixed; }
.bg-attach-local { background-attachment: local; }

.content {
  height: 200%; /* Force scrollbar */
  padding: 10px;
  color: white;
  text-shadow: 0 1px 2px black;
  font-weight: bold;
}

/* --- Clip --- */
.border-dashed {
  border: 10px dashed rgba(59, 130, 246, 0.5);
  padding: 20px;
  background-color: #fbbf24; /* Inner color */
}
.bg-clip-border { background-clip: border-box; }
.bg-clip-padding { background-clip: padding-box; }
.bg-clip-content { background-clip: content-box; }

.bg-clip-text {
  background-image: linear-gradient(to right, #3b82f6, #ef4444, #10b981);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Origin --- */
.bg-origin-border { background-origin: border-box; }
.bg-origin-padding { background-origin: padding-box; }
.bg-origin-content { background-origin: content-box; }

/* --- Gradients --- */
.bg-linear {
  background-image: linear-gradient(to right, #3b82f6, #9333ea);
}
.bg-radial {
  background-image: radial-gradient(circle, #3b82f6, #1e3a8a);
}
.bg-conic {
  background-image: conic-gradient(from 45deg, #ef4444, #fbbf24, #10b981, #3b82f6, #ef4444);
}
.bg-repeat-linear {
  background-image: repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, #eff6ff 10px, #eff6ff 20px);
}

/* --- Multiple --- */
.bg-multiple {
  /* Layer 1: Small circle (top)
     Layer 2: Linear gradient (middle)
     Layer 3: Solid color/image (bottom) */
  background-image: 
    url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIvPjwvc3ZnPg=='),
    linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)),
    $bg-url;
  
  background-position: center, center, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 50px 50px, cover, cover;
}
</style>
