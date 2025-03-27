<template>
    <div class="flex flex-col w-100">
        <div v-for="(item,index) in list" :key="index" :class="item.isSelf?'self-end':'self-start'">
            <div>{{item.content}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const list = ref(
    [
        {
            isSelf: true,
            content: '你好'
        },
        {
            isSelf: false,
            content: '你好'
        }
    ]
);
</script>

<style scoped>

</style>
