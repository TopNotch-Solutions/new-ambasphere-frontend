import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Store as StoreIcon,
  LocationOn as LocationIcon,
  PhoneAndroid as PhoneIcon
} from '@mui/icons-material';
import { tokens } from '../../../theme';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../utils/axiosInstance';
import Swal from 'sweetalert2';

const Reservation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentUser = useSelector((state) => state.auth.user);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [selectedHandset, setSelectedHandset] = useState(null);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [imeiNumber, setImeiNumber] = useState('');
  const [deviceLocation, setDeviceLocation] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/handsets/retail-reservations');
      setData(response.data.data || []);
    } catch (err) {
      console.error('Error fetching device allocations data:', err);
      setError('Failed to fetch device allocations data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return data;
    const q = filter.toLowerCase();
    return data.filter(
      (r) => 
        (r.RequestNumber && r.RequestNumber.toLowerCase().includes(q)) || 
        (r.EmployeeName && r.EmployeeName.toLowerCase().includes(q)) ||
        (r.EmployeeCode && r.EmployeeCode.toLowerCase().includes(q)) ||
        (r.Device && r.Device.toLowerCase().includes(q))
    );
  }, [data, filter]);

  const handleReserveDevice = (handset) => {
    setSelectedHandset(handset);
    setStoreName('');
    setImeiNumber('');
    setDeviceLocation('');
    setReservationModalOpen(true);
  };

  const handleConfirmReservation = async () => {
    if (!storeName || !imeiNumber || !deviceLocation) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields'
      });
      return;
    }

    try {
      const response = await axiosInstance.post('/handsets/reserve', {
        handsetId: selectedHandset.id,
        storeName,
        imeiNumber,
        deviceLocation
      });

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Device Reserved',
          text: 'Device has been successfully reserved'
        });
        setReservationModalOpen(false);
        fetchData(); // Refresh the data
      } else {
        throw new Error(response.data.message || 'Failed to reserve device');
      }
    } catch (error) {
      console.error('Error reserving device:', error);
      Swal.fire({
        icon: 'error',
        title: 'Reservation Failed',
        text: error.response?.data?.message || 'Failed to reserve device'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Renewal Verified': return 'success';
      case 'Pending': return 'warning';
      case 'Approved': return 'info';
      default: return 'default';
    }
  };

  const getEligibilityColor = (isEligible) => {
    return isEligible ? 'success' : 'error';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading device allocations...</Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
          Device Allocations
        </Typography>
        <Box display="flex" gap="10px">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
            sx={{ color: colors.blueAccent[400], borderColor: colors.blueAccent[400] }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by request number, employee name, or device..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ backgroundColor: colors.primary[400] }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Request #</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Employee</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Device</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Price</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Eligible</TableCell>
              <TableCell sx={{ color: colors.grey[100], fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((handset) => (
              <TableRow key={handset.id} hover>
                <TableCell sx={{ color: colors.grey[100] }}>
                  {handset.RequestNumber}
                </TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {handset.EmployeeName}
                    </Typography>
                    <Typography variant="caption" color={colors.grey[300]}>
                      {handset.EmployeeCode}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon fontSize="small" />
                    {handset.Device}
                  </Box>
                </TableCell>
                <TableCell sx={{ color: colors.grey[100] }}>
                  N${handset.DevicePrice?.toLocaleString() || '0'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={handset.Status}
                    color={getStatusColor(handset.Status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={handset.IsEligible ? 'Yes' : 'No'}
                    color={getEligibilityColor(handset.IsEligible)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Reserve Device">
                    <IconButton
                      onClick={() => handleReserveDevice(handset)}
                      disabled={!handset.IsEligible}
                      sx={{ color: colors.blueAccent[400] }}
                    >
                      <AssignmentIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filtered.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color={colors.grey[300]}>
            No device allocations found
          </Typography>
        </Box>
      )}

      {/* Reservation Modal */}
      <Dialog
        open={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <AssignmentIcon color="primary" />
            <Typography variant="h6">Reserve Device</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedHandset && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Device Details:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Request:</strong> {selectedHandset.RequestNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Employee:</strong> {selectedHandset.EmployeeName} ({selectedHandset.EmployeeCode})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Device:</strong> {selectedHandset.Device}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Price:</strong> N${selectedHandset.DevicePrice}
              </Typography>
              
              <Box mt={3}>
                <TextField
                  fullWidth
                  label="Store Name"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="IMEI Number"
                  value={imeiNumber}
                  onChange={(e) => setImeiNumber(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  select
                  label="Device Location"
                  value={deviceLocation}
                  onChange={(e) => setDeviceLocation(e.target.value)}
                  required
                  SelectProps={{ native: true }}
                >
                  <option value="">Select Location</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Retail Store">Retail Store</option>
                </TextField>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReservationModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmReservation} variant="contained">
            Reserve Device
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reservation;
