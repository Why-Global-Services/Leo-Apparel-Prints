// "use client";

// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Paintbrush, 
//   Shield, 
//   Type, 
//   ShoppingBag, 
//   RotateCcw, 
//   Undo2, 
//   Redo2, 
//   Upload, 
//   ChevronDown,
//   ChevronUp,
//   ArrowLeft,
//   Download,
//   Save,
//   RefreshCw,
//   Eye,
//   Check,
//   Move,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   Bold,
//   Italic,
//   Underline,
//   Trash2
// } from 'lucide-react';

// const JerseyCustomizer = ({product}) => {
//   const [activeTab, setActiveTab] = useState('Style');
//   const [view, setView] = useState('Front');
//   console.log("products",product);
  
//   // Style State
//   const [selectedColor, setSelectedColor] = useState('#F5F5DC');
//   const [showFabricInfo, setShowFabricInfo] = useState(true);
//   const [showColors, setShowColors] = useState(true);
  
//   // Logo State
//   const [clubLogo, setClubLogo] = useState(null);
//   const [sponsorLogo, setSponsorLogo] = useState(null);
//   const [leftSleeveLogo, setLeftSleeveLogo] = useState(null);
//   const [rightSleeveLogo, setRightSleeveLogo] = useState(null);
  
//   // Position States for Dragging
//   const [namePosition, setNamePosition] = useState({ x: 50, y: 45 });
//   const [numberPosition, setNumberPosition] = useState({ x: 50, y: 55 });
//   const [teamNamePosition, setTeamNamePosition] = useState({ x: 50, y: 70 });
//   const [sponsorPosition, setSponsorPosition] = useState({ x: 50, y: 20 });
//   const [isDragging, setIsDragging] = useState(null);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
//   // Text Style States
//   const [nameStyle, setNameStyle] = useState({
//     fontFamily: 'Arial',
//     fontSize: 24,
//     fontWeight: 'bold',
//     fontStyle: 'normal',
//     textDecoration: 'none',
//     letterSpacing: 4,
//     color: '#000000'
//   });
  
//   const [numberStyle, setNumberStyle] = useState({
//     fontFamily: 'Arial',
//     fontSize: 72,
//     fontWeight: '900',
//     fontStyle: 'normal',
//     textDecoration: 'none',
//     color: '#000000',
//     textShadow: 'none'
//   });
  
//   const [teamNameStyle, setTeamNameStyle] = useState({
//     fontFamily: 'Arial',
//     fontSize: 14,
//     fontWeight: 'bold',
//     letterSpacing: 4,
//     color: '#666666'
//   });
  
//   const [playerName, setPlayerName] = useState('YOUR NAME');
//   const [playerNumber, setPlayerNumber] = useState('99');
//   const [teamName, setTeamName] = useState('YOUR TEAM');
  
//   // Order State
//   const [selectedSize, setSelectedSize] = useState('M');
  
//   // Available Colors
//   const jerseyColors = [
//     { name: 'Classic White', code: '#FFFFFF', category: 'Classic' },
//     { name: 'Traditional Cream', code: '#F5F5DC', category: 'Classic' },
//     { name: 'Royal Blue', code: '#1E40AF', category: 'Standard' },
//     { name: 'Crimson Red', code: '#DC2626', category: 'Standard' },
//     { name: 'Forest Green', code: '#059669', category: 'Standard' },
//     { name: 'Charcoal Black', code: '#1F2937', category: 'Standard' },
//     { name: 'Sunset Orange', code: '#EA580C', category: 'Vibrant' },
//     { name: 'Electric Yellow', code: '#EAB308', category: 'Vibrant' },
//     { name: 'Neon Pink', code: '#EC4899', category: 'Vibrant' },
//     { name: 'Purple Haze', code: '#7C3AED', category: 'Vibrant' },
//     { name: 'Teal Wave', code: '#14B8A6', category: 'Vibrant' },
//     { name: 'Navy Navy', code: '#1E3A8A', category: 'Standard' },
//     { name: 'Burgundy', code: '#991B1B', category: 'Standard' },
//     { name: 'Olive Green', code: '#4D7C0F', category: 'Standard' },
//     { name: 'Slate Gray', code: '#475569', category: 'Standard' },
//     { name: 'Sky Blue', code: '#38BDF8', category: 'Vibrant' },
//   ];

//   const textColors = [
//     { name: 'Black', code: '#000000' },
//     { name: 'White', code: '#FFFFFF' },
//     { name: 'Red', code: '#DC2626' },
//     { name: 'Blue', code: '#2563EB' },
//     { name: 'Gold', code: '#FBBF24' },
//     { name: 'Silver', code: '#9CA3AF' },
//     { name: 'Green', code: '#059669' },
//     { name: 'Purple', code: '#7C3AED' },
//     { name: 'Orange', code: '#EA580C' },
//     { name: 'Pink', code: '#EC4899' },
//     { name: 'Navy', code: '#1E3A8A' },
//     { name: 'Cyan', code: '#06B6D4' },
//   ];

//   const fontFamilies = [
//     { name: 'Arial', value: 'Arial, sans-serif' },
//     { name: 'Helvetica', value: 'Helvetica, sans-serif' },
//     { name: 'Times New Roman', value: 'Times New Roman, serif' },
//     { name: 'Georgia', value: 'Georgia, serif' },
//     { name: 'Courier New', value: 'Courier New, monospace' },
//     { name: 'Verdana', value: 'Verdana, sans-serif' },
//     { name: 'Impact', value: 'Impact, sans-serif' },
//     { name: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
//   ];

//   const numberShadows = [
//     { name: 'None', value: 'none' },
//     { name: 'Shadow', value: '3px 3px 6px rgba(0,0,0,0.3)' },
//     { name: '3D', value: '3px 3px 0 rgba(0,0,0,0.2), 6px 6px 0 rgba(0,0,0,0.1)' },
//     { name: 'Glow', value: '0 0 10px rgba(0,0,0,0.5)' },
//   ];

//   const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

//   // Drag Handlers
//   const handleMouseDown = (element, e) => {
//     setIsDragging(element);
//     const rect = e.currentTarget.getBoundingClientRect();
//     setDragOffset({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const container = document.getElementById('jersey-container');
//       if (container) {
//         const containerRect = container.getBoundingClientRect();
//         let x = ((e.clientX - containerRect.left - dragOffset.x) / containerRect.width) * 100;
//         let y = ((e.clientY - containerRect.top - dragOffset.y) / containerRect.height) * 100;
        
//         x = Math.min(Math.max(x, 0), 100);
//         y = Math.min(Math.max(y, 0), 100);
        
//         switch(isDragging) {
//           case 'name':
//             setNamePosition({ x, y });
//             break;
//           case 'number':
//             setNumberPosition({ x, y });
//             break;
//           case 'teamName':
//             setTeamNamePosition({ x, y });
//             break;
//           case 'sponsor':
//             setSponsorPosition({ x, y });
//             break;
//         }
//       }
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(null);
//   };

//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, dragOffset]);

//   const handleImageUpload = (type, file) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (type === 'club') setClubLogo(reader.result);
//         if (type === 'sponsor') setSponsorLogo(reader.result);
//         if (type === 'left') setLeftSleeveLogo(reader.result);
//         if (type === 'right') setRightSleeveLogo(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const resetAll = () => {
//     setSelectedColor('#F5F5DC');
//     setClubLogo(null);
//     setSponsorLogo(null);
//     setLeftSleeveLogo(null);
//     setRightSleeveLogo(null);
//     setNamePosition({ x: 50, y: 45 });
//     setNumberPosition({ x: 50, y: 55 });
//     setTeamNamePosition({ x: 50, y: 70 });
//     setSponsorPosition({ x: 50, y: 20 });
//     setNameStyle({
//       fontFamily: 'Arial',
//       fontSize: 24,
//       fontWeight: 'bold',
//       fontStyle: 'normal',
//       textDecoration: 'none',
//       letterSpacing: 4,
//       color: '#000000'
//     });
//     setNumberStyle({
//       fontFamily: 'Arial',
//       fontSize: 72,
//       fontWeight: '900',
//       fontStyle: 'normal',
//       textDecoration: 'none',
//       color: '#000000',
//       textShadow: 'none'
//     });
//     setTeamNameStyle({
//       fontFamily: 'Arial',
//       fontSize: 14,
//       fontWeight: 'bold',
//       letterSpacing: 4,
//       color: '#666666'
//     });
//     setPlayerName('YOUR NAME');
//     setPlayerNumber('99');
//     setTeamName('YOUR TEAM');
//   };

