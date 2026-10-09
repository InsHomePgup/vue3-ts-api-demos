<template>
  <div class="page">
    <h2>CSS border-radius Demo</h2>

    <div class="grid">
      <!-- 1. 统一圆角 | Uniform radius -->
      <div class="card">
        <h3>border-radius: 16px</h3>
        <div class="box radius-uniform" />
      </div>

      <!-- 2. 圆形：宽高相等 + 50% | Circle: equal width/height + 50% -->
      <div class="card">
        <h3>border-radius: 50%</h3>
        <div class="box radius-circle" />
      </div>

      <!-- 3. 椭圆：宽高不等 + 50% | Ellipse: unequal width/height + 50% -->
      <div class="card">
        <h3>ellipse (50%)</h3>
        <div class="box radius-ellipse" />
      </div>

      <!-- 4. 胶囊：超大值会被自动限制 | Pill: oversized values are clamped -->
      <div class="card">
        <h3>pill (9999px)</h3>
        <div class="box radius-pill" />
      </div>

      <!-- 5. 四个角分别设置：左上 右上 右下 左下 | Per corner: top-left, top-right, bottom-right, bottom-left -->
      <div class="card">
        <h3>4 values</h3>
        <p>0 / 24px / 48px / 8px</p>
        <div class="box radius-corners" />
      </div>

      <!-- 6. 水平 / 垂直半径：斜杠分隔 | Horizontal / vertical radii separated by a slash -->
      <div class="card">
        <h3>horizontal / vertical</h3>
        <p>60px / 20px</p>
        <div class="box radius-slash" />
      </div>

      <!-- 7. 单独设置某个角 | Set a single corner -->
      <div class="card">
        <h3>border-top-left-radius</h3>
        <div class="box radius-single" />
      </div>

      <!-- 8. 配合 overflow: hidden 裁剪子内容 | Clip children with overflow: hidden -->
      <div class="card">
        <h3>overflow: hidden</h3>
        <div class="box radius-clip">
          <div class="inner" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.box {
  width: 120px;
  height: 120px;
  background: #6366f1;
}

.radius-uniform {
  border-radius: 16px;
}

.radius-circle {
  border-radius: 50%;
}

.radius-ellipse {
  width: 160px;
  height: 100px;
  border-radius: 50%;
}

.radius-pill {
  width: 160px;
  height: 60px;
  border-radius: 9999px;
}

.radius-corners {
  border-radius: 0 24px 48px 8px;
}

.radius-slash {
  border-radius: 60px / 20px;
}

.radius-single {
  border-top-left-radius: 60px;
}

.radius-clip {
  overflow: hidden;
  border-radius: 24px;
}

.inner {
  width: 80px;
  height: 160px;
  background: #f59e0b;
}
</style>
