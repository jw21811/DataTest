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
      <RBTDrawer :tree="tree"/>
    </main>
  </section>
</template>

<script lang="ts">
  import RBTDrawer from "./RBTDrawer.vue";

  export class RBT{
    size: number;
    root: Node | null;
    constructor() {
      this.size = 0
      this.root = null
    }

    private getNode(val: number) : {target: Node | null, parentOfTarget: Node | null, from: 'left' | 'right' | null} {
      let current: Node | null = this.root
      let parent: Node | null = null
      let from: 'left' | 'right' | null = null

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
        target: current,
        parentOfTarget: parent,
        from
      }
    }

    private getSmallestNode(parent:Node | null) : {smallest: Node | null, parent: Node | null} {
      let current: Node | null = parent
      while(current?.left){
        parent = current
        current = current.left
      }
      return {
        smallest: current,
        parent: parent === current ? null : parent,
      }
    }

    private getLargestNode(parent:Node | null) : {largest: Node | null, parent: Node | null} {
      let current: Node | null = parent
      while(current){
        parent = current
        current = current.right
      }
      return {
        largest: current,
        parent: parent === current ? null : parent,
      }
    }

    // 中序遍历节点, 左中右
    private inOrderOfNode(node: Node | null) : Array<number> {
      return node ? [...(this.inOrderOfNode(node.left)), node.val, ...(this.inOrderOfNode(node.right))] : []
    }
    // 先序遍历节点, 中左右
    private preOrderOfNode(node: Node | null) : Array<number> {
      return node ? [node.val, ...(this.preOrderOfNode(node.left)), ...(this.preOrderOfNode(node.right))] : []
    }
    // 后序遍历节点, 左右中
    private postOrderOfNode(node: Node | null) : Array<number> {
      return node ? [...(this.postOrderOfNode(node.left)), ...(this.postOrderOfNode(node.right)), node.val,] : []
    }

    insertValue(val: number) {
      let {target:current, parentOfTarget: parent} = this.getNode(val)

      if(!parent && !current){
        this.root = new Node(val, null, null)
        return
      }

      if(current){
        current.count++
        return;
      }

      if(!current) current = new Node(val, null, null)

      if(parent){
        if(parent.val > val) parent.left = current
        else parent.right = current
      }

      this.size++
    }
    deleteValue(val: number) {
      let {target:current, parentOfTarget: parent, from} = this.getNode(val)
      if(!current) {
        console.log(`${val} 不存在`)
        return
      }

      if(current.count > 1){
        current.count--
        return
      }

      // 若当前节点没有子树，直接删除
      if(!current.left && !current.right){
        if(!parent || from === null) {
          this.root = null
          return;
        }
        parent[from] = null
        this.size --
        return;
      }

      // 若当前节点只有右子树，则只需要将该节点的右子树拉过来用就行
      if(!current.left && current.right){
        if(!parent || from === null) {
          this.root = current.right
          return;
        }
        parent[from] = current.right
        this.size --
        return;
      }

      // 若当前节点只有左子树，则将其左子树拉过来用就行
      if(current.left && !current.right){
        if(!parent || from === null) {
          this.root = current.left
          return;
        }
        parent[from] = current.left
        this.size --
        return;
      }

      // 若当前节点两者都有，则需要使用其左子树最大节点与右子树最小节点拉过来代替他
      // 我们约定使用右子树最小节点
      let {smallest,parent:parentOfSmallest} = this.getSmallestNode(current.right)
      console.log("当前节点:",current)
      console.log("最小右子树:",smallest)
      console.log("最小右子树的父节点:",parentOfSmallest)

      // 如果parentOfSmallest是null，意味着其右子树完全没有左子树，此时只需要将节点上移
      if(parentOfSmallest){
        // 右子树最小节点一定不存在左子树，因此我们需要将其右子树作为其父节点的左子树
        parentOfSmallest.left = smallest?.right
      }

      // 然后，将最小节点拉上去，替换当前节点
      // 若当前节点是根节点，需要修改指针
      smallest.left = current.left
      if(smallest !== current.right) smallest.right = current.right
      if(!parent || from === null){
        this.root = smallest
      }
      else{
        parent[from] = smallest
      }
      this.size --
    }
    search(val: number) {
      return (this.getNode(val)).target

    }
    inOrder() {
      return this.inOrderOfNode(this.root)
    }
    preOrder() {
      return this.preOrderOfNode(this.root)
    }
    postOrder() {
      return this.postOrderOfNode(this.root)
    }
    getSize() {
     return this.size + (this.root ? 1 : 0)
    }

  }
  export class Node{
    constructor(val: number, left: Node | null, right: Node | null, color: string | "red" | "black" | null = null) {
      this.val = val
      this.left = left
      this.right = right
      this.count = 1
      this.color = color ?? "red"
    }
    val:number;
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
        tree: new RBT(),
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