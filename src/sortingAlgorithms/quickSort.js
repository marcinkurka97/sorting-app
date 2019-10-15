import React from "react";

function QuickSort({ isSorting, sortingChange, sortingSpeed }) {
  const quickSorting = () => {
    let node = document.querySelector(".App-container");

    (async function quickSort(arr, left, right) {
      var pivot, partitionIndex;

      if (left < right) {
        pivot = right;
        partitionIndex = await partition(arr, pivot, left, right);

        await Promise.all([
          quickSort(arr, left, partitionIndex - 1),
          quickSort(arr, partitionIndex + 1, right)
        ]);
      }

      return arr;
    })(node, 0, node.childNodes.length - 1);

    async function partition(arr, pivot, left, right) {
      var pivotValue = arr.children[pivot],
        partitionIndex = left;

      for (var i = left; i < right; i++) {
        if (
          parseFloat(arr.children[i].style.height) <
          parseFloat(pivotValue.style.height)
        ) {
          await swap(arr, i, partitionIndex);
          partitionIndex++;
        }
      }
      await swap(arr, right, partitionIndex);
      return partitionIndex;
    }

    async function swap(arr, i, j) {
      await timer(200 / sortingSpeed);
      arr.insertBefore(arr.children[i], arr.children[j]);
    }

    function timer(ms) {
      return new Promise(res => setTimeout(res, ms));
    }
  };

  return (
    <button disabled={isSorting} onClick={quickSorting}>
      Quick sort
    </button>
  );
}

export default QuickSort;
