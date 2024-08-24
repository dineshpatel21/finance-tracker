import { useState, useEffect, useContext } from "react";
import { currencyFormator } from "../../lib/utils";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// icons
import { FaRegTrashAlt } from "react-icons/fa";

//Modal
import Modal from "../Modal";

// context
import { financeContext } from "../context/FinanceContext";

// uuid
import { v4 as uuidv4 } from "uuid";

//toast
import { toast } from "react-toastify";

const AddingIncomeModal = ({ show, onClose }) => {
  const ktx = useContext(financeContext);

  const { expenses, addExpenseItem, addCategory } = ktx;

  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddNewCategory, setShowAddNewCategory] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  //expense handler
  const addExpenseHandler = async () => {
    const exp = expenses.find((e) => {
      return e.id === selectedCategory;
    });
    const newAmount = +amount;
    const newExpense = {
      color: exp.color,
      total: exp.total + newAmount,
      title: exp.title,
      items: [
        ...exp.items,
        {
          amount: +amount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);
      toast.success("expense added")
    } catch (error) {
      console.log(error);
      throw error;
    }

    setAmount("");
    setSelectedCategory(null);
    onClose();
  };

  const categoryHandler = () => {
    addCategory({ title, color, total: 0 });
  };

  return (
    <Modal show={show} setShow={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="">Enter an amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>

      {/* expenses category */}

      {amount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => {
                setShowAddNewCategory(true);
              }}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddNewCategory && (
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <label htmlFor="">Pick color</label>
              <input
                type="color"
                className="w-24 h-10"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
              <button
                onClick={categoryHandler}
                className="btn btn-primary-outline"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddNewCategory(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 1px" : "none",
                  }}
                  className="flex items-center justify-between py-4 px-4 gap-2 bg-slate-500 rounded-3xl"
                >
                  <div
                    className="w-[21px] h-[25px] rounded-full"
                    style={{ backgroundColor: expense.color }}
                  />
                  <div>{expense.title}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        {amount > 0 && selectedCategory && (
          <button onClick={addExpenseHandler} className="btn btn-primary">
            Add Expenses
          </button>
        )}
      </div>
    </Modal>
  );
};

export default AddingIncomeModal;
