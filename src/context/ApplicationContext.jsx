import { createContext, useEffect, useState } from "react";

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(()=>{
     return JSON.parse(localStorage.getItem("applications")) || []
});

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

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
        clearApplications
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationProvider, ApplicationContext };
