import React from "react";
import PageItem from "../components/PageItem";

export default function item({ query }) {
  return (
    <div>
      <PageItem id={query.id} message={query.message} />
    </div>
  );
}
