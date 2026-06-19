"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, DollarSign, TrendingUp, Share2, Gift, CheckCircle,
  ArrowRight, Star, Zap, Shield, BadgePercent, Link as LinkIcon,
  ChevronRight, Mail, Phone
} from "lucide-react";
import axiosClient from "@/lib/axios";

const tiers = [
  {
    name: "Starter",
    commission: "8%",
    minOrders: "0–4 referrals/month",
    perks: ["Unique referral link", "Monthly payouts", "Basic dashboard", "Email support"],
    color: "#64748b",
    bg: "from-slate-50 to-white",
    border: "border-slate-200",
  },
  {
    name: "Growth",
    commission: "12%",
    minOrders: "5–19 referrals/month",
    perks: ["All Starter perks", "Priority payouts", "Advanced analytics", "Dedicated manager", "Social media kits"],
    color: "#003E9B",
    bg: "from-blue-50 to-white",
    border: "border-blue-200",
    highlight: true,
  },
  {
    name: "Elite",
    commission: "18%",
    minOrders: "20+ referrals/month",
    perks: ["All Growth perks", "Weekly payouts", "Co-branding options", "Custom discount codes", "Featured partner badge"],
    color: "#E8960A",
    bg: "from-amber-50 to-white",
    border: "border-amber-200",
  },
];

const steps = [
  { icon: Users, title: "Apply & Get Approved", desc: "Fill out the affiliate application. Our team reviews it within 2 business days." },
  { icon: LinkIcon, title: "Get Your Referral Link", desc: "Receive a unique link and promo code to share with your audience." },
  { icon: Share2, title: "Share & Promote", desc: "Share on social media, email newsletters, YouTube, or your website." },
  { icon: DollarSign, title: "Earn Commissions", desc: "Earn a percentage on every successful order made through your link." },
];

const stats = [
  { value: "₹45,000+", label: "Avg monthly payout", icon: TrendingUp },
  { value: "2,800+", label: "Active affiliates", icon: Users },
  { value: "18%", label: "Max commission rate", icon: BadgePercent },
  { value: "48 hrs", label: "Approval turnaround", icon: Zap },
];

