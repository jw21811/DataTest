<template>
  <h1>二叉搜索树</h1>
  <section id="BST">
    <aside>
      <div class="menu-item">
        <input type="number" placeholder="请输入数字" v-model="currentValue">
        <button @click="insert">插入</button>
        <button @click="remove">删除</button>
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

    private getNode(val: number){
      let current: Node | null = this.root
      let parent: Node | null = null
      let from: 'left' | 'right' | 'root' = 'root'

      while(current){
        if(current.val > val) {
          parent = current
          current = current.left
          from = 'left'
        }
        else if(current.val < val){
          parent = current
          current = current.right
          from = 'right'
        }
        else break
      }
      return {
        current,
        parent,
        from
      }
    }

    private getSmallestNode(parent:Node | null){
      let current: Node | null = parent
      while(current?.left){
        parent = current
        current = current.left
      }
      return {
        smallest: current,
        parent: parent ===current ? null : parent,
      }
    }

    private getLargestNode(parent:Node | null){
      let current: Node | null = parent
      while(current){
        parent = current
        current = current.right
      }
      return {
        current,
        parent
      }
    }

    // private insertNode(parent: Node, node: Node | null){
    //   if(!node) return
    //
    //   if(parent.val > node.val){
    //     if(!parent.left) {
    //       parent.left = node
    //       return;
    //     }
    //     this.insertNode(parent.left, node)
    //   }
    //   else{
    //     if(!parent.right) {
    //       parent.right = node
    //       return;
    //     }
    //     this.insertNode(parent.right, node)
    //   }
    // }

    insertValue(val: number) {
      let {current, parent} = this.getNode(val)

      if(!parent && !current){
        this.root = new Node(val, null, null)
        return
      }

      if(current){
        current.count++
      }

      if(!current) current = new Node(val, null, null)

      if(parent){
        if(parent.val > val) parent.left = current
        else parent.right = current
      }

      this.size++
    }
    deleteValue(val: number) {
      let {current, parent, from} = this.getNode(val)
      if(!current) {
        console.log(`${val} 不存在`)
        return
      }

      if(current.count > 1){
        current.count--
        return
      }

      if(!current.left && !current.right){
        if(parent){
          if(from === 'left') parent.left = null
          else parent.right = null
        }
        else this.root = null
        return;
      }

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
     return this.size + (this.root ? 1 : 0)
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
      }
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