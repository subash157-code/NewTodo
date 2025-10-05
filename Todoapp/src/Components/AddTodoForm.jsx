import React from "react";
import { useForm } from "react-hook-form";
import "./AddTodoForm.css";

export default function AddTodoForm({ onAdd, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { text: "", category: "Work", dueDate: "" },
  });

  const submit = (data) => {
    onAdd(data.text, data.category, data.dueDate || "");
    reset();
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit(submit)} className="add-form">
          <label>Task name</label>
          <input
            {...register("text", { required: "Task name is required", minLength: { value: 2, message: "Min 2 chars" } })}
            placeholder="e.g., Finish project report"
          />
          {errors.text && <p className="error">{errors.text.message}</p>}

          <label>Category</label>
          <select {...register("category")}>
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
          </select>

          <label>Deadline (optional)</label>
          <input type="date" {...register("dueDate")} />

          <div className="form-row">
            <button type="submit" className="save-btn">
              Add
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
