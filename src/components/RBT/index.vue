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

    private fixTree(node: Node){
      console.log(node)
      // 如果是根节点，染黑返回
      if (!node || !node.parent) {
        if (node) node.color = "black";
        return;
      }

      const parent = node.parent;
      const grandFather = parent.parent;

      // 如果没有祖父节点，说明 parent 是根
      if (!grandFather) {
        parent.color = "black";
        return;
      }

      // 如果父节点是黑色，不需要修复
      if (parent.color === "black") return;

      // 确定叔叔节点
      const uncle = parent === grandFather.left ? grandFather.right : grandFather.left;
      if(!uncle || uncle.color === "black"){
        // 1. LL 在该情况下直接给祖父节点右旋就行，因为祖父节点一定大于父节点
        if(parent.left === node && grandFather.left === parent) {
          console.log("LL")
          parent.color = "black"
          grandFather.color = "red"
          this.rotateRight(grandFather)
          return;
        }

        // 2. RR 在该情况下直接给祖父节点左旋就行，因为祖父节点一定大于父节点
        if(parent.right === node && grandFather.right === parent){
          console.log("RR")
          parent.color = "black"
          grandFather.color = "red"
          this.rotateLeft(grandFather)
          return;
        }

        // 3. LR 在该情况下，应当先将父节点左旋，弄成LL的情况
        if(grandFather.left === parent && parent.right === node){
          console.log("LR")
          parent.color = "black"
          grandFather.color = "red"
          this.rotateLeft(parent)
          this.rotateRight(grandFather)
          return;
        }

        // 4. RL 在该情况下，应当先将父节点右旋，弄成RR的情况
          console.log("RL")
        if(grandFather.right === parent && parent.left === node){
          parent.color = "black"
          grandFather.color = "red"
          this.rotateRight(parent)
          this.rotateLeft(grandFather)
          return;
        }
      }

      if(uncle?.color === 'red'){
        console.log("uncle is red")
        parent.color = "black"
        uncle.color = "black"
        grandFather.color = "red"
        this.fixTree(grandFather)
      }

    }

    insertValue(val: number) {
      let {target:current, parentOfTarget: parent} = this.getNode(val)

      if(!parent && !current){
        this.root = new Node(val, null,null, null, "black")
        return
      }

      if(current){
        current.count++
        return;
      }

      if(!current) current = new Node(val, parent,null, null, "red")

      if(parent){
        if(parent.val > val) {
          parent.left = current
          current.parent = parent
        }
        else {
          parent.right = current
          current.parent = parent
        }
      }
      this.size++
      this.fixTree(current)
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
    // 左旋节点
    rotateLeft(node: Node){
      if(!node.right) return

      // 1.root的右子节点变成了它的父节点
      let newRoot = node.right
      let parent = node.parent

      // 2.root的父节点不再连接着其父节点，转而连接着root的右子节点（newRoot）
      if(parent){
        newRoot.parent = parent
        if(parent.left === node) parent.left = newRoot
        else parent.right = newRoot
      }
      else{
        this.root = newRoot
        this.root.parent = null
      }

      // 3.newRoot的左子节点变成了root的右子节点，因为newRoot的左子节点一定比root大
      node.right = newRoot.left
      if(newRoot.left) newRoot.left.parent = node

      // 4.newRoot的左子节点变成了root，因为newRoot一定比root大
      newRoot.left = node
      node.parent = newRoot

    }
    // 右旋节点
    rotateRight(node: Node){
      if(!node.left) return
      // 1.root的左子节点变成了它的父节点
      let newRoot = node.left

      if(node.parent){
        newRoot.parent = node.parent
        if(node.parent.left === node) node.parent.left = newRoot
        else node.parent.right = newRoot
      }
      else{
        this.root = newRoot
        this.root.parent = null
      }

      node.left = newRoot.right
      if(newRoot.right) newRoot.right.parent = node

      // 4.newRoot的左子节点变成了root，因为newRoot一定比root大
      newRoot.right = node
      node.parent = newRoot
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