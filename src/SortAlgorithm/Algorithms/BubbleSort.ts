/**
 * 使用冒泡排序将数组按升序排列。
 *
 * 每一轮从左向右比较相邻元素，将当前未排序区间中的最大值逐步“冒泡”到末尾。
 * 第 `i` 轮结束后，数组末尾的 `i + 1` 个元素已经处于最终位置。
 *
 * - 最好时间复杂度：O(n)，数组已有序时由 `swapped` 提前结束
 * - 平均、最坏时间复杂度：O(n²)
 * - 额外空间复杂度：O(1)
 * - 稳定性：稳定，相等元素不会交换相对位置
 * - 原地性：原地排序，会直接修改传入数组
 *
 * @param __numbers - 需要排序的数字数组
 * @returns 排序后的原数组引用
 */
export function bubbleSort(_numbers: Array<number>): Array<number> {
    for (let i = 0; i < _numbers.length - 1; i++) {
        let swapped = false
        for (let j = 0; j < _numbers.length - 1 - i; j++) {
            if (_numbers[j] > _numbers[j + 1]) {
                const cache = _numbers[j]
                _numbers[j] = _numbers[j + 1]
                _numbers[j + 1] = cache
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
    }
    return _numbers
}
