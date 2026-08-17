<script setup lang="ts">

import BST from "./DataStructure/BST/index.vue";
import RNG from "./SortAlgorithm/RNG.vue";
import {bubbleSort,insertSort, mergeSort, selectSort} from "./SortAlgorithm/Algorithm.ts";

const algorithms = [
  {
    id:'BS',
    name:'冒泡排序',
    sort:bubbleSort
  },
  {
   id:"SS",
   name:"选择排序",
   sort:selectSort
  },
  {
    id:"IS",
    name:"插入排序",
    sort:insertSort
  },
  {
    id:'MS',
    name:'归并排序(index)',
    sort: mergeSort
  }
]

</script>

<template>
  <BST/>
  <RNG :algorithms="algorithms"/>
</template>
