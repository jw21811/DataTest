<template>
  <h1>红黑树</h1>
  <section id="RBT">
    <aside>
      <div class="menu-item">
        <input type="number" placeholder="请输入数字" v-model="currentValue">
        <button @click="insert">插入</button>
        <button @click="remove">删除</button>
        <button @click="search">搜索</button>
        <button @click="getSize">树节点数量</button>
        <button @click="getPreOrder">先序遍历</button>
        <button @click="getInOrder">中序遍历</button>
        <button @click="getPostOrder">后序遍历</button>
      </div>
    </aside>
    <main>
      <RBTDrawer :tree="tree" :version="treeVersion"/>
    </main>
  </section>
</template>

<script lang="ts">
  import RBTDrawer from "./RBTDrawer.vue";
  import {markRaw} from "vue";

  export class RBT{
    size: number;
    root: Node | null;
    constructor() {
      this.size = 0
      this.root = null
    }

    insertValue(val: number) {

    }
    // 左旋节点
    rotateLeft(node: Node){


    }
    // 右旋节点
    rotateRight(node: Node){

    }


    search(val: number) {

    }
    inOrder() {
    }
    preOrder() {
    }
    postOrder() {
    }
    getSize() {
    }

  }
  export class Node{
    constructor(val: number, parent: Node | null, left: Node | null, right: Node | null, color: string | "red" | "black" | null = null) {
      this.val = val
      this.parent = parent
      this.left = left
      this.right = right
      this.count = 1
      this.color = color ?? "red"
    }
    val:number;
    parent: Node | null;
    left:Node | null;
    right:Node | null;
    count: number;
    color: string | "red" | "black"
  }


  export default {
    name: 'RBT',
    components: {RBTDrawer},
    data(){
      return{
        tree: markRaw(new RBT()),
        currentValue: null as number | null,
        treeVersion: 0
      }
    },
    methods:{
      insert(){
        if(null === this.currentValue || undefined === this.currentValue) return
        this.tree.insertValue(this.currentValue)
        this.treeVersion++
      },
      remove() {
        if(null === this.currentValue || undefined === this.currentValue) return
        this.tree.deleteValue(this.currentValue)
        this.treeVersion++
      },
      search() {
        if(null === this.currentValue || undefined === this.currentValue) return
        this.tree.search(this.currentValue)
        console.log(`搜索值:${this.currentValue}的结果:`,this.tree.search(this.currentValue))
      },
      getSize() {
        console.log("树节点数量：",this.tree.getSize())
      },
      getInOrder() {
        console.log("中序遍历树的结果",this.tree.inOrder())
      },
      getPreOrder() {
        console.log("先序遍历树的结果",this.tree.preOrder())
      },
      getPostOrder() {
        console.log("后序遍历树的结果：",this.tree.postOrder())
      },
    }
  }
</script>


<style scoped>
#RBT{
  display: flex;
  flex-direction: column;
  aside{
    display: flex;
    flex-direction: row;
    gap: 10px;
    .menu-item{
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  }
  main{
    width: 100%;
    height: 100%;
    min-height: 0;
    background-color: wheat;
  }
}
</style>