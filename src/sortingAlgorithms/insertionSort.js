import React from "react";

function InsertionSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed
}) {
  const insertionSort = () => {
    if (!isSorted) {
      sortingChange();
    }
    let node = document.querySelector(".App-container");
    let counter = 0;

    async function task(j) {
      await timer(200 / sortingSpeed);
      document.getElementById("stepCounter").innerHTML = counter++;
      node.insertBefore(node.children[j + 1], node.children[j]);
      node.children[j].style.background = "#159957";
    }
    let count = 0;
    (async function insertionSort() {
      if (!isSorted) {
        for (let i = 1; i < node.childNodes.length; i++) {
          node.children[i].style.background = "#159957";
          let el = node.children[i];
          let j;
          for (
            j = i - 1;
            j >= 0 &&
            parseFloat(node.children[j].style.height) >
              parseFloat(el.style.height);
            j--
          ) {
            await task(j);
          }
          node.cloneNode(node.children[j + 1], el);
          node.children[count].style.background = "#159957";
          count++;
        }
        isArraySorted();
        sortingChange();
      }
    })();

    function timer(ms) {
      return new Promise(res => setTimeout(res, ms));
    }
  };

  return (
    <button disabled={isSorting} onClick={insertionSort}>
      Insertion sort
    </button>
  );
}

export default InsertionSort;
