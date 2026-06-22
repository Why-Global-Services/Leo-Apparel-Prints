import { useState, useEffect } from "react";
import { orderService } from "../services/order.service";
import { toast } from "react-toastify";

export default function UpdateOrderModal({
    order,
    isOpen,
    onClose,
    refreshOrders,
}) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        orderStatus: "",
        paymentStatus: "",
        deliveryDays: "",
        products: [],
    });

    useEffect(() => {
        if (order) {
            setFormData({
                orderStatus: order.orderStatus || "Pending",
                paymentStatus: order.paymentStatus || "Pending",
                deliveryDays: order.deliveryDays || "",
                products: order.orderDetails?.products || [],
            });
        }
    }, [order]);

    const handleProductStatusChange = (index, value) => {
        const updatedProducts = [...formData.products];

        updatedProducts[index] = {
            ...updatedProducts[index],
            orderStatus: value,
        };

        setFormData((prev) => ({
            ...prev,
            products: updatedProducts,
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const payload = {
                orderStatus: formData.orderStatus,
                paymentStatus: formData.paymentStatus,
                deliveryDays: Number(formData.deliveryDays) || 0,
                products: formData.products.map((product) => ({
                    productId: product.productId,
                    orderStatus: product.orderStatus,
                })),
            };

            console.log("UPDATE PAYLOAD:", payload);

            const response = await orderService.editOrder(
                order._id,
                payload
            );

            if (response?.data?.success) {
                toast.success("Order updated successfully! ✅");

                if (refreshOrders) {
                    await refreshOrders();
                }

                onClose();
            }
        } catch (error) {
            console.error(
                "UPDATE ORDER ERROR:",
                error?.response?.data || error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Update Order
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                {/* Order Settings */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    
                    {/* Order Status */}
                    <div>
                        <label className="block mb-2 font-medium">
                            Order Status
                        </label>
                        <select
                            value={formData.orderStatus}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    orderStatus: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Ordered">Ordered</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Return Request">Return Request</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>

                    {/* Payment Status */}

                    <div>
                        <label className="block mb-2 font-medium">
                            Payment Status
                        </label>

                        <select
                            value={formData.paymentStatus}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    paymentStatus: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Refunded">Refunded</option>
                            <option value="Failed">Failed</option>
                            <option value="Partial">Partial</option>
                        </select>
                    </div>

                    {/* Delivery Days */}

                    <div>
                        <label className="block mb-2 font-medium">
                            Delivery Days
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={formData.deliveryDays}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    deliveryDays: e.target.value,
                                })
                            }
                            className="w-full border p-2 rounded"
                            placeholder="Enter delivery days"
                        />
                    </div>

                </div>

                {/* Products */}

                <div>
                    <h3 className="font-semibold text-lg mb-4">
                        Product Status Updates
                    </h3>

                    {formData.products?.length > 0 ? (
                        formData.products.map((product, index) => (
                            <div
                                key={product.productId || index}
                                className="border rounded-lg p-4 mb-3"
                            >
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                    <div>
                                        <p className="font-medium">
                                            {product.productName || "Product"}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Qty: {product.quantity}
                                        </p>

                                        {product.selectedSize && (
                                            <p className="text-sm text-gray-500">
                                                Size: {product.selectedSize}
                                            </p>
                                        )}
                                    </div>

                                    <select
                                        value={product.orderStatus || "Pending"}
                                        onChange={(e) =>
                                            handleProductStatusChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="border p-2 rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Ordered">Ordered</option>
                                        <option value="Packing">Packing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Return Request">
                                            Return Request
                                        </option>
                                        <option value="Returned">Returned</option>
                                        <option value="Partial">Partial</option>
                                    </select>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            No products found
                        </p>
                    )}
                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Order"}
                    </button>

                </div>

            </div>
        </div>
    );
}