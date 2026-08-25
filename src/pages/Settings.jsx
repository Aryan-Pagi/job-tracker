import { useContext, useState } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const Settings = () => {
  const {clearApplications}=useContext(ApplicationContext);
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [settings, setSettings] = useState({
    interviewReminders: true,
    applicationUpdates: true,
    weeklySummary: false,
    theme: "Light",
  });

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleThemeChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      theme: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Settings</h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your account, notifications, and preferences.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="p-8 max-w-5xl">
        {/* Account */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Account</h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage your account information and security.
            </p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Email address
                </p>

                <p className="text-sm text-slate-400 mt-1">john@example.com</p>
              </div>

              <button className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium">
                Change
              </button>
            </div>

            <div className="border-t border-slate-100" />

            {/* Password */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Password</p>

                <p className="text-sm text-slate-400 mt-1">
                  Last changed recently
                </p>
              </div>

              <button className="border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium">
                Change password
              </button>
            </div>

            <div className="border-t border-slate-100" />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Notifications
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Choose what notifications you want to receive.
            </p>
          </div>

          <div className="space-y-5">
            {/* Interview reminders */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Interview reminders
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Get reminded about upcoming interviews.
                </p>
              </div>

              <button
                onClick={() => handleToggle("interviewReminders")}
                className={`relative w-11 h-6 rounded-full transition ${
                  settings.interviewReminders ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.interviewReminders ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-slate-100" />

            {/* Application updates */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Application updates
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Receive updates about your applications.
                </p>
              </div>

              <button
                onClick={() => handleToggle("applicationUpdates")}
                className={`relative w-11 h-6 rounded-full transition ${
                  settings.applicationUpdates ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.applicationUpdates ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-slate-100" />

            {/* Weekly summary */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Weekly summary
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  Receive a weekly summary of your job search.
                </p>
              </div>

              <button
                onClick={() => handleToggle("weeklySummary")}
                className={`relative w-11 h-6 rounded-full transition ${
                  settings.weeklySummary ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    settings.weeklySummary ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Appearance</h2>

            <p className="text-sm text-slate-500 mt-1">
              Customize how Job Tracker looks.
            </p>
          </div>

          <div className="space-y-5">
            {/* Theme */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Theme</p>

                <p className="text-sm text-slate-400 mt-1">
                  Choose your preferred appearance.
                </p>
              </div>

              <select
                value={settings.theme}
                onChange={handleThemeChange}
                className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            <div className="border-t border-slate-100" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>

            <p className="text-sm text-slate-500 mt-1">
              These actions can permanently remove your data.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Delete application data
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Permanently remove all your tracked applications.
              </p>
            </div>

            <button
              type="button"
              onClick={()=>setShowDeleteModal(true)}
              className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Delete all data
            </button>
          </div>
        </div>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 text-xl mb-4">
                !
              </div>

              <h2 className="text-xl font-semibold text-slate-800">
                Delete all applications?
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Are you sure you want to delete all applications? This action
                cannot be undone.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 border border-slate-300 rounded-lg py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    clearApplications();
                    setShowDeleteModal(false);
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
    </div>
  );
};

export default Settings;
