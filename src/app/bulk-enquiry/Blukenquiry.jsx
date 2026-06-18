'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload, CheckCircle, Users, Trophy,
  Calendar, Shield, ArrowRight, Globe, Phone, User, Mail, MessageSquare, X,
  Clock, Headphones, MapPin, Send
} from 'lucide-react';

const FloatingInput = ({ label, icon: Icon, id, type = "text", value, onChange, required, placeholder = " " }) => (
  <div className="relative group w-full">
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="peer w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-800 placeholder-transparent font-secondary"
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-1 bg-white text-gray-500 text-sm pointer-events-none transition-all duration-200 
      peer-focus:-top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary
      peer-[:not(:placeholder-shown)]:-top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary font-secondary"
    >
      {Icon && <Icon size={14} />}
      {label}
    </label>
  </div>
);

export default function BulkEnquiry() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    orgName: '', uniformFor: [], products: [],
    hasDesign: null, message: '', agreeTerms: false,
    frontImage: null,
    backImage: null
  });

  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const uniformOptions = [
    { id: 'academy', label: 'Academy', icon: Users },
    { id: 'league', label: 'League', icon: Trophy },
    { id: 'tournament', label: 'Tournament', icon: Calendar },
    { id: 'team', label: 'Team', icon: Shield }
  ];

  const productOptions = [
    'Playing Jersey', 'Playing Trouser', 'Training Jersey', 'Training Shorts',
    'Travel Polo', 'Travel Jacket', 'Sleeveless Jacket', 'Hoodie', 'Cap', 'Hat', 'Clads'
  ];

  const handleToggle = (category, value) => {
    setFormData(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const handleDesignToggle = (value) => {
    setFormData(prev => ({ ...prev, hasDesign: value, designFile: value === false ? null : prev.designFile }));
    if (value === false) {
      setFileName('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 18 * 1024 * 1024) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/photoshop'];
      if (validTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, designFile: file }));
        setFileName(file.name);
      } else {
        alert('Please upload JPG, PNG, PDF, or PSD files only.');
      }
    } else {
      alert('File size must be less than 18MB.');
    }
  };

  const handleImageChange = (e, type) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  if (!validTypes.includes(file.type)) {
    alert("Please upload JPG, PNG or WEBP images only.");
    return;
  }

  const previewUrl = URL.createObjectURL(file);

  if (type === "front") {
    setFrontImage(file);
    setFrontPreview(previewUrl);
  }

  if (type === "back") {
    setBackImage(file);
    setBackPreview(previewUrl);
  }
};

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 18 * 1024 * 1024) {
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/photoshop'];
      if (validTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, designFile: file }));
        setFileName(file.name);
      } else {
        alert('Please upload JPG, PNG, PDF, or PSD files only.');
      }
    } else {
      alert('File size must be less than 18MB.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email || !formData.orgName || formData.uniformFor.length === 0 || formData.products.length === 0) {
      alert('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-primary">Enquiry Submitted!</h2>
          <p className="text-gray-500 mt-2 font-secondary">Our team will contact you within 24 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative pb-20">
      <div className="max-w-5xl mx-auto px-6 py-4">

        {/* Header */}
        <header className="mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-wide font-secondary">Direct Inquiry</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-2 font-primary">
            Custom Kit <span className="text-primary">Designer</span>
          </h1>
          <p className="text-gray-500 mt-3 font-secondary">Fill out the form below and our team will get back to you with a custom quote.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Section 1: Contact */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput id="firstName" label="First Name" icon={User} value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
              <FloatingInput id="lastName" label="Last Name" icon={User} value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
              <FloatingInput id="phone" label="Phone" icon={Phone} type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              <FloatingInput id="email" label="Email Address" icon={Mail} type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
          </div>

          {/* Section 2: Organization */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">Organization Details</h3>
            <FloatingInput id="orgName" label="Academy / League / Team Name" icon={Globe} value={formData.orgName} onChange={(e) => setFormData({ ...formData, orgName: e.target.value })} required />
          </div>

          {/* Section 3: Uniform For */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">
              Uniform Requirements for <span className="text-primary">*</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {uniformOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggle('uniformFor', opt.id)}
                  className={`flex items-center justify-center gap-3 py-3 rounded-xl border transition-all ${formData.uniformFor.includes(opt.id)
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'
                    }`}
                >
                  <opt.icon size={16} />
                  <span className="text-sm font-medium font-secondary">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">
              Products interested in <span className="text-primary">*</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {productOptions.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${formData.products.includes(item)
                    ? 'bg-primary/5 border-primary'
                    : 'bg-white border-gray-200 hover:border-primary/50'
                    }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={formData.products.includes(item)}
                    onChange={() => handleToggle('products', item)}
                  />
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.products.includes(item) ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                    {formData.products.includes(item) && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-700 font-secondary">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 5: Design Question */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">
              Already have jersey designs or logo file? <span className="text-primary">*</span>
            </h3>
            <div className="flex gap-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDesignToggle(option === 'Yes')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all font-secondary ${formData.hasDesign === (option === 'Yes')
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Section 6: File Upload */}
          {/* Section 6: Front & Back Image Upload */}
          {formData.hasDesign === true && (
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">
                Upload Jersey Images
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Front Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Front Image *
                  </label>

                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "front")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />

                    <p className="text-sm text-gray-600">
                      Upload Front Design
                    </p>
                  </div>

                  {frontPreview && (
                    <div className="mt-4">
                      <img
                        src={frontPreview}
                        alt="Front Preview"
                        className="w-full h-64 object-contain border rounded-xl"
                      />
                    </div>
                  )}
                </div>

                {/* Back Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Back Image *
                  </label>

                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "back")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />

                    <p className="text-sm text-gray-600">
                      Upload Back Design
                    </p>
                  </div>

                  {backPreview && (
                    <div className="mt-4">
                      <img
                        src={backPreview}
                        alt="Back Preview"
                        className="w-full h-64 object-contain border rounded-xl"
                      />
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Section 7: Message */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3 font-primary">Message / Instructions</h3>
            <div className="relative">
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" "
                rows="4"
                className="peer w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-800 placeholder-transparent font-secondary"
              />
              <label className="absolute left-4 top-4 flex items-center gap-2 px-1 bg-white text-gray-500 text-sm pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs font-secondary">
                <MessageSquare size={14} /> Tell us about your requirements...
              </label>
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 flex flex-col items-start gap-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                required
                className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-500 font-secondary">
                I agree that LEO CULT Sportswear may contact me via WhatsApp, SMS, or Email using the details provided above.
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-gradient btn-md btn-shine group"
            >
              Submit Enquiry
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* ─── NEW REDESIGNED CONTACT SECTION ─── */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 font-primary mb-2">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-gray-500 text-sm font-secondary">
              Our team is ready to assist you with your custom sportswear needs
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Sales Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Headphones size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 font-primary">Sales Team</h3>
              </div>
              <div className="space-y-3 pl-2">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-gray-500 font-secondary">INDIA</p>
                    <a href="tel:+919843999906" className="text-gray-700 hover:text-primary transition-colors font-secondary">
                      +91 98439 99906
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:info@leocult.com" className="text-gray-700 hover:text-primary transition-colors font-secondary">
                    info@leocult.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Customer Service Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Clock size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 font-primary">Customer Service</h3>
              </div>
              <div className="space-y-3 pl-2">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <div>
                    <p className="text-xs text-gray-500 font-secondary">INDIA</p>
                    <a href="tel:+919994656999" className="text-gray-700 hover:text-primary transition-colors font-secondary">
                      +91 99946 56999
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:care@leocult.com" className="text-gray-700 hover:text-primary transition-colors font-secondary">
                    care@leocult.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Office Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary/5 rounded-2xl p-6 border border-primary/20 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock size={18} className="text-primary" />
              <h4 className="font-semibold text-gray-800 font-primary">Office Hours</h4>
            </div>
            <p className="text-gray-600 text-sm font-secondary">
              Monday - Friday: 9:00 AM - 6:00 PM (IST) | 9:00 AM - 5:00 PM (CST)
            </p>
            <p className="text-gray-500 text-xs mt-2 font-secondary">
              We respond to all inquiries within 24 hours
            </p>
          </motion.div>
        </div>
      </div >
    </div >
  );
}