import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes.js";

// Common Pages
import Settings from "../pages/global/settings/Settings.jsx";
import NotificationPage from "../pages/global/notifications/NotificationPage.jsx";

// Admin Pages
import AdminDashboard from "../pages/admin/dashboard/Dashboard.jsx";
import AdminCalendar from "../pages/admin/calendar/Calendar.jsx";
import Employees from "../pages/admin/employees/Employees.jsx";
import AdminProfileCard from "../pages/admin/profile/Profile.jsx";
import AdminReports from "../pages/admin/reports/Reports.jsx";
import AdminContracts from "../pages/admin/contracts/Contracts.jsx";
import AdminPackages from "../pages/admin/packages/Packages.jsx";
import AdminUploadPage from "../pages/admin/upload/UploadVoucher.jsx";
import AdminHandsets from "../pages/admin/handsets/Handsets.jsx";
import StaffDetails from "../pages/admin/staff/StaffDetails.jsx";
import Personal from "../pages/admin/staff/Personal.jsx";
import AirtimeBenefits from "../pages/admin/staff/AirtimeBenefits.jsx";
import HandsetBenefits from "../pages/admin/staff/HandsetBenefits.jsx";

// User Pages
import UserDashboard from "../pages/user/dashboard/Dashboard.jsx";
import UserCalendar from "../pages/user/calendar/Calendar.jsx";
import UserProfileCard from "../pages/user/profile/Profile.jsx";
import UserBenefits from "../pages/user/benefits/Benefits.jsx";
import UserHandsets from "../pages/user/handsets/Handsets.jsx";
import UserAirtime from "../pages/user/airtime/Airtime.jsx";
import SelfHelp from "../pages/user/self-help/SelfHelp.jsx";
// import FAQs from "../pages/user/self-help/FAQs.jsx";
// import Videos from "../pages/user/self-help/Videos.jsx";
// import Wellness from "../pages/user/self-help/Wellness.jsx";
// import Compensation from "../pages/user/self-help/Compensation.jsx";
// import WorkEnvironment from "../pages/user/self-help/WorkEnvironment.jsx";
// import Career from "../pages/user/self-help/Career.jsx";
// import Disrupters from "../pages/user/self-help/Disrupters.jsx";
import AirtimeBenefitSimulator from "../pages/user/self-help/AirtimeBenefitSimulator.jsx";
import HandsetBenefitSimulator from "../pages/user/self-help/HandsetBenefitSimulator.jsx";
import Support from "../pages/user/support/Support.jsx";
import LostForm from "../pages/user/lostform/LostForm.jsx";
import TempStaffInfo from "../pages/user/info/TempStaffInfo.jsx";

const routes = [
  
  { path: "/Settings", element: <Settings />, roles: [1, 2, 3, 4, 5, 6, 7, 8] },
  {
    path: "/Notifications",
    element: <NotificationPage />,
    roles: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    path: "/admin/Dashboard",
    element: <AdminDashboard />,
    roles: [1, 2,3, 4, 5, 6, 7],
  },
  {
    path: "/admin/Calendar",
    element: <AdminCalendar />,
    roles: [1],
  },

  {
    path: "/admin/Employees",
    element: <Employees />,
    roles: [1, 2, 4, 5, 6, 7],
  },
  {
    path: "/admin/Handsets",
    element: <AdminHandsets />,
    roles: [1, 2, 4, 5, 6, 7],
  },
  {
    path: "/admin/Packages",
    element: <AdminPackages />,
    roles: [1, 2, 4, 5, 6, 7],
  },
  { path: "/admin/Upload", element: <AdminUploadPage />, roles: [1] },
  { path: "/admin/Contracts", element: <AdminContracts />, roles: [1, 5, 6] },
  {
    path: "/admin/Profile",
    element: <AdminProfileCard />,
    roles: [1, 2, 4, 5, 6, 7],
  },
  {
    path: "/admin/Reports",
    element: <AdminReports />,
    roles: [1, 2, 4, 5, 6, 7],
  },
  {
    path: "/staffDetails/:employeeCode",
    element: <StaffDetails />,
    roles: [1],
  },
  {
    path: "/staffDetails/:employeeCode/personal",
    element: <Personal />,
    roles: [1],
  },
  {
    path: "/staffDetails/:employeeCode/handsetBenefits",
    element: <HandsetBenefits />,
    roles: [1],
  },
  {
    path: "/staffDetails/:employeeCode/airtimeBenefits",
    element: <AirtimeBenefits />,
    roles: [1],
  },
  { path: "/user/Dashboard", element: <UserDashboard />, roles: [1,3, 8] },
  { path: "/user/Profile", element: <UserProfileCard />, roles: [1,3, 8] },
  { path: "/user/Airtime", element: <UserAirtime />, roles: [1,3] },
  { path: "/user/Handsets", element: <UserHandsets />, roles: [1,3] },
  { path: "/user/Calendar", element: <UserCalendar />, roles: [1,3] },
  { path: "/user/Support", element: <Support />, roles: [1,3, 8] },
  { path: "/user/LostForm", element: <LostForm />, roles: [1,3, 8] },
  { path: "/user/Info", element: <TempStaffInfo />, roles: [8] },
  { path: "/user/Benefits", element: <UserBenefits />, roles: [1,3] },
  { path: "/user/SelfHelp", element: <SelfHelp />, roles: [1,3] },
  // {
  //   path: "/user/SelfHelp/Compensation",
  //   element: <Compensation />,
  //   roles: [3],
  // },
  // { path: "/user/SelfHelp/Disrupters", element: <Disrupters />, roles: [3] },
  // {
  //   path: "/user/SelfHelp/WorkEnvironment",
  //   element: <WorkEnvironment />,
  //   roles: [3],},
  // { path: "/user/SelfHelp/Videos", element: <Videos />, roles: [3] },
  // { path: "/user/SelfHelp/FAQS", element: <FAQs />, roles: [3] },
  // { path: "/user/SelfHelp/Wellness", element: <Wellness />, roles: [3] },
  // { path: "/user/SelfHelp/Career", element: <Career />, roles: [3] },
  { path: "/user/SelfHelp/AirtimeBenefitSimulator", element: <AirtimeBenefitSimulator />, roles: [3] },
  { path: "/user/SelfHelp/HandsetBenefitSimulator", element: <HandsetBenefitSimulator />, roles: [3] },
];

const PrivateRoutes = () => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <ProtectedRoute roles={route.roles}>{route.element}</ProtectedRoute>
      }
    />
  ));
};

export default PrivateRoutes;
