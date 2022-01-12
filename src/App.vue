<template lang="pug">
div
    button(@click="$router.push({ name: 'Pay' })") Pay
    button(@click="$router.push({ name: 'Home' })") Home
View
</template>

<script lang="ts" setup>
import View from '@/views/view.vue';
</script>

<style lang="scss">
</style>
