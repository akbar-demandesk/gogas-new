import BottomNavbar from "@/components/BottomNavbar/BottomNavbar";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OfflineDataTable() {
  const [offlineData, setOfflineData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // Get unsynchronized data from localStorage
    const storedData = JSON.parse(localStorage.getItem("gogasForm") || "[]");
    const unsyncData = storedData.filter((item) => item.status === "unsync");
    setOfflineData(unsyncData);
    setFilteredData(unsyncData);
  }, []);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleSelect = (index) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  // Select/Deselect all rows
  const handleSelectAll = () => {
    if (selectedItems.length === filteredData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((_, index) => index));
    }
  };

  // Sync selected rows (update offlineData in state and localStorage accordingly)
  const handleSyncSelected = () => {
    if (selectedItems.length === 0) {
      toast.warn("Please select at least one entry to sync.");
      return;
    }

    // Update the status of selected items
    const updatedData = offlineData.map((item, index) =>
      selectedItems.includes(index) ? { ...item, status: "sync" } : item
    );

    // Update localStorage
    const allData = JSON.parse(localStorage.getItem("gogasForm") || "[]").map(
      (item) =>
        selectedItems.some(
          (idx) => offlineData[idx].couponCode === item.couponCode
        )
          ? { ...item, status: "sync" }
          : item
    );
    localStorage.setItem("gogasForm", JSON.stringify(allData));

    const newUnsyncedData = updatedData.filter(
      (item) => item.status === "unsync"
    );
    setOfflineData(newUnsyncedData);
    setFilteredData(newUnsyncedData);
    setSelectedItems([]);
    toast.success("Selected data has been synced successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  const handleSyncAll = () => {
    if (offlineData.length === 0) {
      toast.warn("No offline data available to sync.");
      return;
    }

    // Update all rows to "sync"
    const updatedData = offlineData.map((item) => ({
      ...item,
      status: "sync",
    }));

    // Update localStorage
    const allData = JSON.parse(localStorage.getItem("gogasForm") || "[]").map(
      (item) => ({ ...item, status: "sync" })
    );
    localStorage.setItem("gogasForm", JSON.stringify(allData));

    setOfflineData([]);
    setFilteredData([]);
    setSelectedItems([]);

    // Show success toast
    toast.success("All offline data has been synced successfully!");

    // Redirect to home ('/') after 3 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  // Reset filter by clearing date inputs
  const handleResetFilter = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(offlineData);
  };
  const handleFilterData = () => {
    if (!startDate && !endDate) {
      alert("Please select at least one date to filter.");
      return;
    }

    console.log("Filtering with Start Date:", startDate, "End Date:", endDate);

    const filtered = offlineData.filter((item) => {
      if (!item.createdAt) {
        console.warn("Skipping item with missing createdAt:", item);
        return false; // Skip items without createdAt
      }

      // Convert item.createdAt to UTC Date
      const itemDate = new Date(item.createdAt);
      const start = startDate ? new Date(startDate + "T00:00:00Z") : null;
      const end = endDate ? new Date(endDate + "T23:59:59Z") : null;

      console.log("Item Date:", itemDate, "| Start:", start, "| End:", end);

      if (isNaN(itemDate.getTime())) {
        console.error("Invalid date format detected:", item.createdAt);
        return false;
      }

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      }
      return true;
    });

    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-[#FFE6A9] p-6 overflow-auto ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Offline Data Table <span className="text-purple-800">(Unsync)</span>
        </h2>

        {/* Date Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-6 mb-6 w-full text-center bg-white shadow-md p-4 rounded-lg">
          {/* Start Date */}
          <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
            <label className="text-black font-semibold">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border p-2 rounded w-full sm:w-auto focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
            <label className="text-black font-semibold">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border p-2 rounded w-full sm:w-auto focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={handleFilterData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition w-full sm:w-auto"
          >
            Filter
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetFilter}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition w-full sm:w-auto"
          >
            Reset Filter
          </button>
        </div>

        {filteredData.length === 0 ? (
          <p className="text-gray-600">No offline data available.</p>
        ) : (
          <div className="overflow-x-auto  w-full max-w-4xl bg-white shadow-md p-4 rounded-lg mb-5">
            {filteredData.length > 0 && (
              <div className="flex  gap-4 mt-4 justify-end mb-5">
                <button
                  onClick={handleSyncSelected}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto"
                >
                  Sync Selected
                </button>
                <button
                  onClick={handleSyncAll}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto"
                >
                  Sync All
                </button>
              </div>
            )}
            <table className="w-full border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-700 text-left">
                  <th className="p-2 border text-center">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedItems.length === filteredData.length &&
                        filteredData.length > 0
                      }
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="p-2 border">Scan Data</th>
                  <th className="p-2 border">Coupon Code</th>
                  <th className="p-2 border">Cash to Collect</th>
                  <th className="p-2 border">Dispenser Amount</th>
                  <th className="p-2 border">Extra Amount</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border text-gray-800 bg-yellow-100"
                  >
                    <td className="p-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleSelect(index)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-2 border">{item.scanData || "N/A"}</td>
                    <td className="p-2 border">{item.couponCode || "N/A"}</td>
                    <td className="p-2 border">
                      {item.cashToBeCollected || "N/A"}
                    </td>
                    <td className="p-2 border">
                      {item.dispenserAmount || "N/A"}
                    </td>
                    <td className="p-2 border">{item.extraAmount || "N/A"}</td>
                    <td className="p-2 border text-red-500 font-bold">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="md:mt-15">
        <BottomNavbar />
      </div>

      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default OfflineDataTable;
