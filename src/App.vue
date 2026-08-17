<script setup lang="ts">

import BST from "./DataStructure/BST/index.vue";
import RNG from "./SortAlgorithm/RNG.vue";
import {mergeSort, mergeSortWithSlice} from "./SortAlgorithm/Algorithm.ts";

const algorithms = [
  {
    id:'MS',
    name:'归并排序(slice)',
    sort: mergeSortWithSlice
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
