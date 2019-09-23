import React from "react";
import "./App.scss";
import BubbleSort from "./sortingAlgorithms/bubbleSort";
import SelectionSort from "./sortingAlgorithms/selectionSort";
import InsertionSort from "./sortingAlgorithms/insertionSort";
import QuickSort from "./sortingAlgorithms/quickSort";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingSpeed: 0,
      columnsAmount: 10
    };
  }

  componentDidMount() {
    this.randomizeColumns();
    window.sortingInterval = setInterval(0);
  }

  handleColumnsAmountChange = event => {
    this.setState({ columnsAmount: event.target.value });
    this.randomizeColumns();
  };

  handleSortingSpeedChange = event => {
    this.setState({ sortingSpeed: event.target.value });
  };

  randomizeColumns = () => {
    clearInterval(window.sortingInterval);

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
              <label htmlFor="columnAmount">Amount of columns</label>
            </span>
            <span>
              <input
                type="range"
                id="sortingSpeed"
                name="sortingSpeed"
                onChange={this.handleSortingSpeedChange}
                min="1"
                max="100"
              />
              <label htmlFor="sortingSpeed">Sorting speed</label>
            </span>
          </div>
          <h1>Sorting algorithms</h1>
          <div className="App-header__algorithms">
            <BubbleSort sortingSpeed={this.state.sortingSpeed} />
            <SelectionSort sortingSpeed={this.state.sortingSpeed} />
            <InsertionSort sortingSpeed={this.state.sortingSpeed} />
            <QuickSort sortingSpeed={this.state.sortingSpeed} />
          </div>
        </header>
        <section className="App-container"></section>
      </div>
    );
  }
}

export default App;
