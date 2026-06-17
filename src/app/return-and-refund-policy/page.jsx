import React from 'react';

export const metadata = {
  title: 'Return & Refund Policy | Leo Apparel Prints',
  description: 'Return, refund, and exchange policy for Leo Apparel Prints.',
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Return and Refund Policy</h1>
      <p className="mb-10 text-sm text-center text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Eligibility for Returns</h2>
        <p className="mb-4 leading-relaxed">
          At Leo Apparel Prints, we are committed to providing you with high-quality products. If you are not entirely satisfied with your purchase, you may be eligible for a return. To be eligible, your item must be unworn, unwashed, and in the exact same condition that you received it. It must also be in the original packaging with all original tags attached.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Return Timeframes</h2>
        <p className="mb-4 leading-relaxed">
          You have <strong>30 days</strong> from the date of delivery to initiate a return for eligible items. If 30 days have passed since your order was delivered, we unfortunately cannot offer you a refund or exchange.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Non-Returnable Items</h2>
        <p className="mb-4 leading-relaxed">
          Please read carefully before ordering: due to the personalized and custom nature of our business, <strong>all custom-printed apparel, personalized items, and bulk custom orders are strictly non-returnable and non-refundable</strong>. The only exception to this policy is if the product arrives with a clear manufacturing defect or a printing error on our part (e.g., wrong design, wrong size shipped).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Refund Process and Timelines</h2>
        <p className="mb-4 leading-relaxed">
          Once your return is received and inspected by our team, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within <strong>5 to 7 business days</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Exchange Procedures</h2>
        <p className="mb-4 leading-relaxed">
          We only replace items if they are defective or damaged upon arrival. If you need to exchange a defective product for the exact same item, please send us an email at support@leoapparelprints.com with photos of the defect, and we will guide you through the exchange process and arrange a replacement at no extra cost.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Shipping Costs for Returns</h2>
        <p className="mb-4 leading-relaxed">
          Customers are responsible for paying their own shipping costs for returning non-defective eligible items. Shipping costs are non-refundable. If you receive a refund, the cost of original shipping will be deducted from your refund. If you are returning an item over $75, we highly recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Customer Support Contact Details</h2>
        <p className="mb-4 leading-relaxed">
          If you are ready to initiate a return or have any further questions about our return and refund policy, please do not hesitate to contact our friendly support team:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <ul className="list-none space-y-2 leading-relaxed text-gray-700">
            <li><strong>Email:</strong> <a href="mailto:support@leoapparelprints.com" className="text-blue-600 hover:underline">support@leoapparelprints.com</a></li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM (PST)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
