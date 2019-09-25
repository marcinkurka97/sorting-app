import React from "react";

function SelectionSort({ isSorting, sortingChange, sortingSpeed }) {
  const selectionSort = () => {
    sortingChange();
    let node = document.querySelector(".App-container");
    let array = Array.from(node.childNodes);
    let minIdx, temp;
    let counter = 0;

    for (var i = 0; i < array.length; i++) {
      minIdx = i;
      for (var j = i + 1; j < array.length; j++) {
        if (
          parseFloat(array[j].style.height) <
          parseFloat(array[minIdx].style.height)
        ) {
          minIdx = j;
        }
      }
      temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
    }

    let a = 0;
    let b = 0;
    let min = 0;

    window.sortingInterval = setInterval(function() {
      if (!arraysMatch(Array.from(node.childNodes), array)) {
        if (a < node.childNodes.length) {
          if (a >= 1) {
            node.children[a - 1].style.opacity = "1";
          }
          node.children[a].style.opacity = "0.8";

          if (
            parseFloat(node.children[a].style.height) <
            parseFloat(node.children[min].style.height)
          ) {
            node.children[a].style.background = "green";
            node.children[min].style.background = "grey";
            min = a;
          }

          a++;
          counter++;
          document.getElementById("stepCounter").innerHTML = counter;
        } else {
          swapElements(node.children[b], node.children[min]);

          node.children[b].style.background = "green";
          node.children[node.childNodes.length - 1].style.opacity = "1";
          b++;
          a = b;
          min = a;
        }
      } else {
        node.childNodes.forEach(element => {
          element.style.background = "green";
          element.style.opacity = "1";
        });
        clearInterval(window.sortingInterval);
        sortingChange();
      }
    }, 100 / sortingSpeed);
  };

  const swapElements = (element1, element2) => {
    if (element1 !== element2) {
      let clonedElement1 = element1.cloneNode(true);
      let clonedElement2 = element2.cloneNode(true);

      element2.parentNode.replaceChild(clonedElement1, element2);
      element1.parentNode.replaceChild(clonedElement2, element1);
    }
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i].style.height !== arr2[i].style.height) return false;
    }

    return true;
  };

  return (
    <button disabled={isSorting} onClick={selectionSort}>
      Selection sort
    </button>
  );
}

export default SelectionSort;
