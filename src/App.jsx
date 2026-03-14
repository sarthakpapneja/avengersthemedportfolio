import { useState, useEffect } from "react";

const S = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;600;700;900&family=Exo+2:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Exo 2',sans-serif;background:#060a12;color:#c8d8e8;overflow-x:hidden;}

:root{
  --void:#060a12;
  --deep:#0a0f1e;
  --panel:#0d1528;
  --blue:#00c8ff;
  --blue2:#0088cc;
  --gold:#f0b429;
  --red:#e63946;
  --green:#00ff9d;
  --border:rgba(0,200,255,0.22);
  --border2:rgba(240,180,41,0.3);
  --glow:0 0 20px rgba(0,200,255,0.35);
  --glow2:0 0 20px rgba(240,180,41,0.4);
  --text:#c8d8e8;
  --muted:#6a8aaa;
}

/* HEX GRID BG */
.wrap{
  min-height:100vh;
  background:#060a12;
  position:relative;
}
.wrap::before{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,100,200,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(200,50,50,0.06) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpolygon points='30,2 58,17 58,47 30,62 2,47 2,17' fill='none' stroke='rgba(0,180,255,0.045)' stroke-width='1'/%3E%3C/svg%3E");
  background-size:auto,auto,60px 52px;
}

/* SCANLINE */
.wrap::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px);
  animation:scanmove 8s linear infinite;
}
@keyframes scanmove{0%{background-position:0 0;}100%{background-position:0 100px;}}

/* NAV */
.nav{
  position:sticky;top:0;z-index:300;
  background:rgba(6,10,18,0.96);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  padding:0 48px;height:64px;
  display:flex;align-items:center;justify-content:space-between;
}
.nav::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,var(--blue),var(--gold),var(--blue),transparent);
  animation:navglow 3s ease-in-out infinite alternate;
}
@keyframes navglow{0%{opacity:0.4;}100%{opacity:1;}}

.nav-logo{
  font-family:'Orbitron',monospace;font-size:1.1rem;font-weight:900;
  color:var(--blue);text-decoration:none;letter-spacing:0.15em;
  text-shadow:0 0 20px rgba(0,200,255,0.7);
  display:flex;align-items:center;gap:10px;
}
.logo-arc{
  width:28px;height:28px;position:relative;flex-shrink:0;
}
.logo-arc svg{animation:arcpulse 2s ease-in-out infinite;}
@keyframes arcpulse{0%,100%{filter:drop-shadow(0 0 4px #00c8ff);}50%{filter:drop-shadow(0 0 12px #00c8ff) drop-shadow(0 0 24px #00c8ff);}}

.nav-ul{display:flex;gap:6px;list-style:none;align-items:center;}
.nav-ul a{
  font-family:'Rajdhani',sans-serif;font-size:0.78rem;
  color:var(--muted);text-decoration:none;
  letter-spacing:0.14em;text-transform:uppercase;
  padding:6px 12px;border:1px solid transparent;border-radius:3px;
  transition:all 0.2s;
}
.nav-ul a:hover{color:var(--blue);border-color:var(--border);background:rgba(0,200,255,0.06);}
.nav-res{
  color:var(--gold)!important;
  border:1px solid var(--border2)!important;
  background:rgba(240,180,41,0.07)!important;
}
.nav-res:hover{background:rgba(240,180,41,0.18)!important;box-shadow:var(--glow2)!important;}

/* MAIN */
.main{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:70px 24px 100px;display:flex;flex-direction:column;gap:70px;}

/* SECTION HEADER */
.sh{display:flex;align-items:center;gap:16px;margin-bottom:36px;}
.sh-num{font-family:'Orbitron',monospace;font-size:0.65rem;color:var(--gold);letter-spacing:0.2em;opacity:0.7;}
.sh-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border),transparent);}
.sh-title{font-family:'Orbitron',monospace;font-size:1.45rem;font-weight:700;color:var(--blue);letter-spacing:0.08em;text-shadow:var(--glow);}
.sh-tag{font-family:'Rajdhani',sans-serif;font-size:0.68rem;color:var(--muted);letter-spacing:0.18em;text-transform:uppercase;border:1px solid var(--border);padding:3px 10px;border-radius:2px;}

