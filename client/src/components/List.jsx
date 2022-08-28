/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from "react";
import Transaction from "./Transaction";
import { apiSlice as api } from "../store/apiSlice";

export default function List() {
  // eslint-disable-next-line
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  // eslint-disable-next-line
  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };
  let TransactionItem;

  if (isFetching) {
    TransactionItem = <div>Fetching....</div>;
  } else if (isSuccess) {
    TransactionItem = data.map((v) => (
      // eslint-disable-next-line
      <Transaction key={v._id} category={v} handler={handlerClick} />
    ));
  } else if (isError) {
    TransactionItem = <div>Error....</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {TransactionItem}
    </div>
  );
}
