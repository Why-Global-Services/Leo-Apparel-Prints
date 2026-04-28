"use client";

import { useState, useEffect } from "react";

// ── Brand palette — wired to global.css vars ────────────────────────────────
const C = {
  primaryBlue:      "#003E9B",
  primaryBlueDark:  "#002a6e",
  primaryBlueLight: "#e6f0ff",
  secondary:        "#E8960A",   // accent gold (--secondary)
  primary:          "#F5B800",   // gold (--primary)
  gradStart:        "#0EA5E9",
  gradMid:          "#0284C7",
  gradEnd:          "#1E3A8A",
  white:            "#FFFFFF",
  dark:             "#020617",
  text:             "#1E293B",
  muted:            "#64748B",
  border:           "#E2E8F0",
  bg:               "#FFFFFF",
};

// ── Unsplash images ────────────────────────────────────────────────────────
const IMG = {
  coverHero:    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&q=80",
  coverPlayer:  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80",
  teamKit:      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  laptop:       "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  jersey1:      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&q=80",
  jersey2:      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&q=80",
  jersey3:      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  polo1:        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80",
  polo2:        "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=300&q=80",
  polo3:        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&q=80",
  polo4:        "https://images.unsplash.com/photo-1622445275576-721325763afe?w=300&q=80",
  polo5:        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&q=80",
  polo6:        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&q=80",
  // Additional sports images
  football:     "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
  basketball:   "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  rugby:        "https://images.unsplash.com/photo-1526234362653-3b75a0c07438?w=800&q=80",
  hockey:       "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
  tennis:       "https://images.unsplash.com/photo-1595435934249-5df7ed86e1f0?w=800&q=80",
  athletics:    "https://images.unsplash.com/photo-1537381068608-7c4f5be33cb3?w=800&q=80",
  netball:      "https://images.unsplash.com/photo-1574629810361-55f2704dfb43?w=800&q=80",
  volleyball:   "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
};

// ── Helpers ────────────────────────────────────────────────────────────────
function Dots({ color = C.primaryBlue, opacity = 0.1 }) {
  const id = `d${color.replace(/#/g, "")}`;
  return (
    <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity }} aria-hidden>
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.8" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const blueLine = `linear-gradient(90deg,${C.gradStart},${C.primaryBlue},${C.gradEnd})`;

function BlueBar({ w = "100%", h = 3 }) {
  return <div style={{ width:w, height:h, background:blueLine, borderRadius:2, flexShrink:0 }} />;
}

function Logo({ size = 30, light = false }) {
  const grad = light
    ? "linear-gradient(135deg,#fff 0%,#dbeafe 100%)"
    : `linear-gradient(135deg,${C.primaryBlue} 0%,${C.gradStart} 100%)`;
  return (
    <span style={{
      fontFamily:"'Bebas Neue','Impact','Arial Black',sans-serif",
      fontSize:size, fontWeight:900, fontStyle:"italic", letterSpacing:2,
      background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
      lineHeight:1, userSelect:"none", display:"inline-block",
    }}>LEO CULT</span>
  );
}

