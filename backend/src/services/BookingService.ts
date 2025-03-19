import * as movininTypes from ':movinin-types'
import axiosInstance from './axiosInstance'
import * as UserService from './UserService'

/**
 * Create a Booking.
 *
 * @param {movininTypes.Booking} data
 * @returns {Promise<movininTypes.Booking>}
 */
export const create = (data: movininTypes.Booking): Promise<movininTypes.Booking> =>
  axiosInstance
    .post(
      '/api/create-booking',
      data,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Update a Booking.
 *
 * @param {movininTypes.Booking} data
 * @returns {Promise<number>}
 */
export const update = (data: movininTypes.Booking): Promise<number> =>
  axiosInstance
    .put(
      '/api/update-booking',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Update a Booking status.
 *
 * @param {movininTypes.UpdateStatusPayload} data
 * @returns {Promise<number>}
 */
export const updateStatus = (data: movininTypes.UpdateStatusPayload): Promise<number> =>
  axiosInstance
    .post(
      '/api/update-booking-status',
      data,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Delete Bookings.
 *
 * @param {string[]} ids
 * @returns {Promise<number>}
 */
export const deleteBookings = (ids: string[]): Promise<number> =>
  axiosInstance
    .post(
      '/api/delete-bookings',
      ids,
      { withCredentials: true }
    )
    .then((res) => res.status)

/**
 * Get a Booking by ID.
 *
 * @param {string} id
 * @returns {Promise<movininTypes.Booking>}
 */
export const getBooking = (id: string): Promise<movininTypes.Booking> =>
  axiosInstance
    .get(
      `/api/booking/${encodeURIComponent(id)}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get Bookings.
 *
 * @param {movininTypes.GetBookingsPayload} payload
 * @param {number} page
 * @param {number} size
 * @returns {Promise<movininTypes.Result<movininTypes.Booking>>}
 */
export const getBookings = (payload: movininTypes.GetBookingsPayload, page: number, size: number): Promise<movininTypes.Result<movininTypes.Booking>> =>
  axiosInstance
    .post(
      `/api/bookings/${page}/${size}/${UserService.getLanguage()}`,
      payload,
      { withCredentials: true }
    )
    .then((res) => res.data)

/**
 * Get booking statistics
 * 
 * @returns {Promise<{ total: number, change: number }>}
 */
export const getBookingStats = async (): Promise<{ total: number, change: number }> => {
  try {
    // Make a real API call to get booking stats
    const res = await axiosInstance.get(
      '/api/booking-stats',
      { withCredentials: true }
    )
    return res.data
  } catch (err) {
    console.error('Error fetching booking stats:', err)
    // Fallback to mock data if API call fails
    return {
      total: 0,
      change: 0
    }
  }
}

/**
 * Get recent bookings
 * 
 * @param {number} limit
 * @returns {Promise<movininTypes.Booking[]>}
 */
export const getRecentBookings = async (limit: number): Promise<movininTypes.Booking[]> => {
  try {
    // Make a real API call to get recent bookings
    const res = await axiosInstance.get(
      `/api/recent-bookings/${limit}/${UserService.getLanguage()}`,
      { withCredentials: true }
    )
    return res.data
  } catch (err) {
    console.error('Error fetching recent bookings:', err)
    
    // Fallback to using the regular getBookings method if API call fails
    try {
      const payload: movininTypes.GetBookingsPayload = {
        agencies: [],
        statuses: ['pending', 'deposit', 'paid', 'reserved', 'cancelled'],
      }
      
      const data = await getBookings(payload, 1, limit)
      if (data && data.length > 0) {
        const firstResult = data[0]
        if (firstResult && firstResult.resultData) {
          return firstResult.resultData
        }
      }
    } catch (innerErr) {
      console.error('Error with fallback booking fetch:', innerErr)
    }
    
    return []
  }
}
