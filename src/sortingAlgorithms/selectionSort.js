import React from "react";

function SelectionSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed
}) {
  const selectionSort = () => {
    if (!isSorted) {
      sortingChange();
    }
    let node = document.querySelector(".App-container");
    let counter = 0;
    let minIdx;

    (async function selectionSort() {
      if (!isSorted) {
        for (let i = 0; i < node.childNodes.length; i++) {
          minIdx = i;
          for (let j = i + 1; j < node.childNodes.length; j++) {
            await visualizeProgressDelay(j);
            if (
              parseFloat(node.children[j].style.height) <
              parseFloat(node.children[minIdx].style.height)
            ) {
              node.children[j].style.background = "green";
              node.children[minIdx].style.background = "grey";
              minIdx = j;
            }
            document.getElementById("stepCounter").innerHTML = counter++;
          }
          await swapItemsDelay(i, minIdx);
        }
        isArraySorted();
        sortingChange();
      }
    })();

    async function swapItemsDelay(i, minIdx) {
      await timer(200 / sortingSpeed);
      swapElements(node.children[i], node.children[minIdx]);
      node.children[i].style.background = "green";
      node.children[i].style.opacity = "1";
      node.children[node.childNodes.length - 1].style.opacity = "1";
    }
    async function visualizeProgressDelay(j) {
      await timer(200 / sortingSpeed);
      if (j >= 1) {
        node.children[j - 1].style.opacity = "1";
      }
      node.children[j].style.opacity = "0.8";
    }

    function timer(ms) {
      return new Promise(res => setTimeout(res, ms));
    }

    const swapElements = (element1, element2) => {
      if (element1 !== element2) {
        element1.parentNode.insertBefore(element2, element1);
      }
    };
  };

  return (
    <button disabled={isSorting} onClick={selectionSort}>
      Selection sort
    </button>
  );
}

export default SelectionSort;
