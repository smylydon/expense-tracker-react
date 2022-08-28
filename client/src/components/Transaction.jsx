/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from "react";
import "boxicons";

export default function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button type="button" className="px-3" onClick={handler}>
        <box-icon
          name="trash"
          color={category.color ?? "#e5e5e5"}
          data-id={category._id ?? ""}
        />
      </button>
      <span className="block w-full">{category.name ?? ""}</span>
    </div>
  );
}
