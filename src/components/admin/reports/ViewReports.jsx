import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EmployeeReport from "./EmployeeReport";
import NewEmployeeReport from "./NewEmployeeReport";
import RetiredEmployeeReport from "./RetiredEmployeeReport";
import EmployeeDemographicsReport from "./EmployeeDemographicsReport";
import CostAnalysisReport from "./CostAnalysisReport";
import BenefitUtilizationReport from "./BenefitUtilizationReport";
import DeviceAllocationReport from "./DeviceAllocationReport";
import ComplianceReport from "./ComplianceReport";

const ViewReports = ({ selectedRow, onClose }) => {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const NewEmployeeReport = () => {
  //   return <div>New Employees Report</div>;
  // };

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * This component renders a report for retired employees.
 */

/*******  5c4b4029-aa5c-4576-bfce-813c22b3f1aa  *******/
  // const RetiredEmployeeReport = () => {
  //   return <div>New Employees Report</div>;
  // };

  const IndividualEmployeeReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const InactiveEmployeesReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const InternalBenefitsReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const UtilisationReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const BenefitUsageReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const ActiveEmployeesReport = () => {
    return <div>Inactive Employees Report</div>;
  };

  const renderReport = () => {
    switch (selectedRow.id) {
      // Employee Reports
      case 1:
        return <EmployeeReport />;
      case 2:
        return <NewEmployeeReport />;
      case 3:
        return <RetiredEmployeeReport />;
      case 4:
        return <EmployeeDemographicsReport />;
      case 5:
        return <IndividualEmployeeReport />;
      
      // Financial Reports
      case 6:
        return <CostAnalysisReport />;
      case 7:
        return <IndividualEmployeeReport />; // Budget Report - placeholder
      case 8:
        return <IndividualEmployeeReport />; // Monthly Financial Summary - placeholder
      case 9:
        return <IndividualEmployeeReport />; // Quarterly Financial Summary - placeholder
      
      // Device & Package Reports
      case 10:
        return <DeviceAllocationReport />;
      case 11:
        return <IndividualEmployeeReport />; // Package Utilization Report - placeholder
      case 12:
        return <IndividualEmployeeReport />; // Device Distribution Analysis - placeholder
      
      // Analytics & Insights Reports
      case 13:
        return <BenefitUtilizationReport />;
      case 14:
        return <IndividualEmployeeReport />; // Trend Analysis Report - placeholder
      case 15:
        return <IndividualEmployeeReport />; // Departmental Analysis Report - placeholder
      
      // Compliance & Audit Reports
      case 16:
        return <ComplianceReport />;
      case 17:
        return <IndividualEmployeeReport />; // Pending Approvals Report - placeholder
      case 18:
        return <IndividualEmployeeReport />; // Limit Violations Report - placeholder
      
      // ROI Reports
      case 19:
        return <IndividualEmployeeReport />; // ROI Analysis Report - placeholder
      case 20:
        return <IndividualEmployeeReport />; // Cost Per Employee Report - placeholder
      case 21:
        return <IndividualEmployeeReport />; // Program Effectiveness Report - placeholder
      
      default:
        return <div>No report selected</div>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button variant="outlined" color="primary" onClick={onClose}>
        <KeyboardBackspaceIcon />
        Back
      </Button>
      {selectedRow && renderReport()}
    </Box>
  );
};

export default ViewReports;
