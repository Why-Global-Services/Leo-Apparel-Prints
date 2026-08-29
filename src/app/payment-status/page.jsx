"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShoppingBag,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

export default function PaymentStatusPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  const orderId = searchParams.get("orderId");

  // =========================================
  // SUCCESS
  // =========================================
  const isSuccess = status === "success";

  // =========================================
  // FAILED
  // =========================================
  const isFailed = status === "failed";

  // =========================================
  // ERROR
  // =========================================
  const isError = status === "error";

  // =========================================
  // CANCELLED
  // =========================================
  const isCancelled = status === "cancelled";

  // =========================================
  // UI CONFIG
  // =========================================
  let title = "";
  let description = "";
  let Icon = AlertTriangle;
  let bgColor = "";
  let textColor = "";

  if (isSuccess) {

    title = "Payment Successful";

    description =
      "Your order has been placed successfully.";

    Icon = CheckCircle;

    bgColor = "bg-green-100";

    textColor = "text-green-600";
  }

  else if (isFailed) {

    title = "Payment Failed";

    description =
      "Your payment could not be completed.";

    Icon = XCircle;

    bgColor = "bg-red-100";

    textColor = "text-red-600";
  }

  else if (isCancelled) {

    title = "Payment Cancelled";

    description =
      "You cancelled the payment process.";

    Icon = AlertTriangle;

    bgColor = "bg-yellow-100";

    textColor = "text-yellow-600";
  }

  else {

    title = "Something Went Wrong";

    description =
      "An unexpected error occurred during payment.";

    Icon = AlertTriangle;

    bgColor = "bg-orange-100";

    textColor = "text-orange-600";
  }

  return (

    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4 md:mt-[-50px]">

      <div className="bg-white max-w-lg w-full rounded-3xl shadow-xl p-8 text-center">

        {/* ICON */}
        <div className="flex justify-center">

          <div className={`w-24 h-24 rounded-full ${bgColor} flex items-center justify-center`}>

            <Icon
              size={60}
              className={textColor}
            />

          </div>

        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mt-6 text-gray-900">
          {title}
        </h1>

        {/* DESC */}
        <p className="text-gray-600 mt-3 leading-relaxed">
          {description}
        </p>

        {/* ORDER ID */}
        {orderId && (

          <div className="mt-5 bg-gray-100 rounded-xl p-3 text-sm text-gray-700 break-all">

            Order ID:
            <br />

            <span className="font-semibold">
              {orderId}
            </span>

          </div>

        )}

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          {/* SUCCESS */}
          {isSuccess && (

            <>
              <button
                onClick={() => router.push("/account/orders")}
                className="flex-1 bg-[#003E9B] hover:bg-[#002d70] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag size={18} />
                View Orders
              </button>

              <button
                onClick={() => router.push("/products")}
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-black"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* FAILED / ERROR / CANCEL */}
          {!isSuccess && (

            <>
              <button
                onClick={() => router.push("/checkout")}
                className="flex-1 bg-[#003E9B] hover:bg-[#002d70] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <RefreshCw size={18} />
                Retry Payment
              </button>

              <button
                onClick={() => router.push("/cart")}
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition text-black"
              >
                Go To Cart
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}