//   const tabs = [
//     { id: 'Style', icon: <Paintbrush size={18} />, label: 'Style' },
//     { id: 'Logos', icon: <Shield size={18} />, label: 'Logos' },
//     { id: 'Name & Number', icon: <Type size={18} />, label: 'Name & Number' },
//     { id: 'Order', icon: <ShoppingBag size={18} />, label: 'Order' },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       <main className="flex-1 flex overflow-hidden bg-white">
//         {/* Left Section: 3D Preview */}
//         <div className="w-3/5 p-8 flex flex-col relative bg-gray-50">
//           <div className="flex justify-between items-start mb-4">
//             <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-gray-800 transition-all duration-300">
//               <RotateCcw size={16} /> 360° VIEW
//             </button>
            
//             <div className="flex flex-col items-end">
//               <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-bold text-gray-600 mb-2">
//                 {view === 'Front' ? 'Front View' : 'Back View'}
//               </div>
//               <div className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs flex items-center gap-2 shadow-md">
//                 <ArrowLeft size={14} /> Drag to rotate
//               </div>
//             </div>
//           </div>

//           {/* Jersey Image Area with Draggable Elements */}
//           <div className="flex-1 flex items-center justify-center relative">
//             <div 
//               id="jersey-container"
//               className="w-full h-[550px] bg-white rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
//             >
//               {/* Jersey Background */}
//               <div 
//                 className="w-[380px] h-[500px] rounded-2xl shadow-xl relative"
//                 style={{ 
//                   backgroundColor: selectedColor,
//                   backgroundImage: selectedColor === '#F5F5DC' ? 'radial-gradient(circle at 10% 20%, rgba(0,0,0,0.02) 1%, transparent 1%)' : 'none',
//                   backgroundSize: '20px 20px'
//                 }}
//               >
//                 {/* Club Logo - Fixed Position */}
//                 {clubLogo && (
//                   <div className="absolute top-4 left-4">
//                     <img src={clubLogo} alt="Club" className="w-16 h-16 object-contain bg-white rounded-full p-1 shadow-lg" />
//                   </div>
//                 )}
                
//                 {/* Left Sleeve Logo */}
//                 {leftSleeveLogo && (
//                   <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
//                     <img src={leftSleeveLogo} alt="Left" className="w-10 h-10 object-contain bg-white rounded-lg p-1 shadow-md" />
//                   </div>
//                 )}
                
//                 {/* Right Sleeve Logo */}
//                 {rightSleeveLogo && (
//                   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
//                     <img src={rightSleeveLogo} alt="Right" className="w-10 h-10 object-contain bg-white rounded-lg p-1 shadow-md" />
//                   </div>
//                 )}
                
//                 {/* Draggable Sponsor Logo */}
//                 {sponsorLogo && (
//                   <div 
//                     className="absolute cursor-move group"
//                     style={{ left: `${sponsorPosition.x}%`, top: `${sponsorPosition.y}%`, transform: 'translate(-50%, -50%)' }}
//                     onMouseDown={(e) => handleMouseDown('sponsor', e)}
//                   >
//                     <div className="relative">
//                       <img src={sponsorLogo} alt="Sponsor" className="h-16 max-w-[150px] object-contain bg-white rounded-lg p-2 shadow-md" />
//                       <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                         <Move size={12} className="inline mr-1" /> Drag to move
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Draggable Player Name */}
//                 <div 
//                   className="absolute cursor-move group"
//                   style={{ left: `${namePosition.x}%`, top: `${namePosition.y}%`, transform: 'translate(-50%, -50%)' }}
//                   onMouseDown={(e) => handleMouseDown('name', e)}
//                 >
//                   <div 
//                     className="text-center whitespace-nowrap"
//                     style={{
//                       fontFamily: nameStyle.fontFamily,
//                       fontSize: `${nameStyle.fontSize}px`,
//                       fontWeight: nameStyle.fontWeight,
//                       fontStyle: nameStyle.fontStyle,
//                       textDecoration: nameStyle.textDecoration,
//                       letterSpacing: `${nameStyle.letterSpacing}px`,
//                       color: nameStyle.color
//                     }}
//                   >
//                     {playerName}
//                   </div>
//                   <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                     <Move size={12} className="inline mr-1" /> Drag to move
//                   </div>
//                 </div>
                
//                 {/* Draggable Player Number */}
//                 <div 
//                   className="absolute cursor-move group"
//                   style={{ left: `${numberPosition.x}%`, top: `${numberPosition.y}%`, transform: 'translate(-50%, -50%)' }}
//                   onMouseDown={(e) => handleMouseDown('number', e)}
//                 >
//                   <div 
//                     className="text-center whitespace-nowrap"
//                     style={{
//                       fontFamily: numberStyle.fontFamily,
//                       fontSize: `${numberStyle.fontSize}px`,
//                       fontWeight: numberStyle.fontWeight,
//                       fontStyle: numberStyle.fontStyle,
//                       textDecoration: numberStyle.textDecoration,
//                       color: numberStyle.color,
//                       textShadow: numberStyle.textShadow
//                     }}
//                   >
//                     {playerNumber}
//                   </div>
//                   <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                     <Move size={12} className="inline mr-1" /> Drag to move
//                   </div>
//                 </div>
                
//                 {/* Draggable Team Name */}
//                 {teamName && (
//                   <div 
//                     className="absolute cursor-move group"
//                     style={{ left: `${teamNamePosition.x}%`, top: `${teamNamePosition.y}%`, transform: 'translate(-50%, -50%)' }}
//                     onMouseDown={(e) => handleMouseDown('teamName', e)}
//                   >
//                     <div 
//                       className="text-center whitespace-nowrap bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm"
//                       style={{
//                         fontFamily: teamNameStyle.fontFamily,
//                         fontSize: `${teamNameStyle.fontSize}px`,
//                         fontWeight: teamNameStyle.fontWeight,
//                         letterSpacing: `${teamNameStyle.letterSpacing}px`,
//                         color: teamNameStyle.color
//                       }}
//                     >
//                       {teamName}
//                     </div>
//                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                       <Move size={12} className="inline mr-1" /> Drag to move
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* UNDO/REDO Buttons */}
//             <div className="absolute right-4 bottom-1/4 flex flex-col gap-2">
//               <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2">
//                 <Undo2 size={16} /> UNDO
//               </button>
//               <button className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-gray-500 transition-all duration-300 flex items-center gap-2">
//                 <Redo2 size={16} /> REDO
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-between items-end mt-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Willow Elite</h2>
//               <p className="text-gray-500 text-sm">AirMesh Pro • MOQ: 15 units</p>
//               <span className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 uppercase shadow-sm">
//                 Premium
//               </span>
//             </div>
            
//             <div className="text-right">
//               <div className="text-3xl font-bold text-gray-900">$149</div>
//               <div className="text-gray-400 text-xs">+ bulk discounts</div>
//             </div>
//           </div>

//           <div className="flex gap-4 mt-6">
//             <button 
//               onClick={resetAll}
//               className="flex-1 py-3 px-6 rounded-xl bg-gray-200 text-gray-800 font-bold text-sm transition-all duration-300 hover:bg-gray-300 flex items-center justify-center gap-2"
//             >
//               <RefreshCw size={16} /> Reset All
//             </button>
//             <button 
//               onClick={() => setView(view === 'Front' ? 'Back' : 'Front')}
//               className="flex-1 py-3 px-6 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               <Eye size={16} /> {view === 'Front' ? 'Back View' : 'Front View'}
//             </button>
//           </div>
//         </div>

