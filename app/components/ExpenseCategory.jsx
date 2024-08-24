import { currencyFormator } from "../lib/utils";
//modal
import ViewExpenseModal from "./modals/ViewExpenseModal";

import { useState } from "react";

const ExpenseCategory = ({ expense }) => {
  const [viewExpenseModal, setViewExpenseModal] = useState(false);

  return (
    <>
      {/* expense modal */}
      <ViewExpenseModal
        show={viewExpenseModal}
        onClose={setViewExpenseModal}
        expense={expense}
      />
      <div
        className=" expense flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
        onClick={() => {
          setViewExpenseModal(true);
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: expense.color }}
          />
          <h4 className="capitalize">{expense.title}</h4>
        </div>
        <p>{currencyFormator(expense.total)}</p>
      </div>
    </>
  );
};

export default ExpenseCategory;
