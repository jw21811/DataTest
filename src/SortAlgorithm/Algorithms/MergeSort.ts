/**
 * 使用 `slice` 实现的归并排序，返回按升序排列的新数组。
 *
 * 归并排序基于分治思想：先递归地将数组二分，直到子数组只包含零个或一个元素，
 * 再通过双指针将两个有序子数组合并为一个更大的有序数组。
 *
 * - 最好、平均、最坏时间复杂度：O(n log n)
 * - 峰值额外空间复杂度：O(n)，递归调用栈为 O(log n)
 * - 分配成本：`slice` 和每层合并会创建新数组，整个过程累计分配 O(n log n) 个元素空间
 * - 稳定性：当前实现不稳定；两个值相等时会优先取右侧元素
 * - 原地性：非原地排序，不修改长度大于一的输入数组
 *
 * @remarks
 * 当数组长度小于 2 时会直接返回输入数组；其他情况下返回新的数组引用。
 * 若要保持稳定性，合并时应在相等情况下优先选择左侧元素。
 *
 * @param _numbers - 需要排序的数字数组
 * @returns 排序后的数组
 */
export function mergeSortWithSlice(_numbers: Array<number>): Array<number> {
    if (_numbers.length < 2) return _numbers
    const index = Math.floor((_numbers.length / 2))
    const left = mergeSortWithSlice(_numbers.slice(0, index))
    const right = mergeSortWithSlice(_numbers.slice(index, _numbers.length))

    let i = 0
    let j = 0
    const leftLength = left.length
    const rightLength = right.length
    const res = [] as Array<number>

    while (i < leftLength && j < rightLength) {
        if (left[i] < right[j]) res.push(left[i++])
        else res.push(right[j++])
    }

    while (i < leftLength) res.push(left[i++])
    while (j < rightLength) res.push(right[j++])

    return res
}

/**
 * 使用单个临时数组实现归并排序，并将排序结果写回原数组。
 *
 * 排序区间采用左闭右开表示法 `[left, right)`。递归阶段将区间二分，
 * 合并阶段使用双指针读取两个有序子区间，将结果写入临时数组后再复制回原数组。
 *
 * - 最好、平均、最坏时间复杂度：O(n log n)
 * - 额外空间复杂度：O(n)，递归调用栈为 O(log n)
 * - 稳定性：稳定；两个值相等时通过 `<=` 优先选择左侧元素
 * - 原数组修改：会直接修改传入数组，并返回同一个数组引用
 *
 * @remarks
 * 该实现只创建一次长度为 n 的临时数组，避免了 `slice` 版本的重复数组分配。
 * 它会修改原数组，但由于仍需 O(n) 临时空间，因此不属于严格的 O(1) 额外空间原地排序。
 *
 * @param _numbers - 需要排序的数字数组
 * @returns 排序后的原数组引用
 */
export function mergeSort(_numbers: Array<number>): Array<number> {
    if (_numbers.length < 2) {
        return _numbers
    }

    const temp = new Array<number>(_numbers.length)

    function sort(left: number, right: number) {
        if (right - left < 2) {
            return
        }

        const mid = Math.floor((left + right) / 2)

        sort(left, mid)
        sort(mid, right)

        merge(left, mid, right)
    }

    function merge(left: number, mid: number, right: number) {
        let i = left
        let j = mid
        let k = left

        while (i < mid && j < right) {
            if (_numbers[i] <= _numbers[j]) {
                temp[k++] = _numbers[i++]
            } else {
                temp[k++] = _numbers[j++]
            }
        }

        while (i < mid) {
            temp[k++] = _numbers[i++]
        }

        while (j < right) {
            temp[k++] = _numbers[j++]
        }

        for (let index = left; index < right; index++) {
            _numbers[index] = temp[index]
        }
    }

    sort(0, _numbers.length)

    return _numbers
}
