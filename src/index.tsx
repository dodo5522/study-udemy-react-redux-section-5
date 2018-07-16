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

interface TodoTitle {
  title: String;
}

class TodoAppender extends React.Component {
  private state: TodoTitle;

  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  private listenerOnChange = event => {
    this.setState({ title: event.target.value });
  };

  private listenerOnSubmit = event => {
    this.props.appender(this.state.title);
    this.setState({ title: "" });
    event.preventDefault();
  };

  private render() {
    return (
      <form onSubmit={this.listenerOnSubmit}>
        <input id="btnSubmit" type="submit" value="Todo追加" />
        <input
          id="txtTodo"
          type="text"
          value={this.state.title}
          onChange={this.listenerOnChange}
        />
      </form>
    );
  }
}

class App extends React.Component {
  private state: ITodos;

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      nextId: 0
    };
  }

  private render() {
    return (
      <div>
        <TodoAppender appender={this.AddTodo} />
        <hr />
        <List todos={this.state.todos} />
      </div>
    );
  }

  private AddTodo = (title: String): void => {
    this.setState({
      todos: [...this.state.todos, { id: this.state.nextId, title: title }],
      nextId: this.state.nextId + 1
    });
  };
}

render(<App />, document.getElementById("root"));
