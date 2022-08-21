/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from "react";
import { apiSlice as api } from "../store/apiSlice";
import { getLabels } from "../helper/helper";

function LabelComponent({ data }) {
  if (!data) return <span />;

  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-3 rounded py-3"
          style={{ background: data.color ?? "#f9c74f" }}
        />
        <h3 className="text-md">{data.type ?? ""}</h3>
      </div>
      <h3 className="font-bold">
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {Math.round(data.percent) ?? 0}%
      </h3>
    </div>
  );
}

function Labels() {
  // eslint-disable-next-line
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transaction;

  if (isFetching) {
    Transaction = <div>Fetching....</div>;
  } else if (isSuccess) {
    Transaction = getLabels(data, "type").map((v) => (
      <LabelComponent key={v._id} data={v} />
    ));
  } else if (isError) {
    Transaction = <div>Error....</div>;
  }

  // eslint-disable-next-line
  return <> {Transaction}</>;
}

export default Labels;
