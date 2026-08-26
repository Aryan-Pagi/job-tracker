import { useState } from "react";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const Profile = () => {
  const {profile,setProfile}=useContext(ApplicationContext);
  const [profileData, setProfileData] = useState(profile);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(profileData);
    
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-5 md:py-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your personal information and job preferences.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="p-8 max-w-6xl">
        <form onSubmit={handleSubmit}>
          {/* Profile Overview */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl font-semibold">
                {profile.name?.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {profile.name}
                </h2>

                <p className="text-sm text-slate-500 mt-1">{profile.email}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Update your basic personal information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="preferredLocation"
                  value={profileData.preferredLocation}
                  onChange={handleChange}
                  placeholder="e.g. Goa, India"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Job Preferences */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 mb-5">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Job Preferences
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Tell us what kind of jobs you're looking for.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Desired Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Desired Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={profileData.role}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Employment */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Employment Type
                </label>

                <select
                  name="employment"
                  value={profileData.employment}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Full time</option>
                  <option>Part time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>

              {/* Preferred Location */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Remote"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Expected Salary
                </label>

                <input
                  type="text"
                  name="salary"
                  value={profileData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 8 LPA"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Keep your profile information up to date.
            </p>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
