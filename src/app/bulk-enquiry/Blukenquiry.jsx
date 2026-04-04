'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, CheckCircle, Users, Trophy, 
  Calendar, Shield, ArrowRight, Globe, Phone, User, Mail, MessageSquare, X
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
      className="peer w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-800 placeholder-transparent"
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-1 bg-white text-gray-500 text-sm pointer-events-none transition-all duration-200 
      peer-focus:-top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-primary
      peer-[:not(:placeholder-shown)]:-top-0 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
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
    hasDesign: null, message: '', agreeTerms: false
  });

  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          <h2 className="text-2xl font-bold text-gray-800">Enquiry Submitted!</h2>
          <p className="text-gray-500 mt-2">Our team will contact you within 24 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative pb-20">
      <div className="max-w-5xl mx-auto px-6 py-4">
        
        {/* Header */}
        <header className="mb-12">
          <span className="text-primary text-xs font-semibold uppercase tracking-wide">Direct Inquiry</span>
          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            Custom Kit <span className="text-primary">Designer</span>
          </h1>
          <p className="text-gray-500 mt-3">Fill out the form below and our team will get back to you with a custom quote.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Section 1: Contact */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput id="firstName" label="First Name" icon={User} value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
              <FloatingInput id="lastName" label="Last Name" icon={User} value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
              <FloatingInput id="phone" label="Phone" icon={Phone} type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <FloatingInput id="email" label="Email Address" icon={Mail} type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            </div>
          </div>

          {/* Section 2: Organization */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">Organization Details</h3>
            <FloatingInput id="orgName" label="Academy / League / Team Name" icon={Globe} value={formData.orgName} onChange={(e) => setFormData({...formData, orgName: e.target.value})} required />
          </div>

          {/* Section 3: Uniform For */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">
              Uniform Requirements for <span className="text-primary">*</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {uniformOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggle('uniformFor', opt.id)}
                  className={`flex items-center justify-center gap-3 py-3 rounded-xl border transition-all ${
                    formData.uniformFor.includes(opt.id)
                      ? 'bg-primary border-primary text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary/50'
                  }`}
                >
                  <opt.icon size={16} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Products */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">
              Products interested in <span className="text-primary">*</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {productOptions.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    formData.products.includes(item)
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
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    formData.products.includes(item) ? 'bg-primary border-primary' : 'border-gray-300'
                  }`}>
                    {formData.products.includes(item) && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 5: Design Question */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">
              Already have jersey designs or logo file? <span className="text-primary">*</span>
            </h3>
            <div className="flex gap-4">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDesignToggle(option === 'Yes')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    formData.hasDesign === (option === 'Yes')
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
          {formData.hasDesign === true && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">Upload Design Reference</h3>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 bg-gray-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf,.psd"
                />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 mb-2">
                  {fileName ? fileName : 'Drop files here or click to select'}
                </p>
                <p className="text-gray-400 text-sm">
                  Accepted: jpg, png, pdf, psd. Max size: 18 MB
                </p>
              </div>
            </div>
          )}

          {/* Section 7: Message */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 border-l-4 border-primary pl-3">Message / Instructions</h3>
            <div className="relative">
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder=" "
                rows="4"
                className="peer w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-gray-800 placeholder-transparent"
              />
              <label className="absolute left-4 top-4 flex items-center gap-2 px-1 bg-white text-gray-500 text-sm pointer-events-none transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs">
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
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                required
                className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-500">
                I agree that IRA Sportswear may contact me via WhatsApp, SMS, or Email using the details provided above.
              </span>
            </label>

            <button
              type="submit"
              className="group flex items-center justify-center gap-3 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all active:scale-[0.98]"
            >
              Submit Enquiry
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Contact Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Sales</h4>
              <p className="text-gray-500 text-sm">USA: +1 (847) 624-2660</p>
              <p className="text-gray-500 text-sm">INDIA: +91 98439 99906</p>
              <p className="text-gray-500 text-sm">info@irasportswear.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Customer Service</h4>
              <p className="text-gray-500 text-sm">USA: +1 (847) 624-2660</p>
              <p className="text-gray-500 text-sm">India: +91 99946 56999</p>
              <p className="text-gray-500 text-sm">care@irasportswear.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}