<template>
  <div class="container mx-auto max-w-5xl p-8 text-gray-700 font-sans">
    <h1 class="mb-6 text-center text-3xl font-bold">
      HTML5 语义化标签演示
    </h1>
    <p class="mb-8 text-center text-gray-500">
      语义化标签让页面结构更清晰，有利于 SEO 和无障碍访问 (A11y)。
    </p>

    <!-- 模拟网页布局 -->
    <div class="border-2 border-gray-300 rounded-lg border-dashed bg-gray-50 p-4">
      <!-- Header -->
      <header class="semantic-block border-blue-300 bg-blue-100">
        <span class="tag-label">&lt;header&gt;</span>
        <h2 class="text-2xl font-bold">
          网站标题 / Logo
        </h2>
        <p>通常包含网站标志、主导航或搜索框。</p>
      </header>

      <!-- Nav -->
      <nav class="semantic-block mt-4 border-green-300 bg-green-100">
        <span class="tag-label">&lt;nav&gt;</span>
        <ul class="m-0 flex list-none gap-4 p-0">
          <li><a href="#" class="text-blue-600 hover:underline">首页</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">产品</a></li>
          <li><a href="#" class="text-blue-600 hover:underline">关于我们</a></li>
        </ul>
      </nav>

      <div class="mt-4 flex flex-col gap-4 md:flex-row">
        <!-- Main -->
        <main class="semantic-block flex-1 border-red-300 bg-white">
          <span class="tag-label">&lt;main&gt;</span>
          <h3 class="mb-2 text-xl font-bold">
            主要内容区域
          </h3>
          <p class="mb-4">
            文档的中心主题部分，每个页面应只有一个 main 标签。
          </p>

          <!-- Article -->
          <article class="semantic-block mb-4 border-orange-300 bg-orange-50">
            <span class="tag-label">&lt;article&gt;</span>
            <h4 class="text-lg font-bold">
              独立文章内容
            </h4>
            <p class="mb-2 text-sm text-gray-500">
              发布时间: <time datetime="2023-10-01">2023年10月1日</time> (使用 &lt;time&gt;)
            </p>
            <p>
              这是一个可以独立分发的内容块，比如一篇博客、一条新闻或评论。
            </p>

            <!-- Section -->
            <section class="semantic-block mt-4 border-yellow-300 bg-yellow-50">
              <span class="tag-label">&lt;section&gt;</span>
              <h5 class="font-bold">
                文章章节 1
              </h5>
              <p>文档中的一个通用独立章节。</p>
            </section>
          </article>

          <!-- Figure -->
          <figure class="semantic-block border-gray-300 bg-gray-100 text-center">
            <span class="tag-label">&lt;figure&gt;</span>
            <div class="mx-auto h-32 w-32 flex items-center justify-center rounded bg-gray-300 text-gray-500">
              Image
            </div>
            <figcaption class="mt-2 text-sm text-gray-500">
              <span class="text-xs font-mono">&lt;figcaption&gt;</span>: 图片标题描述
            </figcaption>
          </figure>
        </main>

        <!-- Aside -->
        <aside class="semantic-block w-full border-purple-300 bg-purple-50 md:w-64">
          <span class="tag-label">&lt;aside&gt;</span>
          <h3 class="mb-2 font-bold">
            侧边栏
          </h3>
          <p class="text-sm">
            与周围内容间接相关的内容，如侧边栏导航、广告或作者简介。
          </p>

          <div class="mt-4 border border-purple-100 rounded bg-white p-2">
            <h4 class="text-sm font-bold">
              相关链接
            </h4>
            <ul class="mt-1 list-disc pl-4 text-sm">
              <li>链接 1</li>
              <li>链接 2</li>
            </ul>
          </div>
        </aside>
      </div>

      <!-- Footer -->
      <footer class="semantic-block mt-4 border-gray-400 bg-gray-200">
        <span class="tag-label">&lt;footer&gt;</span>
        <div class="flex items-center justify-between">
          <p>&copy; 2023 公司名称. 版权所有。</p>
          <address class="text-sm not-italic">
            联系我们: <a href="mailto:info@example.com" class="text-blue-600">info@example.com</a>
          </address>
        </div>
      </footer>
    </div>

    <!-- 其他语义化标签展示 -->
    <div class="grid grid-cols-1 mt-10 gap-6 md:grid-cols-2">
      <div class="border rounded bg-white p-4 shadow-sm">
        <h3 class="mb-3 border-b pb-2 font-bold">
          交互元素
        </h3>

        <div class="mb-4">
          <p class="mb-1 text-sm text-gray-500">
            &lt;details&gt; & &lt;summary&gt;
          </p>
          <details class="cursor-pointer border rounded p-2 open:bg-gray-50">
            <summary class="font-medium">
              点击展开查看详情
            </summary>
            <p class="mt-2 pl-4 text-sm text-gray-600">
              这里是详细内容。原生支持折叠/展开效果，无需 JavaScript。
            </p>
          </details>
        </div>

        <div>
          <p class="mb-1 text-sm text-gray-500">
            &lt;progress&gt; & &lt;meter&gt;
          </p>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <label class="text-sm">下载进度:</label>
              <progress value="70" max="100" class="w-full"></progress>
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm">磁盘使用:</label>
              <meter
                value="0.6"
                min="0"
                max="1"
                low="0.3"
                high="0.7"
                optimum="0.2"
                class="w-full"
              ></meter>
            </div>
          </div>
        </div>
      </div>

      <div class="border rounded bg-white p-4 shadow-sm">
        <h3 class="mb-3 border-b pb-2 font-bold">
          文本语义
        </h3>

        <ul class="text-sm space-y-2">
          <li>
            <code class="rounded bg-gray-100 px-1 text-red-500">&lt;mark&gt;</code>:
            <p class="inline">
              一段文本中需要 <mark class="rounded bg-yellow-200 px-1">高亮显示</mark> 的部分。
            </p>
          </li>
          <li>
            <code class="rounded bg-gray-100 px-1 text-red-500">&lt;code&gt; / &lt;kbd&gt;</code>:
            <p class="inline">
              按下 <kbd class="border border-gray-300 rounded bg-gray-100 px-1 text-xs font-mono">Ctrl</kbd> + <kbd class="border border-gray-300 rounded bg-gray-100 px-1 text-xs font-mono">C</kbd> 复制。
            </p>
          </li>
          <li>
            <code class="rounded bg-gray-100 px-1 text-red-500">&lt;abbr&gt;</code>:
            <p class="inline">
              鼠标悬停查看全称：<abbr title="HyperText Markup Language" class="cursor-help border-b border-dotted">HTML</abbr>。
            </p>
          </li>
          <li>
            <code class="rounded bg-gray-100 px-1 text-red-500">&lt;blockquote&gt; / &lt;cite&gt;</code>:
            <blockquote class="my-1 border-l-4 border-gray-300 pl-2 text-gray-600 italic">
              “知之为知之，不知为不知，是知也。”
            </blockquote>
            <p class="text-right text-xs">
              — <cite>《论语》</cite>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需逻辑，纯展示
</script>

<style scoped>
.semantic-block {
  position: relative;
  padding: 1.5rem;
  border-width: 2px;
  border-style: dashed;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.semantic-block:hover {
  border-style: solid;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
  z-index: 10;
}

.tag-label {
  position: absolute;
  top: -0.75rem;
  left: 1rem;
  background-color: inherit;
  border: 1px solid currentColor;
  padding: 0 0.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  color: #555;
}
</style>
