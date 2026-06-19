"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, ChevronDown, Info, CheckCircle } from "lucide-react";

export default function SizeGuidePage() {
  const [activeSport, setActiveSport] = useState("cricket");
  const [activeUnit, setActiveUnit] = useState("cm");
  const [activeGender, setActiveGender] = useState("mens");

  const sports = [
    { id: "cricket", label: "Cricket" },
    { id: "football", label: "Football" },
    { id: "tennis", label: "Tennis" },
    { id: "badminton", label: "Badminton" },
  ];

  const jerseyData = {
    headers: ["Size", "Chest", "Waist", "Hip", "Length"],
    cm: {
      mens: [
        { size: "XS", chest: "84–87", waist: "70–73", hip: "88–91", length: "68" },
        { size: "S",  chest: "88–92", waist: "74–78", hip: "92–96", length: "70" },
        { size: "M",  chest: "93–98", waist: "79–84", hip: "97–102",length: "72" },
        { size: "L",  chest: "99–105",waist: "85–91", hip: "103–109",length: "74" },
        { size: "XL", chest: "106–112",waist:"92–98",hip: "110–116",length: "76" },
        { size: "2XL",chest: "113–120",waist:"99–106",hip:"117–124",length: "78" },
        { size: "3XL",chest: "121–128",waist:"107–114",hip:"125–132",length: "80" },
      ],
      womens: [
        { size: "XS", chest: "76–80", waist: "60–64", hip: "84–88", length: "65" },
        { size: "S",  chest: "81–85", waist: "65–69", hip: "89–93", length: "67" },
        { size: "M",  chest: "86–90", waist: "70–74", hip: "94–98", length: "69" },
        { size: "L",  chest: "91–96", waist: "75–80", hip: "99–104",length: "71" },
        { size: "XL", chest: "97–103",waist: "81–87", hip: "105–111",length: "73" },
        { size: "2XL",chest: "104–110",waist:"88–94",hip: "112–118",length: "75" },
        { size: "3XL",chest: "111–118",waist:"95–102",hip:"119–126",length: "77" },
      ],
    },
    inches: {
      mens: [
        { size: "XS", chest: "33–34",waist: "27–29",hip: "35–36", length: "27" },
        { size: "S",  chest: "35–36",waist: "29–31",hip: "36–38", length: "27.5" },
        { size: "M",  chest: "37–39",waist: "31–33",hip: "38–40", length: "28" },
        { size: "L",  chest: "39–41",waist: "33–36",hip: "40–43", length: "29" },
        { size: "XL", chest: "42–44",waist: "36–39",hip: "43–46", length: "30" },
        { size: "2XL",chest: "44–47",waist: "39–42",hip: "46–49", length: "31" },
        { size: "3XL",chest: "48–50",waist: "42–45",hip: "49–52", length: "31.5" },
      ],
      womens: [
        { size: "XS", chest: "30–31",waist: "24–25",hip: "33–35", length: "25.5" },
        { size: "S",  chest: "32–33",waist: "25–27",hip: "35–37", length: "26" },
        { size: "M",  chest: "34–35",waist: "27–29",hip: "37–39", length: "27" },
        { size: "L",  chest: "36–38",waist: "29–31",hip: "39–41", length: "28" },
        { size: "XL", chest: "38–40",waist: "32–34",hip: "41–44", length: "29" },
        { size: "2XL",chest: "41–43",waist: "35–37",hip: "44–46", length: "29.5" },
        { size: "3XL",chest: "44–46",waist: "37–40",hip: "47–50", length: "30" },
      ],
    },
  };

  const trouserData = {
    headers: ["Size", "Waist", "Hip", "Inseam", "Length"],
    cm: {
      mens: [
        { size: "XS", waist: "70–73",hip: "88–91",inseam: "74",length: "92" },
        { size: "S",  waist: "74–78",hip: "92–96",inseam: "76",length: "94" },
        { size: "M",  waist: "79–84",hip: "97–102",inseam:"78",length: "97" },
        { size: "L",  waist: "85–91",hip: "103–109",inseam:"80",length: "100" },
        { size: "XL", waist: "92–98",hip: "110–116",inseam:"82",length: "103" },
        { size: "2XL",waist: "99–106",hip:"117–124",inseam:"82",length: "105" },
        { size: "3XL",waist: "107–114",hip:"125–132",inseam:"82",length: "107" },
      ],
      womens: [
        { size: "XS", waist: "60–64",hip: "84–88",inseam: "72",length: "88" },
        { size: "S",  waist: "65–69",hip: "89–93",inseam: "74",length: "90" },
        { size: "M",  waist: "70–74",hip: "94–98",inseam: "76",length: "93" },
        { size: "L",  waist: "75–80",hip: "99–104",inseam:"78",length: "96" },
        { size: "XL", waist: "81–87",hip: "105–111",inseam:"78",length: "98" },
        { size: "2XL",waist: "88–94",hip: "112–118",inseam:"78",length: "100" },
        { size: "3XL",waist: "95–102",hip:"119–126",inseam:"78",length: "102" },
      ],
    },
    inches: {
      mens: [
        { size: "XS", waist: "27–29",hip: "35–36",inseam: "29",length: "36" },
        { size: "S",  waist: "29–31",hip: "36–38",inseam: "30",length: "37" },
        { size: "M",  waist: "31–33",hip: "38–40",inseam: "31",length: "38" },
        { size: "L",  waist: "33–36",hip: "40–43",inseam: "31.5",length:"39.5"},
        { size: "XL", waist: "36–39",hip: "43–46",inseam: "32",length: "40.5" },
        { size: "2XL",waist: "39–42",hip: "46–49",inseam: "32",length: "41" },
        { size: "3XL",waist: "42–45",hip: "49–52",inseam: "32",length: "42" },
      ],
      womens: [
        { size: "XS", waist: "24–25",hip: "33–35",inseam: "28.5",length:"35"},
        { size: "S",  waist: "25–27",hip: "35–37",inseam: "29",length: "35.5" },
        { size: "M",  waist: "27–29",hip: "37–39",inseam: "30",length: "36.5" },
        { size: "L",  waist: "29–31",hip: "39–41",inseam: "31",length: "38" },
        { size: "XL", waist: "32–34",hip: "41–44",inseam: "31",length: "38.5" },
        { size: "2XL",waist: "35–37",hip: "44–46",inseam: "31",length: "39" },
        { size: "3XL",waist: "37–40",hip: "47–50",inseam: "31",length: "40" },
      ],
    },
  };

  const tips = [
    { title: "Chest / Bust", desc: "Measure around the fullest part of your chest, keeping the tape horizontal." },
    { title: "Waist", desc: "Measure around the narrowest part of your natural waistline." },
    { title: "Hip", desc: "Measure around the fullest part of your hips, about 8 inches below the waist." },
    { title: "Inseam", desc: "Measure from the crotch seam down to the ankle bone while standing." },
    { title: "Length", desc: "Measure from the highest point of the shoulder to the hem of the garment." },
  ];

  const currentRows = jerseyData[activeUnit][activeGender];
  const trouserRows = trouserData[activeUnit][activeGender];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e8f0fe] to-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#09185b] via-[#0B3C6D] to-[#1E3A8A] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#F5B800] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-[#F5B800]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#F5B800]/30"
          >
            <Ruler size={32} className="text-[#F5B800]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white font-primary mb-4"
          >
            Size <span className="text-[#F5B800]">Guide</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-200 text-lg font-secondary"
          >
            Find your perfect fit with our comprehensive sizing charts for all sportswear.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center justify-between"
        >
          {/* Sport Tabs */}
          <div className="flex flex-wrap gap-2">
            {sports.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSport(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold font-primary transition-all duration-200 ${
                  activeSport === s.id
                    ? "bg-[#003E9B] text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            {/* Unit Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {["cm", "inches"].map((u) => (
                <button
                  key={u}
                  onClick={() => setActiveUnit(u)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium font-secondary transition-all ${
                    activeUnit === u ? "bg-white text-[#003E9B] shadow-sm font-semibold" : "text-gray-500"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            {/* Gender Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {["mens", "womens"].map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGender(g)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium font-secondary transition-all ${
                    activeGender === g ? "bg-white text-[#003E9B] shadow-sm font-semibold" : "text-gray-500"
                  }`}
                >
                  {g === "mens" ? "Men's" : "Women's"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Jersey Size Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSport}-${activeUnit}-${activeGender}-jersey`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#003E9B]/5 to-transparent flex items-center gap-3">
              <div className="w-10 h-10 bg-[#003E9B]/10 rounded-xl flex items-center justify-center">
                <span className="text-[#003E9B] text-lg font-bold font-primary">J</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 font-primary text-lg capitalize">{activeSport} Jersey / T-Shirt</h2>
                <p className="text-sm text-gray-500 font-secondary">All measurements in {activeUnit}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#003E9B] text-white">
                    {jerseyData.headers.map((h) => (
                      <th key={h} className="px-5 py-3 text-xs font-bold uppercase tracking-wider font-primary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-gray-50 transition-colors hover:bg-blue-50/40 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    >
                      <td className="px-5 py-3.5 font-bold text-[#003E9B] font-primary">{row.size}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.chest}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.waist}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.hip}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Trouser Size Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSport}-${activeUnit}-${activeGender}-trouser`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-[#F5B800]/10 to-transparent flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F5B800]/20 rounded-xl flex items-center justify-center">
                <span className="text-[#E8960A] text-lg font-bold font-primary">T</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 font-primary text-lg capitalize">{activeSport} Trousers / Shorts</h2>
                <p className="text-sm text-gray-500 font-secondary">All measurements in {activeUnit}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#E8960A] text-white">
                    {trouserData.headers.map((h) => (
                      <th key={h} className="px-5 py-3 text-xs font-bold uppercase tracking-wider font-primary">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {trouserRows.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-gray-50 transition-colors hover:bg-yellow-50/40 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                    >
                      <td className="px-5 py-3.5 font-bold text-[#E8960A] font-primary">{row.size}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.waist}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.hip}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.inseam}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-secondary">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* How to Measure */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6 flex items-center gap-2">
            <Info size={22} className="text-[#003E9B]" />
            How to Measure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#003E9B]/20 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#003E9B]/10 rounded-lg flex items-center justify-center group-hover:bg-[#003E9B] transition-colors">
                    <CheckCircle size={16} className="text-[#003E9B] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 font-primary text-sm">{tip.title}</h3>
                </div>
                <p className="text-gray-500 text-sm font-secondary leading-relaxed">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note Card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#003E9B] to-[#1E3A8A] rounded-2xl p-8 text-white text-center"
        >
          <h3 className="font-bold text-xl font-primary mb-2">Still unsure about your size?</h3>
          <p className="text-blue-200 font-secondary mb-6">
            Our team is happy to help you find the perfect fit. Reach out to us and we'll guide you through.
          </p>
          <a
            href="/bulk-enquiry"
            className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#E8960A] text-white font-bold px-6 py-3 rounded-xl transition-all font-primary"
          >
            Contact Us for Custom Sizing
          </a>
        </motion.div>
      </div>
    </div>
  );
}
