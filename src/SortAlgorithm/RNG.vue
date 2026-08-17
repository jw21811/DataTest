<script lang="ts">
import {type Component, defineComponent, markRaw} from 'vue'

export interface SortAlgorithmComponent {
  id: string;
  component: Component;
}

export default defineComponent({
  name: "RNG",
  emits: ['commit'],
  props:{
    components : {
      type: Array<SortAlgorithmComponent>,
      default: () => []
    }
  },
  data(){
    return {
      min: 0,
      max:100,
      count:100,
      list:markRaw([] as number[]),
      status:{
        generating: false
      }
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
      this.$emit('commit', this.list)
    }
  }
})
</script>

<template>
  <section class="RNG">
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
      <Component v-for="item in components" :is="item.component" :key="item.id" />
    </main>
  </section>
</template>

<style scoped>
section.RNG{
    display: flex;
    flex-direction: row;
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
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }
}
</style>