//         {/* Right Section: Configuration Panel */}
//         <div className="w-2/5 border-l border-gray-200 bg-white flex flex-col shadow-2xl overflow-y-auto max-h-screen">
//           {/* Navigation Tabs */}
//           <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex-1 py-4 flex flex-col items-center gap-1 border-b-2 transition-all duration-300 ${
//                   activeTab === tab.id 
//                     ? 'border-blue-600 bg-white text-blue-600' 
//                     : 'border-transparent bg-white text-gray-500 hover:bg-gray-50'
//                 }`}
//               >
//                 {tab.icon}
//                 <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
//               </button>
//             ))}
//           </div>

//           {/* Panel Content */}
//           <div className="flex-1 p-6 space-y-4">
//             {/* Style Tab */}
//             {activeTab === 'Style' && (
//               <div className="space-y-4 animate-fadeIn">
//                 <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-600">
//                   <p className="text-sm text-gray-700 italic">
//                     Traditional whites for red-ball cricket — meets league and county uniform regulations.
//                   </p>
//                 </div>

//                 {/* Fabric Section */}
//                 <div className="border border-gray-200 rounded-xl overflow-hidden">
//                   <button 
//                     onClick={() => setShowFabricInfo(!showFabricInfo)}
//                     className="w-full flex justify-between items-center p-4 bg-gray-50 text-gray-800 font-bold text-sm uppercase tracking-wide hover:bg-gray-100"
//                   >
//                     Fabric Details
//                     <ChevronDown size={18} className={`transform transition-transform duration-300 ${showFabricInfo ? 'rotate-180' : ''}`} />
//                   </button>
//                   {showFabricInfo && (
//                     <div className="p-4 bg-white space-y-3 animate-slideDown">
//                       <p className="text-xs text-gray-600 leading-relaxed">
//                         Bio-washed performance properties covering UV & hygiene, moisture management, breathability and shape retention.
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Design Colors Section - ALL COLORS */}
//                 <div className="border border-gray-200 rounded-xl overflow-hidden">
//                   <button 
//                     onClick={() => setShowColors(!showColors)}
//                     className="w-full flex justify-between items-center p-4 bg-gray-50 text-gray-800 font-bold text-sm uppercase tracking-wide hover:bg-gray-100"
//                   >
//                     Design Colors ({jerseyColors.length} colors)
//                     <ChevronDown size={18} className={`transform transition-transform duration-300 ${showColors ? 'rotate-180' : ''}`} />
//                   </button>
//                   {showColors && (
//                     <div className="p-4 space-y-4 animate-slideDown max-h-96 overflow-y-auto">
//                       {/* Classic Colors */}
//                       <div>
//                         <h4 className="text-xs font-bold text-gray-500 mb-2">CLASSIC</h4>
//                         <div className="grid grid-cols-4 gap-3">
//                           {jerseyColors.filter(c => c.category === 'Classic').map((color) => (
//                             <button
//                               key={color.name}
//                               onClick={() => setSelectedColor(color.code)}
//                               className={`p-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
//                                 selectedColor === color.code ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200'
//                               }`}
//                             >
//                               <div className="w-full h-12 rounded-lg shadow-inner mb-1" style={{ backgroundColor: color.code }}></div>
//                               <span className="text-xs font-medium text-gray-700">{color.name}</span>
//                               {selectedColor === color.code && <Check size={12} className="text-blue-600 mx-auto mt-1" />}
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Standard Colors */}
//                       <div>
//                         <h4 className="text-xs font-bold text-gray-500 mb-2 mt-4">STANDARD</h4>
//                         <div className="grid grid-cols-4 gap-3">
//                           {jerseyColors.filter(c => c.category === 'Standard').map((color) => (
//                             <button
//                               key={color.name}
//                               onClick={() => setSelectedColor(color.code)}
//                               className={`p-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
//                                 selectedColor === color.code ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200'
//                               }`}
//                             >
//                               <div className="w-full h-12 rounded-lg shadow-inner mb-1" style={{ backgroundColor: color.code }}></div>
//                               <span className="text-xs font-medium text-gray-700">{color.name}</span>
//                               {selectedColor === color.code && <Check size={12} className="text-blue-600 mx-auto mt-1" />}
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Vibrant Colors */}
//                       <div>
//                         <h4 className="text-xs font-bold text-gray-500 mb-2 mt-4">VIBRANT</h4>
//                         <div className="grid grid-cols-4 gap-3">
//                           {jerseyColors.filter(c => c.category === 'Vibrant').map((color) => (
//                             <button
//                               key={color.name}
//                               onClick={() => setSelectedColor(color.code)}
//                               className={`p-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
//                                 selectedColor === color.code ? 'border-blue-600 shadow-lg bg-blue-50' : 'border-gray-200'
//                               }`}
//                             >
//                               <div className="w-full h-12 rounded-lg shadow-inner mb-1" style={{ backgroundColor: color.code }}></div>
//                               <span className="text-xs font-medium text-gray-700">{color.name}</span>
//                               {selectedColor === color.code && <Check size={12} className="text-blue-600 mx-auto mt-1" />}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Logos Tab */}
//             {activeTab === 'Logos' && (
//               <div className="space-y-4 animate-fadeIn">
//                 <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
//                   <p className="text-sm text-gray-700">Upload your badge, sponsor logo or custom artwork (max 10MB)</p>
//                   <a href="#" className="text-blue-600 text-xs hover:underline mt-1 inline-block">For best results, see LOGO UPLOAD GUIDE →</a>
//                 </div>

//                 <div className="bg-amber-50 p-4 rounded-xl">
//                   <h4 className="font-semibold text-amber-800 text-sm mb-2">Before you upload</h4>
//                   <ul className="text-amber-700 text-xs space-y-1 list-disc pl-4">
//                     <li>Vector (AI, EPS, SVG) gives the sharpest print</li>
//                     <li>PNG or JPG? Make sure it's 300 DPI or higher</li>
//                     <li>Use a transparent background for badges and crests</li>
//                     <li>Maximum file size: 10MB per file</li>
//                   </ul>
//                 </div>

//                 {/* Upload Sections */}
//                 {[
//                   { type: 'club', label: 'Club Logo', state: clubLogo },
//                   { type: 'sponsor', label: 'Sponsor Logo', state: sponsorLogo },
//                   { type: 'left', label: 'Left Sleeve Logo', state: leftSleeveLogo },
//                   { type: 'right', label: 'Right Sleeve Logo', state: rightSleeveLogo }
//                 ].map((item) => (
//                   <div key={item.type} className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-500 transition-all">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">{item.label}</label>
//                     <button 
//                       onClick={() => document.getElementById(`${item.type}LogoInput`).click()}
//                       className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
//                     >
//                       <Upload size={16} /> Upload {item.label}
//                     </button>
//                     <input id={`${item.type}LogoInput`} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(item.type, e.target.files[0])} />
//                     {item.state && (
//                       <div className="mt-3 animate-fadeIn">
//                         <img src={item.state} alt={item.label} className="h-16 w-16 object-contain border rounded-lg p-1 mx-auto" />
//                         <button 
//                           onClick={() => {
//                             if (item.type === 'club') setClubLogo(null);
//                             if (item.type === 'sponsor') setSponsorLogo(null);
//                             if (item.type === 'left') setLeftSleeveLogo(null);
//                             if (item.type === 'right') setRightSleeveLogo(null);
//                           }}
//                           className="text-red-500 text-xs mt-2 hover:text-red-700 flex items-center justify-center gap-1"
//                         >
//                           <Trash2 size={12} /> Remove
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
//                   <p>You confirm you own or have the legal right to use any artwork, logo or text you upload.</p>
//                 </div>
//               </div>
//             )}