export default function AffiliatesPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", website: "", platform: "", audience: "", message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200)); // simulate API
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f0fe] to-white">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#09185b] via-[#0B3C6D] to-[#1E3A8A] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#F5B800] blur-[120px]" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-400 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-[#F5B800]/20 border border-[#F5B800]/30 text-[#F5B800] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 font-secondary"
          >
            <Star size={14} fill="currentColor" />
            Affiliate Partner Program
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-primary mb-5 leading-tight"
          >
            Earn with Every <span className="text-[#F5B800]">Referral</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-200 text-lg font-secondary max-w-2xl mx-auto mb-8"
          >
            Join 2,800+ affiliates earning commissions by promoting Leo Cult's premium custom sportswear.
            Up to 18% commission per sale.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            href="#apply"
            className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#E8960A] text-white font-bold px-8 py-4 rounded-xl transition-all text-lg font-primary shadow-lg shadow-amber-500/20"
          >
            Apply Now — It's Free
            <ArrowRight size={20} />
          </motion.a>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md hover:border-[#003E9B]/20 transition-all"
            >
              <div className="w-10 h-10 bg-[#003E9B]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <s.icon size={20} className="text-[#003E9B]" />
              </div>
              <p className="text-2xl font-bold text-gray-900 font-primary">{s.value}</p>
              <p className="text-xs text-gray-500 font-secondary mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-2">How It Works</h2>
            <p className="text-gray-500 font-secondary">Simple steps to start earning with Leo Cult</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#003E9B]/20 transition-all group"
              >
                <div className="w-12 h-12 bg-[#003E9B]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#003E9B] transition-colors">
                  <step.icon size={22} className="text-[#003E9B] group-hover:text-white transition-colors" />
                </div>
                <div className="absolute top-5 right-5 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-400 font-primary">{i + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 font-primary mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm font-secondary leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commission Tiers */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-2">Commission Tiers</h2>
            <p className="text-gray-500 font-secondary">The more you refer, the more you earn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-gradient-to-br ${tier.bg} rounded-2xl p-7 border-2 ${tier.border} shadow-sm hover:shadow-lg transition-all ${tier.highlight ? "scale-105 ring-2 ring-[#003E9B]/20" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#003E9B] text-white text-xs font-bold px-4 py-1 rounded-full font-primary">
                    Most Popular
                  </div>
                )}
                <p className="text-sm font-semibold font-secondary mb-1" style={{ color: tier.color }}>{tier.minOrders}</p>
                <h3 className="text-2xl font-bold text-gray-900 font-primary mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-black font-primary" style={{ color: tier.color }}>{tier.commission}</span>
                  <span className="text-gray-500 text-sm font-secondary">per sale</span>
                </div>
                <ul className="space-y-2.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-gray-700 font-secondary">
                      <CheckCircle size={16} style={{ color: tier.color }} className="flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div id="apply" className="scroll-mt-24">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#09185b] to-[#1E3A8A] p-8 text-white">
              <h2 className="text-3xl font-bold font-primary mb-2">Apply to Become a Partner</h2>
              <p className="text-blue-200 font-secondary">Fill in your details and we'll get back to you within 48 hours.</p>
            </div>
            <div className="p-8">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-primary mb-2">Application Received!</h3>
                  <p className="text-gray-500 font-secondary">We'll review your application and reach out within 48 business hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Full Name", type: "text", required: true, col: 1 },
                    { name: "email", label: "Email Address", type: "email", required: true, col: 1 },
                    { name: "phone", label: "Phone Number", type: "tel", required: true, col: 1 },
                    { name: "website", label: "Website / Social Profile URL", type: "url", required: false, col: 1 },
                  ].map((field) => (
                    <div key={field.name} className={field.col === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-sm font-semibold text-gray-700 font-primary mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 text-gray-800 text-sm font-secondary transition-all"
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 font-primary mb-1.5">Primary Platform</label>
                    <select
                      name="platform"
                      value={form.platform}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 text-gray-800 text-sm font-secondary bg-white"
                    >
                      <option value="">Select platform</option>
                      {["Instagram", "YouTube", "Facebook", "Website / Blog", "WhatsApp Groups", "TikTok", "Other"].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 font-primary mb-1.5">Audience / Follower Size</label>
                    <select
                      name="audience"
                      value={form.audience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 text-gray-800 text-sm font-secondary bg-white"
                    >
                      <option value="">Select range</option>
                      {["Under 1,000", "1,000–5,000", "5,000–25,000", "25,000–100,000", "100,000+"].map(a => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 font-primary mb-1.5">Why do you want to partner with us? <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#003E9B] focus:ring-2 focus:ring-[#003E9B]/20 text-gray-800 text-sm font-secondary transition-all resize-none"
                      placeholder="Tell us about your audience and how you plan to promote Leo Cult..."
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#003E9B] to-[#1E3A8A] hover:from-[#002a6e] hover:to-[#003E9B] text-white font-bold px-8 py-4 rounded-xl transition-all font-primary text-sm ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {loading ? "Submitting..." : "Submit Application"}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-[#003E9B] to-[#1E3A8A] rounded-2xl p-8 text-white text-center">
          <h3 className="font-bold text-xl font-primary mb-2">Questions about the affiliate program?</h3>
          <p className="text-blue-200 font-secondary mb-6">Reach out to our partnerships team directly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:affiliates@leocult.com" className="inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-[#E8960A] text-white font-bold px-6 py-3 rounded-xl transition-all font-primary">
              <Mail size={18} /> affiliates@leocult.com
            </a>
            <a href="tel:+919843999906" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-all font-primary border border-white/20">
              <Phone size={18} /> +91 98439 99906
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
