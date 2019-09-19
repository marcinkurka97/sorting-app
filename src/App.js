import React from "react";
import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsHeightArray: []
    };
  }

  componentDidMount() {
    this.randomizeColumns();
  }

  randomizeColumns = () => {
    let columnNumber = Math.round(Math.random() * 400);
    let columnHeight;
    let column = "";

    this.clearColumns();

    for (let i = 0; i <= columnNumber; i++) {
      columnHeight = Math.random() * 99 + 1;
      column = document.createElement("div");
      column.classList.add("Container-column");
      column.style.cssText = `background:#777; width: calc(100% / ${columnNumber}); height: ${columnHeight}%; margin: 0 2px;`;
      document.querySelector(".App-container").appendChild(column);
    }
  };

  clearColumns = () => {
    while (document.querySelector(".App-container").firstChild) {
      document
        .querySelector(".App-container")
        .removeChild(document.querySelector(".App-container").firstChild);
    }
  };

  bubbleSort = inputArr => {
    for (let i = 0; i < inputArr.length; i++) {
      for (let j = 0; j < inputArr.length - i - 1; j++) {
        if (
          parseFloat(inputArr[j].style.height) >
          parseFloat(inputArr[j + 1].style.height)
        ) {
          let tmp = inputArr[j];
          inputArr[j] = inputArr[j + 1];
          inputArr[j + 1] = tmp;
        }
      }
    }
    let k = 0;
    setInterval(function() {
      if (k < inputArr.length) {
        document.querySelector(".App-container").append(inputArr[k]);
        inputArr[k].style.background = "green";
        k++;
      }
    }, 50);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sorting algorithms</h1>
          <button onClick={this.randomizeColumns}>Randomize columns</button>
          <button
            onClick={() =>
              this.bubbleSort(
                Array.from(document.querySelectorAll(".Container-column"))
              )
            }
          >
            Bubble sort
          </button>
        </header>
        <section className="App-container"></section>
      </div>
    );
  }
}

export default App;
