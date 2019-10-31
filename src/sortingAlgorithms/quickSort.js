import React from "react";

function QuickSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed
}) {
  const quickSorting = () => {
    if (!isSorted) {
      sortingChange();
    }
    let node = document.querySelector(".App-container");
    let counter = 0;

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
      isArraySorted();
      sortingChange();

      for (let i = 0; i < arr.childNodes.length; i++) {
        arr.children[i].style.background = "green";
      }

      return arr;
    })(node, 0, node.childNodes.length - 1);

    async function partition(arr, pivot, left, right) {
      var pivotValue = arr.children[pivot],
        partitionIndex = left;
      arr.children[pivot].style.background = "blue";
      for (var i = left; i < right; i++) {
        if (
          parseFloat(arr.children[i].style.height) <
          parseFloat(pivotValue.style.height)
        ) {
          await swap(arr, i, partitionIndex);
          arr.children[i].style.background = "green";

          partitionIndex++;
        }
      }
      arr.children[pivot].style.background = "gray";
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
