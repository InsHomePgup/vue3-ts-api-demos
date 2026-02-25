<template>
<div class="wrapper">
    <div class="box bg-blue"></div>
    <div class="box bg-red"></div>
    <div class="box bg-green"></div>
    <div class="box bg-yellow"></div>
    <div class="box bg-pink"></div>
    <div class="box bg-gray"></div>
</div>
</template>
<script lang="ts" setup></script>
<style scoped>
    .wrapper{
        display: grid;
        grid-template-columns: 200px 100px 50px;
        grid-template-rows: 100px 50px 30px 50px 20px 50px;
    }

    .box{
         /* background-color: aqua;    */
         /* width:50px;
         height:50px; */
    }
</style>