//             {/* Name & Number Tab - Full Text Styling */}
//             {activeTab === 'Name & Number' && (
//               <div className="space-y-4 animate-fadeIn">
//                 <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-600">
//                   <p className="text-sm text-gray-700">Drag elements on jersey to position. Customize text style below.</p>
//                 </div>

//                 {/* Position Instructions */}
//                 <div className="bg-blue-50 p-3 rounded-lg text-center">
//                   <Move size={16} className="inline mr-2 text-blue-600" />
//                   <span className="text-xs text-gray-600">Click and drag any text element on the jersey to reposition</span>
//                 </div>

//                 {/* Player Name Section */}
//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
//                     <Type size={16} /> Player Name
//                   </h4>
//                   <input 
//                     type="text" 
//                     value={playerName}
//                     onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
//                     className="w-full p-3 border-2 border-gray-200 rounded-lg mb-3 focus:border-blue-500 focus:outline-none"
//                   />
                  
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Font</label>
//                       <select 
//                         value={nameStyle.fontFamily}
//                         onChange={(e) => setNameStyle({...nameStyle, fontFamily: e.target.value})}
//                         className="w-full p-2 border border-gray-200 rounded-lg text-sm"
//                       >
//                         {fontFamilies.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Size (px)</label>
//                       <input 
//                         type="range" 
//                         min="12" 
//                         max="48" 
//                         value={nameStyle.fontSize}
//                         onChange={(e) => setNameStyle({...nameStyle, fontSize: parseInt(e.target.value)})}
//                         className="w-full"
//                       />
//                       <span className="text-xs text-center block">{nameStyle.fontSize}px</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <button 
//                       onClick={() => setNameStyle({...nameStyle, fontWeight: nameStyle.fontWeight === 'bold' ? 'normal' : 'bold'})}
//                       className={`p-2 rounded-lg border ${nameStyle.fontWeight === 'bold' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//                     >
//                       <Bold size={16} />
//                     </button>
//                     <button 
//                       onClick={() => setNameStyle({...nameStyle, fontStyle: nameStyle.fontStyle === 'italic' ? 'normal' : 'italic'})}
//                       className={`p-2 rounded-lg border ${nameStyle.fontStyle === 'italic' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//                     >
//                       <Italic size={16} />
//                     </button>
//                     <button 
//                       onClick={() => setNameStyle({...nameStyle, textDecoration: nameStyle.textDecoration === 'underline' ? 'none' : 'underline'})}
//                       className={`p-2 rounded-lg border ${nameStyle.textDecoration === 'underline' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//                     >
//                       <Underline size={16} />
//                     </button>
//                     <div className="flex-1">
//                       <label className="text-xs font-semibold text-gray-600">Letter Spacing</label>
//                       <input 
//                         type="range" 
//                         min="0" 
//                         max="10" 
//                         value={nameStyle.letterSpacing}
//                         onChange={(e) => setNameStyle({...nameStyle, letterSpacing: parseInt(e.target.value)})}
//                         className="w-full"
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <label className="text-xs font-semibold text-gray-600">Text Color</label>
//                     <div className="grid grid-cols-6 gap-2 mt-2">
//                       {textColors.map((color) => (
//                         <button
//                           key={color.code}
//                           onClick={() => setNameStyle({...nameStyle, color: color.code})}
//                           className={`w-8 h-8 rounded-full border-2 transition-all ${nameStyle.color === color.code ? 'border-blue-600 scale-110' : 'border-gray-300'}`}
//                           style={{ backgroundColor: color.code }}
//                           title={color.name}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Player Number Section */}
//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <h4 className="font-bold text-gray-800 mb-3">Player Number</h4>
//                   <input 
//                     type="text" 
//                     value={playerNumber}
//                     onChange={(e) => setPlayerNumber(e.target.value)}
//                     className="w-full p-3 border-2 border-gray-200 rounded-lg mb-3 focus:border-blue-500 focus:outline-none"
//                     maxLength="2"
//                   />
                  
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Font</label>
//                       <select 
//                         value={numberStyle.fontFamily}
//                         onChange={(e) => setNumberStyle({...numberStyle, fontFamily: e.target.value})}
//                         className="w-full p-2 border border-gray-200 rounded-lg text-sm"
//                       >
//                         {fontFamilies.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Size (px)</label>
//                       <input 
//                         type="range" 
//                         min="36" 
//                         max="120" 
//                         value={numberStyle.fontSize}
//                         onChange={(e) => setNumberStyle({...numberStyle, fontSize: parseInt(e.target.value)})}
//                         className="w-full"
//                       />
//                       <span className="text-xs text-center block">{numberStyle.fontSize}px</span>
//                     </div>
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <button 
//                       onClick={() => setNumberStyle({...numberStyle, fontWeight: numberStyle.fontWeight === '900' ? 'normal' : '900'})}
//                       className={`p-2 rounded-lg border ${numberStyle.fontWeight === '900' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
//                     >
//                       <Bold size={16} />
//                     </button>
//                     <select 
//                       value={numberStyle.textShadow}
//                       onChange={(e) => setNumberStyle({...numberStyle, textShadow: e.target.value})}
//                       className="flex-1 p-2 border border-gray-200 rounded-lg text-sm"
//                     >
//                       {numberShadows.map(s => <option key={s.name} value={s.value}>{s.name}</option>)}
//                     </select>
//                   </div>

//                   <div className="mt-3">
//                     <label className="text-xs font-semibold text-gray-600">Number Color</label>
//                     <div className="grid grid-cols-6 gap-2 mt-2">
//                       {textColors.map((color) => (
//                         <button
//                           key={color.code}
//                           onClick={() => setNumberStyle({...numberStyle, color: color.code})}
//                           className={`w-8 h-8 rounded-full border-2 transition-all ${numberStyle.color === color.code ? 'border-blue-600 scale-110' : 'border-gray-300'}`}
//                           style={{ backgroundColor: color.code }}
//                           title={color.name}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Team Name Section */}
//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <h4 className="font-bold text-gray-800 mb-3">Team Name</h4>
//                   <input 
//                     type="text" 
//                     value={teamName}
//                     onChange={(e) => setTeamName(e.target.value.toUpperCase())}
//                     className="w-full p-3 border-2 border-gray-200 rounded-lg mb-3 focus:border-blue-500 focus:outline-none"
//                   />
                  
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Font</label>
//                       <select 
//                         value={teamNameStyle.fontFamily}
//                         onChange={(e) => setTeamNameStyle({...teamNameStyle, fontFamily: e.target.value})}
//                         className="w-full p-2 border border-gray-200 rounded-lg text-sm"
//                       >
//                         {fontFamilies.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
//                       </select>
//                     </div>
//                     <div>
//                       <label className="text-xs font-semibold text-gray-600">Size (px)</label>
//                       <input 
//                         type="range" 
//                         min="10" 
//                         max="24" 
//                         value={teamNameStyle.fontSize}
//                         onChange={(e) => setTeamNameStyle({...teamNameStyle, fontSize: parseInt(e.target.value)})}
//                         className="w-full"
//                       />
//                       <span className="text-xs text-center block">{teamNameStyle.fontSize}px</span>
//                     </div>
//                   </div>

