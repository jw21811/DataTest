<script lang="ts">
import {defineComponent, nextTick, type PropType} from 'vue'

export interface SortAlgorithm {
  id: string;
  name: string;
  sort: Function;
}

export default defineComponent({
  props: {
    algorithm: {
      type: Object as PropType<SortAlgorithm>,
      default: null
    },
    numbers: {
      type: Array<number>,
      default: () => []
    },
    version: {
      type: Number,
      default: () => 0
    }
  },
  name: "SortTemplate",
  data() {
    return {
      beginTime: 0 as number,
      endTime: 0 as number,
      isOrdered:false,
      isEnabled: true
    }
  },
  watch: {
    version() {
      if(!this.isEnabled) return
      nextTick(() => {
        const copy = [...this.numbers]
        this.beginTime = performance.now()
        const res =  this.algorithm.sort(copy)
        this.endTime = performance.now()
        nextTick(()=>{
          this.testNumbers(res)
        })
      })
    }
  },
  methods:{
    testNumbers(numbers: Array<number>){
      if(!numbers || !Array.isArray(numbers)) return;

      let last = null
      for (const n of numbers) {
        if(null === last) last = n
        if(last > n) {
          console.log("数组未完成排序！", numbers)
          console.log("错误值：", last, n)
          this.isOrdered = false
          return
        }
      }
      this.isOrdered = true
    }
  }
})
</script>

<template>
  <section class="SortTemplate">
    <header>
      <h3>{{ algorithm.name }}</h3>
    </header>
    <main :class="{disabled: !isEnabled}">
      <div>
        <label>启用排序</label>
        <input type="checkbox" v-model="isEnabled"/>
      </div>
      <span>开始时间: {{ beginTime }}</span>
      <span>结束时间: {{ endTime }}</span>
      <span>排序用时: {{ (endTime - beginTime).toFixed(6) }} ms</span>
      <div class="result">
        <span>数组有序: </span>
        <span :class="{ok: isOrdered, err:!isOrdered}">{{isOrdered}}</span>
      </div>
    </main>
  </section>
</template>

<style scoped>
section.SortTemplate {
  display: flex;
  flex-direction: column;

  main {
    display: flex;
    flex-direction: column;
    &.disabled{
      opacity: 0.5;
    }
    .result{
      display: flex;
      flex-direction: row;
      span{
        &.ok{
          color: green;
        }
        &.err{
          color: red;
        }
      }
    }
  }
}
</style>