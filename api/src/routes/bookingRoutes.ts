import express from 'express'
import routeNames from '../config/bookingRoutes.config'
import authJwt from '../middlewares/authJwt'
import * as bookingController from '../controllers/bookingController'

const routes = express.Router()

routes.route(routeNames.create).post(authJwt.verifyToken, bookingController.create)
routes.route(routeNames.checkout).post(bookingController.checkout)
routes.route(routeNames.update).put(authJwt.verifyToken, bookingController.update)
routes.route(routeNames.updateStatus).post(authJwt.verifyToken, bookingController.updateStatus)
routes.route(routeNames.delete).post(authJwt.verifyToken, bookingController.deleteBookings)
routes.route(routeNames.deleteTempBooking).delete(bookingController.deleteTempBooking)
routes.route(routeNames.getBooking).get(authJwt.verifyToken, bookingController.getBooking)
routes.route(routeNames.getBookings).post(authJwt.verifyToken, bookingController.getBookings)
routes.route(routeNames.hasBookings).get(authJwt.verifyToken, bookingController.hasBookings)
routes.route(routeNames.cancelBooking).post(authJwt.verifyToken, bookingController.cancelBooking)
routes.route(routeNames.getBookingStats).get(authJwt.verifyToken, bookingController.getBookingStats)
routes.route(routeNames.getRecentBookings).get(authJwt.verifyToken, bookingController.getRecentBookings)

export default routes
