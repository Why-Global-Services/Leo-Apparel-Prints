import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Leo Apparel Prints',
  description: 'Privacy Policy for Leo Apparel Prints.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Privacy Policy</h1>
      <p className="mb-10 text-sm text-center text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
        <p className="mb-4 leading-relaxed">
          Leo Apparel Prints respects your privacy and is committed to protecting your personal data. We collect personal information that you voluntarily provide to us when registering on the website, expressing an interest in obtaining information about us or our products, participating in activities on the website, or otherwise contacting us. This may include your name, email address, phone number, shipping and billing addresses, and secure payment details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
        <p className="mb-4 leading-relaxed">
          We use the information we collect or receive to:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4 leading-relaxed">
          <li>Process, fulfill, and manage your orders and returns.</li>
          <li>Communicate with you regarding your purchases, inquiries, and customer support requests.</li>
          <li>Improve our website, products, marketing efforts, and overall customer service.</li>
          <li>Send marketing and promotional communications (only if you have opted in).</li>
          <li>Protect our services and enforce our terms, conditions, and policies.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Cookies and Tracking Technologies</h2>
        <p className="mb-4 leading-relaxed">
          We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the site and improve your experience. These technologies help us analyze site traffic, remember your preferences, and personalize content. You can control or disable cookies through your browser settings; however, disabling cookies may affect the functionality of certain features on our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Sharing and Third-Party Services</h2>
        <p className="mb-4 leading-relaxed">
          We do not sell, rent, or trade your personal data to third parties. We may share necessary information with trusted third-party service providers (such as payment processors, shipping carriers, and email delivery services) solely to facilitate your orders and operate our business effectively. These third parties are bound by strict confidentiality agreements and are permitted to use your data only for the specified purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Your Data Rights</h2>
        <p className="mb-4 leading-relaxed">
          Depending on your location and applicable privacy laws (such as GDPR or CCPA), you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. If you wish to exercise any of these rights, please contact us using the information provided below. We will respond to your request within the timeframe required by applicable law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Contact Us</h2>
        <p className="mb-4 leading-relaxed">
          If you have any questions, comments, or concerns about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <ul className="list-none space-y-2 leading-relaxed text-gray-700">
            <li><strong>Company:</strong> Leo Apparel Prints</li>
            <li><strong>Email:</strong> <a href="mailto:support@leoapparelprints.com" className="text-blue-600 hover:underline">support@leoapparelprints.com</a></li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Address:</strong> 123 Print Street, Creative City, CA 90210</li>
            <li><strong>Website:</strong> www.leoapparelprints.com</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
