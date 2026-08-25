import {useContext, useState} from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const ApplicationForm = ({onClose,applicationToEdit}) => {
    const {addApplication,updateApplication}=useContext(ApplicationContext);
    const emptyForm = {
      company: "",
      role: "",
      website: "",
      location: "",
      employment: "Full time",
      salary: "",
      status: "Applied",
      appliedDate: "",
      appliedPlatform: "",
      interviewDate: "",
      followUpDate: "",
      notes: "",
    };

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(applicationToEdit || emptyForm);

     const handleChange = (e) => {
       const { name, value } = e.target;

       if (name === "status") {
         setFormData((prev) => ({
           ...prev,
           status: value,
           interviewDate: value === "Interview" ? prev.interviewDate : "",
           followUpDate:
             value === "Rejected" || value === "Withdrawn"
               ? ""
               : prev.followUpDate,
         }));

         return;
       }

       setFormData((prev) => ({
         ...prev,
         [name]: value,
       }));

       if (errors[name]) {
         setErrors((prev) => ({
           ...prev,
           [name]: "",
         }));
       }
       
     };

     const handleSubmit = (e) => {
       e.preventDefault();
        const newErrors={};

        if(!formData.company.trim()){
          newErrors.company="Company name is required";
        }
        if(!formData.role.trim()){
          newErrors.role="Job title is required";
        }
        if(!formData.appliedDate.trim()){
          newErrors.appliedDate="Applied date is required";
        }

        if(formData.appliedDate && new Date(formData.appliedDate)>new Date()){
          newErrors.appliedDate="Applied date cannot be in the future";
        }

        if(formData.status==="Interview" && !formData.interviewDate.trim()){
          newErrors.interviewDate="Interview date is required";
        }

        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }

       if(applicationToEdit){
        updateApplication({
          ...formData,
          id:applicationToEdit.id
        });
       }else{
        const application={
          id:Date.now(),
          ...formData
        };
        addApplication(application);
       }
       setErrors({});
       onClose();
     };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {applicationToEdit ? "Edit application" : "Add application"}
              </h2>

              <p className="text-slate-500 mt-1">
                Track a new job application.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Company + Website */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Company</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Search for company"
                  className={`w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 ${errors.company ? "border-red-400" : "border-slate-300"}`}
                />
                {errors.company && (
                  <p className="text-xs text-red-500 mt-1">{errors.company}</p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Website</label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Location + Employment */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-2">Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Search for city"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Employment</label>

                <select
                  name="employment"
                  value={formData.employment}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Full time</option>
                  <option>Part time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>

            {/* Role */}
            <div className="mt-4">
              <label className="block text-sm mb-2">Job title</label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.role ? "border-red-400" : "border-slate-300"
                }`}
              />
              {errors.role && (
                <p className="text-xs text-red-500 mt-1">{errors.role}</p>
              )}
            </div>

            {/* Salary + Status */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-2">Salary</label>

                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. 8 LPA"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Withdrawn</option>
                </select>
                {errors.status && (
                  <p className="text-xs text-red-500 mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Date + Platform */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-2">Applied date</label>

                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.appliedDate ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {errors.appliedDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.appliedDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Applied through</label>

                <select
                  name="appliedPlatform"
                  value={formData.appliedPlatform}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select platform</option>
                  <option>LinkedIn</option>
                  <option>Indeed</option>
                  <option>Company Website</option>
                  <option>Referral</option>
                  <option>Campus</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 mt-4">Follow-up Date</label>

              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <p className="text-xs text-slate-400 mt-1">
                Optional — when you plan to follow up
              </p>
            </div>

            {/* Interview date */}
            {formData.status === "Interview" && (
              <div className="mt-4">
                <label className="block text-sm mb-2">Interview date</label>

                <input
                  type="date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.interviewDate ? "border-red-400" : "border-slate-300"
                  }`}
                />

                {errors.interviewDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.interviewDate}
                  </p>
                )}
              </div>
            )}
            
            {/* Notes */}
            <div className="mt-4">
              <label className="block text-sm mb-2">Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Add notes about this application..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-slate-300 rounded-lg py-3 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700"
              >
                {applicationToEdit ? "Save changes" : "Add application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplicationForm
