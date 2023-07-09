// function merge(L, R, lst, LL, RL, begin, end) {
//   if (begin < end) {
//     if ((RL <= 0) || (LL > 0 && L[LL - 1] > R[RL - 1])) {
//       lst[end - 1] = L[LL - 1]
//       LL -= 1
//     } else {
//       lst[end - 1] = R[RL - 1]
//       RL -= 1
//     }
//     merge(L, R, lst, LL, RL, begin, end - 1)
//   }
// }
// function seperating(lst, begin = 0, end = undefined) {
//   if (end === undefined) { end = lst.length }
//   // condition
//   if (end - begin > 1) {
//     let divider = Math.floor((begin + end + 1) / 2)
//     seperating(lst, begin, divider)
//     seperating(lst, divider, end)
//     let L = lst.slice(begin, divider)
//     let R = lst.slice(divider, end)
//     merge(L, R, lst, L.length, R.length, begin, end)
//   }
// }

// let lst = [23, 44, 5, 111, 89, 56, 74, 23]
// seperating(lst)
// console.log(lst)

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid)

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge(leftArr, rightArr) {
  let i = 0, j = 0
  const mergedArr = []

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i].likes > rightArr[j].likes) {
      mergedArr.push(leftArr[i])
      i++
    } else {
      mergedArr.push(rightArr[j])
      j++
    }
  }

  while (i < leftArr.length) {
    mergedArr.push(leftArr[i])
    i++
  }

  while (j < rightArr.length) {
    mergedArr.push(rightArr[j])
    j++
  }

  return mergedArr
}