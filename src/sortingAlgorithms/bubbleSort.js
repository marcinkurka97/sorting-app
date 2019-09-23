import React from "react";

function BubbleSort(props) {
  const bubbleSort = () => {
    let node = document.querySelector(".App-container");
    let array = Array.from(node.childNodes);

    let i = 0;
    let z = 0;

    for (let k = 0; k < array.length; k++) {
      for (let j = 0; j < array.length - k - 1; j++) {
        if (
          parseFloat(array[j].style.height) >
          parseFloat(array[j + 1].style.height)
        ) {
          let tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
        }
      }
    }

    window.sortingInterval = setInterval(function() {
      if (!arraysMatch(Array.from(node.childNodes), array)) {
        if (i < node.childNodes.length - 1 - z) {
          if (i >= 1) {
            node.children[i - 1].style.background = "gray";
          }

          if (
            parseFloat(node.children[i].style.height) >
            parseFloat(node.children[i + 1].style.height)
          ) {
            document
              .querySelector(".App-container")
              .insertBefore(
                document.querySelector(".App-container").children[i + 1],
                document.querySelector(".App-container").children[i]
              );
            node.children[i].style.background = "green";
            node.children[i + 1].style.background = "green";
          } else {
            node.children[i].style.background = "red";
            node.children[i + 1].style.background = "red";
          }

          i++;
        } else {
          i = 0;
          node.children[node.childNodes.length - 2 - z].style.background =
            "gray";
          node.children[node.childNodes.length - 1 - z].style.background =
            "green";
          z++;
        }
      } else {
        node.childNodes.forEach(element => {
          element.style.background = "green";
        });
        clearInterval(window.sortingInterval);
      }
    }, 100 / props.sortingSpeed);
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };
  return <button onClick={bubbleSort}>Bubble sort</button>;
}

export default BubbleSort;
