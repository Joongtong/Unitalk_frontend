import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CounselingMyStatus from "pages/counseling/CounselingMyStatus";
import CounselorMyStatus from "pages/counseling/CounselorMyStatus";
import CounselingDashboard from "components/counseling/CounselingDashboard";
import ApplyCounseling from "pages/counseling/ApplyCounseling";

function Router() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/counseling" element={<CounselingMyStatus />} />
        <Route path="/counselor" element={<CounselorMyStatus />} />
        <Route path="/applyCounseling" element={<ApplyCounseling />} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default Router;
