import React from "react";

function SelectionSort(props) {
  const selectionSort = () => {
    let node = document.querySelector(".App-container");
    let array = Array.from(node.childNodes);
    let minIdx, temp;

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

    let k = 0;
    let z = 0;
    let min = 0;

    window.sortingInterval = setInterval(function() {
      if (!arraysMatch(Array.from(node.childNodes), array)) {
        if (k < node.childNodes.length) {
          if (k >= 1) {
            node.children[k - 1].style.opacity = "1";
          }
          node.children[k].style.opacity = "0.8";

          if (
            parseFloat(node.children[k].style.height) <
            parseFloat(node.children[min].style.height)
          ) {
            node.children[k].style.background = "green";
            node.children[min].style.background = "grey";
            min = k;
          }

          k++;
        } else {
          exchangeElements(node.children[z], node.children[min]);

          node.children[z].style.background = "green";
          node.children[node.childNodes.length - 1].style.opacity = "1";
          z++;
          k = z;
          min = k;
        }
      } else {
        node.childNodes.forEach(element => {
          element.style.background = "green";
          element.style.opacity = "1";
        });
        clearInterval(window.sortingInterval);
      }
    }, 100 / props.sortingSpeed);
  };

  const exchangeElements = (element1, element2) => {
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

  return <button onClick={selectionSort}>Selection sort</button>;
}

export default SelectionSort;
