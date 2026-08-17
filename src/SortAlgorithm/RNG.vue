<script lang="ts">
import {defineComponent, markRaw, type PropType} from 'vue'
import SortTemplate, {type SortAlgorithm} from "./SortTemplate.vue";



export default defineComponent({
  name: "RNG",
  components: {SortTemplate},
  emits: ['commit'],
  props:{
    algorithms : {
      type: Object as PropType<Array<SortAlgorithm>>,
      default: () => []
    }
  },
  data(){
    return {
      min: 0 as number,
      max:100 as number,
      count:100 as number,
      list:markRaw([] as number[]),
      status:{
        generating: false
      },
      version: 0 as number
    }
  },
  methods:{
    async generate(){
      if (this.status.generating) return

      this.status.generating = true
      console.time('generateRNG')

      try {
        const min = Math.ceil(Math.min(this.min, this.max))
        const max = Math.floor(Math.max(this.min, this.max))
        const count = Math.max(0, Math.trunc(this.count))
        const range = max - min + 1
        const batchSize = 50_000
        const list = new Array<number>(count)

        for(let start = 0; start < count; start += batchSize){
          const end = Math.min(start + batchSize, count)

          for(let i = start; i < end; i++){
            list[i] = Math.floor(Math.random() * range) + min
          }

          if(end < count){
            await new Promise<void>(resolve => setTimeout(resolve, 0))
          }
        }

        this.list = markRaw(list)
      } finally {
        this.status.generating = false
        console.timeEnd('generateRNG')
      }

    },
    commit(){
      this.version ++;
    }
  }
})
</script>

<template>
  <section class="RNG">
    <h1>排序算法专题</h1>
    <header>
      <div class="input-item">
        <label for="min">最小值</label>
        <input type="number" id="min" v-model="min">
      </div>
      <div class="input-item">
        <label for="max">最大值</label>
        <input type="number" id="max" v-model="max">
      </div>
      <div class="input-item">
        <label for="count">数量</label>
        <input type="number" id="count" v-model="count">
      </div>
      <aside>
        <button @click="generate" :disabled="status.generating">生成随机数</button>
        <button @click="commit">提交随机数</button>
      </aside>
    </header>
    <main>
      <template v-for="item in algorithms" :key="item.id">
        <SortTemplate :algorithm="item" :numbers="list" :version="version"/>
      </template>
    </main>
  </section>
</template>

<style scoped>
section.RNG{
    display: flex;
    flex-direction: column;
    header{
        display: flex;
        flex-direction: row;
        gap: 10px;
        .input-item{
            display: flex;
            flex-direction: row;
            gap: 5px;
            label{
                width: 50px;
            }
        }
        aside{
            display: flex;
            flex-direction: row;
            gap: 5px;
        }
    }
    main{
        display: grid;
        grid-template-columns: repeat(4,1fr);
    }
}
</style>
