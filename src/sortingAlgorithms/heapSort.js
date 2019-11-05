import React from "react";

function HeapSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed
}) {
  async function heapSort(input) {
    let arrLength = input.childNodes.length;
    let i;
    for (i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
      await maxHeap(input, i, arrLength);
    }

    for (i = input.length - 1; i > 0; i--) {
      await swap(input, 0, i);
      arrLength--;

      await maxHeap(input, 0, arrLength);
    }
    return;
  }

  async function maxHeap(input, i, arrLength) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (
      left < arrLength &&
      parseFloat(input.children[left].style.height) >
        parseFloat(input.children[max].style.height)
    ) {
      console.log("left");
      max = left;
    }

    if (
      right < arrLength &&
      parseFloat(input.children[right].style.height) >
        parseFloat(input.children[max].style.height)
    ) {
      max = right;
    }

    if (max !== i) {
      await swap(input, i, max);
      await maxHeap(input, max);
    }
  }

  async function swap(arr, i, j) {
    await timer(200 / sortingSpeed);
    arr.insertBefore(arr.children[i], arr.children[j]);
  }

  function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  return (
    <button
      disabled={isSorting}
      onClick={() => heapSort(document.querySelector(".App-container"))}
    >
      Heap sort
    </button>
  );
}

export default HeapSort;
