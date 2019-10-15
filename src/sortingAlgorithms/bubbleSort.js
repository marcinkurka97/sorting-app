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
        node.children[j - 1].style.background = "gray";
      }
      if (
        parseFloat(node.children[j].style.height) >
        parseFloat(node.children[j + 1].style.height)
      ) {
        node.insertBefore(node.children[j + 1], node.children[j]);
        node.children[j].style.background = "green";
        node.children[j + 1].style.background = "green";
      } else {
        node.children[j].style.background = "red";
        node.children[j + 1].style.background = "red";
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
              "gray";
          }
          node.children[node.childNodes.length - 1 - k].style.background =
            "green";
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
