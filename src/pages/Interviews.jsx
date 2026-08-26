import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const Interviews = () => {
  const { applications } = useContext(ApplicationContext);

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview" && application.interviewDate,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingInterviews = interviews.filter((app) => {
    const interviewDate = new Date(app.interviewDate);
    interviewDate.setHours(0, 0, 0, 0);

    return interviewDate >= today;
  });

  const startOfWeek = new Date(today);
  const day = startOfWeek.getDay();

  startOfWeek.setDate(today.getDate() - day);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const thisWeekInterviews = interviews.filter((app) => {
    const interviewDate = new Date(app.interviewDate);
    interviewDate.setHours(0, 0, 0, 0);

    return interviewDate>=startOfWeek && interviewDate<=endOfWeek;
  });
  

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-5 md:py-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Interviews</h1>

          <p className="text-sm text-slate-500 mt-1">
            Keep track of your upcoming and scheduled interviews.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Total */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Interviews</p>

                <p className="text-3xl font-semibold text-slate-800 mt-2">
                  {interviews.length}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                📅
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              All scheduled interviews
            </p>
          </div>

          {/* Upcoming */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">Upcoming</p>

                <p className="text-3xl font-semibold text-purple-600 mt-2">
                  {upcomingInterviews.length}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                ⏰
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Interviews still ahead
            </p>
          </div>

          {/* This Week */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">This Week</p>

                <p className="text-3xl font-semibold text-green-600 mt-2">
                  {thisWeekInterviews.length}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                ✓
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Interviews scheduled this week
            </p>
          </div>
        </div>

        {/* Interview List */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* List Header */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Scheduled Interviews
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Your upcoming interview schedule
            </p>
          </div>

          {/* Interviews */}
          {interviews.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {[...interviews]
                .sort(
                  (a, b) =>
                    new Date(a.interviewDate) - new Date(b.interviewDate),
                )
                .map((app) => {
                  const interviewDate = new Date(app.interviewDate);
                  interviewDate.setHours(0, 0, 0, 0);

                  const isPast = interviewDate < today;
                  const isToday = interviewDate.getTime() === today.getTime();

                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition"
                    >
                      {/* Company */}
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-semibold text-lg">
                          {app.company?.charAt(0)}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {app.company}
                          </h3>

                          <p className="text-sm text-slate-500 mt-1">
                            {app.role}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            {app.location || "Location not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-xs text-slate-400">
                            Interview Date
                          </p>

                          <p className="text-sm font-medium text-slate-700 mt-1">
                            {app.interviewDate}
                          </p>
                        </div>

                        {/* Status */}
                        <span
                          className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${
                            isPast
                              ? "bg-slate-100 text-slate-500"
                              : isToday
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {isPast
                            ? "Completed"
                            : isToday
                              ? "Today"
                              : "Upcoming"}
                        </span>

                        {/* Action */}
                        <button className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition text-xl">
                          ⋮
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                📅
              </div>

              <h3 className="font-medium text-slate-700 mt-4">
                No interviews scheduled
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Interviews you schedule will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
