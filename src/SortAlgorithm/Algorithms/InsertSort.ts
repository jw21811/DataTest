/**
 * 使用插入排序将数组按升序排列。
 *
 * 将数组左侧视为已排序区间，依次取出右侧元素并向左寻找插入位置。
 * 寻找过程中，大于当前元素的值整体右移一位，最后将当前元素放入空出的位置。
 *
 * - 最好时间复杂度：O(n)，适用于基本有序的数据
 * - 平均、最坏时间复杂度：O(n²)
 * - 额外空间复杂度：O(1)
 * - 稳定性：稳定，判断条件使用 `>`，不会越过相等元素
 * - 原地性：原地排序，会直接修改传入数组
 * - 特点：具有自适应性，常用于小规模数组或作为高级排序算法的小区间优化
 *
 * @param _numbers - 需要排序的数字数组
 * @returns 排序后的原数组引用
 */
export function insertSort(_numbers: Array<number>): Array<number> {
    for (let i = 1; i < _numbers.length; i++) {
        const current = _numbers[i]
        let j = i - 1
        while (j >= 0 && _numbers[j] > current) {
            _numbers[j + 1] = _numbers[j]
            j--
        }
        _numbers[j + 1] = current
    }
    return _numbers
}
