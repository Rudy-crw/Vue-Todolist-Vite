<template>
  <div>
    <CountShow></CountShow>
  </div>
  <h1>Try Try Pinia Page</h1>
  <p>This is countStore: {{ countStore.count }}</p>
  這是用 countStore.count的v-model :
  <input type="number" v-model.number="countStore.count" />
  <br />
  這是用 storeToRefs的方法取 count的v-model :
  <input type="number" v-model.number="count" />

  <br />
  doubleCount value: {{ doubleCount }}

  <button @click="increment">++</button>
</template>

<script setup>
import CountShow from '@/components/CountShow.vue'
// Pinia
import { useCountStore } from '../store/countStore'
import { storeToRefs } from 'pinia'

const countStore = useCountStore()
const { count, doubleCount } = storeToRefs(countStore)
const { increment } = countStore
</script>

<style>
h1 {
  font-size: 32px;
  line-height: 1.2;
}
p {
  font-size: 16px;
  line-height: 1.5;
}
</style>
