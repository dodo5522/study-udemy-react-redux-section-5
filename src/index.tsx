import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

interface ITodo {
  [id: Number]: String;
}

interface ITodos {
  todos: ITodo[];
  nextId: Number;
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  private render() {
    const listItems = this.props.todos.map(item => {
      return (
        <li>
          #{item.id} {item.title}
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  }
}

class BottunToAddListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  private onButtonClick() {}

  private render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Todo追加</button>
      </div>
    );
  }
}

class App extends React.Component {
  private state: ITodos;

  constructor(props) {
    super(props);
    this.state = {
      todos: [{ id: 0, title: "hoge" }, { id: 1, title: "hoge1" }],
      nextId: 2
    };
  }

  private render() {
    return (
      <div>
        <BottunToAddListItem />
        <hr />
        <List todos={this.state.todos} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