//                   <div className="mt-3">
//                     <label className="text-xs font-semibold text-gray-600">Team Color</label>
//                     <div className="grid grid-cols-6 gap-2 mt-2">
//                       {textColors.map((color) => (
//                         <button
//                           key={color.code}
//                           onClick={() => setTeamNameStyle({...teamNameStyle, color: color.code})}
//                           className={`w-8 h-8 rounded-full border-2 transition-all ${teamNameStyle.color === color.code ? 'border-blue-600 scale-110' : 'border-gray-300'}`}
//                           style={{ backgroundColor: color.code }}
//                           title={color.name}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Position Reset */}
//                 <div className="flex gap-2">
//                   <button 
//                     onClick={() => {
//                       setNamePosition({ x: 50, y: 45 });
//                       setNumberPosition({ x: 50, y: 55 });
//                       setTeamNamePosition({ x: 50, y: 70 });
//                       setSponsorPosition({ x: 50, y: 20 });
//                     }}
//                     className="flex-1 py-2 bg-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-300"
//                   >
//                     Reset All Positions
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Order Tab */}
//             {activeTab === 'Order' && (
//               <div className="space-y-4 animate-fadeIn">
//                 <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-600">
//                   <p className="text-sm text-gray-700">Add your players' names, numbers and sizes to complete your order.</p>
//                   <a href="#" className="text-blue-600 text-xs hover:underline mt-1 inline-block">CHECK OUR SIZE GUIDE →</a>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <h4 className="text-sm font-bold text-gray-800 mb-3">Player List Template</h4>
//                   <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-all flex items-center gap-2">
//                     <Download size={14} /> Download Template
//                   </button>
//                   <p className="text-xs text-gray-500 mt-2">Download template, fill in details, and upload below</p>
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-all">
//                   <Upload size={32} className="mx-auto text-gray-400 mb-2" />
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
//                     Upload Spreadsheet
//                   </button>
//                   <p className="text-xs text-gray-400 mt-2">CSV, Excel files accepted</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Select Size</label>
//                   <div className="flex gap-2 flex-wrap">
//                     {sizes.map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
//                           selectedSize === size ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600'
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-blue-50 p-4 rounded-xl">
//                   <h4 className="font-bold text-sm mb-2">Current Customization Summary</h4>
//                   <div className="space-y-1 text-xs">
//                     <p><span className="font-semibold">Jersey Color:</span> {jerseyColors.find(c => c.code === selectedColor)?.name || selectedColor}</p>
//                     <p><span className="font-semibold">Player:</span> {playerName} - #{playerNumber}</p>
//                     <p><span className="font-semibold">Team:</span> {teamName}</p>
//                     <p><span className="font-semibold">Size:</span> {selectedSize}</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Bottom Footer Actions */}
//           <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
//             <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm uppercase hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
//               <Save size={18} /> {activeTab === 'Order' ? 'Save Design' : 'Next Step'}
//             </button>
//           </div>
//         </div>
//       </main>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
//         .animate-slideDown { animation: slideDown 0.3s ease-out; }
//       `}</style>
//     </div>
//   );
// };

// export default JerseyCustomizer;
















"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Upload, ChevronDown, Download, Save, Check,
  Trash2, Type, Shield, Paintbrush, ShoppingBag,
  ArrowRight, ArrowLeft, RotateCcw, Undo2, Redo2,
  Eye, EyeOff, X, Menu, ChevronRight
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const JERSEY_COLORS = [
  { name: 'Pure White',   code: '#FFFFFF' },
  { name: 'Cream',        code: '#F5F5DC' },
  { name: 'Royal Blue',   code: '#1E40AF' },
  { name: 'Crimson',      code: '#DC2626' },
  { name: 'Forest Green', code: '#059669' },
  { name: 'Charcoal',     code: '#1F2937' },
  { name: 'Amber',        code: '#F59E0B' },
  { name: 'Burnt Orange', code: '#EA580C' },
  { name: 'Yellow',       code: '#EAB308' },
  { name: 'Hot Pink',     code: '#EC4899' },
  { name: 'Purple',       code: '#7C3AED' },
  { name: 'Teal',         code: '#14B8A6' },
  { name: 'Navy',         code: '#1E3A8A' },
  { name: 'Burgundy',     code: '#991B1B' },
  { name: 'Olive',        code: '#4D7C0F' },
  { name: 'Sky Blue',     code: '#38BDF8' },
  { name: 'Indigo',       code: '#6366F1' },
  { name: 'Rose',         code: '#FB7185' },
  { name: 'Slate',        code: '#475569' },
  { name: 'Cyan',         code: '#06B6D4' },
];

const TEXT_COLORS = [
  '#000000','#1F2937','#374151','#6B7280','#9CA3AF','#FFFFFF',
  '#DC2626','#B91C1C','#EA580C','#F59E0B','#D97706','#EAB308',
  '#059669','#14B8A6','#2563EB','#1E40AF','#7C3AED','#6D28D9',
  '#EC4899','#FB7185','#06B6D4','#38BDF8','#4D7C0F','#991B1B',
];

// Font style presets — matching the screenshot grid
const FONT_STYLES = [
  { id: 'none',       label: 'None',          fontFamily: '',                           fontWeight: 'normal', preview: null },
  { id: 'collegiate', label: 'Collegiate',    fontFamily: '"Arial Black", sans-serif',  fontWeight: '900',    style: { letterSpacing: '0.05em' } },
  { id: 'block',      label: 'Block',         fontFamily: 'Impact, sans-serif',         fontWeight: '900',    style: {} },
  { id: 'varsity',    label: 'Varsity',       fontFamily: '"Georgia", serif',           fontWeight: '900',    style: { fontStyle: 'italic', letterSpacing: '0.02em' } },
  { id: 'athletic',   label: 'Athletic',      fontFamily: '"Trebuchet MS", sans-serif', fontWeight: '800',    style: { letterSpacing: '0.08em' } },
  { id: 'sport',      label: 'Sport',         fontFamily: '"Verdana", sans-serif',      fontWeight: '700',    style: { letterSpacing: '0.04em' } },
  { id: 'classic',    label: 'Classic',       fontFamily: '"Times New Roman", serif',   fontWeight: '700',    style: {} },
  { id: 'retro',      label: 'Retro',         fontFamily: '"Courier New", monospace',   fontWeight: '700',    style: { letterSpacing: '0.06em' } },
  { id: 'modern',     label: 'Modern',        fontFamily: '"Helvetica", sans-serif',    fontWeight: '900',    style: { letterSpacing: '0.1em' } },
  { id: 'slim',       label: 'Slim',          fontFamily: '"Arial Narrow", sans-serif', fontWeight: '600',    style: { letterSpacing: '0.12em' } },
  { id: 'heavy',      label: 'Heavy',         fontFamily: '"Arial Black", sans-serif',  fontWeight: '900',    style: { textTransform: 'uppercase', letterSpacing: '-0.02em' } },
  { id: 'serif',      label: 'Serif',         fontFamily: '"Palatino", serif',          fontWeight: '700',    style: {} },
  { id: 'script',     label: 'Script',        fontFamily: '"Georgia", serif',           fontWeight: '700',    style: { fontStyle: 'italic', letterSpacing: '0.05em' } },
  { id: 'stencil',    label: 'Stencil',       fontFamily: '"Courier New", monospace',   fontWeight: '900',    style: { letterSpacing: '0.15em' } },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const STEPS = [
  { id: 'style', label: 'Style',         sub: 'Color & fabric',          Icon: Paintbrush  },
  { id: 'logos', label: 'Logos',         sub: 'Badges & sponsors',       Icon: Shield      },
  { id: 'names', label: 'Name & Number', sub: 'Fonts & placement',       Icon: Type        },
  { id: 'order', label: 'Order',         sub: 'Sizing & player list',    Icon: ShoppingBag },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const isLight = (hex) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (r*299 + g*587 + b*114)/1000 > 160;
};

function Accordion({ label, open, onToggle, children, accent }) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
      <button onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
          accent ? 'bg-secondary text-white' : 'bg-[#FAFAF8] hover:bg-[#F3F4F6] text-[#374151]'
        }`}>
        <span className={`text-xs font-bold uppercase tracking-widest ${accent ? 'text-white' : 'text-[#374151]'}`}>{label}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${accent ? 'text-white' : 'text-[#9CA3AF]'}`} />
      </button>
      {open && <div className="px-4 py-4 bg-white">{children}</div>}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-[0.18em] mb-2">{children}</p>;
}

