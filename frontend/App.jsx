import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

import "./assets/global.css";

import { SignInPrompt, SignOutButton } from "./ui-components";

export default function App({ isSignedIn, contractId, wallet }) {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Get blockchian state once on component load
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(alert)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  async function fetchTasks() {
    // use the wallet to query the contract's greeting
    console.log(contractId);
    return wallet.viewMethod({ method: "get_tasks", contractId });
  }

  async function addTask(e) {
    e.preventDefault(); // don't submit the form
    setIsLoading(true);
    try {
      await wallet.callMethod({
        method: "add_task",
        args: { id: generateUniqueId(), content: newTask },
        contractId,
      });
      setNewTask("");
      setTasks(await fetchTasks());
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteTask(id) {
    setIsLoading(true);
    try {
      await wallet.callMethod({
        method: "delete_task",
        args: { id },
        contractId,
      });
      setTasks(await fetchTasks());
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function generateUniqueId() {
    // Generate a random unique ID for the task
    return Math.random().toString(36).substr(2, 9);
  }

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()} />;
  }

  return (
    <>
      <SignOutButton
        accountId={wallet.accountId}
        onClick={() => wallet.signOut()}
      />
      <main className={isLoading ? "please-wait" : ""}>
        <h1>To-Do List</h1>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              {console.log(task)}
              {task.content}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
