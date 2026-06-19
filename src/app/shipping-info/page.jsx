import { Truck, Clock, PackageSearch, RefreshCw, Globe, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Shipping Information | Leo Apparel Prints",
  description: "Learn about our shipping policies, delivery timelines, and tracking for Leo Apparel Prints custom sportswear orders.",
};

const sections = [
  {
    icon: Clock,
    color: "#003E9B",
    title: "Production & Processing Time",
    content: [
      { label: "Standard Orders", value: "7–10 business days" },
      { label: "Rush Orders", value: "3–5 business days (surcharge applies)" },
      { label: "Bulk / Team Orders (50+ units)", value: "12–18 business days" },
      { label: "Custom Design Approval", value: "1–2 business days (included in timeline)" },
    ],
    note: "Production begins only after design approval. Changes requested after approval may extend the timeline.",
  },
  {
    icon: Truck,
    color: "#E8960A",
    title: "Shipping Timelines",
    content: [
      { label: "South India (TN, KA, KL, AP, TS)", value: "2–3 business days" },
      { label: "North India (DL, MH, GJ, RJ, UP)", value: "3–5 business days" },
      { label: "Northeast India", value: "5–7 business days" },
      { label: "Andaman, Lakshadweep & Remote Areas", value: "7–12 business days" },
    ],
    note: "Delivery dates are estimates and may be affected by public holidays, weather events, or courier delays.",
  },
  {
    icon: Globe,
    color: "#0EA5E9",
    title: "International Shipping",
    content: [
      { label: "USA, UK, Canada, Australia", value: "10–15 business days" },
      { label: "Middle East (UAE, KSA, Qatar)", value: "7–12 business days" },
      { label: "Southeast Asia", value: "8–14 business days" },
      { label: "Other Regions", value: "Contact us for a quote" },
    ],
    note: "International orders may be subject to customs duties & import taxes, which are the buyer's responsibility.",
  },
];

const partners = [
  { name: "Blue Dart", coverage: "Pan India — Express" },
  { name: "DTDC", coverage: "Pan India — Standard" },
  { name: "DHL", coverage: "International" },
  { name: "FedEx", coverage: "International & Premium" },
];

const faqs = [
  {
    q: "Do you offer free shipping?",
    a: "Yes! All domestic orders above ₹1,500 qualify for free standard shipping. Orders below this threshold incur a flat ₹99 shipping fee.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely. Once your order is dispatched, you will receive an SMS and email with a tracking number and a direct link to track your shipment in real time.",
  },
  {
    q: "What if my package is delayed?",
    a: "Please allow 2 additional business days beyond the estimated date before contacting us. For delays exceeding this, reach out at care@leocult.com and we'll investigate with the carrier immediately.",
  },
  {
    q: "Can I change my shipping address after placing an order?",
    a: "Address changes are possible if the order has not yet been dispatched. Contact us within 24 hours of placing your order. Once shipped, we are unable to reroute packages.",
  },
  {
    q: "Do you ship to PO Boxes?",
    a: "No. Our courier partners require a physical street address for delivery. Please provide a complete and accurate address at checkout.",
  },
];

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f0fe] to-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#09185b] via-[#0B3C6D] to-[#1E3A8A] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#F5B800] blur-3xl" />
          <div className="absolute -bottom-10 right-10 w-96 h-96 rounded-full bg-blue-300 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-sm">
            <Truck size={32} className="text-[#F5B800]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-primary mb-4">
            Shipping <span className="text-[#F5B800]">Information</span>
          </h1>
          <p className="text-blue-200 text-lg font-secondary max-w-2xl mx-auto">
            Everything you need to know about how we get your custom gear to your doorstep — fast, safe, and on time.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Free Shipping", sub: "Orders above ₹1,500", icon: CheckCircle2, color: "#22c55e" },
            { label: "Live Tracking", sub: "SMS & Email updates", icon: PackageSearch, color: "#003E9B" },
            { label: "Pan India Delivery", sub: "All 28 states covered", icon: MapPin, color: "#E8960A" },
            { label: "Hassle-Free Returns", sub: "7-day return window", icon: RefreshCw, color: "#0EA5E9" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors"
                style={{ backgroundColor: `${badge.color}15` }}
              >
                <badge.icon size={22} style={{ color: badge.color }} />
              </div>
              <p className="font-bold text-gray-900 font-primary text-sm">{badge.label}</p>
              <p className="text-gray-500 text-xs font-secondary mt-1">{badge.sub}</p>
            </div>
          ))}
        </div>

        {/* Shipping Sections */}
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <div
              key={sec.title}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
            >
              <div
                className="p-6 border-b border-gray-100 flex items-center gap-4"
                style={{ background: `linear-gradient(to right, ${sec.color}10, transparent)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${sec.color}18` }}
                >
                  <sec.icon size={22} style={{ color: sec.color }} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-primary">{sec.title}</h2>
              </div>
              <div className="p-6 space-y-3">
                {sec.content.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <span className="text-sm text-gray-600 font-secondary">{item.label}</span>
                    <span
                      className="text-sm font-bold font-primary px-3 py-1 rounded-lg"
                      style={{ backgroundColor: `${sec.color}15`, color: sec.color }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-start gap-2 mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                  <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-700 font-secondary leading-relaxed">{sec.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courier Partners */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">Our Courier Partners</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md hover:border-[#003E9B]/20 transition-all"
              >
                <div className="w-10 h-10 bg-[#003E9B]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Truck size={18} className="text-[#003E9B]" />
                </div>
                <p className="font-bold text-gray-900 font-primary">{p.name}</p>
                <p className="text-xs text-gray-500 font-secondary mt-1">{p.coverage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-800 font-primary text-sm pr-4">{faq.q}</span>
                  <span className="text-[#003E9B] transition-transform duration-200 group-open:rotate-180 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-gray-600 font-secondary text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-[#003E9B] to-[#1E3A8A] rounded-2xl p-8 text-white text-center">
          <h3 className="font-bold text-xl font-primary mb-2">Have more questions about shipping?</h3>
          <p className="text-blue-200 font-secondary mb-6">Our support team is available Mon–Fri, 9AM–6PM IST.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:care@leocult.com"
              className="inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-[#E8960A] text-white font-bold px-6 py-3 rounded-xl transition-all font-primary"
            >
              Email Us
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all font-primary border border-white/20"
            >
              Contact Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
