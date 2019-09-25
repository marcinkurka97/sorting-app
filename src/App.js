import React from "react";
import "./App.scss";
import BubbleSort from "./sortingAlgorithms/bubbleSort";
import SelectionSort from "./sortingAlgorithms/selectionSort";
import InsertionSort from "./sortingAlgorithms/insertionSort";
import MergeSort from "./sortingAlgorithms/mergeSort";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingSpeed: 0,
      columnsAmount: 10,
      isSorting: false
    };
  }

  componentDidMount() {
    this.randomizeColumns();
    window.sortingInterval = setInterval(0);
    document.getElementById("sortingSpeedNumber").innerHTML =
      "Sorting speed: " +
      Math.round((200 / document.getElementById("sortingSpeed").value) * 10) /
        10 +
      "ms";
  }

  sortingChange = () => {
    this.setState({ isSorting: !this.state.isSorting });
  };

  handleColumnsAmountChange = event => {
    this.setState({ columnsAmount: event.target.value });
    this.randomizeColumns();
  };

  handleSortingSpeedChange = event => {
    this.setState({ sortingSpeed: event.target.value });

    document.getElementById("sortingSpeedNumber").innerHTML =
      "Sorting speed: " +
      Math.round((200 / event.target.value) * 10) / 10 +
      "ms";
  };

  randomizeColumns = () => {
    clearInterval(window.sortingInterval);
    this.setState({ isSorting: false });

    let columnHeight;
    let column = "";

    this.clearColumns();

    for (let i = 0; i <= this.state.columnsAmount * 2; i++) {
      columnHeight = Math.random() * 99 + 1;
      column = document.createElement("div");
      column.classList.add("Container-column");
      column.style.cssText = `background: gray; width: calc(100% / ${this.state.columnsAmount}); height: ${columnHeight}%; margin: 0 2px;`;
      document.querySelector(".App-container").appendChild(column);
    }
    document.getElementById("stepCounter").innerHTML = "0";
    document.getElementById("amountNumber").innerHTML =
      "Amount of columns: " +
      document.querySelector(".App-container").childNodes.length;
  };

  clearColumns = () => {
    while (document.querySelector(".App-container").firstChild) {
      document
        .querySelector(".App-container")
        .removeChild(document.querySelector(".App-container").firstChild);
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header__settings">
            <span>
              <input
                type="range"
                id="sortingSize"
                onChange={this.handleColumnsAmountChange}
                name="columnAmount"
                min="2"
                max="100"
              />
              <div>
                <label id="amountNumber" htmlFor="columnAmount">
                  Amount of columns:
                </label>
              </div>
            </span>
            <span>
              <input
                type="range"
                id="sortingSpeed"
                name="sortingSpeed"
                onChange={this.handleSortingSpeedChange}
                min="1"
                max="100"
                step="1"
              />
              <label id="sortingSpeedNumber" htmlFor="sortingSpeed">
                Sorting speed:
              </label>
            </span>
          </div>
          <p>Steps: </p>
          <p id="stepCounter">0</p>
          {/* <h1>Sorting algorithms</h1> */}
          <div className="App-header__algorithms">
            <BubbleSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
            />
            <SelectionSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
            />
            <InsertionSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
            />
            <MergeSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
            />
          </div>
        </header>
        <section className="App-container"></section>
      </div>
    );
  }
}

export default App;
