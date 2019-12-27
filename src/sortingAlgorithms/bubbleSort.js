import React from "react";

function BubbleSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed
}) {
  const bubbleSort = () => {
    if (!isSorted) {
      sortingChange();
    }
    let node = document.querySelector(".App-container");
    let counter = 0;

    async function task(j) {
      await timer(200 / sortingSpeed);
      document.getElementById("stepCounter").innerHTML = counter++;
      if (j >= 1) {
        node.children[j - 1].style.background = "#E6F4F1";
      }
      if (
        parseFloat(node.children[j].style.height) >
        parseFloat(node.children[j + 1].style.height)
      ) {
        node.insertBefore(node.children[j + 1], node.children[j]);
        node.children[j].style.background = "#159957";
        node.children[j + 1].style.background = "#159957";
      } else {
        node.children[j].style.background = "#832700";
        node.children[j + 1].style.background = "#832700";
      }
    }

    (async function bubbleSort() {
      if (!isSorted) {
        for (let k = 0; k < node.childNodes.length; k++) {
          for (let j = 0; j < node.childNodes.length - k - 1; j++) {
            await task(j);
          }
          if (k < node.childNodes.length - 1) {
            node.children[node.childNodes.length - 2 - k].style.background =
              "#E6F4F1";
          }
          node.children[node.childNodes.length - 1 - k].style.background =
            "#159957";
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
    <button disabled={isSorting} onClick={bubbleSort}>
      Bubble sort
    </button>
  );
}

export default BubbleSort;
