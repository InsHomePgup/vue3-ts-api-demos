<template>
  <div class="font-sans p-5 bg-[#f0f2f5] min-h-100vh">
    <h1>BFC 与外边距合并演示</h1>

    <!-- Case 1: Sibling Margin Collapsing -->
    <div class="bg-white p-5 rounded-lg mb-8 shadow-sm">
      <h2 class="mt-0 text-[#333]">
        1. 兄弟元素外边距合并
      </h2>
      <p class="text-[#666] mb-5 leading-relaxed">
        两个盒子都有 30px 的外边距（红色的底部，蓝色的顶部）。<br>
        <strong>预期总间距：</strong> 60px。<br>
        <strong>实际间距：</strong> 30px（外边距合并取较大值）。
      </p>
      <div class="bg-[#e6f7ff] border-2 border-dashed border-[#1890ff]">
        <div class="w-full h-[100px] text-white flex items-center justify-center font-bold bg-[#ff7875] mb-[30px]">
          下外边距: 30px
        </div>
        <div class="w-full h-[100px] text-white flex items-center justify-center font-bold bg-[#40a9ff] mt-[30px]">
          上外边距: 30px
        </div>
      </div>
    </div>

    <!-- Case 2: Preventing Sibling Margin Collapsing with BFC Wrapper -->
    <div class="bg-white p-5 rounded-lg mb-8 shadow-sm">
      <h2 class="mt-0 text-[#333]">
        2. 解决兄弟元素外边距合并（包裹在 BFC 中）
      </h2>
      <p class="text-[#666] mb-5 leading-relaxed">
        通过将其中一个元素包裹在创建了 BFC 的容器（<code>display: flow-root</code>）中，可以防止兄弟元素之间的外边距合并。
      </p>
      <div class="bg-[#e6f7ff] border-2 border-dashed border-[#1890ff]">
        <div class="w-full h-[100px] text-white flex items-center justify-center font-bold bg-[#ff7875] mb-[30px]">
          下外边距: 30px
        </div>

        <!-- Wrapper with BFC -->
        <div class="flow-root">
          <div class="w-full h-[100px] text-white flex items-center justify-center font-bold bg-[#40a9ff] mt-[30px]">
            上外边距: 30px (包裹在 BFC 中)
          </div>
        </div>
      </div>
    </div>

    <!-- Case 3: Parent-Child Margin Collapsing -->
    <div class="bg-white p-5 rounded-lg mb-8 shadow-sm">
      <h2 class="mt-0 text-[#333]">
        3. 父子元素外边距合并（问题）
      </h2>
      <p class="text-[#666] mb-5 leading-relaxed">
        子元素设置了 <code>margin-top: 50px</code>。<br>
        外边距没有将子元素在父元素内部向下推，而是“溢出”并推动了整个父元素向下。<br>
        注意红色虚线轮廓（父元素边界）与红色盒子的顶部齐平。
      </p>
      <div class="bg-[#fff1f0] outline-2 outline-dashed outline-[#ff4d4f]">
        <div class="w-[100px] h-[100px] bg-[#ff4d4f] mt-[50px] text-white flex items-center justify-center mx-auto">
          子元素 (上外边距 50px)
        </div>
      </div>
    </div>

    <!-- Case 4: Solving Parent-Child Margin Collapsing with BFC -->
    <div class="bg-white p-5 rounded-lg mb-8 shadow-sm">
      <h2 class="mt-0 text-[#333]">
        4. 解决父子元素外边距合并（使用 BFC）
      </h2>
      <p class="text-[#666] mb-5 leading-relaxed">
        父元素设置了 <code>display: flow-root</code>，从而创建了 BFC。<br>
        BFC 会包含其子元素的外边距。现在子元素的外边距会推开父元素的内容框，符合预期。
      </p>
      <div class="bg-[#f6ffed] border-2 border-dashed border-[#52c41a] flow-root">
        <div class="w-[100px] h-[100px] bg-[#ff4d4f] mt-[50px] text-white flex items-center justify-center mx-auto">
          子元素 (上外边距 50px)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Logic here if needed
</script>
