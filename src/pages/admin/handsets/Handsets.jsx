import { Box, IconButton, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DevicesIcon from "@mui/icons-material/Devices";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import ExportButton from "../../../components/admin/ExportButton";
import UploadDeviceList from "../../../components/admin/UploadDeviceList";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import HandsetAdminVoucher from "../../../components/global/HandsetAdminVoucher";
import AddHandsetModal from "../../../components/admin/AddHandsetModal";
import formatDate from "../../../components/global/dateFormatter";

const AdminHandsets = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedHandset, setSelectedHandset] = useState({});
  const [combinedData, setCombinedData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDeviceList, setModalOpenDeviceList] = useState(false);
  const [addHandsetModalOpen, setAddHandsetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);
  const handleOpenDeviceList = () => setModalOpenDeviceList(true);
  const handleCloseDeviceList = () => setModalOpenDeviceList(false);
  const handleOpenAddHandset = () => setAddHandsetModalOpen(true);
  const handleCloseAddHandset = () => setAddHandsetModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/handsets/staffHandsets`);
        setData(response.data);
      } catch (error) {
        // console.log(error);
        throw error;
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    // Add actual DB ID for better referencing
    { field: "id", headerName: "#", width: 60 }, // This is still your row index
    { field: "EmployeeCode", headerName: "Employee Code", width: 130 },
    { field: "FixedAssetCode", headerName: "Fixed Asset Code", width: 150 },
    { field: "HandsetName", headerName: "Handset Name", width: 180 },
    { field: "DevicePrice", headerName: "Handset Price", width: 140 },
    { field: "ExccessPrice", headerName: "Excess Price", width: 140 },
    { field: "MRNumber", headerName: "MR Number", width: 120 }, // New column for MRNumber
    { field: "RequestDate", headerName: "Requested Date", width: 180 },
    { field: "CollectionDate", headerName: "Collected Date", width: 180 }, // Renamed from AllocationDate for clarity
    { field: "RenewalDate", headerName: "Renewal Date", width: 180 }, // Renamed from NewAllocationDate for clarity
    { field: "Status", headerName: "Status", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => handleEditClick(row)}
          color="inherit"
        />,
        // <GridActionsCellItem
        //   icon={<FileDownloadIcon />}
        //   label="Download"
        //   className="textPrimary"
        //   onClick={() => handleRemoveClick(row)}
        //   color="inherit"
        // />,
      ],
    },
  ];

  const mapDataToRows = (data) => {
    return data.map((handset, index) => ({
      id: handset.id, // This remains your sequential row number
      EmployeeCode: handset.EmployeeCode,
      HandsetName: handset.HandsetName,
      DevicePrice: handset.HandsetPrice,
      ExccessPrice: handset.AccessFeePaid,
      FixedAssetCode: handset.FixedAssetCode,
      MRNumber: handset.MRNumber, // *** ADDED MRNumber HERE ***
      RequestDate: formatDate(handset.RequestDate),
      CollectionDate: formatDate(handset.CollectionDate), // *** Changed from AllocationDate and used CollectionDate directly ***
      RenewalDate: formatDate(handset.RenewalDate), // *** Changed from NewAllocationDate and used RenewalDate directly ***
      Status: handset.status,
    }));
  };
  const rows = mapDataToRows(data);

  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    const filteredData =
      searchText === ""
        ? data
        : data.filter(
            (handset) =>
              handset.FullName.toLowerCase().includes(searchText) ||
              handset.HandsetName.toLowerCase().includes(searchText) ||
              handset.RenewalDate.toLowerCase().includes(searchText)
          );

    setFilteredRows(mapDataToRows(filteredData));
  };

  useEffect(() => {
    setFilteredRows(mapDataToRows(data));
  }, [data]);

  const handleEditClick = async (data) => {
    console.log("active data: ", data);

    try {
      const response = await axiosInstance.get(
        `/staffmember/${data.EmployeeCode}`
      );
      console.log("Selected data: ", response.data);
      const employeeData = response.data; // Store the fetched employee data

      console.log("Fetched employee data for voucher: ", employeeData);

      // Directly use the fetched employeeData and the passed handsetRowData
      // instead of relying on the async state updates of selectedEmployee and selectedHandset
      setCombinedData({
        employee: employeeData,
        handset: data,
      });
      handleOpenEdit();
    } catch (error) {
      // console.log(error);
      throw error;
    }

    // setCurrentPackage(packages);
    // setModalMode("edit");
    // setModalOpen(true);
  };

  const handleRemoveClick = (data) => {
    // setCurrentPackage(packages);
    // setModalMode("remove");
    // setModalOpen(true);
  };

  const handleOpenEdit = async () => {
    try {
      const response = await axiosInstance.get(
        `/staffmember/allocation/handset/${currentUser.EmployeeCode}`
      );
      console.log("Response data handset admin:", response.data); // Log the response to inspect its structure
      if (
        Array.isArray(response?.data?.staffWithAirtimeAllocation) &&
        response?.data?.staffWithAirtimeAllocation?.length > 0
      ) {
        setUserData(response.data[0]); // Assuming you want the first element in the array
        setModalOpen(true);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleClose = () => {
    setModalOpen(false);
    setCombinedData(null); // Clear combinedData when modal closes to prevent stale data
  };

  const handleAddHandsetSuccess = () => {
    // Refresh the data when a new handset is added
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/handsets/staffHandsets`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  };
  return (
    <Box m="2px">
      <div
        style={{
          height: 500,
          width: "98%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            className="d-flex col-md-5"
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            width="200px"
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          {currentUser.RoleID === 1 ? (
            <div className="d-flex col-md-6 justify-content-between">
              <Button
                style={{
                  gap: "10px",
                  height: "100%",
                  backgroundColor: "#1674BB",
                  color: "#fff",
                  padding: "8px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  borderColor: "#1A69AC",
                  border: "1px solid",
                }}
                onClick={handleOpenAddHandset}
              >
                Add Handset Record
                <DevicesIcon size={16} />
              </Button>
              <Button
                style={{
                  gap: "10px",
                  height: "100%",
                  backgroundColor: "#0096D6",
                  color: "#fff",
                  padding: "8px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  borderColor: "#1A69AC",
                  border: "1px solid",
                }}
                onClick={handleOpenDeviceList}
              >
                Upload Price List
                <UploadFileIcon size={16} />
              </Button>
              <ExportButton data={rows} fileName="Handsets" />
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <HandsetAdminVoucher
          style={{ height: "100%" }}
          open={modalOpen}
          handleClose={handleClose}
          userData={combinedData}
          role={role}
        />
        <AddHandsetModal
          open={addHandsetModalOpen}
          handleClose={handleCloseAddHandset}
          onSuccess={handleAddHandsetSuccess}
        />
        <Box
          m="20px 0 0 0"
          height="55vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.grey[900],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.grey[900],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>

        {modalOpenDeviceList && (
          <div className="modal">
            <div className="modal-content">
              <UploadDeviceList
                style={{ height: "100%" }}
                open={modalOpenDeviceList}
                handleClose={handleCloseDeviceList}
              />
            </div>
          </div>
        )}
      </div>
    </Box>
  );
};

export default AdminHandsets;
