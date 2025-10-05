import React, { useEffect, useMemo, useState, useCallback } from "react";
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useTodos } from "./hooks/useTodos";
import TodoItem from "./Components/TodoItem";
import AddTodoForm from "./Components/AddTodoForm";
import SearchBar from "./Components/SearchBar";
import CategoryFilter from "./Components/CategoryFilter";
import "./App.css";

function AppContentInner() {
  const { darkMode, toggleTheme } = useTheme();
  const {
    todos,
    stats,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  } = useTodos();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const counts = useMemo(() => ({ ...stats }), [stats]);

  const openAdd = useCallback(() => setShowAddModal(true), []);
  const closeAdd = useCallback(() => {
    setShowAddModal(false);
    setEditItem(null);
  }, []);

  const handleEdit = useCallback((todo) => {
    setEditItem(todo);
    setShowAddModal(true);
  }, []);

  // 👇 heading based on selected filter
  const headingText = useMemo(() => {
    switch (filter) {
      case "active":
        return "Active Tasks";
      case "completed":
        return "Completed Tasks";
      default:
        return "All Tasks";
    }
  }, [filter]);

  return (
    <div className={`main-container ${darkMode ? "dark" : ""}`}>
      <header className="header">
     <h1 className="todoHeading" style={{ color: darkMode ? "#ffffff" : "#000000" }}>
        Todo Dashboard
      </h1>
        <div className="header-right">
          <div className="stats">
            <small>{counts.active} active</small>&nbsp;
            <small>{counts.completed} done</small>
          </div>
          <button className="theme-btn" onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <div className="todo-layout">
        {/* Left Panel */}
        <aside className="left-panel">
          <div className="filter-row">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "active" ? "active" : ""}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
           <p>Search tasks, category or date</p>
          <SearchBar search={search} onSearch={setSearch} />
          <CategoryFilter value={categoryFilter} onChange={setCategoryFilter} />

          <button className="add-btn-fixed" onClick={openAdd}>
            + Add Task
          </button>
        </aside>

        {/* Right Panel */}
        <section className="right-panel">
          <h2 className="section-heading">{headingText}</h2>
          <div className="todo-list">
            {todos.length === 0 ? (
              <div className="empty">No tasks found</div>
            ) : (
              todos.map((t) => (
                <TodoItem
                  key={t.id}
                  todo={t}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {showAddModal && (
        <AddTodoForm
          onClose={closeAdd}
          onAdd={(text, category, dueDate) => {
            if (editItem) {
              editTodo(editItem.id, text, category, dueDate);
            } else {
              addTodo(text, category, dueDate);
            }
            closeAdd();
          }}
          existingData={editItem}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContentInner />
    </ThemeProvider>
  );
}
