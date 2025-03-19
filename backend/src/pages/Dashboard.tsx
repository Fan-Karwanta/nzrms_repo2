import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid,
  IconButton,
  Tooltip,
  Box,
  Divider,
  CircularProgress
} from '@mui/material'
import {
  Add as AddIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarMonth as CalendarIcon,
  Apartment as ApartmentIcon,
  AddHome as AddHomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'
import * as movininTypes from ':movinin-types'
import * as movininHelper from ':movinin-helper'
import Layout from '@/components/Layout'
import env from '@/config/env.config'
import { strings } from '@/lang/bookings'
import * as helper from '@/common/helper'
import AgencyFilter from '@/components/AgencyFilter'
import StatusFilter from '@/components/StatusFilter'
import BookingFilter from '@/components/BookingFilter'
import * as AgencyService from '@/services/AgencyService'
import * as PropertyService from '@/services/PropertyService'
import * as UserService from '@/services/UserService'
import * as BookingService from '@/services/BookingService'

import '@/assets/css/bookings.css'
import '@/assets/css/dashboard.css'

const Dashboard = () => {
  const [user, setUser] = useState<movininTypes.User>()
  const [leftPanel, setLeftPanel] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [allAgencies, setAllAgencies] = useState<movininTypes.User[]>([])
  const [agencies, setAgencies] = useState<string[]>()
  const [statuses, setStatuses] = useState(helper.getBookingStatuses().map((status) => status.value))
  const [filter, setFilter] = useState<movininTypes.Filter | null>()
  const [loadingAgencies, setLoadingAgencies] = useState(true)
  const [offset, setOffset] = useState(0)
  
  // Dashboard stats
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    change: 0
  })
  const [propertyStats, setPropertyStats] = useState({
    total: 0,
    change: 0
  })
  const [agencyStats, setAgencyStats] = useState({
    total: 0,
    change: 0
  })
  const [userStats, setUserStats] = useState({
    total: 0,
    change: 0
  })
  const [recentBookings, setRecentBookings] = useState<movininTypes.Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && user.verified) {
      const col1 = document.querySelector('div.col-1')
      if (col1) {
        setOffset(col1.clientHeight)
      }
    }
  }, [user])

  const handleAgencyFilterChange = (_agencies: string[]) => {
    setAgencies(_agencies)
  }

  const handleStatusFilterChange = (_statuses: movininTypes.BookingStatus[]) => {
    setStatuses(_statuses)
  }

  const handleBookingFilterSubmit = (_filter: movininTypes.Filter | null) => {
    setFilter(_filter)
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch booking stats
      const bookingsData = await BookingService.getBookingStats()
      if (bookingsData) {
        setBookingStats({
          total: bookingsData.total || 0,
          change: bookingsData.change || 0
        })
      }
      
      // Fetch property stats
      const propertiesData = await PropertyService.getPropertyStats()
      if (propertiesData) {
        setPropertyStats({
          total: propertiesData.total || 0,
          change: propertiesData.change || 0
        })
      }
      
      // Fetch agency stats
      const agenciesData = await AgencyService.getAgencyStats()
      if (agenciesData) {
        setAgencyStats({
          total: agenciesData.total || 0,
          change: agenciesData.change || 0
        })
      }
      
      // Fetch user stats
      const usersData = await UserService.getUserStats()
      if (usersData) {
        setUserStats({
          total: usersData.total || 0,
          change: usersData.change || 0
        })
      }
      
      // Fetch recent bookings - get 10 instead of 5 for more data
      const recentBookingsData = await BookingService.getRecentBookings(10)
      if (recentBookingsData && Array.isArray(recentBookingsData)) {
        setRecentBookings(recentBookingsData)
      } else {
        // If we don't get an array back, set to empty array
        setRecentBookings([])
      }
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      helper.error(err)
      
      // Set empty data on error to avoid showing stale data
      setBookingStats({ total: 0, change: 0 })
      setPropertyStats({ total: 0, change: 0 })
      setAgencyStats({ total: 0, change: 0 })
      setUserStats({ total: 0, change: 0 })
      setRecentBookings([])
    } finally {
      setLoading(false)
    }
  }

  const onLoad = async (_user?: movininTypes.User) => {
    if (_user) {
      const _admin = helper.admin(_user)
      setUser(_user)
      setAdmin(_admin)
      setLeftPanel(!_admin)
      setLoadingAgencies(_admin)

      const _allAgencies = await AgencyService.getAllAgencies()
      const _agencies = _admin ? movininHelper.flattenAgencies(_allAgencies) : [_user._id ?? '']
      setAllAgencies(_allAgencies)
      setAgencies(_agencies)
      setLeftPanel(true)
      setLoadingAgencies(false)
      
      // Fetch dashboard data
      fetchDashboardData()
    }
  }

  const refreshData = () => {
    fetchDashboardData()
  }

  const renderRefreshButton = () => {
    return (
      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={refreshData}
        className="refresh-button"
        disabled={loading}
      >
        Refresh
      </Button>
    )
  }

  return (
    <Layout onLoad={onLoad} strict>
      {user && (
        <>
        <br />
          {/* Quick Actions */}
          <div className="quick-actions">
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              href="/create-booking"
              className="quick-action-button"
            >
              {strings.NEW_BOOKING}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<AddHomeIcon />}
              href="/create-property"
              className="quick-action-button"
            >
              Add Property
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ApartmentIcon />}
              href="/agencies"
              className="quick-action-button"
            >
              Manage Agents
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<PersonIcon />}
              href="/users"
              className="quick-action-button"
            >
              Manage Users
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<SettingsIcon />}
              href="/settings"
              className="quick-action-button"
            >
              Settings
            </Button>
            {renderRefreshButton()}
          </div>

          {/* Dashboard Container */}
          <div className="dashboard-container">
            {/* Dashboard Header */}
            <div className="dashboard-header">
              <h1>Dashboard Overview</h1>
              <div className="dashboard-header-actions">
                <Tooltip title="Filter">
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton>
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="stats-cards-grid">
              <div className={`stats-card ${loading ? 'loading' : ''}`}>
                {loading && (
                  <div className="loading-overlay">
                    <CircularProgress size={24} className="loading-spinner" />
                  </div>
                )}
                <div className="stats-card-icon stats-card-bookings">
                  <CalendarIcon />
                </div>
                <Typography className="stats-card-title">Total Bookings</Typography>
                <Typography className="stats-card-value">{bookingStats.total}</Typography>
                <div className={`stats-card-change ${bookingStats.change >= 0 ? 'positive' : 'negative'}`}>
                  {bookingStats.change >= 0 ? (
                    <TrendingUpIcon className="stats-card-change-icon" />
                  ) : (
                    <TrendingDownIcon className="stats-card-change-icon" />
                  )}
                  {Math.abs(bookingStats.change)}% from last month
                </div>
              </div>

              <div className={`stats-card ${loading ? 'loading' : ''}`}>
                {loading && (
                  <div className="loading-overlay">
                    <CircularProgress size={24} className="loading-spinner" />
                  </div>
                )}
                <div className="stats-card-icon stats-card-properties">
                  <HomeIcon />
                </div>
                <Typography className="stats-card-title">Properties</Typography>
                <Typography className="stats-card-value">{propertyStats.total}</Typography>
                <div className={`stats-card-change ${propertyStats.change >= 0 ? 'positive' : 'negative'}`}>
                  {propertyStats.change >= 0 ? (
                    <TrendingUpIcon className="stats-card-change-icon" />
                  ) : (
                    <TrendingDownIcon className="stats-card-change-icon" />
                  )}
                  {Math.abs(propertyStats.change)}% from last month
                </div>
              </div>

              <div className={`stats-card ${loading ? 'loading' : ''}`}>
                {loading && (
                  <div className="loading-overlay">
                    <CircularProgress size={24} className="loading-spinner" />
                  </div>
                )}
                <div className="stats-card-icon stats-card-agencies">
                  <BusinessIcon />
                </div>
                <Typography className="stats-card-title">Agencies</Typography>
                <Typography className="stats-card-value">{agencyStats.total}</Typography>
                <div className={`stats-card-change ${agencyStats.change >= 0 ? 'positive' : 'negative'}`}>
                  {agencyStats.change >= 0 ? (
                    <TrendingUpIcon className="stats-card-change-icon" />
                  ) : (
                    <TrendingDownIcon className="stats-card-change-icon" />
                  )}
                  {Math.abs(agencyStats.change)}% from last month
                </div>
              </div>

              <div className={`stats-card ${loading ? 'loading' : ''}`}>
                {loading && (
                  <div className="loading-overlay">
                    <CircularProgress size={24} className="loading-spinner" />
                  </div>
                )}
                <div className="stats-card-icon stats-card-users">
                  <PeopleIcon />
                </div>
                <Typography className="stats-card-title">Users</Typography>
                <Typography className="stats-card-value">{userStats.total}</Typography>
                <div className={`stats-card-change ${userStats.change >= 0 ? 'positive' : 'negative'}`}>
                  {userStats.change >= 0 ? (
                    <TrendingUpIcon className="stats-card-change-icon" />
                  ) : (
                    <TrendingDownIcon className="stats-card-change-icon" />
                  )}
                  {Math.abs(userStats.change)}% from last month
                </div>
              </div>
            </div>

            {/* Recent Bookings Section */}
            <div className="recent-bookings-section">
              <div className="recent-bookings-header">
                <Typography variant="h6" className="recent-bookings-title">Recent Bookings</Typography>
                <Button 
                  variant="text" 
                  color="primary" 
                  endIcon={<ArrowForwardIcon />}
                  href="/bookings"
                  className="view-all-button"
                >
                  View All
                </Button>
              </div>
              <div className={`bookings-container ${loading ? 'loading' : ''}`}>
                {loading && (
                  <div className="loading-overlay">
                    <CircularProgress size={30} className="loading-spinner" />
                  </div>
                )}
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Agent</th>
                      <th>Property</th>
                      <th>Client</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.length > 0 ? (
                      recentBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <div className="booking-agent">
                              {typeof booking.agency === 'object' ? 
                                (booking.agency as any)?.fullName || 'N/A' : 
                                allAgencies.find(a => a._id === booking.agency)?.fullName || 'N/A'}
                            </div>
                          </td>
                          <td>
                            <div className="booking-property">
                              {typeof booking.property === 'object' ? 
                                (booking.property as any)?.name || 'N/A' : 
                                booking.property || 'N/A'}
                            </div>
                          </td>
                          <td>
                            <div className="booking-client">
                              {typeof booking.renter === 'object' ? 
                                (booking.renter as any)?.fullName || 'N/A' : 
                                'N/A'}
                            </div>
                          </td>
                          <td>
                            <div className="booking-price">
                              {booking.price ? `₱ ${booking.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ` : 'N/A'}
                            </div>
                          </td>
                          <td>
                            <div className={`status-badge ${booking.status || 'pending'}`}>
                              {booking.status ? helper.getBookingStatus(booking.status) : 'Pending'}
                            </div>
                          </td>
                          <td>
                            <div className="booking-actions">
                              <Tooltip title="Edit">
                                <IconButton size="small" href={`/update-booking?id=${booking._id}`}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                          {loading ? 'Loading bookings...' : 'No recent bookings found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  )
}

export default Dashboard
