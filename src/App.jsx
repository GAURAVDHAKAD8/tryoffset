import React, { useState, useEffect } from "react";
import creditsData from "./data/credits.json";
import { jsPDF } from "jspdf";

function App() {
  const [credits, setCredits] = useState([]);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("All");

  useEffect(() => {
    setCredits(creditsData);
  }, []);

  const filteredCredits = credits.filter((credit) => {
    const matchesSearch =
      credit.project_name.toLowerCase().includes(search.trim().toLowerCase()) ||
      credit.vintage.toString().includes(search.trim()) ||
      credit.unic_id.toLowerCase().includes(search.trim().toLowerCase());

    const matchesYear =
      yearFilter === "All" || credit.vintage.toString() === yearFilter;
    return matchesSearch && matchesYear;
  });

  const uniqueYears = [
    "All",
    ...Array.from(new Set(credits.map((c) => c.vintage))).sort((a, b) => b - a),
  ];

  const downloadPDF = (credit) => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = "/bgpdf.jpg";

    img.onload = () => {
      doc.addImage(img, "JPEG", 0, 0, 210, 297);

      doc.setFontSize(16);
      doc.setTextColor(240, 240, 240); // light gray text
      doc.text(`UNIC ID: ${credit.unic_id}`, 20, 110);
      doc.text(`Project Name: ${credit.project_name}`, 20, 130);
      doc.text(`Vintage: ${credit.vintage}`, 20, 150);
      doc.text(`Status: ${credit.status}`, 20, 170);
      doc.text(`Timestamp: ${new Date().toLocaleString()}`, 20, 190);

      doc.save(`${credit.unic_id}-certificate.pdf`);
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans caret-transparent">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <img
          src="newbg.png"
          className="w-32 sm:w-36 md:w-40 cursor-pointer"
          alt="Logo"
          draggable="false"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start md:items-center">
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-auto"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by name, UNIC ID or vintage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/5 bg-gray-800 p-4 rounded-lg flex md:flex-col flex-row gap-4 overflow-x-auto">
          <button className="hidden md:flex bg-gray-700 hover:bg-green-600 shadow-lg hover:shadow-[-4px_6px_1px_lightgreen] transform transition-transform duration-300 hover:-translate-y-2 hover:border-2 hover:border-green-700 text-white font-semibold px-3 py-2 rounded cursor-pointer justify-center">
            Dashboard
          </button>
          <button className="md:flex bg-gray-700 hover:bg-green-600 shadow-lg hover:shadow-[-4px_6px_1px_lightgreen] transform transition-transform duration-300 hover:-translate-y-2 hover:border-2 hover:border-green-700 text-white font-semibold px-3 py-2 rounded cursor-pointer justify-center">
            Settings
          </button>
          <button className="md:flex bg-gray-700 hover:bg-green-600 shadow-lg hover:shadow-[-4px_6px_1px_lightgreen] transform transition-transform duration-300 hover:-translate-y-2 hover:border-2 hover:border-green-700 text-white font-semibold px-3 py-2 rounded cursor-pointer justify-center">
            Reports
          </button>
          <button className="md:flex bg-gray-700 hover:bg-green-600 shadow-lg hover:shadow-[-4px_6px_1px_lightgreen] transform transition-transform duration-300 hover:-translate-y-2 hover:border-2 hover:border-green-700 text-white font-semibold px-3 py-2 rounded cursor-pointer justify-center">
            Help
          </button>
        </div>

        <div className="flex flex-col md:w-4/5 gap-6">
          {filteredCredits.map((credit) => (
            <div
              key={credit.unic_id}
              className="group cursor-pointer w-full p-4 md:p-5 rounded-lg shadow-lg hover:shadow-[-10px_10px_1px_rgba(107,114,128,0.5)] transform-shadow duration-300 hover:-translate-y-4 hover:translate-x-2 caret-transparent bg-gray-800"
              style={{
                backgroundImage: "url('/pine-trees.png')",
                backgroundSize: "30px 30px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full">
                <div className="w-full md:w-[30%] h-48 md:h-40 mb-4 md:mb-0 md:mt-4">
                  <img
                    src={credit.image}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Project preview"
                  />
                </div>

                <div className="flex flex-col mb-2 md:mb-0 md:mr-auto md:ml-5 md:mt-3">
                  <h2 className="text-lg md:text-2xl font-extrabold mb-2 md:mb-1 md:pb-2">
                    {credit.project_name}
                  </h2>
                  <p className="text-gray-300 text-xs font-bold mb-2 md:mb-1 md:pb-2">
                    UNIC ID: {credit.unic_id}
                  </p>
                  <p className="text-gray-300 text-xs font-bold mb-2">
                    Vintage: {credit.vintage}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-l font-semibold w-fit md:w-auto ${
                    credit.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  } ${
                    credit.status === "Active" ? "mb-4 md:mb-0" : "mb-4 md:mb-0"
                  }`}
                >
                  <img
                    src={
                      credit.status === "Active"
                        ? "/coca-leaves.png"
                        : "/redleaf.png"
                    }
                    alt={credit.status}
                    className="w-3 h-3 md:w-4 md:h-4 object-contain"
                  />
                  <span className="text-xs">{credit.status}</span>
                </div>
              </div>

              <button
                disabled={credit.status === "Active"}
                className={`md:mt-5 font-semibold px-4 py-2 rounded transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 m-auto block ${
                  credit.status === "Active"
                    ? "bg-gray-600 hover:bg-gray-700 text-white cursor-not-allowed"
                    : "bg-green-600 text-white cursor-pointer"
                } 
                w-[80%] md:w-[30%] hover:md:w-[50%]`}
                onMouseEnter={(e) => {
              
                  if (window.innerWidth >= 768 && credit.status !== "Active") {
                    e.currentTarget.style.width = "50%";
                  }
                }}
                onMouseLeave={(e) => {
                 
                  if (window.innerWidth >= 768 && credit.status !== "Active") {
                    e.currentTarget.style.width = "30%";
                  }
                }}
                onClick={() => downloadPDF(credit)}
              >
                <span className="text-xs">
                  {credit.status === "Active"
                    ? "Certificate Unavailable"
                    : "Download Retirement Certificate"}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