function CricketBadge({ label }) {
  return (
    <span style={{ background:C.primaryBlue, color:C.white, fontSize:9, fontWeight:700,
      padding:"3px 12px", borderRadius:3, fontFamily:"sans-serif", letterSpacing:1 }}>
      {label}
    </span>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER
// ══════════════════════════════════════════════════════════════════════════════
function CoverPage() {
  return (
    <div style={{ position:"relative",width:"100%",height:"100%",background:C.white,overflow:"hidden",display:"flex" }}>

      {/* LEFT panel */}
      <div style={{ position:"relative",flex:"0 0 44%",display:"flex",flexDirection:"column",
        justifyContent:"center",padding:"44px 38px",zIndex:2,overflow:"hidden" }}>

        <Dots color={C.primaryBlue} opacity={0.09} />

        {/* gold radial glow */}
        <div style={{ position:"absolute",top:-100,left:-100,width:300,height:300,borderRadius:"50%",
          background:`radial-gradient(circle,${C.secondary}40 0%,transparent 70%)`,zIndex:0 }} />

        <div style={{ position:"relative",zIndex:1 }}>
          {/* eyebrow */}
          <span style={{ fontSize:10, color:C.primaryBlue, fontWeight:700, letterSpacing:4,
            textTransform:"uppercase", fontFamily:"sans-serif", display:"block", marginBottom:14 }}>
            Custom Sportswear · Made to Order
          </span>

          {/* big logo */}
          <div style={{ marginBottom:14 }}>
            <span style={{
              fontFamily:"'Bebas Neue','Impact','Arial Black',sans-serif",
              fontSize:88,fontWeight:900,fontStyle:"italic",letterSpacing:4,
              background:`linear-gradient(140deg,${C.primaryBlue} 0%,${C.gradStart} 55%,${C.gradEnd} 100%)`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              display:"block",lineHeight:0.95,
            }}>LEO</span>
            <span style={{
              fontFamily:"'Bebas Neue','Impact','Arial Black',sans-serif",
              fontSize:88,fontWeight:900,fontStyle:"italic",letterSpacing:4,
              background:`linear-gradient(140deg,${C.secondary} 0%,${C.primary} 55%,${C.secondary} 100%)`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              display:"block",lineHeight:0.95,marginTop:-4,
            }}>CULT</span>
          </div>

          <BlueBar h={3} w="65%" />

          <p style={{ marginTop:16,fontSize:13,color:C.muted,fontFamily:"sans-serif",
            lineHeight:1.7,maxWidth:230 }}>
            Premium cricket & sports kits — fully sublimated, made exactly to your specification.
          </p>

          {/* stat pills */}
          <div style={{ display:"flex",gap:10,marginTop:20,flexWrap:"wrap" }}>
            {["700+ Designs","15 MOQ","Unlimited Colors"].map(s => (
              <span key={s} style={{ background:C.primaryBlueLight,color:C.primaryBlue,
                fontSize:10,fontWeight:700,padding:"5px 12px",borderRadius:20,fontFamily:"sans-serif" }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* instagram */}
        <span style={{ position:"absolute",bottom:18,left:38,fontSize:10,color:C.muted,fontFamily:"sans-serif",zIndex:2 }}>
          @leocult_sportswear
        </span>
      </div>

      {/* RIGHT panel — hero image */}
      <div style={{ position:"relative",flex:1,overflow:"hidden" }}>
        <img src={IMG.coverHero} alt="cricket"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center" }} />

        {/* fade left */}
        <div style={{ position:"absolute",inset:0,
          background:"linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0.2) 40%,rgba(0,0,0,0.45) 100%)" }} />

        {/* navy right stripe */}
        <div style={{ position:"absolute",top:0,right:0,width:80,height:"100%",
          background:C.primaryBlue,clipPath:"polygon(36px 0,100% 0,100% 100%,0 100%)",zIndex:2 }} />

        {/* blue accent bar */}
        <div style={{ position:"absolute",top:22,right:12,width:10,height:170,borderRadius:5,
          background:blueLine,zIndex:3 }} />

        {/* dot row */}
        <div style={{ position:"absolute",top:18,right:100,display:"flex",gap:5,zIndex:3 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:C.secondary }} />
          ))}
        </div>

        {/* ghost SPORTS */}
        <span style={{ position:"absolute",top:20,left:"2%",zIndex:2,
          fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:100,
          letterSpacing:6,color:C.white,opacity:0.08,userSelect:"none" }}>SPORTS</span>

        {/* floating info card */}
        <div style={{ position:"absolute",bottom:28,right:96,zIndex:3,
          background:"rgba(255,255,255,0.95)",borderRadius:10,overflow:"hidden",
          display:"flex",boxShadow:"0 8px 28px rgba(0,62,155,0.2)",width:162 }}>
          <div style={{ width:5,background:blueLine }} />
          <div style={{ padding:"10px 12px" }}>
            <p style={{ margin:0,fontSize:10,color:C.primaryBlue,fontWeight:700,fontFamily:"sans-serif" }}>
              New Season
            </p>
            <p style={{ margin:"2px 0 0",fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>
              2025–26 Collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — TABLE OF CONTENTS spread
// ══════════════════════════════════════════════════════════════════════════════
const TOC_DATA = [
  { title:"ON - Field", bg:C.primaryBlue, items:[
    ["Playing Jersey","01-04"],["Playing Trousers","05-06"],["Umpire Jersey","07-08"],
    ["Cricket White Jersey","09-12"],["Cricket White Trousers","13-14"],
    ["Caps","15-16"],["Hat","17-18"],["Clads","19-20"],
  ]},
  { title:"OFF - Field", bg:C.gradEnd, items:[
    ["Training Jersey","21-22"],["Training Shorts","23-24"],["Warm-Up Layers","25-26"],
    ["Team Officials Polo","27-28"],["Volunteer Jersey","29-30"],
    ["Coach Performance Polo","31-32"],["Travel Polo","33-35"],
  ]},
  { title:"Athleisure", bg:C.secondary, items:[
    ["Travel Jackets","36-37"],["Zipped Hoodie","38-39"],["Pullover Hoodie","40-41"],
    ["Sweatshirts","42-43"],["Travel pants","44-45"],["Joggers","46-47"],
  ]},
];
const TOC_EXTRAS = [
  ["Number & Font Options","48"],["Logo & Text Position","49-50"],
  ["Collar & Fabric Types","51"],["Size Guide","52-56"],
];

function TocPage() {
  return (
    <div style={{ display:"flex",width:"100%",height:"100%",background:C.white }}>

      {/* LEFT — brand intro */}
      <div style={{ position:"relative",flex:"0 0 46%",display:"flex",flexDirection:"column",
        justifyContent:"space-between",padding:"26px 30px",borderRight:`1px solid ${C.border}`,overflow:"hidden" }}>

        <Dots color={C.primaryBlue} opacity={0.07} />

        <div style={{ position:"relative",zIndex:1 }}>
          <Logo size={26} />
          <span style={{ display:"block",fontSize:9,color:C.muted,fontFamily:"sans-serif",marginTop:2 }}>
            @leocult_sportswear
          </span>
        </div>

        <div style={{ position:"relative",zIndex:1 }}>
          <span style={{ fontSize:9,color:C.primaryBlue,fontWeight:700,letterSpacing:3,
            textTransform:"uppercase",fontFamily:"sans-serif",display:"block",marginBottom:6 }}>
            · Custom Sportswear · Made to Order
          </span>
          <h2 style={{ fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:46,
            color:C.dark,margin:"0 0 10px",lineHeight:1.05,letterSpacing:1 }}>
            Create Your<br/>Edge
          </h2>
          <BlueBar h={3} w={110} />
          <p style={{ fontSize:11,color:C.muted,marginTop:10,fontFamily:"sans-serif",
            lineHeight:1.7,maxWidth:250 }}>
            Design your kit online in 3D or let our team bring your vision to life.
            Trusted by clubs across the country.
          </p>
          <a href="https://leocultsportswear.com" style={{ display:"inline-flex",alignItems:"center",gap:6,
            marginTop:14,fontSize:11,color:C.white,
            background:`linear-gradient(135deg,${C.gradStart},${C.primaryBlue})`,
            padding:"7px 18px",borderRadius:20,fontFamily:"sans-serif",fontWeight:700,
            textDecoration:"none",letterSpacing:0.5 }}>
            ▶ Watch How
          </a>
        </div>

        {/* laptop design mockup */}
        <div style={{ position:"relative",zIndex:1,borderRadius:10,overflow:"hidden",
          boxShadow:"0 6px 24px rgba(0,62,155,0.12)",border:`1px solid ${C.border}` }}>
          <img src={IMG.laptop} alt="3D design tool"
            style={{ width:"100%",height:110,objectFit:"cover",objectPosition:"center top",display:"block" }} />
          <div style={{ padding:"8px 14px",background:C.primaryBlueLight }}>
            <p style={{ margin:0,fontSize:11,color:C.primaryBlue,fontWeight:700,fontFamily:"sans-serif" }}>
              Design Online in 3D
            </p>
            <p style={{ margin:"1px 0 0",fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>
              www.leocultsportswear.com
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — TOC + model photo */}
      <div style={{ position:"relative",flex:1,display:"flex",overflow:"hidden" }}>

        {/* model photo on far right */}
        <img src={IMG.teamKit} alt="team kit"
          style={{ position:"absolute",right:0,top:0,width:"42%",height:"100%",objectFit:"cover",objectPosition:"center" }} />
        <div style={{ position:"absolute",right:0,top:0,width:"42%",height:"100%",
          background:"linear-gradient(90deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 55%)" }} />

        {/* TOC list */}
        <div style={{ position:"relative",zIndex:2,padding:"22px 18px 14px",flex:1,overflowY:"auto" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
            <Logo size={24} />
            <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          </div>

          {TOC_DATA.map(sec => (
            <div key={sec.title} style={{ marginBottom:12 }}>
              <div style={{ display:"inline-block",background:sec.bg,color:C.white,
                fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:15,letterSpacing:2,
                padding:"3px 13px",borderRadius:3,marginBottom:5 }}>
                {sec.title}
              </div>
              {sec.items.map(([name,pages]) => (
                <div key={name} style={{ display:"flex",justifyContent:"space-between",
                  borderBottom:`1px dotted ${C.border}`,padding:"2px 2px",
                  fontSize:11,color:C.text,fontFamily:"sans-serif" }}>
                  <span>{name}</span>
                  <span style={{ color:C.primaryBlue,fontWeight:700,minWidth:34,textAlign:"right" }}>{pages}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ marginTop:8,paddingTop:6,borderTop:`1px solid ${C.border}` }}>
            {TOC_EXTRAS.map(([name,pages]) => (
              <div key={name} style={{ display:"flex",justifyContent:"space-between",
                borderBottom:`1px dotted ${C.border}`,padding:"2px 2px",
                fontSize:11,color:C.text,fontFamily:"sans-serif" }}>
                <span>{name}</span>
                <span style={{ color:C.primaryBlue,fontWeight:700 }}>{pages}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop:12,fontSize:9,color:C.muted,fontFamily:"sans-serif",textAlign:"center" }}>
            www.leocultsportswear.com — Explore More on Our Website
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — PRODUCT SPREAD (Playing Jersey)
// ══════════════════════════════════════════════════════════════════════════════
const FEATURES = [
  "Fully Sublimated","Name, number & logos",
  "6 Collar & neck options","Performance fabric choices","700+ design library",
];
const FABRIC = ["Moisture Wicking","UV Protection","Anti Odor","Anti Microbial"];
const VARIANTS = [
  { code:"LCP3362", label:"Front Collar",    img:IMG.polo1 },
  { code:"LCP3363", label:"Polo Collar",     img:IMG.polo2 },
  { code:"LCP3364", label:"Round Collar",    img:IMG.polo3 },
  { code:"LCP3365", label:"Mandarin Collar", img:IMG.polo4 },
  { code:"LCP3366", label:"Zip Up Collar",   img:IMG.polo5 },
  { code:"LCP3367", label:"RR Collar",       img:IMG.polo6 },
];

function ProductPage() {
  return (
    <div style={{ display:"flex",width:"100%",height:"100%",background:C.white }}>

      {/* ── LEFT page ───────────────────────────── */}
      <div style={{ position:"relative",flex:"0 0 50%",borderRight:`1px solid ${C.border}`,
        display:"flex",flexDirection:"column",overflow:"hidden",background:C.white }}>

        {/* top bar */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Cricket" />
        </div>

        <div style={{ display:"flex",flex:1,overflow:"hidden" }}>

          {/* main content */}
          <div style={{ flex:1,padding:"14px 18px",display:"flex",flexDirection:"column",
            gap:7,overflowY:"auto" }}>

            <div>
              <h2 style={{ fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:40,
                color:C.dark,margin:0,lineHeight:1 }}>Playing Jersey</h2>
              <p style={{ margin:"3px 0 0",fontSize:10,color:C.primaryBlue,
                fontWeight:700,letterSpacing:2,fontFamily:"sans-serif" }}>ON FIELD</p>
            </div>

            <div>
              <p style={{ fontSize:11,color:C.primaryBlue,fontWeight:700,
                margin:"0 0 4px",fontFamily:"sans-serif" }}>• FEATURES:</p>
              <ul style={{ margin:0,paddingLeft:14 }}>
                {FEATURES.map(f => (
                  <li key={f} style={{ fontSize:11,color:C.text,fontFamily:"sans-serif",lineHeight:1.6 }}>{f}</li>
                ))}
              </ul>
            </div>

            <p style={{ fontSize:11,color:C.text,margin:0,fontFamily:"sans-serif" }}>
              <strong>Inclusive Sizing (S – 4XL)</strong><br/>
              <span style={{ color:C.muted,fontSize:10 }}>(Mens, Womens, Youth)</span>
            </p>

            <p style={{ fontSize:11,color:C.dark,margin:0,fontFamily:"sans-serif" }}>
              <span style={{ color:C.primaryBlue,fontWeight:700 }}>• MINIMUM ORDER:</span> 15 per style
            </p>

            {/* jersey hero photo */}
            <div style={{ borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,
              flex:"1 1 120px",minHeight:120,display:"flex",alignItems:"stretch" }}>
              <img src={IMG.jersey1} alt="jersey"
                style={{ width:"100%",objectFit:"cover",objectPosition:"top center",display:"block" }} />
            </div>

            <p style={{ fontSize:10,color:C.muted,fontStyle:"italic",margin:0,
              fontFamily:"sans-serif",lineHeight:1.6 }}>
              Engineered for competitive cricket — T20, leagues, tournaments and professional play.
            </p>

            {/* swatches */}
            <div style={{ display:"flex",gap:10 }}>
              {[{label:"GameSkin 160\n160 GSM / 4.7oz",hex:C.dark},{label:"Jacquard Pro 160\n160 GSM / 4.60 oz",hex:C.primaryBlue}].map(s => (
                <div key={s.label} style={{ display:"flex",alignItems:"center",gap:7 }}>
                  <div style={{ width:32,height:32,borderRadius:6,background:s.hex,border:`1px solid ${C.border}`,flexShrink:0 }} />
                  <p style={{ fontSize:9,color:C.muted,margin:0,whiteSpace:"pre-line",lineHeight:1.4,
                    fontFamily:"sans-serif",maxWidth:78 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* fabric badges */}
            <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
              {FABRIC.map(f => (
                <span key={f} style={{ border:`1px solid ${C.border}`,borderRadius:4,
                  padding:"2px 7px",fontSize:9,color:C.text,fontFamily:"sans-serif" }}>✔ {f}</span>
              ))}
            </div>

            {/* unlimited color */}
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:18,height:18,borderRadius:"50%",flexShrink:0,
                background:"conic-gradient(red,orange,yellow,green,blue,violet,red)" }} />
              <span style={{ fontSize:11,color:C.dark,fontFamily:"sans-serif" }}>
                <span style={{ color:C.primaryBlue,fontWeight:700 }}>Unlimited</span> Color Options
              </span>
            </div>
          </div>

          {/* right thumb strip */}
          <div style={{ width:66,flexShrink:0,display:"flex",flexDirection:"column",
            gap:4,padding:"10px 5px" }}>
            {[IMG.jersey2,IMG.jersey3,IMG.jersey1].map((img,i) => (
              <div key={i} style={{ borderRadius:7,overflow:"hidden",
                border:`1px solid ${C.border}`,flex:1,minHeight:56 }}>
                <img src={img} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* page footer */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,
            padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>01</span>
        </div>
      </div>

      {/* ── RIGHT page ───────────────────────────── */}
      <div style={{ position:"relative",flex:1,display:"flex",flexDirection:"column",
        background:C.white,overflow:"hidden" }}>

        {/* top bar */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Cricket" />
        </div>

        {/* variant grid */}
        <div style={{ flex:1,padding:"12px 14px",display:"grid",
          gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"1fr 1fr",gap:10,overflow:"hidden" }}>
          {VARIANTS.map(v => (
            <div key={v.code} style={{ borderRadius:9,overflow:"hidden",
              border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",
              background:"#f8fafc" }}>
              <div style={{ flex:1,overflow:"hidden",minHeight:70 }}>
                <img src={v.img} alt={v.label}
                  style={{ width:"100%",height:"100%",objectFit:"cover",
                    objectPosition:"top center",display:"block",minHeight:70 }} />
              </div>
              <div style={{ padding:"5px 8px",borderTop:`1px solid ${C.border}`,background:C.white }}>
                <p style={{ margin:0,fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>{v.label}</p>
                <p style={{ margin:"1px 0 0",fontSize:9,color:C.primaryBlue,
                  fontWeight:700,fontFamily:"sans-serif" }}>{v.code}</p>
              </div>
            </div>
          ))}
        </div>

        {/* options bar */}
        <div style={{ padding:"8px 14px",borderTop:`1px solid ${C.border}`,
          display:"flex",gap:10,flexWrap:"wrap" }}>
          {["Single & Double Button Option","Plain Contrast Placket Color"].map(label => (
            <div key={label} style={{ background:C.primaryBlueLight,borderRadius:7,
              padding:"5px 11px",border:`1px solid ${C.border}` }}>
              <p style={{ margin:0,fontSize:9,color:C.primaryBlue,
                fontWeight:700,fontFamily:"sans-serif" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* model photo at bottom */}
        <div style={{ height:160,overflow:"hidden",position:"relative",flexShrink:0 }}>
          <img src={IMG.coverPlayer} alt="model"
            style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top" }} />
          <div style={{ position:"absolute",inset:0,
            background:"linear-gradient(0deg,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 45%)" }} />
        </div>

        {/* page footer */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
          padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,
            padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>02</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — SPORTS OVERVIEW (All Sports)
// ══════════════════════════════════════════════════════════════════════════════
const ALL_SPORTS = [
  { name:"Cricket", img:IMG.coverHero, desc:"Professional cricket kits with premium fabrics and fully sublimated designs.", badge:"#003E9B" },
  { name:"Football", img:IMG.football, desc:"Match-ready football jerseys, shorts, and training gear for clubs and academies.", badge:"#0EA5E9" },
  { name:"Basketball", img:IMG.basketball, desc:"High-performance basketball singlets and shorts with moisture-wicking technology.", badge:"#E8960A" },
  { name:"Rugby", img:IMG.rugby, desc:"Durable rugby jerseys designed for intense matches and training sessions.", badge:"#1E3A8A" },
  { name:"Field Hockey", img:IMG.hockey, desc:"Lightweight hockey shirts and skorts for peak performance on the field.", badge:"#003E9B" },
  { name:"Tennis", img:IMG.tennis, desc:"Elegant tennis polos, skirts, and performance wear for players of all levels.", badge:"#F5B800" },
  { name:"Athletics", img:IMG.athletics, desc:"Track & field singlets, vests, and running gear for competitions and training.", badge:"#0EA5E9" },
  { name:"Netball", img:IMG.netball, desc:"Netball dresses, bibs, and training wear with bold designs and breathable fabrics.", badge:"#E8960A" },
  { name:"Volleyball", img:IMG.volleyball, desc:"Volleyball jerseys, shorts, and accessories for indoor and beach play.", badge:"#1E3A8A" },
];

function SportsOverviewPage() {
  return (
    <div style={{ display:"flex",width:"100%",height:"100%",background:C.white,overflow:"auto" }}>
      
      {/* LEFT page — intro + featured */}
      <div style={{ flex:"0 0 50%",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        {/* header */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Multi-Sport" />
        </div>

        {/* content */}
        <div style={{ padding:"18px",flex:1 }}>
          <h2 style={{ fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:44,margin:0,color:C.dark,lineHeight:1 }}>
            All Sports
          </h2>
          <p style={{ margin:"4px 0 8px",fontSize:10,color:C.primaryBlue,fontWeight:700,letterSpacing:2,fontFamily:"sans-serif" }}>
            ONE BRAND · EVERY GAME
          </p>
          <BlueBar h={3} w={80} />
          
          <p style={{ fontSize:12,color:C.text,marginTop:16,lineHeight:1.6,fontFamily:"sans-serif" }}>
            From cricket to basketball, rugby to tennis — Leo Cult delivers premium custom sportswear for over 20 sports. 
            All our kits feature fully sublimated designs, unlimited color options, and performance fabrics engineered for athletes.
          </p>

          {/* stats */}
          <div style={{ display:"flex",gap:24,marginTop:20,flexWrap:"wrap" }}>
            <div><span style={{ display:"block",fontSize:28,fontWeight:800,color:C.primaryBlue,fontFamily:"'Bebas Neue',sans-serif" }}>20+</span><span style={{ fontSize:10,color:C.muted }}>Sports Covered</span></div>
            <div><span style={{ display:"block",fontSize:28,fontWeight:800,color:C.primaryBlue,fontFamily:"'Bebas Neue',sans-serif" }}>700+</span><span style={{ fontSize:10,color:C.muted }}>Design Templates</span></div>
            <div><span style={{ display:"block",fontSize:28,fontWeight:800,color:C.primaryBlue,fontFamily:"'Bebas Neue',sans-serif" }}>15</span><span style={{ fontSize:10,color:C.muted }}>Minimum Order</span></div>
          </div>

          {/* feature highlight */}
          <div style={{ marginTop:20,background:C.primaryBlueLight,padding:"12px",borderRadius:8,border:`1px solid ${C.border}` }}>
            <p style={{ margin:0,fontSize:11,fontWeight:700,color:C.primaryBlue,fontFamily:"sans-serif" }}>✨ Custom for Any Sport</p>
            <p style={{ margin:"4px 0 0",fontSize:10,color:C.muted,fontFamily:"sans-serif" }}>Mix and match designs, colors, logos, and fabrics across your entire club — cricket whites, basketball singlets, football kits, and more.</p>
          </div>
        </div>

        {/* footer */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>03</span>
        </div>
      </div>

      {/* RIGHT page — sports grid */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="All Sports" />
        </div>

        <div style={{ flex:1,padding:"12px",overflowY:"auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
          {ALL_SPORTS.map((sport, idx) => (
            <div key={sport.name} style={{ borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,background:"#f8fafc" }}>
              <div style={{ height:90,overflow:"hidden",position:"relative" }}>
                <img src={sport.img} alt={sport.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                <div style={{ position:"absolute",bottom:0,left:0,right:0,background:`linear-gradient(0deg,${sport.badge}cc 0%,transparent 100%)`,padding:"4px 6px" }}>
                  <span style={{ color:C.white,fontSize:10,fontWeight:700,fontFamily:"sans-serif" }}>{sport.name}</span>
                </div>
              </div>
              <div style={{ padding:"6px 8px" }}>
                <p style={{ fontSize:9,color:C.muted,margin:0,lineHeight:1.4,fontFamily:"sans-serif" }}>{sport.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>04</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 5 — CUSTOMIZATION & SERVICES
// ══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  { title:"3D Design Tool", desc:"Visualize your kit in real-time with our online 3D designer. Change colors, add logos, and see every detail before ordering.", icon:"🎨" },
  { title:"Custom Logos & Graphics", desc:"Upload your club logo, sponsor badges, or custom artwork. We'll integrate them perfectly into your design.", icon:"🏷️" },
  { title:"Endless Color Options", desc:"No restrictions — use any Pantone color or match your existing brand palette exactly.", icon:"🎨" },
  { title:"Multiple Fabric Choices", desc:"Choose from performance mesh, polyester, eco-friendly fabrics, and premium cotton blends.", icon:"🧵" },
  { title:"Team Bundles & Packages", desc:"Complete team kits with matching jerseys, shorts, socks, and accessories at discounted prices.", icon:"📦" },
  { title:"Fast Turnaround", desc:"Express production and shipping available for urgent team needs and tournament deadlines.", icon:"⚡" },
];

function CustomizationPage() {
  return (
    <div style={{ display:"flex",width:"100%",height:"100%",background:C.white,overflow:"auto" }}>
      
      {/* LEFT page */}
      <div style={{ flex:"0 0 50%",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Customize" />
        </div>

        <div style={{ padding:"18px",flex:1 }}>
          <h2 style={{ fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:44,margin:0,color:C.dark,lineHeight:1 }}>
            Make It Yours
          </h2>
          <p style={{ margin:"4px 0 8px",fontSize:10,color:C.primaryBlue,fontWeight:700,letterSpacing:2,fontFamily:"sans-serif" }}>
            FULLY CUSTOM · FULLY SUBLIMATED
          </p>
          <BlueBar h={3} w={80} />
          
          <p style={{ fontSize:12,color:C.text,marginTop:16,lineHeight:1.6,fontFamily:"sans-serif" }}>
            Every Leo Cult kit is built from scratch to your exact specifications. 
            No minimum color limits, no pre-set templates — just your vision, brought to life.
          </p>

          {/* process steps */}
          <div style={{ marginTop:20 }}>
            <p style={{ fontSize:11,fontWeight:700,color:C.primaryBlue,fontFamily:"sans-serif",marginBottom:8 }}>⚙️ How It Works:</p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["1. Share your ideas & requirements","2. Get a free design mockup","3. Approve digital proof","4. Production (15-21 days)","5. Delivery to your doorstep"].map(step => (
                <div key={step} style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:20,height:20,borderRadius:"50%",background:C.primaryBlue,color:C.white,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontFamily:"sans-serif" }}>✓</div>
                  <span style={{ fontSize:11,color:C.text,fontFamily:"sans-serif" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* cta */}
          <div style={{ marginTop:20,background:`linear-gradient(135deg,${C.gradStart}10,${C.primaryBlue}10)`,padding:"12px",borderRadius:8,border:`1px solid ${C.border}` }}>
            <p style={{ margin:0,fontSize:11,fontWeight:700,color:C.primaryBlue,fontFamily:"sans-serif" }}>📞 Need help designing?</p>
            <p style={{ margin:"4px 0 0",fontSize:10,color:C.muted,fontFamily:"sans-serif" }}>Our design team offers free consultations and mockups — contact us to get started.</p>
          </div>
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>05</span>
        </div>
      </div>

      {/* RIGHT page — services grid */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Services" />
        </div>

        <div style={{ flex:1,padding:"14px",overflowY:"auto",display:"flex",flexDirection:"column",gap:12 }}>
          {SERVICES.map((service, idx) => (
            <div key={service.title} style={{ display:"flex",gap:10,alignItems:"flex-start",padding:"8px",background:"#f8fafc",borderRadius:8,border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:24 }}>{service.icon}</span>
              <div>
                <p style={{ margin:0,fontSize:12,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>{service.title}</p>
                <p style={{ margin:"2px 0 0",fontSize:10,color:C.muted,fontFamily:"sans-serif",lineHeight:1.4 }}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>06</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 6 — CONTACT & ORDER INFO
// ══════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  return (
    <div style={{ display:"flex",width:"100%",height:"100%",background:C.white,overflow:"auto" }}>
      
      {/* LEFT page — contact info */}
      <div style={{ flex:"0 0 50%",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Contact" />
        </div>

        <div style={{ padding:"18px",flex:1 }}>
          <h2 style={{ fontFamily:"'Bebas Neue','Impact',sans-serif",fontSize:44,margin:0,color:C.dark,lineHeight:1 }}>
            Get In Touch
          </h2>
          <p style={{ margin:"4px 0 8px",fontSize:10,color:C.primaryBlue,fontWeight:700,letterSpacing:2,fontFamily:"sans-serif" }}>
            START YOUR ORDER TODAY
          </p>
          <BlueBar h={3} w={80} />
          
          <div style={{ marginTop:20,display:"flex",flexDirection:"column",gap:16 }}>
            <div><p style={{ margin:0,fontSize:11,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>📧 Email</p><p style={{ margin:"2px 0 0",fontSize:12,color:C.primaryBlue,fontFamily:"sans-serif" }}>sales@leocultsportswear.com</p></div>
            <div><p style={{ margin:0,fontSize:11,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>📞 Phone / WhatsApp</p><p style={{ margin:"2px 0 0",fontSize:12,color:C.primaryBlue,fontFamily:"sans-serif" }}>+91 98765 43210</p></div>
            <div><p style={{ margin:0,fontSize:11,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>🌐 Website</p><p style={{ margin:"2px 0 0",fontSize:12,color:C.primaryBlue,fontFamily:"sans-serif" }}>www.leocultsportswear.com</p></div>
            <div><p style={{ margin:0,fontSize:11,fontWeight:700,color:C.dark,fontFamily:"sans-serif" }}>📍 Office</p><p style={{ margin:"2px 0 0",fontSize:11,color:C.muted,fontFamily:"sans-serif" }}>Mumbai, India — Serving teams worldwide</p></div>
          </div>

          <div style={{ marginTop:20,background:C.primaryBlueLight,padding:"12px",borderRadius:8 }}>
            <p style={{ margin:0,fontSize:11,fontWeight:700,color:C.primaryBlue,fontFamily:"sans-serif" }}>📋 Order Requirements:</p>
            <ul style={{ margin:"6px 0 0",paddingLeft:18,fontSize:10,color:C.muted,fontFamily:"sans-serif" }}>
              <li>Team name & quantity</li>
              <li>Sport & kit type</li>
              <li>Design preferences or logo files</li>
              <li>Preferred colors & sizes</li>
            </ul>
          </div>
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>07</span>
        </div>
      </div>

      {/* RIGHT page — order form summary / social */}
      <div style={{ flex:1,display:"flex",flexDirection:"column",overflow:"auto" }}>
        
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 18px",borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
          <CricketBadge label="Connect" />
        </div>

        <div style={{ flex:1,padding:"18px",overflowY:"auto" }}>
          <p style={{ fontSize:12,fontWeight:700,color:C.dark,fontFamily:"sans-serif",marginBottom:12 }}>📱 Follow Us</p>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {["Instagram", "Facebook", "Twitter/X", "LinkedIn"].map(platform => (
              <div key={platform} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"#f8fafc",borderRadius:6,border:`1px solid ${C.border}` }}>
                <span style={{ fontSize:11,fontWeight:600,color:C.dark,fontFamily:"sans-serif" }}>{platform}</span>
                <span style={{ fontSize:10,color:C.primaryBlue,fontFamily:"sans-serif" }}>@leocult_sportswear</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop:20 }}>
            <p style={{ fontSize:12,fontWeight:700,color:C.dark,fontFamily:"sans-serif",marginBottom:8 }}>⏰ Business Hours</p>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,fontFamily:"sans-serif",padding:"6px 0",borderBottom:`1px dotted ${C.border}` }}>
              <span>Monday - Friday</span><span>9:00 AM - 7:00 PM IST</span>
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:C.muted,fontFamily:"sans-serif",padding:"6px 0" }}>
              <span>Saturday</span><span>10:00 AM - 4:00 PM IST</span>
            </div>
          </div>

          <div style={{ marginTop:20,background:`linear-gradient(135deg,${C.gradStart},${C.primaryBlue})`,padding:"14px",borderRadius:8,color:C.white,textAlign:"center" }}>
            <p style={{ margin:0,fontSize:12,fontWeight:700,fontFamily:"sans-serif" }}>📞 Request a Quote</p>
            <p style={{ margin:"4px 0 0",fontSize:10,opacity:0.9,fontFamily:"sans-serif" }}>Send us your requirements — free design mockup included</p>
          </div>
        </div>

        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 18px",borderTop:`2px solid ${C.primaryBlue}` }}>
          <span style={{ fontSize:9,color:C.muted,fontFamily:"sans-serif" }}>www.leocultsportswear.com</span>
          <span style={{ background:C.primaryBlue,color:C.white,fontSize:10,padding:"2px 10px",borderRadius:3,fontFamily:"sans-serif" }}>08</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGES REGISTRY
// ══════════════════════════════════════════════════════════════════════════════
const PAGES = [
  { label:"Cover",    node:<CoverPage /> },
  { label:"Contents", node:<TocPage /> },
  { label:"Jersey",   node:<ProductPage /> },
  { label:"All Sports", node:<SportsOverviewPage /> },
  { label:"Services", node:<CustomizationPage /> },
  { label:"Contact",  node:<ContactPage /> },
];

// ══════════════════════════════════════════════════════════════════════════════
// MAIN SHELL
// ══════════════════════════════════════════════════════════════════════════════
export default function LeoCultCatalog() {
  const [page, setPage] = useState(0);
  const total = PAGES.length;

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") setPage(p => Math.min(total - 1, p + 1));
      if (e.key === "ArrowLeft")  setPage(p => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [total]);

  return (
    <div style={{ minHeight:"100vh", background:"var(--background, #020617)",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"28px 12px", boxSizing:"border-box" }}>

      {/* catalog viewer */}
      <div style={{ width:"100%", maxWidth:940, aspectRatio:"16/10",
        background:C.white, borderRadius:8, overflow:"hidden", position:"relative",
        boxShadow:"0 0 0 1px rgba(0,62,155,0.12), 0 28px 80px rgba(0,0,0,0.55)" }}>
        {PAGES[page].node}

        {/* overlay arrows */}
        {page > 0 && (
          <button onClick={() => setPage(p => p - 1)} aria-label="Previous page"
            style={{ position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",
              background:"rgba(0,62,155,0.88)",border:"none",color:C.white,
              width:36,height:60,cursor:"pointer",fontSize:22,borderRadius:"0 6px 6px 0",
              display:"flex",alignItems:"center",justifyContent:"center",zIndex:20 }}>‹</button>
        )}
        {page < total - 1 && (
          <button onClick={() => setPage(p => p + 1)} aria-label="Next page"
            style={{ position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",
              background:"rgba(0,62,155,0.88)",border:"none",color:C.white,
              width:36,height:60,cursor:"pointer",fontSize:22,borderRadius:"6px 0 0 6px",
              display:"flex",alignItems:"center",justifyContent:"center",zIndex:20 }}>›</button>
        )}
      </div>

      {/* bottom nav */}
      <div style={{ marginTop:14,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
        {PAGES.map((p,i) => (
          <button key={i} onClick={() => setPage(i)}
            style={{ background: i === page
                ? `linear-gradient(135deg,${C.gradStart},${C.primaryBlue})`
                : "rgba(255,255,255,0.07)",
              color: i === page ? C.white : "#94a3b8",
              border: i === page ? "none" : "1px solid rgba(255,255,255,0.12)",
              borderRadius:7,padding:"7px 18px",fontSize:12,
              fontFamily:"'Bebas Neue','Impact',sans-serif",letterSpacing:1,
              cursor:"pointer",transition:"all 0.2s" }}>
            {p.label}
          </button>
        ))}
        <span style={{ fontSize:11,color:"#64748b",fontFamily:"sans-serif" }}>{page+1} / {total}</span>
      </div>

      <p style={{ marginTop:8,fontSize:10,color:"#475569",fontFamily:"sans-serif" }}>
        Use ← → arrow keys or click the arrows to navigate
      </p>
    </div>
  );
}