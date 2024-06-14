import { Route, Routes } from "react-router-dom";
import StudyPage from "../components/Study/StudyPage";
import PracticePage from "../components/Practice/PracticePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="study" element={<StudyPage />} />
      <Route path="practice" element={<PracticePage />} />
    </Routes>
  );
};

export default UserRoutes;
