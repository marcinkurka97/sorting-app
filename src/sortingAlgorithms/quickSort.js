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
      sortingChange(true);
    }
    let node = document.querySelector(".App-container");

    const initialSortedArray = [];
    node.childNodes.forEach(el =>
      initialSortedArray.push(parseFloat(el.style.height))
    );
    initialSortedArray.sort((a, b) => a - b);

    let counter = 0;

    (async function quickSort(arr, left, right) {
      var pivot, partitionIndex;

      const actualArr = [];

      arr.childNodes.forEach(el => actualArr.push(parseFloat(el.style.height)));

      if (arraysEqual(actualArr, initialSortedArray)) {
        isArraySorted();
        sortingChange(false);
        return;
      }

      if (left < right) {
        pivot = right;
        partitionIndex = await partition(arr, pivot, left, right);

        await Promise.all([
          quickSort(arr, left, partitionIndex - 1),
          quickSort(arr, partitionIndex + 1, right)
        ]);
      }

      for (let i = 0; i < arr.childNodes.length; i++) {
        arr.children[i].style.background = "#159957";
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
          arr.children[i].style.background = "#159957";

          partitionIndex++;
        }
        document.getElementById("stepCounter").innerHTML = counter++;
      }
      arr.children[pivot].style.background = "#e6f4f1";
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

    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
      for (var i = arr1.length; i--; ) {
        if (arr1[i] !== arr2[i]) return false;
      }

      return true;
    }
  };

  return (
    <button disabled={isSorting} onClick={quickSorting}>
      Quick sort
    </button>
  );
}

export default QuickSort;