/* HUD PANEL */
.panel{
  background:linear-gradient(135deg,rgba(13,21,40,0.95),rgba(8,14,28,0.98));
  border:1px solid var(--border);
  border-radius:4px;
  padding:48px 54px;
  position:relative;
  overflow:hidden;
  animation:fadein 0.7s ease both;
}
.panel::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--blue),transparent);
  opacity:0.6;
}
@keyframes fadein{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
.p1{animation-delay:0.1s;}
.p2{animation-delay:0.2s;}
.p3{animation-delay:0.3s;}
.p4{animation-delay:0.4s;}
.p5{animation-delay:0.5s;}

/* CORNER BRACKETS */
.panel::after{
  content:'';position:absolute;bottom:0;right:0;
  width:40px;height:40px;
  border-bottom:2px solid var(--gold);
  border-right:2px solid var(--gold);
  opacity:0.5;
}
.brkt-tl{position:absolute;top:0;left:0;width:40px;height:40px;border-top:2px solid var(--gold);border-left:2px solid var(--gold);opacity:0.5;}

/* ===== HERO ===== */
.hero-status{display:flex;align-items:center;gap:10px;margin-bottom:22px;}
.status-dot{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 10px var(--green);animation:blink 1.4s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
.status-txt{font-family:'Rajdhani',sans-serif;font-size:0.7rem;color:var(--green);letter-spacing:0.2em;text-transform:uppercase;}

.hero-eyebrow{font-family:'Rajdhani',sans-serif;font-size:0.8rem;color:var(--gold);letter-spacing:0.22em;text-transform:uppercase;margin-bottom:10px;}
.hero-name{font-family:'Orbitron',monospace;font-size:clamp(2.8rem,6vw,5rem);font-weight:900;color:#ffffff;line-height:0.95;margin-bottom:16px;text-shadow:0 0 40px rgba(0,200,255,0.3);}
.hero-name span{color:var(--blue);text-shadow:0 0 30px rgba(0,200,255,0.8);}
.hero-role{font-family:'Rajdhani',sans-serif;font-size:clamp(1.2rem,2.5vw,1.6rem);font-weight:600;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:18px;}
.hero-bio{font-size:0.95rem;color:var(--muted);line-height:1.82;max-width:560px;margin-bottom:32px;}

.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;margin-top:10px;}
.hero-left{}
.hero-arc{display:flex;justify-content:center;align-items:center;}
.arc-reactor{width:180px;height:180px;position:relative;}
.arc-reactor svg{width:100%;height:100%;animation:reactorspin 12s linear infinite;}
@keyframes reactorspin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
.arc-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#ffffff,#00c8ff,#0044aa);box-shadow:0 0 30px #00c8ff,0 0 60px rgba(0,200,255,0.5),0 0 100px rgba(0,200,255,0.2);animation:corepulse 2s ease-in-out infinite;}
@keyframes corepulse{0%,100%{box-shadow:0 0 20px #00c8ff,0 0 40px rgba(0,200,255,0.5);}50%{box-shadow:0 0 40px #00c8ff,0 0 80px rgba(0,200,255,0.7),0 0 120px rgba(0,200,255,0.3);}}

.ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:36px;}
.btn{display:inline-flex;align-items:center;gap:8px;padding:11px 26px;border-radius:3px;font-family:'Rajdhani',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;transition:all 0.22s;cursor:pointer;border:none;}
.btn-blue{background:rgba(0,200,255,0.12);color:var(--blue);border:1px solid rgba(0,200,255,0.5);}
.btn-blue:hover{background:rgba(0,200,255,0.22);box-shadow:var(--glow);}
.btn-gold{background:rgba(240,180,41,0.1);color:var(--gold);border:1px solid rgba(240,180,41,0.45);}
.btn-gold:hover{background:rgba(240,180,41,0.2);box-shadow:var(--glow2);}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:3px;overflow:hidden;}
.stat{background:var(--panel);padding:14px 10px;text-align:center;}
.stat-l{font-family:'Orbitron',monospace;font-size:0.52rem;color:var(--gold);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:6px;opacity:0.8;}
.stat-v{font-family:'Rajdhani',sans-serif;font-size:0.92rem;font-weight:600;color:#fff;}

/* ABOUT */
.abt-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;}
.abt p{font-size:0.92rem;line-height:1.86;color:var(--text);margin-bottom:14px;}
.abt strong{color:var(--blue);}
.dossier{border:1px solid var(--border);border-radius:3px;overflow:hidden;}
.doss-h{background:rgba(0,200,255,0.08);border-bottom:1px solid var(--border);padding:10px 16px;font-family:'Orbitron',monospace;font-size:0.6rem;color:var(--blue);letter-spacing:0.18em;text-transform:uppercase;}
.doss-row{display:flex;border-bottom:1px solid rgba(0,200,255,0.08);padding:10px 16px;gap:12px;}
.doss-row:last-child{border-bottom:none;}
.doss-k{font-family:'Rajdhani',sans-serif;font-size:0.7rem;color:var(--gold);letter-spacing:0.12em;text-transform:uppercase;min-width:110px;flex-shrink:0;}
.doss-v{font-size:0.82rem;color:var(--text);}

/* PROJECTS */
.proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.proj{
  background:rgba(13,21,40,0.8);
  border:1px solid var(--border);
  border-radius:3px;padding:20px;
  position:relative;overflow:hidden;
  transition:all 0.24s;display:flex;flex-direction:column;gap:9px;
}
.proj::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),transparent);opacity:0;}
.proj:hover{border-color:rgba(0,200,255,0.5);box-shadow:0 0 24px rgba(0,200,255,0.12);transform:translateY(-3px);}
.proj:hover::before{opacity:1;}
.proj-num{font-family:'Orbitron',monospace;font-size:0.52rem;color:var(--gold);letter-spacing:0.15em;opacity:0.6;}
.proj-cat{font-size:0.58rem;color:var(--blue);letter-spacing:0.12em;text-transform:uppercase;border:1px solid var(--border);border-radius:2px;padding:2px 7px;width:fit-content;}
.proj-title{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;color:#fff;letter-spacing:0.04em;}
.proj-desc{font-size:0.76rem;color:var(--muted);line-height:1.72;flex:1;}
.tech{display:flex;flex-wrap:wrap;gap:4px;}
.tech span{font-size:0.59rem;color:var(--blue);background:rgba(0,200,255,0.07);border:1px solid rgba(0,200,255,0.2);border-radius:2px;padding:2px 6px;}
.plinks{display:flex;gap:12px;margin-top:4px;}
.plink{font-family:'Rajdhani',sans-serif;font-size:0.7rem;font-weight:600;color:var(--gold);text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;transition:color 0.2s;}
.plink:hover{color:#fff;text-shadow:var(--glow2);}

/* SKILLS */
.sk-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.sk-cat{background:rgba(13,21,40,0.8);border:1px solid var(--border);border-radius:3px;padding:20px;}
.sk-cat-h{font-family:'Orbitron',monospace;font-size:0.6rem;color:var(--gold);letter-spacing:0.16em;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.sk-cat-h::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--border2),transparent);}
.sk-tags{display:flex;flex-wrap:wrap;gap:6px;}
.sk-tag{font-family:'Rajdhani',sans-serif;font-size:0.72rem;color:var(--text);background:rgba(0,200,255,0.06);border:1px solid rgba(0,200,255,0.18);border-radius:2px;padding:4px 10px;transition:all 0.18s;}
.sk-tag:hover{background:rgba(0,200,255,0.14);border-color:rgba(0,200,255,0.45);color:#fff;}

/* EXP */
.exp-tl{display:flex;flex-direction:column;gap:0;}
.tl-item{padding:22px 0 22px 32px;border-left:2px solid rgba(0,200,255,0.2);position:relative;}
.tl-item::before{
  content:'';position:absolute;left:-7px;top:27px;
  width:12px;height:12px;border-radius:50%;
  background:var(--blue);box-shadow:0 0 12px var(--blue);
}
.exp-role{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;letter-spacing:0.05em;}
.exp-co{color:var(--gold);}
.exp-per{display:inline-block;font-family:'Orbitron',monospace;font-size:0.58rem;color:var(--blue);letter-spacing:0.12em;margin:5px 0 10px;background:rgba(0,200,255,0.07);border:1px solid var(--border);padding:3px 10px;border-radius:2px;}
.exp-ul{list-style:none;}
.exp-ul li{font-size:0.8rem;color:var(--muted);line-height:1.72;padding-left:18px;position:relative;margin-bottom:4px;}
.exp-ul li::before{content:'▶️';position:absolute;left:0;color:var(--blue);font-size:0.52rem;top:5px;}

/* RESEARCH */
.rp{background:rgba(230,57,70,0.05);border:1px solid rgba(230,57,70,0.22);border-radius:3px;padding:28px;position:relative;}
.rp::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--red),transparent);}
.rp-badge{display:inline-block;font-family:'Orbitron',monospace;font-size:0.55rem;color:var(--red);border:1px solid rgba(230,57,70,0.4);border-radius:2px;padding:3px 10px;letter-spacing:0.15em;margin-bottom:14px;}
.rp-title{font-family:'Rajdhani',sans-serif;font-size:1.08rem;font-weight:700;color:#fff;line-height:1.44;margin-bottom:10px;}
.rp-authors{font-size:0.78rem;color:var(--gold);margin-bottom:10px;}
.rp-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;}
.rp-meta span{font-family:'Orbitron',monospace;font-size:0.56rem;color:var(--muted);background:rgba(0,200,255,0.05);border:1px solid var(--border);border-radius:2px;padding:3px 9px;}
.rp-abs{font-size:0.8rem;color:var(--text);line-height:1.82;border-left:3px solid var(--red);padding-left:14px;margin-bottom:14px;font-style:italic;}
.rp-kws{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;}
.rp-kw{font-size:0.6rem;color:var(--red);border:1px solid rgba(230,57,70,0.3);border-radius:2px;padding:3px 8px;font-family:'Rajdhani',sans-serif;font-weight:600;letter-spacing:0.06em;}

