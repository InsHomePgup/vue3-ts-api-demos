<template>
  <div />
</template>

<script setup lang="ts">
// function task(callback) {
//     console.log("Task started");
//     setTimeout(() => {
//         console.log("Task finished");
//         callback();  // 在任务完成时调用回调函数
//     }, 1000);
// }
//
// function afterTask() {
//     console.log("After task is done");
// }
//
// // 调用函数并传递回调
// task(afterTask);
//
// function syncFunction() {
//     console.log("Sync function finished");
// }
//
// function asyncFunction():Promise<void> {
//     return new Promise(resolve => {
//         syncFunction();
//         resolve();  // 用 `resolve` 来标记同步函数执行完毕
//     });
// }
//
// async function main() {
//     await asyncFunction();  // 使用 `await` 等待同步函数完成
//     console.log("After sync function");
// }
//
// main();

function taskWithEvent() {
  setTimeout(() => {
    console.log('Task finished')
    const event = new Event('taskComplete')
    document.dispatchEvent(event) // 触发自定义事件
  }, 1000)
}

function waitForTask() {
  return new Promise((resolve) => {
    document.addEventListener('taskComplete', resolve)
  })
}

async function main() {
  taskWithEvent()
  await waitForTask() // 等待 taskComplete 事件
  console.log('After task')
}

main()
</script>

<style scoped>

</style>
