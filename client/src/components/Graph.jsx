import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import Labels from "./Labels";
import { apiSlice as api } from "../store/apiSlice";
import { chartData, getTotal } from "../helper/helper";

Chart.register(ArcElement);

function Graph() {
  // eslint-disable-next-line
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let GraphData;

  if (isFetching) {
    GraphData = <div>Fetching....</div>;
  } else if (isSuccess) {
    const dataInfo = chartData(data);
    GraphData = <Doughnut data={dataInfo.data} options={dataInfo.options} />;
  } else if (isError) {
    GraphData = <div>Error....</div>;
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {GraphData}
          <h3 className="mb-4 font-bold title">
            Total
            <span className="block text-3xl text-emerald-400">
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              ${getTotal(data) ?? 0}
            </span>
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <Labels />
        </div>
      </div>
    </div>
  );
}

export default Graph;
