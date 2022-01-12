<template lang="pug">
div Home {{ count }}
button(@click="count++") increment
</template>


<script lang="ts" setup>
import { ref } from 'vue';
const count = ref<number>(0);
</script>

<style lang="scss" scoped></style>