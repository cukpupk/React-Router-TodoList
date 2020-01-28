import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function NestingExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">TodoList</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/topics">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleClick = () => {
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <div>
      <h2>TodoList</h2>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
function App(props) {
  let { path, url } = useRouteMatch();
  const [todos, setTodos] = useState([]);
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const Todo = ({ todo, index }) => (
    <li style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      <Link to={`${url}/${todo.text}`}>{todo.text}</Link>

      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>x</button>
    </li>
  );
  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <ul>
        {todos.map((item, index) => (
          <div>
            <Todo key={index} index={index} todo={item} />
            <Topic />
          </div>
        ))}
      </ul>

      <Switch>
        <Route exact path={path}>
          <h3>Please select a SubTodoList.</h3>
        </Route>
        <Route path={`${path}/:topicId`} />
      </Switch>
    </div>
  );
}
function Topic() {
  const [todos, setTodos] = useState([]);
  let { topicId } = useParams();
  const addTodoChild = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const TodoChild = ({ todo, index }) => (
    <li style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.text}
      <button onClick={() => completeTodo(index)}>Complete</button>
      <button onClick={() => removeTodo(index)}>x</button>
    </li>
  );
  return (
    <div>
      <h3>{topicId}</h3>
      <div>
        <TodoFormChild addTodoChild={addTodoChild} />
        <ul>
          {todos.map((item, index) => (
            <TodoChild key={index} index={index} todo={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function TodoFormChild({ addTodoChild }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodoChild(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
