import React from "react";

function InsertionSort({ isSorting, sortingChange, sortingSpeed }) {
  const insertionSort = () => {
    sortingChange();
    let node = document.querySelector(".App-container");
    let array = Array.from(node.childNodes);

    for (let a = 1; a < array.length; a++) {
      let el = array[a];
      let b;

      for (
        b = a - 1;
        b >= 0 &&
        parseFloat(array[b].style.height) > parseFloat(el.style.height);
        b--
      ) {
        array[b + 1] = array[b];
      }

      array[b + 1] = el;
    }

    let i = 0;
    let counter = 0;
    let z = 0;

    window.sortingInterval = setInterval(function() {
      if (!arraysMatch(Array.from(node.childNodes), array)) {
        let j = 0;
        if (i < node.childNodes.length) {
          let el = node.children[i];

          for (
            j = i - 1;
            j >= 0 &&
            parseFloat(node.children[j].style.height) >
              parseFloat(el.style.height);
            j--
          ) {
            counter++;
            document.getElementById("stepCounter").innerHTML = counter;

            node.children[j].style.background = "green";
            node.insertBefore(node.children[j + 1], node.children[j]);
          }

          node.cloneNode(node.children[j + 1], el);
          i++;
        }
      } else {
        node.childNodes.forEach(element => {
          element.style.background = "green";
          element.style.opacity = "1";
        });
        clearInterval(window.sortingInterval);
        sortingChange();
      }
    }, 200 / sortingSpeed);
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i].style.height !== arr2[i].style.height) return false;
    }

    return true;
  };

  return (
    <button disabled={isSorting} onClick={insertionSort}>
      Insertion sort
    </button>
  );
}

export default InsertionSort;
