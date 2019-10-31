import React from "react";
import "./App.scss";
import BubbleSort from "./sortingAlgorithms/bubbleSort";
import SelectionSort from "./sortingAlgorithms/selectionSort";
import InsertionSort from "./sortingAlgorithms/insertionSort";
import MergeSort from "./sortingAlgorithms/mergeSort";
import QuickSort from "./sortingAlgorithms/quickSort";
import HeapSort from "./sortingAlgorithms/heapSort";
import { throwStatement } from "@babel/types";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      sortingSpeed: 0,
      columnsAmount: 10,
      isSorting: false,
      isSorted: false
    };
    this.sortingSpeedNumRef = React.createRef();
    this.sortingSpeedRef = React.createRef();
    this.amountNumRef = React.createRef();
    this.stepCounterRef = React.createRef();
  }

  componentDidMount() {
    this.randomizeColumns();
    this.sortingSpeedNumRef.current.innerHTML = `Sorting speed: ${Math.round(
      (200 / this.sortingSpeedRef.current.value) * 10
    ) / 10}
      ms`;
    this.amountNumRef.current.innerHTML = `Amount of columns:  ${this.state.columnsAmount}`;
  }

  sortingChange = () => {
    this.setState({ isSorting: !this.state.isSorting });
  };

  isArraySorted = () => {
    this.setState({ isSorted: true });
  };

  handleColumnsAmountChange = event => {
    this.setState({ columnsAmount: event.target.value });
    this.stepCounterRef.current.innerHTML = "0";
    this.amountNumRef.current.innerHTML = `Amount of columns:  ${this.state.columnsAmount}`;

    document
      .querySelectorAll(".Container-column")
      .forEach(node => (node.style.backgroundColor = "gray"));

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
    this.setState({ isSorting: false });
    this.setState({ isSorted: false });

    const array = [];
    for (let i = 0; i < this.state.columnsAmount; i++) {
      array.push(Math.random() * 99 + 1);
    }
    this.setState({ array });

    this.stepCounterRef.current.innerHTML = "0";
    this.amountNumRef.current.innerHTML = `Amount of columns:  ${this.state.columnsAmount}`;
  };

  render() {
    const { array } = this.state;
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
                min="4"
                max="300"
                disabled={this.state.isSorting}
              />
              <div>
                <label
                  ref={this.amountNumRef}
                  id="amountNumber"
                  htmlFor="columnAmount"
                >
                  Amount of columns:
                </label>
              </div>
            </span>
            <span>
              <input
                type="range"
                id="sortingSpeed"
                ref={this.sortingSpeedRef}
                name="sortingSpeed"
                onChange={this.handleSortingSpeedChange}
                min="1"
                max="100"
                step="1"
                disabled={this.state.isSorting}
              />
              <label
                ref={this.sortingSpeedNumRef}
                id="sortingSpeedNumber"
                htmlFor="sortingSpeed"
              >
                Sorting speed:
              </label>
            </span>
          </div>
          <p>Steps: </p>
          <p ref={this.stepCounterRef} id="stepCounter">
            0
          </p>
          <div className="App-header__algorithms">
            <BubbleSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
            />
            <SelectionSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
            />
            <InsertionSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
            />
            <QuickSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
            />
            <MergeSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
              array={this.state.array}
            />
            <HeapSort
              sortingSpeed={this.state.sortingSpeed}
              isSorting={this.state.isSorting}
              sortingChange={this.sortingChange}
              isSorted={this.state.isSorted}
              isArraySorted={this.isArraySorted}
            />
          </div>
        </header>
        <section className="App-container">
          {array.map((value, idx) => (
            <div
              className="Container-column"
              key={idx}
              style={{
                backgroundColor: "gray",
                height: `${value}%`,
                width: `calc(100% / ${this.state.columnsAmount})`
              }}
            ></div>
          ))}
        </section>
      </div>
    );
  }
}

export default App;