/* ─────────────────────────── COMPONENT ─────────────────────────── */
export default function JerseyCustomizer({ product }) {
  const [step, setStep]               = useState(0);
  const [jerseyColor, setJerseyColor] = useState('#FFFFFF');
  const [view, setView]               = useState('front'); // front | back
  const [mobileOpen, setMobileOpen]   = useState(false);

  // Logos
  const [clubLogo,    setClubLogo]    = useState(null);
  const [sponsorLogo, setSponsorLogo] = useState(null);
  const [leftSleeve,  setLeftSleeve]  = useState(null);
  const [rightSleeve, setRightSleeve] = useState(null);

  // Name style
  const [nameStyleId,   setNameStyleId]   = useState('collegiate');
  const [nameText,      setNameText]      = useState('PLAYER');
  const [nameColor,     setNameColor]     = useState('#1F2937');
  const [nameVertical,  setNameVertical]  = useState(38);

  // Number style
  const [numberStyleId,  setNumberStyleId]  = useState('block');
  const [numberText,     setNumberText]     = useState('10');
  const [numberColor,    setNumberColor]    = useState('#1F2937');

  // Team name
  const [teamName,     setTeamName]    = useState('YOUR TEAM');
  const [teamStyleId,  setTeamStyleId] = useState('athletic');
  const [teamColor,    setTeamColor]   = useState('#6B7280');
  const [showTeam,     setShowTeam]    = useState(false);

  // Order
  const [selectedSize, setSelectedSize] = useState('M');

  // Accordions
  const [fabricOpen,  setFabricOpen]  = useState(true);
  const [colorsOpen,  setColorsOpen]  = useState(true);
  const [nameAccOpen, setNameAccOpen] = useState(true);
  const [numAccOpen,  setNumAccOpen]  = useState(false);
  const [teamAccOpen, setTeamAccOpen] = useState(false);

  const handleUpload = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onloadend = () => setter(r.result);
    r.readAsDataURL(file);
  };

  const reset = () => {
    setJerseyColor('#FFFFFF');
    setClubLogo(null); setSponsorLogo(null);
    setLeftSleeve(null); setRightSleeve(null);
    setNameText('PLAYER'); setNumberText('10');
    setTeamName('YOUR TEAM'); setNameColor('#1F2937');
    setNumberColor('#1F2937'); setNameVertical(38);
    setNameStyleId('collegiate'); setNumberStyleId('block');
  };

  const nameStyle  = FONT_STYLES.find(f => f.id === nameStyleId)   || FONT_STYLES[1];
  const numStyle   = FONT_STYLES.find(f => f.id === numberStyleId) || FONT_STYLES[2];
  const teamStyleF = FONT_STYLES.find(f => f.id === teamStyleId)   || FONT_STYLES[4];

  // Product image — use real product image if available, else show jersey SVG
  const productImg = product?.mainImage || product?.image || null;

  const FontGrid = ({ selectedId, onSelect, label }) => (
    <div>
      <Label>{label ?? 'Font Style'}</Label>
      <div className="grid grid-cols-4 gap-2">
        {FONT_STYLES.map(f => (
          <button key={f.id} onClick={() => onSelect(f.id)}
            className={`relative h-14 rounded-xl border-2 flex items-center justify-center px-1 transition-all hover:scale-105 ${
              selectedId === f.id
                ? 'border-[#F59E0B] bg-[#FFFBEB] shadow-md scale-105'
                : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB]'
            }`}>
            {selectedId === f.id && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <Check size={7} strokeWidth={3.5} className="text-white" />
              </span>
            )}
            {f.id === 'none'
              ? <span className="text-red-400 text-lg font-light">∅</span>
              : <span className="text-[10px] leading-tight text-center text-[#1F2937] truncate px-1"
                  style={{ fontFamily: f.fontFamily, fontWeight: f.fontWeight, ...f.style }}>
                  PLAYER
                </span>
            }
          </button>
        ))}
      </div>
    </div>
  );

  const ColorDots = ({ selected, onSelect }) => (
    <div className="flex flex-wrap gap-1.5">
      {TEXT_COLORS.map(c => (
        <button key={c} onClick={() => onSelect(c)}
          className={`w-6 h-6 rounded-lg border-2 transition-all hover:scale-110 ${
            selected === c ? 'border-[#F59E0B] scale-110 shadow-sm' : 'border-transparent'
          }`}
          style={{ backgroundColor: c, boxShadow: c === '#FFFFFF' ? 'inset 0 0 0 1px #E5E7EB' : undefined }} />
      ))}
    </div>
  );

  /* ── Preview Panel ── */
  const PreviewPanel = () => (
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[420px] lg:min-h-0 bg-[#F4F3F0]">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: 'radial-gradient(circle, #374151 1.2px, transparent 1.2px)', backgroundSize: '22px 22px' }} />

      {/* View toggle badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex bg-white border border-[#E5E7EB] rounded-full p-1 shadow-sm gap-1">
          {['front','back'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                view === v ? 'bg-secondary text-white shadow-sm' : 'text-[#9CA3AF] hover:text-[#6B7280]'
              }`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Product image area */}
      <div className="relative w-full max-w-sm px-6 pt-14 pb-6 flex flex-col items-center">
        {productImg ? (
          /* Real product image */
          <div className="relative w-full aspect-[4/5]">
            <img
              src={productImg}
              alt={product?.name ?? 'Jersey'}
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: `brightness(${isLight(jerseyColor) ? 1 : 0.88}) sepia(0.08) saturate(1.1)` }}
            />
            {/* Text overlays on real image */}
            {view === 'back' && (
              <div className="absolute inset-0 flex flex-col items-center pointer-events-none"
                style={{ paddingTop: `${nameVertical * 0.7}%` }}>
                {nameStyleId !== 'none' && (
                  <p className="text-center leading-tight drop-shadow-sm"
                    style={{
                      fontFamily: nameStyle.fontFamily,
                      fontWeight: nameStyle.fontWeight,
                      color: nameColor,
                      fontSize: 'clamp(16px, 4vw, 26px)',
                      letterSpacing: nameStyle.style?.letterSpacing ?? '0.04em',
                      fontStyle: nameStyle.style?.fontStyle,
                      ...nameStyle.style
                    }}>
                    {nameText}
                  </p>
                )}
                {numberStyleId !== 'none' && (
                  <p className="text-center leading-none mt-1 drop-shadow-sm"
                    style={{
                      fontFamily: numStyle.fontFamily,
                      fontWeight: numStyle.fontWeight,
                      color: numberColor,
                      fontSize: 'clamp(48px, 12vw, 80px)',
                      ...numStyle.style
                    }}>
                    {numberText}
                  </p>
                )}
                {showTeam && (
                  <p className="text-center mt-2 drop-shadow-sm"
                    style={{
                      fontFamily: teamStyleF.fontFamily,
                      fontWeight: teamStyleF.fontWeight,
                      color: teamColor,
                      fontSize: 'clamp(10px, 2vw, 13px)',
                      letterSpacing: '0.2em',
                      ...teamStyleF.style
                    }}>
                    {teamName}
                  </p>
                )}
              </div>
            )}
            {view === 'front' && clubLogo && (
              <div className="absolute top-[22%] left-[20%]">
                <img src={clubLogo} alt="Club" className="w-12 h-12 object-contain" />
              </div>
            )}
            {view === 'front' && sponsorLogo && (
              <div className="absolute top-[38%] left-1/2 -translate-x-1/2">
                <img src={sponsorLogo} alt="Sponsor" className="h-10 object-contain" />
              </div>
            )}
          </div>
        ) : (
          /* SVG fallback when no product image */
          <div style={{ width: 300, height: 380 }}>
            <svg viewBox="0 0 300 380" className="w-full h-full drop-shadow-2xl">
              <ellipse cx="150" cy="370" rx="85" ry="6" fill="rgba(0,0,0,0.07)" />
              <path
                d="M65,36 L35,58 L10,74 L20,148 L54,134 L54,340 L246,340 L246,134 L280,148 L290,74 L265,58 L235,36 L205,18 Q175,42 150,42 Q125,42 95,18 Z"
                fill={jerseyColor}
                stroke={isLight(jerseyColor) ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.07)'}
                strokeWidth="1.5"
              />
              <path d="M68,72 L57,340 L70,340 L80,72 Z"  fill="#1E3A8A" opacity="0.7" />
              <path d="M232,72 L220,340 L233,340 L242,72 Z" fill="#1E3A8A" opacity="0.7" />
              <path
                d="M95,18 Q125,42 150,42 Q175,42 205,18 L209,30 Q177,56 150,56 Q123,56 91,30 Z"
                fill={isLight(jerseyColor) ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.10)'}
              />
              <line x1="80" y1="72" x2="54" y2="134" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" />
              <line x1="220" y1="72" x2="246" y2="134" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" />
              {[62,75,88].map(cy => (
                <circle key={cy} cx="150" cy={cy} r="2.5"
                  fill={isLight(jerseyColor) ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.22)'} />
              ))}
              {clubLogo && view==='front' && <image href={clubLogo} x="82" y="72" width="44" height="44" />}
              {sponsorLogo && view==='front' && <image href={sponsorLogo} x="100" y="126" width="100" height="36" preserveAspectRatio="xMidYMid meet" />}
              {view === 'back' && nameStyleId !== 'none' && (
                <text x="150" y={nameVertical * 2.6}
                  textAnchor="middle"
                  fontFamily={nameStyle.fontFamily}
                  fontSize="22"
                  fontWeight={nameStyle.fontWeight}
                  fill={nameColor}
                  letterSpacing={nameStyle.style?.letterSpacing ?? '2'}>
                  {nameText}
                </text>
              )}
              {view === 'back' && numberStyleId !== 'none' && (
                <text x="150" y={nameVertical * 2.6 + 72}
                  textAnchor="middle"
                  fontFamily={numStyle.fontFamily}
                  fontSize="68"
                  fontWeight={numStyle.fontWeight}
                  fill={numberColor}>
                  {numberText}
                </text>
              )}
              {view === 'back' && showTeam && (
                <text x="150" y="316"
                  textAnchor="middle"
                  fontFamily={teamStyleF.fontFamily}
                  fontSize="10"
                  fontWeight="600"
                  fill={teamColor}
                  letterSpacing="4">
                  {teamName}
                </text>
              )}
            </svg>
          </div>
        )}
      </div>

      {/* Undo/Redo */}
      <div className="absolute right-4 bottom-6 flex flex-col gap-2">
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-md hover:bg-gray-700 transition-colors">
          <Undo2 size={11} /> Undo
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E5E7EB] text-[#6B7280] text-[10px] font-bold uppercase tracking-wider shadow-sm hover:border-[#D1D5DB] transition-colors">
          <Redo2 size={11} /> Redo
        </button>
      </div>
    </div>
  );

  /* ── Config Panel ── */
  const ConfigPanel = () => (
    <div className="flex flex-col h-full">
      {/* Step tabs */}
      <div className="flex border-b border-[#EDEBE4] bg-white shrink-0">
        {STEPS.map((s, i) => (
          <button key={s.id} onClick={() => setStep(i)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 border-b-2 transition-all ${
              step === i
                ? 'border-secondary bg-primary text-white'
                : 'border-transparent text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#FAFAF8]'
            }`}>
            {React.createElement(s.Icon, { size: 15 })}
            <span className="text-[8px] font-bold uppercase tracking-widest leading-tight text-center">{s.label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* ── STYLE ── */}
        {step === 0 && <>

          <Accordion label="Fabric" accent open={fabricOpen} onToggle={() => setFabricOpen(v=>!v)}>
            <p className="text-[11px] text-[#6B7280] leading-relaxed mb-3">
              Bio-washed performance fabric with UV protection, moisture management, breathability and shape retention.
            </p>
            <div className="flex gap-2">
              {['AirMesh Pro','CoolWeave'].map((f,i) => (
                <button key={f}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                    i===0 ? 'border-[#F59E0B] bg-[#FFFBEB] text-[#92400E]' : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                  }`}>
                  {f}
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion label={`Design Colours — ${JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name??''}`}
            open={colorsOpen} onToggle={() => setColorsOpen(v=>!v)}>
            <div className="grid grid-cols-5 gap-2">
              {JERSEY_COLORS.map(c => (
                <button key={c.code} onClick={() => setJerseyColor(c.code)} title={c.name}
                  className={`relative aspect-square rounded-xl border-2 transition-all hover:scale-105 ${
                    jerseyColor === c.code ? 'border-[#F59E0B] shadow-md scale-105' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                  }`}
                  style={{ backgroundColor: c.code, boxShadow: c.code==='#FFFFFF' ? 'inset 0 0 0 1px #E5E7EB' : undefined }}>
                  {jerseyColor === c.code && (
                    <Check size={10} strokeWidth={3}
                      className={`absolute inset-0 m-auto ${isLight(c.code) ? 'text-gray-700' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </Accordion>
        </>}

        {/* ── LOGOS ── */}
        {step === 1 && <>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-3 space-y-1">
            <p className="text-[11px] text-[#92400E] font-semibold">Upload your badge, sponsor logo or custom artwork (max 10MB)</p>
            <a href="#" className="text-[10px] font-bold text-[#D97706] hover:underline tracking-wide">LOGO UPLOAD GUIDE ↗</a>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <p className="text-[10px] font-bold text-amber-700 mb-1.5">Before you upload</p>
            <ul className="text-[10px] text-amber-600 space-y-1 list-disc pl-3">
              <li>Vector (AI, EPS, SVG) gives the sharpest print</li>
              <li>PNG or JPG? 300 DPI or higher</li>
              <li>Transparent background for badges and crests</li>
              <li>Maximum file size: 10MB</li>
            </ul>
          </div>

          {[
            { label:'Club Badge',   type:'club',    state:clubLogo,    setter:setClubLogo    },
            { label:'Sponsor Logo', type:'sponsor', state:sponsorLogo, setter:setSponsorLogo },
            { label:'Left Sleeve',  type:'left',    state:leftSleeve,  setter:setLeftSleeve  },
            { label:'Right Sleeve', type:'right',   state:rightSleeve, setter:setRightSleeve },
          ].map(item => (
            <div key={item.type} className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAFAF8] border-b border-[#E5E7EB]">
                <span className="text-[11px] font-bold text-[#374151]">{item.label}</span>
                {item.state && (
                  <button onClick={() => item.setter(null)} className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <div className="p-3">
                {item.state
                  ? <img src={item.state} alt={item.label} className="h-12 mx-auto object-contain rounded-lg border border-[#E5E7EB] bg-white p-1" />
                  : <button onClick={() => document.getElementById(`up-${item.type}`).click()}
                      className="w-full py-3 border-2 border-dashed border-[#E5E7EB] rounded-xl text-[10px] font-semibold text-[#9CA3AF] hover:border-[#F59E0B] hover:text-[#92400E] transition-all flex items-center justify-center gap-2">
                      <Upload size={12} /> Upload {item.label}
                    </button>
                }
                <input id={`up-${item.type}`} type="file" accept="image/*" className="hidden" onChange={handleUpload(item.setter)} />
              </div>
            </div>
          ))}

          <p className="text-[10px] text-[#9CA3AF] leading-relaxed px-1">
            You confirm you own or have the legal right to use any artwork, logo or text you upload.
          </p>
        </>}

        {/* ── NAME & NUMBER ── */}
        {step === 2 && <>

          {/* Name Style */}
          <Accordion label="Name Style" accent open={nameAccOpen} onToggle={() => setNameAccOpen(v=>!v)}>
            <div className="space-y-4">
              <div>
                <Label>Player Name</Label>
                <input value={nameText} onChange={e => setNameText(e.target.value.toUpperCase())}
                  placeholder="YOUR NAME"
                  className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#F59E0B] transition-colors tracking-widest" />
              </div>
              <FontGrid selectedId={nameStyleId} onSelect={setNameStyleId} label="Font Style" />
              <div>
                <Label>Name Colour</Label>
                <ColorDots selected={nameColor} onSelect={setNameColor} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Vertical Position</Label>
                  <span className="text-[10px] font-bold text-[#F59E0B]">{nameVertical}%</span>
                </div>
                <input type="range" min="20" max="65" value={nameVertical}
                  onChange={e => setNameVertical(+e.target.value)}
                  className="w-full accent-[#F59E0B]" />
              </div>
            </div>
          </Accordion>

          {/* Number Style */}
          <Accordion label="Number Style" open={numAccOpen} onToggle={() => setNumAccOpen(v=>!v)}>
            <div className="space-y-4">
              <div>
                <Label>Player Number</Label>
                <input value={numberText} onChange={e => setNumberText(e.target.value)} maxLength={2}
                  placeholder="10"
                  className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#F59E0B] transition-colors" />
              </div>
              <FontGrid selectedId={numberStyleId} onSelect={setNumberStyleId} label="Font Style" />
              <div>
                <Label>Number Colour</Label>
                <ColorDots selected={numberColor} onSelect={setNumberColor} />
              </div>
            </div>
          </Accordion>

          {/* Team Name */}
          <Accordion label="Team Name" open={teamAccOpen} onToggle={() => setTeamAccOpen(v=>!v)}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Label>Show Team Name</Label>
                <button onClick={() => setShowTeam(v=>!v)}
                  className={`w-10 h-5 rounded-full transition-all relative ${showTeam ? 'bg-[#F59E0B]' : 'bg-[#E5E7EB]'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${showTeam ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              {showTeam && <>
                <div>
                  <Label>Team Name</Label>
                  <input value={teamName} onChange={e => setTeamName(e.target.value.toUpperCase())}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm font-bold text-[#1F2937] focus:outline-none focus:border-[#F59E0B] transition-colors" />
                </div>
                <FontGrid selectedId={teamStyleId} onSelect={setTeamStyleId} label="Font Style" />
                <div>
                  <Label>Colour</Label>
                  <ColorDots selected={teamColor} onSelect={setTeamColor} />
                </div>
              </>}
            </div>
          </Accordion>
        </>}

        {/* ── ORDER ── */}
        {step === 3 && <>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-3">
            <p className="text-[11px] text-[#166534] leading-relaxed">
              Add your players' names, numbers and sizes to complete your order.{' '}
              <a href="#" className="font-bold underline">CHECK OUR SIZE GUIDE ↗</a>
            </p>
          </div>

          <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#FAFAF8] border-b border-[#E5E7EB]">
              <p className="text-xs font-bold text-[#374151]">Player List</p>
              <p className="text-[10px] text-[#9CA3AF] mt-0.5">Download template · fill details · upload below</p>
            </div>
            <div className="p-4 space-y-3">
              <a href="#"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-[#E5E7EB] rounded-xl text-[11px] font-semibold text-[#374151] hover:border-[#F59E0B] hover:text-[#92400E] transition-all">
                <Download size={12} /> Download Template
              </a>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center hover:border-[#F59E0B] transition-colors">
                <Upload size={16} className="mx-auto text-[#D1D5DB] mb-2" />
                <p className="text-[9px] text-[#9CA3AF] mb-2">CSV or Excel accepted</p>
                <input type="file" accept=".csv,.xlsx,.xls"
                  className="text-[10px] text-[#6B7280] file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border file:border-[#E5E7EB] file:text-[9px] file:font-semibold file:bg-white hover:file:bg-[#FAFAF8]" />
              </div>
            </div>
          </div>

          <div>
            <Label>Select Size</Label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-11 h-11 rounded-xl border-2 text-xs font-bold transition-all ${
                    selectedSize === s
                      ? 'border-[#F59E0B] bg-[#FFFBEB] text-[#92400E] shadow-sm'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#D1D5DB]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#FAFAF8] border border-[#E5E7EB] rounded-2xl p-4 space-y-2">
            <Label>Order Summary</Label>
            {[
              ['Colour',  JERSEY_COLORS.find(c=>c.code===jerseyColor)?.name ?? jerseyColor],
              ['Player',  `${nameText} — #${numberText}`],
              ['Team',    showTeam ? teamName : '—'],
              ['Size',    selectedSize],
            ].map(([k,v]) => (
              <div key={k} className="flex justify-between items-baseline gap-2">
                <span className="text-[10px] text-[#9CA3AF] font-medium shrink-0">{k}</span>
                <span className="text-[11px] font-semibold text-[#374151] text-right truncate">{v}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-center">
              <span className="text-[10px] text-[#9CA3AF]">Unit price</span>
              <span className="text-xl font-bold text-[#D97706]">${product?.price ?? '149'}</span>
            </div>
          </div>
        </>}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-4 border-t border-[#EDEBE4] bg-white shrink-0 space-y-2">
        {step < STEPS.length - 1
          ? <button onClick={() => setStep(s => s+1)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-bold shadow-md hover:shadow-lg hover:from-[#D97706] hover:to-[#B45309] transition-all flex items-center justify-center gap-2">
              {step === STEPS.length - 2 ? 'Review Order' : 'Continue'} <ArrowRight size={14} />
            </button>
          : <button className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-[#374151] transition-all flex items-center justify-center gap-2">
              <Save size={14} /> Save Design
            </button>
        }
        {step > 0 &&
          <button onClick={() => setStep(s => s-1)}
            className="w-full py-1.5 rounded-xl text-[11px] font-medium text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
            ← Back
          </button>
        }
      </div>
    </div>
  );

  /* ── RENDER ── */
  return (
    <div className="min-h-screen bg-[#F4F3F0]" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ── HEADER ── */}
      <header className="h-14 bg-white border-b border-[#EDEBE4] flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-5 rounded-full bg-gradient-to-b from-[#F59E0B] to-[#D97706]" />
          <span className="text-xs font-bold text-[#1F2937] tracking-[0.16em] uppercase hidden sm:block">
            {product?.name ?? 'Kit Designer'}
          </span>
          <span className="text-xs font-bold text-[#1F2937] tracking-[0.16em] uppercase sm:hidden">
            Kit Designer
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={reset}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-[11px] font-medium text-[#6B7280] hover:border-[#D1D5DB] hover:text-[#374151] transition-all">
            <RotateCcw size={11} /> Reset
          </button>
          <div className="hidden sm:block w-px h-4 bg-[#E5E7EB] mx-1" />
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[11px] font-semibold text-[#92400E] hover:bg-[#FEF3C7] transition-all">
            <Undo2 size={11} className="hidden sm:block" />
            <span className="hidden sm:block">Undo</span>
            <Undo2 size={13} className="sm:hidden" />
          </button>
          {/* Mobile config toggle */}
          <button onClick={() => setMobileOpen(v=>!v)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1F2937] text-white text-[11px] font-bold">
            <Menu size={14} />
          </button>
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">

        {/* Preview — full width on mobile, 60% on desktop */}
        <div className="flex-1 lg:w-3/5 overflow-hidden">
          <PreviewPanel />
        </div>

        {/* Config panel — bottom sheet on mobile, right sidebar on desktop */}
        {/* Desktop */}
        <div className="hidden lg:flex w-[340px] xl:w-[380px] flex-col bg-white border-l border-[#EDEBE4] shadow-xl overflow-hidden shrink-0">
          <ConfigPanel />
        </div>

        {/* Mobile slide-up sheet */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative bg-white rounded-t-3xl shadow-2xl flex flex-col"
              style={{ maxHeight: '85vh' }}>
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[#EDEBE4]">
                <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                <span className="text-sm font-bold text-[#1F2937]">{STEPS[step].label}</span>
                <button onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] hover:bg-[#E5E7EB]">
                  <X size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ConfigPanel />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile bottom nav bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-[#EDEBE4] flex z-40 safe-area-pb">
        {STEPS.map((s, i) => (
          <button key={s.id}
            onClick={() => { setStep(i); setMobileOpen(true); }}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
              step === i ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'
            }`}>
            {React.createElement(s.Icon, { size: 18, strokeWidth: step === i ? 2.5 : 1.8 })}
            <span className="text-[8px] font-bold uppercase tracking-wider">{s.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
}