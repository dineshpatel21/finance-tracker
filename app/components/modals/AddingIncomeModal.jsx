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
import { authContext } from "../context/AuthContext";

const AddingIncomeModal = ({ show, onClose }) => {
  const ktx = useContext(financeContext);
  const { user } = useContext(authContext);

  const { income, addIncomeItem, removeIncomeItem } = ktx;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // handler
  const onIncomeHandle = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: +amount,
      description: description,
      createdAt: new Date(),
      uid:user.uid
    };

    try {
      await addIncomeItem(newIncome);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await removeIncomeItem(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} setShow={onClose}>
      <form onSubmit={onIncomeHandle} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            name="amount"
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter income description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add entry
        </button>
      </form>

      <div className="flex flex-col gap-2 mt-2 ">
        <h1 className="text-xl font-bold">Income History</h1>
        <div
          className="flex flex-col gap-2 mt-2 overflow-y-auto "
          style={{ maxHeight: 130 }}
        >
          {income?.map((i) => {
            return (
              <div className="flex justify-between items-center" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormator(i.amount)}
                  <button
                    onClick={() => {
                      deleteHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default AddingIncomeModal;
