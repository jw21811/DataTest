<script setup lang="ts">

import BST from "./DataStructure/BST/index.vue";
import RNG from "./SortAlgorithm/RNG.vue";
import type {SortAlgorithm} from "./SortAlgorithm/SortTemplate.vue";
import {
  bubbleSort,
  bucketSort,
  countingSort,
  heapSort,
  insertSort,
  mergeSort,
  mergeSortWithSlice,
  quickSort,
  radixSort,
  selectSort,
  shellSort
} from "./SortAlgorithm/Algorithms";

const algorithms: SortAlgorithm[] = [
  {
    id: 'bubble-sort',
    name: '冒泡排序',
    sort: bubbleSort
  },
  {
    id: 'select-sort',
    name: '选择排序',
    sort: selectSort
  },
  {
    id: 'insert-sort',
    name: '插入排序',
    sort: insertSort
  },
  {
    id: 'merge-sort-slice',
    name: '归并排序（Slice 版本）',
    sort: mergeSortWithSlice
  },
  {
    id: 'merge-sort-buffer',
    name: '归并排序（临时数组版本）',
    sort: mergeSort
  },
  {
    id: 'quick-sort',
    name: '快速排序',
    sort: quickSort
  },
  {
    id: 'shell-sort',
    name: '希尔排序',
    sort: shellSort
  },
  {
    id: 'heap-sort',
    name: '堆排序',
    sort: heapSort
  },
  {
    id: 'counting-sort',
    name: '计数排序',
    sort: countingSort
  },
  {
    id: 'bucket-sort',
    name: '桶排序',
    sort: bucketSort
  },
  {
    id: 'radix-sort',
    name: '基数排序（LSD）',
    sort: radixSort
  }
]

</script>

<template>
<!--  <BST/>-->
  <RNG :algorithms="algorithms"/>
</template>