/* CONTACT */
.contact-cols{display:grid;grid-template-columns:1fr 1fr;gap:50px;}
.contact-intro{font-size:0.9rem;color:var(--muted);line-height:1.8;margin-bottom:30px;font-style:italic;}
.cf{display:flex;flex-direction:column;gap:13px;}
.fi{font-family:'Exo 2',sans-serif;font-size:0.85rem;background:rgba(0,200,255,0.04);border:1px solid var(--border);border-radius:3px;padding:11px 15px;color:var(--text);outline:none;transition:all 0.2s;width:100%;}
.fi:focus{border-color:var(--blue);box-shadow:0 0 12px rgba(0,200,255,0.15);}
.fta{font-family:'Exo 2',sans-serif;font-size:0.85rem;background:rgba(0,200,255,0.04);border:1px solid var(--border);border-radius:3px;padding:11px 15px;color:var(--text);outline:none;transition:all 0.2s;width:100%;resize:vertical;min-height:110px;}
.fta:focus{border-color:var(--blue);box-shadow:0 0 12px rgba(0,200,255,0.15);}
.fsub{font-family:'Rajdhani',sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;background:rgba(0,200,255,0.12);color:var(--blue);border:1px solid rgba(0,200,255,0.5);border-radius:3px;padding:11px 28px;cursor:pointer;transition:all 0.22s;align-self:flex-start;}
.fsub:hover{background:rgba(0,200,255,0.22);box-shadow:var(--glow);}
.fsub:disabled{opacity:0.5;cursor:not-allowed;}
.fst-ok{font-size:0.8rem;color:var(--green);font-family:'Rajdhani',sans-serif;letter-spacing:0.08em;}
.fst-err{font-size:0.8rem;color:var(--red);font-family:'Rajdhani',sans-serif;}
.cl{display:flex;flex-direction:column;gap:0;}
.cla{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--text);font-size:0.84rem;padding:13px 0;border-bottom:1px solid rgba(0,200,255,0.08);transition:all 0.2s;}
.cla:last-child{border-bottom:none;}
.cla:hover{color:var(--blue);padding-left:4px;}
.cla-icon{width:32px;height:32px;background:rgba(0,200,255,0.07);border:1px solid var(--border);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:0.72rem;color:var(--blue);flex-shrink:0;font-family:'Orbitron',monospace;font-weight:700;}

