
import axiosInstance from "../api/axiosInstance";

export const orderService = {

  // =========================
  // GET ALL ORDERS
  // =========================

  getOrders: () =>
    axiosInstance.get("/getOrders"),

  // =========================
  // GET SINGLE ORDER
  // =========================

  getOrderById: (orderId) =>
    axiosInstance.get(`/getOrder/${orderId}`),

  // =========================
  // UPDATE ORDER STATUS
  // =========================

  updateOrderStatus: (orderId, data) =>
    axiosInstance.put(
      `/admin/updateOrderStatus/${orderId}`,
      data
    ),

  // =========================
  // UPDATE PAYMENT STATUS
  // =========================

  updatePaymentStatus: (orderId, data) =>
    axiosInstance.put(
      `/admin/updatePaymentStatus/${orderId}`,
      data
    ),
};

