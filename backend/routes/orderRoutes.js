
import {addOrderItems,myOrderItems,getOrderById,updateOrderToPaid,updateOrderToDelivered,getOrders} from '../controllers/ordersController.js'
import express from 'express'
const router = express.Router()
import {protect,admin} from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/mine').get(protect,myOrderItems)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered)

export default router