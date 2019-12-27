import React from "react";

function MergeSort({
  isSorting,
  sortingChange,
  isSorted,
  isArraySorted,
  sortingSpeed,
  array
}) {
  let counter = 0;

  async function changeColor(arrayBars, animations, i) {
    await timer(200 / sortingSpeed);
    const [barOneIdx, barTwoIdx] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    const barTwoStyle = arrayBars[barTwoIdx].style;
    const color = i % 3 === 0 ? "#832700" : "#159957";
    barOneStyle.backgroundColor = color;
    barTwoStyle.backgroundColor = color;
  }

  async function changeHeight(arrayBars, animations, i) {
    await timer(200 / sortingSpeed);
    const [barOneIdx, newHeight] = animations[i];
    const barOneStyle = arrayBars[barOneIdx].style;
    barOneStyle.height = `${newHeight}%`;
  }

  function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async function mergeSorting() {
    // if (!isSorted) {
    //   sortingChange(true);
    // }

    const animations = await getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      document.getElementById("stepCounter").innerHTML = counter++;
      const arrayBars = document.getElementsByClassName("Container-column");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        await changeColor(arrayBars, animations, i);
      } else {
        await changeHeight(arrayBars, animations, i);
      }
    }

    // isArraySorted();
    // sortingChange(false);
  }

  async function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const helperArray = array.slice();
    await mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
    return animations;
  }

  async function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    helperArray,
    animations
  ) {
    if (startIdx === endIdx) {
      return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    await mergeSortHelper(
      helperArray,
      startIdx,
      middleIdx,
      mainArray,
      animations
    );
    await mergeSortHelper(
      helperArray,
      middleIdx + 1,
      endIdx,
      mainArray,
      animations
    );
    await doMerge(
      mainArray,
      startIdx,
      middleIdx,
      endIdx,
      helperArray,
      animations
    );
  }

  async function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    helperArray,
    animations
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (helperArray[i] <= helperArray[j]) {
        animations.push([k, helperArray[i]]);
        mainArray[k++] = helperArray[i++];
      } else {
        animations.push([k, helperArray[j]]);
        mainArray[k++] = helperArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, helperArray[i]]);
      mainArray[k++] = helperArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, helperArray[j]]);
      mainArray[k++] = helperArray[j++];
    }
  }

  return (
    <button disabled={isSorting} onClick={mergeSorting}>
      Merge sort
    </button>
  );
}

export default MergeSort;
