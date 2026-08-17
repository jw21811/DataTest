/**
 * 冒泡排序
 * @param numbers
 */
export function bubbleSort(numbers: Array<number>): Array<number> {
    for (let i = 0; i < numbers.length - 1; i++) {
        let swapped = false
        for (let j = 0; j < numbers.length - 1 - i; j++) {
            if (numbers[j] > numbers[j + 1]) {
                const cache = numbers[j]
                numbers[j] = numbers[j + 1]
                numbers[j + 1] = cache
                swapped = true
            }
        }
        if (!swapped) {
            break
        }
    }
    return numbers
}

/**
 * 选择排序
 * @param numbers
 */
export function selectSort(numbers: Array<number>): Array<number> {
    for (let i = 0; i < numbers.length; i++) {
        let smallestIndex = i
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[smallestIndex]) smallestIndex = j
        }
        const cache = numbers[i]
        numbers[i] = numbers[smallestIndex]
        numbers[smallestIndex] = cache
    }
    return numbers
}

/**
 * 插入排序
 * @param numbers
 */
export function insertSort(numbers: Array<number>): Array<number> {
    for (let i = 1; i < numbers.length; i++) {
        const current = numbers[i]
        let j = i - 1
        while (j >= 0 && numbers[j] > current) {
            numbers[j + 1] = numbers[j]
            j--
        }
        numbers[j + 1] = current
    }
    return numbers
}

/**
 * 归并排序，使用slice
 * @param numbers
 */
export function mergeSortWithSlice(numbers: Array<number>): Array<number> {
    if (numbers.length < 2) return numbers
    const index = Math.floor((numbers.length / 2))
    const left = mergeSortWithSlice(numbers.slice(0, index))
    const right = mergeSortWithSlice(numbers.slice(index, numbers.length))

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
 * 原地修改数据版本的归并排序
 * @param numbers
 */
export function mergeSort(numbers: Array<number>): Array<number> {
    if (numbers.length < 2) {
        return numbers
    }

    const temp = new Array<number>(numbers.length)

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
            if (numbers[i] <= numbers[j]) {
                temp[k++] = numbers[i++]
            } else {
                temp[k++] = numbers[j++]
            }
        }

        while (i < mid) {
            temp[k++] = numbers[i++]
        }

        while (j < right) {
            temp[k++] = numbers[j++]
        }

        for (let index = left; index < right; index++) {
            numbers[index] = temp[index]
        }
    }

    sort(0, numbers.length)

    return numbers
}