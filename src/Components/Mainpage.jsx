import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Mainpage() {
  // Initialize state with data from localStorage if available
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Save expenses to localStorage whenever the expenses array changes
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addOrUpdateExpense = () => {
    if (name && description && amount) {
      const newExpense = {
        id: editingId || Date.now(),
        name,
        description,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };

      if (editingId) {
        setExpenses(expenses.map((expense) =>
          expense.id === editingId ? newExpense : expense
        ));
        setEditingId(null);
      } else {
        setExpenses([...expenses, newExpense]);
      }

      setName("");
      setDescription("");
      setAmount("");
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (expense) => {
    setName(expense.name);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setEditingId(expense.id);
  };

  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <div className="bg-gray-300 w-full">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center ">
          {editingId ? "Edit Expense" : "Add New Expense"}
        </h2>
        <div className="flex gap-2 items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            className="w-56 p-2 mb-4 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-56 p-2 mb-4 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-56 p-2 mb-4 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <button
            className="w-56 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={addOrUpdateExpense}
          >
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </div>
        <br />
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="p-4">{expense.name}</td>
                  <td className="p-4">{expense.description}</td>
                  <td className="p-4">${expense.amount.toFixed(2)}</td>
                  <td className="p-4">{expense.date}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-700 p-1"
                      onClick={() => editExpense(expense)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => deleteExpense(expense.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-semibold">
                <td className="p-4" colSpan="3">
                  Total
                </td>
                <td className="p-4"></td>
                <td className="p-4">${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
