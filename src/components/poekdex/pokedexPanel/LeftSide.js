import React from "react";
import SearchPanel from "./seachPanel/SearchPanel";
import HistoryTable from "./seachPanel/HistoryTable";
export default class LeftSide extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="w-full h-full p-2 cols-span-1 flex flex-col gap-2 md:flex-row">
        {/* Seacrhing */}
        <SearchPanel />
        <HistoryTable />
      </div>
    );
  }
}
