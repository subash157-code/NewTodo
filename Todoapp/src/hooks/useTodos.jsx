import { useState, useEffect, useCallback, useMemo } from "react";

export function useTodos() {
  // ✅ Load todos safely from localStorage
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ✅ Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Add new todo
  const addTodo = useCallback((text, category, dueDate) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      category,
      dueDate,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }, []);

  // ✅ Edit existing todo
  const editTodo = useCallback((id, newText, newCategory, newDueDate) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, text: newText, category: newCategory, dueDate: newDueDate }
          : t
      )
    );
  }, []);

  // ✅ Toggle complete/incomplete
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  // ✅ Delete todo
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ✅ Filter + search logic with useMemo for performance
  const filteredTodos = useMemo(() => {
    return todos
      .filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) => {
        if (categoryFilter === "all") return true;
        return t.category === categoryFilter;
      })
      .filter((t) =>
        t.text.toLowerCase().includes(search.toLowerCase().trim())
      );
  }, [todos, filter, categoryFilter, search]);

  // ✅ Stats for UI
  const stats = useMemo(() => {
    const active = todos.filter((t) => !t.completed).length;
    const completed = todos.filter((t) => t.completed).length;
    return { active, completed };
  }, [todos]);

  return {
    todos: filteredTodos,
    addTodo,
    editTodo,
    toggleTodo,
    deleteTodo,
    stats,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  };
}
