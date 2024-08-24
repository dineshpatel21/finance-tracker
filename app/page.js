"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { currencyFormator } from "./lib/utils";
import ExpenseCategory from "./components/ExpenseCategory";

// context
import { financeContext } from "./components/context/FinanceContext";
import { authContext } from "./components/context/AuthContext";

// chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//modal
import AddingIncomeModal from "./components/modals/AddingIncomeModal";
import AddingExpensesModal from "./components/modals/AddingExpensesModal";

// signin
import Signin from "./components/Signin";

ChartJS.register(ArcElement, Tooltip, Legend);

const dummy_data = [
  { id: 1, title: "Entertainment", color: "#000", amount: "5000" },
  { id: 2, title: "Gass", color: "#f2f2f2", amount: "6000" },
  { id: 3, title: "Fuel", color: "green", amount: "8000" },
];

export default function Home() {
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  const { expenses, income } = useContext(financeContext);
  const { user, loading } = useContext(authContext);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newIncome =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);
    setBalance(newIncome);
  }, [expenses, income]);

  if (!user) {
    return <Signin />;
  }

  return (
    <>
      {/* add income modal */}
      <AddingIncomeModal show={openIncomeModal} onClose={setOpenIncomeModal} />

      {/* add expenses modal */}
      <AddingExpensesModal
        show={openExpenseModal}
        onClose={setOpenExpenseModal}
      />

      <main className="container max-w-2xl px-6 py-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-100 text-sm">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormator(balance)}</h2>
        </section>

        <section className="py-3 flex items-center gap-2">
          <button
            className="btn btn-primary"
            onClick={() => setOpenExpenseModal(true)}
          >
            + Expenses
          </button>
          <button
            className="btn btn-primary-outline"
            onClick={() => setOpenIncomeModal(true)}
          >
            + Incomes
          </button>
        </section>

        {/* Expenses */}
        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses?.map((expense) => (
              <ExpenseCategory expense={expense} />
            ))}
          </div>
        </section>

        {/* chart */}
        <section className="py-6">
          <a id="stats"></a>
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((exp) => exp.title),
                datasets: [
                  {
                    label: "expenses",
                    data: expenses.map((exp) => exp.total),
                    backgroundColor: expenses.map((exp) => exp.color),
                    borderColor: ["#000"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
