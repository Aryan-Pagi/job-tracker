import { createContext, useEffect, useState } from "react";

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(()=>{
     return JSON.parse(localStorage.getItem("applications")) || []
});

const defaultProfile = {
  name: "",
  email: "",
  phone: "",
  location: "",
  role: "",
  employment: "Full time",
  preferredLocation: "",
  salary: "",
};

const [profile, setProfile] = useState(() => {
  return JSON.parse(localStorage.getItem("profile")) || defaultProfile;
});

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [applications, profile]);

  function addApplication(newApplication) {
    setApplications((prev) => [newApplication,...prev]);
  }

  function deleteApplication(id) {
    setApplications((prev) =>
      prev.filter((application) => application.id !== id),
    );
  }

  function updateApplication(updatedApplication) {
    setApplications((prev) =>
      prev.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application,
      ),
    );
  }

  function clearApplications(){
    setApplications([]);
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        setApplications,
        addApplication,
        deleteApplication,
        updateApplication,
        clearApplications,
        profile,
        setProfile
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationProvider, ApplicationContext };
