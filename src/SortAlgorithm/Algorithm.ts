/**
 * 归并排序，使用slice
 * @param numbers
 */
export function mergeSortWithSlice(numbers :Array<number>): Array<number> {
    if(numbers.length < 2) return numbers
    const index =  Math.floor((numbers.length / 2))
    const left = mergeSortWithSlice(numbers.slice(0,index))
    const right = mergeSortWithSlice(numbers.slice(index, numbers.length))

    let i = 0
    let j = 0
    const leftLength = left.length
    const rightLength = right.length
    const res = [] as Array<number>

    while(i < leftLength && j < rightLength){
        if(left[i] < right[j]) res.push(left[i++])
        else res.push(right[j++])
    }

    while( i < leftLength) res.push(left[i++])
    while( j < rightLength) res.push(right[j++])

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