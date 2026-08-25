import { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import ApplicationForm from "../components/ApplicationForm";

const Applications = () => {
  const { applications, deleteApplication } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortBy, setSortBy] = useState("Sort by");
  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationToEdit, setApplicationToEdit] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const today=new Date().toISOString().split('T')[0];

  const filteredApplications = () => {
    const result = applications.filter((app) => {
      const matchesSearch =
        app.company?.toLowerCase().includes(search.toLowerCase()) ||
        app.role?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    if (sortBy === "Newest") {
      return result.sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
      );
    } else if (sortBy === "Oldest") {
      return result.sort(
        (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
      );
    } else if (sortBy === "Company") {
      return result.sort((a, b) => a.company?.localeCompare(b.company));
    }
    return result;
  };

  const totalPages = Math.ceil(
    filteredApplications().length / applicationsPerPage,
  );
  const startIndex = (currentPage - 1) * applicationsPerPage;
  const currentApplications = filteredApplications().slice(
    startIndex,
    startIndex + applicationsPerPage,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Applications
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Manage and track all your job applications.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            + Add Application
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="p-8">
        {/* Search + Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                placeholder="Search applications..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>All Status</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600 bg-white outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Sort by</option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Company</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Company
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Position
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Salary
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Follow-up
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {currentApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="hover:bg-slate-50 transition"
                  >
                    {/* Company */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                          {application.company?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-slate-800">
                            {application.company}
                          </p>

                          <p className="text-xs text-slate-400 mt-0.5">
                            {application.appliedPlatform || "Unknown"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {application.role}
                      </p>

                      <p className="text-xs text-slate-400 mt-0.5">
                        {application.employment || "Full time"}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.location || "-"}
                    </td>

                    {/* Salary */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.salary || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          application.status === "Applied"
                            ? "bg-blue-100 text-blue-700"
                            : application.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : application.status === "Offer"
                                ? "bg-green-100 text-green-700"
                                : application.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {application.appliedDate || "-"}
                    </td>

                    {/* {follow up} */}
                    <td className="px-6 py-4">
                      {application.followUpDate ? (
                        (() => {
                          const isToday = application.followUpDate === today;
                          const isOverdue = application.followUpDate < today;

                          return (
                            <div>
                              <p className="text-sm text-slate-600">
                                {application.followUpDate}
                              </p>

                              <span
                                className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                  isOverdue
                                    ? "bg-red-100 text-red-700"
                                    : isToday
                                      ? "bg-purple-100 text-purple-700"
                                      : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {isOverdue
                                  ? "Overdue"
                                  : isToday
                                    ? "Today"
                                    : "Upcoming"}
                              </span>
                            </div>
                          );
                        })()
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="relative flex justify-end">
                        <button
                          onClick={(e) => {
                            if (openMenu === application.id) {
                              setOpenMenu(null);
                              setMenuPosition(null);
                              return;
                            }

                            const rect =
                              e.currentTarget.getBoundingClientRect();

                            const menuHeight = 130;
                            const spaceBelow = window.innerHeight - rect.bottom;

                            let top;

                            if (spaceBelow < menuHeight) {
                              // Open upward
                              top = rect.top - menuHeight - 6;
                            } else {
                              // Open downward
                              top = rect.bottom + 6;
                            }

                            setMenuPosition({
                              top,
                              right: window.innerWidth - rect.right,
                            });

                            setOpenMenu(application.id);
                          }}
                          className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-xl"
                        >
                          ⋮
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {currentApplications.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
                {/* Showing text */}
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-medium text-slate-700">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-slate-700">
                    {Math.min(
                      startIndex + applicationsPerPage,
                      filteredApplications().length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-700">
                    {filteredApplications().length}
                  </span>{" "}
                  applications
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium ${
                        currentPage === index + 1
                          ? "bg-purple-600 text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          {openMenu && menuPosition && (
            <div
              className="fixed w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-100"
              style={{
                top: menuPosition.top,
                right: menuPosition.right,
              }}
            >
              <button
                onClick={() => {
                  const application = applications.find(
                    (app) => app.id === openMenu,
                  );

                  setSelectedApplication(application);
                  setOpenMenu(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                View
              </button>

              <button
                onClick={() => {
                  const application = applications.find(
                    (app) => app.id === openMenu,
                  );

                  setApplicationToEdit(application);
                  setOpenMenu(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setDeleteId(openMenu);
                  setOpenMenu(null);
                  setMenuPosition(null);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
          {/* Empty state */}
          {filteredApplications().length === 0 && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
                📋
              </div>

              <h3 className="mt-4 font-medium text-slate-700">
                No applications found
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Application Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Application Details
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Details about this application
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="w-9 h-9 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 uppercase">Company</p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedApplication.company}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">Position</p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedApplication.role}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Location</p>

                  <p className="text-sm text-slate-700 mt-1">
                    {selectedApplication.location || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">Salary</p>

                  <p className="text-sm text-slate-700 mt-1">
                    {selectedApplication.salary || "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase">Status</p>

                  <span className="inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    {selectedApplication.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400 uppercase">
                    Applied Date
                  </p>

                  <p className="text-sm text-slate-700 mt-1">
                    {selectedApplication.appliedDate || "-"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">
                  Applied Through
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  {selectedApplication.appliedPlatform || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 uppercase">Notes</p>

                <div className="bg-slate-50 rounded-lg p-3 mt-1">
                  <p className="text-sm text-slate-600">
                    {selectedApplication.notes || "No notes"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit */}
      {applicationToEdit && (
        <ApplicationForm
          onClose={() => setApplicationToEdit(null)}
          applicationToEdit={applicationToEdit}
        />
      )}

      {/* Add */}
      {showModal && <ApplicationForm onClose={() => setShowModal(false)} />}
        {/* {delete Modal} */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 text-xl mb-4">
              !
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              Delete application?
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to delete this application? This action
              cannot be undone.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-slate-300 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteApplication(deleteId);
                  setDeleteId(null);
                }}
                className="flex-1 bg-red-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
