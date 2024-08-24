"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { authContext } from "./AuthContext";

export const financeContext = createContext({
  income: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseCategory: async () => {},
  deleteCategory: async () => {},
});

const FinanceContextProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(authContext);
  console.log("user:",user);
  

  const addIncomeItem = async (newIncome) => {
    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => [
        ...prevState,
        {
          id: docSnap.id,
          ...newIncome,
        },
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeIncomeItem = async (id) => {
    const collectionRef = doc(db, "income", id);

    try {
      await deleteDoc(collectionRef);
      setIncome((prevState) => prevState.filter((i) => i.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const collectionRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(collectionRef, { ...newExpense });
      setExpenses((prevState) => {
        const updateExpanses = [...prevState];
        const foundIndex = updateExpanses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );
        updateExpanses[foundIndex] = { id: expenseCategoryId, ...newExpense };
        return updateExpanses;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addCategory = async (category) => {
    const collectionRef = collection(db, "expenses");

    try {
      const docSnap = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      });
      setExpenses((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            items: [],
            uid: user.uid,
            ...category,
          },
        ];
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteExpenseCategory = async (updateExpanses, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);

      await updateDoc(docRef, {
        ...updateExpanses,
      });

      setExpenses((prevState) => {
        const updateExp = [...prevState];
        const pos = updateExp.findIndex((ex) => ex.id === expenseCategoryId);
        updateExp[pos].items = [...updateExpanses.items];
        updateExp[pos].total = updateExpanses.total;
        return updateExp;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prevState) => {
        const updateExp = prevState.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updateExp];
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseCategory,
    deleteCategory,
  };

  useEffect(() => {
    if (!user) return;

    const fetchIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", "==", user.uid));
      const getres = await getDocs(q);
      const data = getres.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));

      setIncome(data);
      console.log("data: ", data);
    };

    const fetchExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", "==", user.uid));
      const getres = await getDocs(q);
      const data = getres.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExpenses(data);
    };

    fetchIncomeData();
    fetchExpensesData();
  }, [user]);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
};

export default FinanceContextProvider;
