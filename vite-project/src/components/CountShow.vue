<template>
  <div>
    <h1>Components的 code</h1>
    <p>count 的值： {{ countStore.count }}</p>
    <input type="number" v-model.number="countStore.count" />
    <button @click="countStore.increment">累加</button>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script setup>
import { useCountStore } from '../store/countStore'
const countStore = useCountStore()
</script>
