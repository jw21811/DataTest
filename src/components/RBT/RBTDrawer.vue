<template>
  <div class="rbt-canvas">
    <svg
        :width="svgWidth"
        :height="svgHeight"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    >
      <!-- 连线 -->
      <g class="edges">
        <line
            v-for="edge in edges"
            :key="edge.id"
            :x1="edge.x1"
            :y1="edge.y1"
            :x2="edge.x2"
            :y2="edge.y2"
            stroke="#555"
            stroke-width="2"
        />
      </g>

      <!-- 节点 -->
      <g class="nodes">
        <g
            v-for="node in nodes"
            :key="node.id"
            :transform="`translate(${node.x}, ${node.y})`"
        >
          <circle
              :r="nodeRadius"
              :fill="node.color"
              stroke="#333"
              stroke-width="2"
          />

          <text
              text-anchor="middle"
              dominant-baseline="central"
              class="node-value"
          >
            {{ node.val }}
          </text>

          <!-- 重复数量 -->
          <text
              v-if="node.count > 1"
              :x="nodeRadius * 0.01"
              :y="-nodeRadius * 0.6"
              text-anchor="middle"
              dominant-baseline="central"
              class="node-count"
          >
            ×{{ node.count }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { RBT, Node } from './index.vue'

interface DrawNode {
  id: number
  val: number
  count: number
  x: number
  y: number
  depth: number
  color: string
}

interface DrawEdge {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
}

export default {
  name: 'RBTDrawer',

  props: {
    tree: {
      type: Object as () => RBT,
      required: true
    }
  },

  data() {
    return {
      nodeRadius: 25,

      horizontalGap: 60,

      verticalGap: 80,

      nodes: [] as DrawNode[],

      edges: [] as DrawEdge[],

      svgWidth: 800,

      svgHeight: 400,

      nodeId: 0,

      edgeId: 0
    }
  },

  watch: {
    tree: {
      deep: true,
      immediate: true,
      handler() {
        this.draw()
      }
    }
  },

  methods: {
    draw() {
      this.nodes = []
      this.edges = []

      this.nodeId = 0
      this.edgeId = 0

      if (!this.tree.root) {
        this.svgWidth = 800
        this.svgHeight = 200
        return
      }

      /*
       * 第一遍：
       *
       * 计算每个节点应该位于第几个位置。
       *
       * 这里使用中序遍历。
       *
       * BST：
       *
       *          50
       *        /    \
       *      30      70
       *     /  \    /  \
       *   20   40  60   80
       *
       * 中序：
       *
       * 20 30 40 50 60 70 80
       *
       * 所以节点的 x 坐标天然就是有序的。
       */
      let index = 0
      let maxDepth = 0

      const calculatePosition = (
          node: Node | null,
          depth: number
      ) => {
        if (!node) return

        maxDepth = Math.max(maxDepth, depth)

        calculatePosition(node.left, depth + 1)

        const x = index * this.horizontalGap + this.nodeRadius + 30
        const y = depth * this.verticalGap + this.nodeRadius + 30

        this.nodes.push({
          id: ++this.nodeId,
          val: node.val,
          count: node.count,
          x,
          y,
          depth,
          color: node.color
        })

        index++

        calculatePosition(node.right, depth + 1)
      }

      calculatePosition(this.tree.root, 0)

      /*
       * 根据节点关系生成连线。
       *
       * 因为上面生成 nodes 时已经按照中序排列，
       * 所以这里再通过节点的 val 找到对应节点。
       *
       * 对于真正严谨的实现，最好给 Node 一个唯一 id，
       * 这样即使允许重复 key，也不会有歧义。
       */
      const nodeMap = new Map<Node, DrawNode>()

      let nodeIndex = 0

      const buildNodeMap = (node: Node | null) => {
        if (!node) return

        buildNodeMap(node.left)

        nodeMap.set(node, this.nodes[nodeIndex])
        nodeIndex++

        buildNodeMap(node.right)
      }

      buildNodeMap(this.tree.root)

      const createEdges = (node: Node | null) => {
        if (!node) return

        const current = nodeMap.get(node)

        if (!current) return

        if (node.left) {
          const left = nodeMap.get(node.left)

          if (left) {
            this.edges.push({
              id: ++this.edgeId,
              x1: current.x,
              y1: current.y,
              x2: left.x,
              y2: left.y
            })
          }
        }

        if (node.right) {
          const right = nodeMap.get(node.right)

          if (right) {
            this.edges.push({
              id: ++this.edgeId,
              x1: current.x,
              y1: current.y,
              x2: right.x,
              y2: right.y
            })
          }
        }

        createEdges(node.left)
        createEdges(node.right)
      }

      createEdges(this.tree.root)

      /*
       * 根据树的实际大小计算 SVG 尺寸。
       */
      const maxX = Math.max(
          ...this.nodes.map(node => node.x)
      )

      const maxY = Math.max(
          ...this.nodes.map(node => node.y)
      )

      this.svgWidth = Math.max(
          800,
          maxX + this.nodeRadius + 30
      )

      this.svgHeight = Math.max(
          200,
          maxY + this.nodeRadius + 30
      )
    }
  }
}
</script>

<style scoped>
.rbt-canvas {
  width: 100%;
  height: 100%;
  min-height: 400px;

  overflow: auto;

  background: wheat;
}

svg {
  display: block;
}

.node-value {
  font-size: 14px;
  font-weight: bold;
  user-select: none;
}

.node-count {
  font-size: 11px;
  fill: #e74c3c;
  font-weight: bold;
  user-select: none;
}
</style>