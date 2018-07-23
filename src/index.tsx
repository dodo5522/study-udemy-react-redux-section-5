import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

interface ITodo {
  id: Number;
  title: String;
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
    const { todos, deleteTodo } = this.props;
    const listItems = todos.map(item => {
      return (
        <li>
          #{item.id} {item.title} <button onClick={() => {deleteTodo(item.id)}}>delete</button>
        </li>
      );
    });
    return <ul>{listItems}</ul>;
  }
}

class TodoAppender extends React.Component {
  private state: { title: String };

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
        <TodoAppender appender={this.addTodo} />
        <hr />
        <List deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </div>
    );
  }

  private addTodo = (todoTitle: String) => {
    const { todos, nextId } = this.state;
    this.setState({
      todos: [...todos, { id: nextId, title: todoTitle }],
      nextId: nextId + 1
    });
  });

  privte deleteTodo = (id: Number) => {
    const { todos, nextId } = this.state;
    this.setState({
      todos: todos.filter((todo) => {
        return (todo.id !== id);
      });
      nextId: nextId
    });
  }
}

render(<App />, document.getElementById("root"));
