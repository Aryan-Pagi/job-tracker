import { useContext, useState } from "react";
import Searchbar from "../components/Searchbar";
import { ApplicationContext } from "../context/ApplicationContext";
import ApplicationForm from "../components/ApplicationForm";

const Dashboard = () => {
  const { applications } = useContext(ApplicationContext);
  const [showModal, setShowModal] = useState(false);

  const totalApplications = applications.length;

  const recentApplications = [...applications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 5);

  const followUps = applications.filter((app) => app.followUpDate);
  const today = new Date().toISOString().split("T")[0];

  const followUpsToShow = followUps
    .filter((app) => app.followUpDate <= today)
    .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

  const statusCounts = {
    Applied: applications.filter((app) => app.status === "Applied").length,
    Interview: applications.filter((app) => app.status === "Interview").length,
    Offer: applications.filter((app) => app.status === "Offer").length,
    Rejected: applications.filter((app) => app.status === "Rejected").length,
  };

  const getPercentage = (count) => {
    if (totalApplications === 0) return 0;

    return Math.round((count / totalApplications) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-5 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Dashboard</h1>

            <p className="text-sm text-slate-500 mt-1">
              Welcome back! Here's an overview of your job search.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Searchbar />

            {/* <button className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button> */}

            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
            >
              + Add Application
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 md:p-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Applications */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Applications</p>

              <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                📋
              </div>
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-4">
              {totalApplications}
            </p>

            <p className="text-xs text-slate-400 mt-1">Total applications</p>
          </div>

          {/* Applied */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Applied</p>

              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                ↗
              </div>
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-4">
              {statusCounts.Applied}
            </p>

            <p className="text-xs text-slate-400 mt-1">Waiting for response</p>
          </div>

          {/* Interviews */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Interviews</p>

              <div className="w-9 h-9 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center">
                ✓
              </div>
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-4">
              {statusCounts.Interview}
            </p>

            <p className="text-xs text-slate-400 mt-1">Interview stages</p>
          </div>

          {/* Offers */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Offers</p>

              <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                ★
              </div>
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-4">
              {statusCounts.Offer}
            </p>

            <p className="text-xs text-slate-400 mt-1">Job offers received</p>
          </div>

          {/* Rejections */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Rejected</p>

              <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                ×
              </div>
            </div>

            <p className="text-3xl font-semibold text-slate-800 mt-4">
              {statusCounts.Rejected}
            </p>

            <p className="text-xs text-slate-400 mt-1">Applications rejected</p>
          </div>
        </div>

        {/* Follow-ups */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mt-6">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Follow-ups</h2>

            <p className="text-sm text-slate-500 mt-1">
              Applications that need your attention
            </p>
          </div>

          {followUpsToShow.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {followUpsToShow.slice(0, 5).map((app) => {
                const isToday = app.followUpDate === today;
                const isOverdue = app.followUpDate < today;

                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition"
                  >
                    {/* Company */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                        {app.company?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {app.company}
                        </p>

                        <p className="text-sm text-slate-500">{app.role}</p>
                      </div>
                    </div>

                    {/* Follow-up status */}
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          isOverdue
                            ? "bg-red-100 text-red-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {isOverdue ? "Overdue" : "Today"}
                      </span>

                      {isOverdue && (
                        <p className="text-xs text-slate-400 mt-1">
                          Follow-up date: {app.followUpDate}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center">
              <div className="text-2xl mb-2">✓</div>

              <p className="text-sm font-medium text-slate-600">
                No follow-ups need your attention
              </p>

              <p className="text-xs text-slate-400 mt-1">
                You're all caught up!
              </p>
            </div>
          )}
        </div>

        {/* Main dashboard cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-6">
          {/* Recent Applications */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Recent Applications
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your latest job applications
                </p>
              </div>
            </div>

            {recentApplications.length > 0 ? (
              <div>
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between px-6 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition"
                  >
                    {/* Company */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                        {app.company?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-800">
                          {app.company}
                        </p>

                        <p className="text-sm text-slate-500">{app.role}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                        ${
                          app.status === "Applied"
                            ? "bg-blue-100 text-blue-700"
                            : app.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "Offer"
                                ? "bg-green-100 text-green-700"
                                : app.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {app.status}
                      </span>

                      <p className="text-xs text-slate-400 mt-1">
                        {app.appliedDate || "No date"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-400 text-sm">No applications yet.</p>
              </div>
            )}
          </div>

          {/* Application Status */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Application Status
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Overview of your job search progress
              </p>
            </div>

            {/* Applied */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />

                  <span className="text-sm font-medium text-slate-700">
                    Applied
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  {statusCounts.Applied} ({getPercentage(statusCounts.Applied)}
                  %)
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(statusCounts.Applied)}%`,
                  }}
                />
              </div>
            </div>

            {/* Interview */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Interview
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  {statusCounts.Interview} (
                  {getPercentage(statusCounts.Interview)}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(statusCounts.Interview)}%`,
                  }}
                />
              </div>
            </div>

            {/* Offer */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Offer
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  {statusCounts.Offer} ({getPercentage(statusCounts.Offer)}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(statusCounts.Offer)}%`,
                  }}
                />
              </div>
            </div>

            {/* Rejected */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Rejected
                  </span>
                </div>

                <span className="text-sm text-slate-500">
                  {statusCounts.Rejected} (
                  {getPercentage(statusCounts.Rejected)}%)
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{
                    width: `${getPercentage(statusCounts.Rejected)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ApplicationForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