/* FOOTER */
.foot{text-align:center;padding:38px 20px;position:relative;z-index:1;}
.foot-line{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin-bottom:24px;}
.foot p{font-family:'Rajdhani',sans-serif;font-size:0.72rem;color:var(--muted);letter-spacing:0.14em;text-transform:uppercase;}
.foot span{color:var(--blue);}

@media(max-width:820px){
  .nav{padding:0 20px;}
  .nav-ul li:not(:last-child):not(:nth-last-child(2)){display:none;}
  .panel{padding:36px 24px;}
  .hero-grid{grid-template-columns:1fr;}
  .hero-arc{display:none;}
  .proj-grid{grid-template-columns:1fr;}
  .abt-grid{grid-template-columns:1fr;}
  .sk-grid{grid-template-columns:1fr;}
  .stats{grid-template-columns:repeat(2,1fr);}
  .contact-cols{grid-template-columns:1fr;}
}
`;

const PROJECTS = [
    { n: "01", title: "Gastro-XAI", cat: "AI / Medical Imaging", desc: "Explainable AI system for gastrointestinal disease classification and polyp segmentation with Grad-CAM visualizations and automated report generation.", tech: ["Python", "PyTorch", "Flask", "React", "Grad-CAM"], gh: "https://github.com/sarthakpapneja/Gastro-XAI", live: null },
    { n: "02", title: "ModelAuditAI", cat: "AI / ML Auditing", desc: "Production-grade ML audit system evaluating models for Performance, Fairness, Drift, Overfitting, and Leakage. Comprehensive model health reports.", tech: ["TypeScript", "React", "Python", "FastAPI", "AI/ML"], gh: "https://github.com/sarthakpapneja/ML-Auditor", live: null },
    { n: "03", title: "Resume Analyzer", cat: "AI / NLP", desc: "Intelligent resume parsing tool providing actionable insights, skill gap analysis, and ATS compatibility scoring for job seekers.", tech: ["TypeScript", "React", "Python", "NLP"], gh: "https://github.com/sarthakpapneja/resume-analyzer", live: null },
    { n: "04", title: "Finance Track", cat: "Full-Stack / FinTech", desc: "MERN stack finance tracker with transaction management, balance calculation, data visualization, and a responsive dashboard interface.", tech: ["JavaScript", "React", "Node.js", "MongoDB", "Express"], gh: "https://github.com/sarthakpapneja/Finance-Track", live: null },
    { n: "05", title: "Regulatory Reporting Assistant", cat: "AI / FinTech", desc: "AI-powered assistant for regulatory compliance and financial reporting, streamlining complex reporting workflows with intelligent automation.", tech: ["Python", "Flask", "AI/ML"], gh: "https://github.com/sarthakpapneja/Regulatory-Reporting-Assistant", live: null },
    { n: "06", title: "RoadVision VMS", cat: "Computer Vision", desc: "Vehicle Management System leveraging computer vision for road monitoring, traffic analysis, and automated vehicle tracking.", tech: ["Python", "Computer Vision", "Deep Learning"], gh: "https://github.com/sarthakpapneja/RoadVision-VMS", live: null },
    { n: "07", title: "School Website", cat: "Web Development", desc: "Full-featured school website with dynamic content, event management, video integration, and a modern responsive design.", tech: ["JavaScript", "React", "Vite", "CSS"], gh: "https://github.com/sarthakpapneja/school-website-", live: "https://school-website-murex-seven.vercel.app/" },
    { n: "08", title: "Bank Security System", cat: "Database Systems", desc: "Comprehensive bank management application ensuring data segregation and integrity with Role-Based Access Control (RBAC).", tech: ["Python", "MySQL", "RBAC"], gh: "https://github.com/sarthakpapneja/banksecuritysystem", live: null },
    { n: "09", title: "Table Detection Model", cat: "Data Science", desc: "Encoder-decoder deep learning model (TableNet-inspired) for table detection. Integrated OCR for automated tabular data extraction.", tech: ["Deep Learning", "Python", "OCR", "VGG-19"], gh: null, live: "https://colab.research.google.com/drive/1xpn7qXNKuUoMzCklZjbyLiv23v8SheIN?usp=sharing" },
];

const SKILLS = [
    { cat: "Core Concepts", tags: ["Computer Architecture", "AI", "DBMS", "OS", "Computer Networks", "OOP"] },
    { cat: "Languages", tags: ["C", "C++", "Java", "JavaScript", "Python", "TypeScript"] },
    { cat: "Web / Tools", tags: ["ReactJS", "Next.js", "Tailwind CSS", "HTML", "CSS", "Figma", "Flask", "FastAPI", "Node.js"] },
    { cat: "AI / ML", tags: ["PyTorch", "Deep Learning", "Computer Vision", "NLP", "Grad-CAM", "XAI", "Streamlit"] },
    { cat: "Data Tools", tags: ["SQL", "PowerBI", "Excel", "Tableau", "MySQL", "MongoDB"] },
    { cat: "Cloud", tags: ["AWS — EC2", "IAM", "VPC", "S3", "RDS", "CloudFront"] },
    { cat: "Hardware", tags: ["Raspberry Pi", "Arduino"] },
];

const EXP = [
    { role: "Cloud Intern", company: "Velocis Systems, Noida", period: "June 2025 – July 2025", bullets: ["Worked with AWS and Google Cloud (EC2, IAM, VPC, RDS, CloudFront, Load Balancer).", "Supported enterprise-grade solutions in fast-paced project environments."] },
    { role: "Operations Member", company: "Android Club VIT Chennai", period: "June 2023 – Present", bullets: ["Organized and executed club events; delivered a UI/UX session during a seminar.", "Collaborated with project teams to ensure timely task execution.", "Contributed to operational improvements through leadership and process enhancements."] },
    { role: "UI/UX Member", company: "Microsoft Innovations Club VIT Chennai", period: "September 2023 – November 2023", bullets: ["Optimized event club interfaces using advanced UI principles.", "Boosted user access by 30% and sped up event registrations by 20%."] },
    { role: "Participant", company: "Hackathons & Activities", period: "Various", bullets: ["Core developer in Smart India Hackathon."] },
];

const RKW = ["Post-Quantum Cryptography", "SPHINCS+", "IPFS", "Verifiable Credentials", "Decentralized Notary", "Quantum-Resistant Security"];

function SectionHeader({ num, title, tag }) {
    return (
        <div className="sh">
            <span className="sh-num">{num}</span>
            <h2 className="sh-title">{title}</h2>
            {tag && <span className="sh-tag">{tag}</span>}
            <div className="sh-line" />
        </div>
    );
}

function ArcReactor() {
    return (
        <div className="arc-reactor">
            <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="90" cy="90" r="85" stroke="rgba(0,200,255,0.15)" strokeWidth="1" />
                <circle cx="90" cy="90" r="72" stroke="rgba(0,200,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
                    const r = 72, x1 = 90 + r * Math.cos(a * Math.PI / 180), y1 = 90 + r * Math.sin(a * Math.PI / 180), x2 = 90 + 50 * Math.cos(a * Math.PI / 180), y2 = 90 + 50 * Math.sin(a * Math.PI / 180);
                    return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,200,255,0.35)" strokeWidth="1.5" />;
                })}
                <circle cx="90" cy="90" r="50" stroke="rgba(0,200,255,0.2)" strokeWidth="1" />
                {[0, 60, 120, 180, 240, 300].map(a => {
                    const r2 = 50, x1 = 90 + r2 * Math.cos(a * Math.PI / 180), y1 = 90 + r2 * Math.sin(a * Math.PI / 180), x2 = 90 + 34 * Math.cos(a * Math.PI / 180), y2 = 90 + 34 * Math.sin(a * Math.PI / 180);
                    return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,200,255,0.5)" strokeWidth="2" />;
                })}
                <circle cx="90" cy="90" r="34" stroke="rgba(0,200,255,0.4)" strokeWidth="1.5" />
                <circle cx="90" cy="90" r="22" stroke="rgba(0,200,255,0.6)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <div className="arc-core" />
        </div>
    );
}

export default function Portfolio() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [tick, setTick] = useState(0);
    useEffect(() => { const i = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(i); }, []);
    const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const submit = async (e) => {
        e.preventDefault(); setStatus('sending');
        try {
            const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_key: 'd9743274-bd82-40a7-9d2b-b6b785c6c275', subject: 'New Contact from Portfolio', from_name: 'Portfolio Contact Form', ...form }) });
            if (r.ok) { setStatus('ok'); setForm({ name: '', email: '', message: '' }); } else setStatus('err');
        } catch { setStatus('err'); }
    };

    return (<>
        <style>{S}</style>
        <div className="wrap">

            {/* NAV */}
            <nav className="nav">
                <a href="#" className="nav-logo">
                    <div className="logo-arc">
                        <svg viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="12" stroke="#00c8ff" strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle cx="14" cy="14" r="7" stroke="#00c8ff" strokeWidth="1.5" />
                            <circle cx="14" cy="14" r="3" fill="#00c8ff" />
                        </svg>
                    </div>
                    SP.SYSTEM
                </a>
                <ul className="nav-ul">
                    <li><a href="#about">Dossier</a></li>
                    <li><a href="#projects">Missions</a></li>
                    <li><a href="#skills">Abilities</a></li>
                    <li><a href="#experience">Ops Log</a></li>
                    <li><a href="#contact">Assemble</a></li>
                    <li><a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="nav-res">Resume</a></li>
                </ul>
            </nav>

            <div className="main">

                {/* ── HERO ── */}
                <section id="hero">
                    <div className="panel p1" style={{ borderColor: 'rgba(0,200,255,0.35)' }}>
                        <div className="brkt-tl" />
                        <div className="hero-grid">
                            <div className="hero-left">
                                <div className="hero-status">
                                    <div className="status-dot" />
                                    <span className="status-txt">Avenger Online · Seeking New Mission</span>
                                </div>
                                <p className="hero-eyebrow">[ Agent Identified ]</p>
                                <h1 className="hero-name">Sarthak<br /><span>Papneja</span></h1>
                                <h2 className="hero-role">Aspiring Software Engineer</h2>
                                <p className="hero-bio">Building scalable solutions with a focus on AI-driven applications, secure systems, and cloud architecture. Post-quantum cryptography researcher. Full-stack operative.</p>
                                <div className="ctas">
                                    <a href="#projects" className="btn btn-blue">▶️ View Missions</a>
                                    <a href="#contact" className="btn btn-gold">⚡ Assemble</a>
                                </div>
                                <div className="stats">
                                    <div className="stat"><div className="stat-l">Base</div><div className="stat-v">VIT Chennai</div></div>
                                    <div className="stat"><div className="stat-l">Division</div><div className="stat-v">B.Tech CSE</div></div>
                                    <div className="stat"><div className="stat-l">Rating</div><div className="stat-v">8.67 / 10</div></div>
                                    <div className="stat"><div className="stat-l">Status</div><div className="stat-v" style={{ color: '#00ff9d' }}>Class of '26</div></div>
                                </div>
                            </div>
                            <div className="hero-arc"><ArcReactor /></div>
                        </div>
                    </div>
                </section>

                {/* ── ABOUT ── */}
                <section id="about">
                    <div className="panel p2">
                        <div className="brkt-tl" />
                        <SectionHeader num="01" title="S.H.I.E.L.D. DOSSIER" tag="Classified" />
                        <div className="abt-grid">
                            <div className="abt">
                                <p>I am a Computer Science Engineering student at <strong>VIT University, Chennai</strong> (2022–2026) with a CGPA of <strong>8.67</strong>. My passion lies in solving complex problems through technology, whether it's developing secure banking systems, creating AI models for data extraction, or building full-stack web applications.</p>
                                <p>I have hands-on experience in full-stack development, cloud computing (AWS), data analytics, and AI/ML. I'm also a published researcher in <strong>post-quantum cryptography</strong>. I enjoy working in fast-paced environments and collaborating with teams to deliver impactful solutions.</p>
                            </div>
                            <div className="dossier">
                                <div className="doss-h">Agent Profile</div>
                                <div className="doss-row"><span className="doss-k">Designation</span><span className="doss-v">Sarthak Papneja</span></div>
                                <div className="doss-row"><span className="doss-k">Codename</span><span className="doss-v">SP</span></div>
                                <div className="doss-row"><span className="doss-k">Base of Ops</span><span className="doss-v">VIT University, Chennai</span></div>
                                <div className="doss-row"><span className="doss-k">Active Since</span><span className="doss-v">2022</span></div>
                                <div className="doss-row"><span className="doss-k">Clearance</span><span className="doss-v">CGPA 8.67 / 10</span></div>
                                <div className="doss-row"><span className="doss-k">Specialisation</span><span className="doss-v">AI/ML, Cloud, Full-Stack</span></div>
                                <div className="doss-row"><span className="doss-k">Intel Published</span><span className="doss-v">Post-Quantum Cryptography</span></div>
                                <div className="doss-row"><span className="doss-k">Threat Level</span><span className="doss-v" style={{ color: '#00ff9d' }}>Friendly · Available</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PROJECTS ── */}
                <section id="projects">
                    <div className="panel p3">
                        <div className="brkt-tl" />
                        <SectionHeader num="02" title="COMPLETED MISSIONS" tag={`${PROJECTS.length} Ops`} />
                        <div className="proj-grid">
                            {PROJECTS.map(p => (
                                <div className="proj" key={p.title}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="proj-num">MISSION {p.n}</span>
                                        <span className="proj-cat">{p.cat}</span>
                                    </div>
                                    <div className="proj-title">{p.title}</div>
                                    <p className="proj-desc">{p.desc}</p>
                                    <div className="tech">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                                    <div className="plinks">
                                        {p.gh && <a href={p.gh} target="_blank" className="plink">⌥ GitHub</a>}
                                        {p.live && <a href={p.live} target="_blank" className="plink">↗️ Live</a>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SKILLS ── */}
                <section id="skills">
                    <div className="panel p4">
                        <div className="brkt-tl" />
                        <SectionHeader num="03" title="POWERS & CAPABILITIES" tag="Full Arsenal" />
                        <div className="sk-grid">
                            {SKILLS.map(s => (
                                <div className="sk-cat" key={s.cat}>
                                    <div className="sk-cat-h">{s.cat}</div>
                                    <div className="sk-tags">{s.tags.map(t => <span key={t} className="sk-tag">{t}</span>)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── EXPERIENCE + RESEARCH ── */}
                <section id="experience">
                    <div className="panel p5">
                        <div className="brkt-tl" />
                        <SectionHeader num="04" title="FIELD OPS & INTEL" tag="Track Record" />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                            <div>
                                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.7rem', color: 'var(--blue)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.8 }}>Operations Log</div>
                                <div className="exp-tl">
                                    {EXP.map(e => (
                                        <div className="tl-item" key={e.company}>
                                            <div className="exp-role">{e.role} <span className="exp-co">@ {e.company}</span></div>
                                            <span className="exp-per">{e.period}</span>
                                            <ul className="exp-ul">{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontFamily: "'Orbitron',monospace", fontSize: '0.7rem', color: 'var(--red)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.85 }}>Intelligence Published</div>
                                <div className="rp">
                                    <span className="rp-badge">◉ CLASSIFIED RESEARCH</span>
                                    <h4 className="rp-title">Q-Notary: A Decentralized, Quantum-Resistant Notary for Verifiable Collaborative Workflows</h4>
                                    <p className="rp-authors">Sarthak Papneja · Romit Gupta · Dr. Neelanarayanan V</p>
                                    <div className="rp-meta">
                                        <span>IJVRA · Vol 4 Issue 1</span>
                                        <span>January 2026</span>
                                        <span>DOI: 10.13140/RG.2.2.35802.20169</span>
                                    </div>
                                    <p className="rp-abs">Long-lived digital records face quantum computing threats. Q-Notary presents a decentralized, post-quantum secure notary framework integrating SPHINCS+, IPFS, and W3C Verifiable Credentials for portable, tamper-evident notarizations.</p>
                                    <div className="rp-kws">{RKW.map(k => <span key={k} className="rp-kw">{k}</span>)}</div>
                                    <a href="https://www.researchgate.net/publication/399985730_Q-Notary_A_Decentralized_Quantum-Resistant_Notary_for_Verifiable_Collaborative_Workflows" target="_blank" className="btn btn-blue" style={{ fontSize: '0.76rem', padding: '8px 18px' }}>↗️ View on ResearchGate</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CONTACT ── */}
                <section id="contact">
                    <div className="panel" style={{ borderColor: 'rgba(240,180,41,0.3)', animationDelay: '0.6s' }}>
                        <div className="brkt-tl" style={{ borderColor: 'rgba(240,180,41,0.5)' }} />
                        <SectionHeader num="05" title="ASSEMBLE" tag="Open to Ops" />
                        <p className="contact-intro">I'm currently looking for new opportunities. Whether you have a question or just want to say hi — the comms are open.</p>
                        <div className="contact-cols">
                            <form className="cf" onSubmit={submit}>
                                <input className="fi" placeholder="Agent Name" value={form.name} onChange={e => upd('name', e.target.value)} required />
                                <input className="fi" type="email" placeholder="Secure Channel (Email)" value={form.email} onChange={e => upd('email', e.target.value)} required />
                                <textarea className="fta" placeholder="Transmission..." value={form.message} onChange={e => upd('message', e.target.value)} required />
                                <button type="submit" className="fsub" disabled={status === 'sending'}>{status === 'sending' ? 'TRANSMITTING...' : '⚡ SEND TRANSMISSION'}</button>
                                {status === 'ok' && <p className="fst-ok">✔ MESSAGE RECEIVED. STANDING BY.</p>}
                                {status === 'err' && <p className="fst-err">✘ TRANSMISSION FAILED. TRY EMAIL.</p>}
                            </form>
                            <div className="cl">
                                <a href="mailto:sarthakpapneja01@gmail.com" className="cla"><span className="cla-icon">✉</span>sarthakpapneja01@gmail.com</a>
                                <a href="https://www.linkedin.com/in/sarthak-papneja-485118232/" target="_blank" className="cla"><span className="cla-icon">in</span>LinkedIn</a>
                                <a href="https://github.com/sarthakpapneja" target="_blank" className="cla"><span className="cla-icon">GH</span>GitHub</a>
                                <a href="https://www.researchgate.net/profile/Sarthak-Papneja" target="_blank" className="cla"><span className="cla-icon" style={{ fontSize: '0.58rem' }}>RG</span>ResearchGate</a>
                                <a href="https://drive.google.com/file/d/1u3hQLi61BAbKneym4_QYbEXHYJYvHuio/view?usp=sharing" target="_blank" className="cla"><span className="cla-icon">↓</span>Resume</a>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <footer className="foot">
                <div className="foot-line" />
                <p>Designed & Built by <span>Sarthak Papneja</span> · Stark Industries Approved</p>
            </footer>

        </div>
    </>);
}
