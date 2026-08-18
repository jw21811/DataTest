<template>
  <h1>二叉搜索树</h1>
  <section id="BST">
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
      <BSTDrawer :tree="tree"/>
    </main>
  </section>
</template>

<script lang="ts">
  import BSTDrawer from "./BSTDrawer.vue";

  export class BST{
    size: number;
    root: Node | null;
    constructor() {
      this.size = 0
      this.root = null
    }

    insertValue(val: number) {
    }
    deleteValue(val: number) {
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
    constructor(val: number, left: Node | null, right: Node | null) {
      this.val = val
      this.left = left
      this.right = right
      this.count = 1
    }
    val:number;
    left:Node | null;
    right:Node | null;
    count: number;
  }


  export default {
    name: 'BST',
    components: {BSTDrawer},
    data(){
      return{
        tree: new BST(),
        currentValue: null as number | null
      }
    },
    methods:{
      insert(){
        if(null === this.currentValue || undefined === this.currentValue) return
        this.tree.insertValue(this.currentValue)
      },
      remove() {
        if(null === this.currentValue || undefined === this.currentValue) return
        this.tree.deleteValue(this.currentValue)
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
#BST{
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