import React from 'react';

export const metadata = {
  title: 'Terms and Conditions | Leo Apparel Prints',
  description: 'Terms and Conditions for using Leo Apparel Prints website and services.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800 font-sans">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900">Terms and Conditions</h1>
      <p className="mb-10 text-sm text-center text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Website Usage Rules</h2>
        <p className="mb-4 leading-relaxed">
          By accessing, browsing, or using www.leoapparelprints.com, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Account Responsibilities</h2>
        <p className="mb-4 leading-relaxed">
          If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account or password. Please notify us immediately if you suspect any unauthorized use of your account or any other breach of security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Product and Service Availability</h2>
        <p className="mb-4 leading-relaxed">
          We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate at the time they are entered. However, we do not guarantee that product descriptions, colors, or other content are entirely accurate, complete, reliable, or error-free. All products and services are subject to availability, and we reserve the right to limit the quantity of any products or services that we offer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Orders, Pricing, and Payment</h2>
        <p className="mb-4 leading-relaxed">
          All prices displayed on the website are quoted in USD and are subject to change without prior notice. The submission of an order represents an offer to purchase, which is not accepted until we send an order confirmation. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available for purchase, inaccuracies in product or pricing information, or problems identified by our fraud avoidance department. Payment must be received in full before an order is processed for production.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Intellectual Property Rights</h2>
        <p className="mb-4 leading-relaxed">
          All content included on this website, such as text, graphics, logos, button icons, images, audio clips, digital downloads, and software, is the property of Leo Apparel Prints or its content suppliers and is protected by international copyright laws. For any custom designs, artwork, or logos you submit for printing, you warrant that you hold all necessary intellectual property rights and permissions, and you agree to indemnify Leo Apparel Prints against any claims of infringement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Limitation of Liability and Disclaimer</h2>
        <p className="mb-4 leading-relaxed">
          Our website and all information, content, materials, and products included on or otherwise made available to you through the website are provided by Leo Apparel Prints on an "as is" and "as available" basis. Leo Apparel Prints makes no representations or warranties of any kind, express or implied. To the full extent permissible by applicable law, we disclaim all warranties. Leo Apparel Prints will not be liable for any damages of any kind arising from the use of our services, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Governing Law and Dispute Resolution</h2>
        <p className="mb-4 leading-relaxed">
          These Terms and Conditions and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of California. Any disputes arising out of or relating to these Terms will be resolved through binding arbitration in California, rather than in court, except that you may assert claims in small claims court if your claims qualify.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Contact Information</h2>
        <p className="mb-4 leading-relaxed">
          Questions about the Terms and Conditions should be sent to us at <strong>support@leoapparelprints.com</strong> or via mail at our business address: 123 Print Street, Creative City, CA 90210.
        </p>
      </section>
    </div>
  );
}
