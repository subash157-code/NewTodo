import React from "react";

export default function CategoryFilter({ value = "all", onChange }) {
  return (
    <div className="category-filter">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
      </select>
    </div>
  );
}
