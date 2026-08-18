/**
 * 使用选择排序将数组按升序排列。
 *
 * 将数组划分为“已排序区间”和“未排序区间”。每一轮从未排序区间中找到最小值，
 * 再将它与未排序区间的首元素交换，使已排序区间逐步向右扩展。
 *
 * - 最好、平均、最坏时间复杂度：O(n²)，输入是否有序不会减少比较次数
 * - 额外空间复杂度：O(1)
 * - 稳定性：不稳定，跨越多个元素的交换可能改变相等元素的相对顺序
 * - 原地性：原地排序，会直接修改传入数组
 * - 特点：交换次数最多为 O(n)，通常少于冒泡排序
 *
 * @param _numbers - 需要排序的数字数组
 * @returns 排序后的原数组引用
 */
export function selectSort(_numbers: Array<number>): Array<number> {
    for (let i = 0; i < _numbers.length; i++) {
        let smallestIndex = i
        for (let j = i + 1; j < _numbers.length; j++) {
            if (_numbers[j] < _numbers[smallestIndex]) smallestIndex = j
        }
        const cache = _numbers[i]
        _numbers[i] = _numbers[smallestIndex]
        _numbers[smallestIndex] = cache
    }
    return _numbers
}
