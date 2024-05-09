import { Route, Routes } from "react-router-dom";
import StudyPage from "../components/Study/StudyPage"

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="study" element={<StudyPage />} />
      {/* <Route path="exam" element={<UserExam />} /> */}
    </Routes> 
  );
};

export default UserRoutes;