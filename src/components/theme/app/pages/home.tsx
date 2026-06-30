import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion";
import {
  BarChart3,
  TrendingUp,
  Shield,
  Target,
  Leaf,
  Globe,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  Factory,
  Recycle,
  CloudRain,
  LineChart,
  FileText,
  Zap,
  Truck,
  Stethoscope,
  ShoppingCart,
  Cpu,
  Pickaxe,
  Briefcase,
  Command,
  Hexagon,
  Triangle,
  Circle,
  Square,
  Activity,
  Cpu as CpuIcon
} from "lucide-react";

import siteStats from "../../../../content/global-settings/stats.json";

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    { title: "ESG Strategy & Advisory", description: "Gap analysis, net-zero roadmaps & climate risk assessment.", icon: Target, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" },
    { title: "Sustainability Reporting", description: "BRSR, CSRD, ISSB, and IFRS frameworks compliance.", icon: FileText, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
    { title: "Carbon Accounting", description: "Scope 1, 2 & 3 emissions calculation and decarbonization.", icon: CloudRain, image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80" },
    { title: "EU CBAM Advisory", description: "Navigating EU Carbon Border Adjustment Mechanism compliance.", icon: Globe, image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" },
    { title: "Ratings & Disclosures", description: "Improve EcoVadis, CDP, S&P, and Sustainalytics scores.", icon: Award, image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80" },
    { title: "Life Cycle Assessment", description: "Product carbon footprint (PCF) & environmental impact.", icon: Recycle, image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80" },
  ];

  const proprietaryTools = [
    { name: "ESGTech.ai", description: "An AI-powered platform for precise calculation of Scope 1, 2, and 3 GHG emissions.", icon: CpuIcon },
    { name: "CBAMx", description: "A specialized platform helping exporters navigate and comply with complex EU CBAM regulations.", icon: Globe },
    { name: "BRSR India", description: "A comprehensive knowledge hub providing templates, tools, and regulatory insights for the BRSR framework.", icon: FileText }
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80" },
    { name: "Textile", icon: Recycle, image: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=500&q=80" },
    { name: "Chemicals", icon: Zap, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80" },
    { name: "Construction", icon: Building2, image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80" },
    { name: "Automotive", icon: Truck, image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&q=80" },
    { name: "FMCG", icon: ShoppingCart, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80" },
    { name: "Healthcare", icon: Stethoscope, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80" },
    { name: "Food & Beverage", icon: Leaf, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80" },
  ];

  const whyChooseUs = [
    "Certified ESG Experts",
    "End-to-End Consulting",
    "Proprietary Digital Tools",
    "Industry-Specific Solutions",
    "Customized Strategies",
    "Regulatory Compliance",
    "Global Reporting Standards",
    "Dedicated Support"
  ];

  const standards = [
    "GRI", "BRSR", "ISSB", "IFRS", "CSRD", "CDP",
    "EcoVadis", "SBTi", "GHG Protocol", "ISO 14064", "ISO 14001", "SA8000", "B-Corp"
  ];

  const processSteps = [
    { step: "1", title: "Consultation", desc: "Understanding your current baseline and goals." },
    { step: "2", title: "Assessment", desc: "Gap analysis and materiality assessment." },
    { step: "3", title: "Strategy Development", desc: "Creating a tailored ESG roadmap." },
    { step: "4", title: "Implementation", desc: "Executing initiatives and data collection." },
    { step: "5", title: "Reporting", desc: "Aligning with global disclosure frameworks." },
    { step: "6", title: "Continuous Improvement", desc: "Ongoing monitoring and optimization." }
  ];

  const faqs = [
    { q: "What is ESG consulting?", a: "ESG consulting helps businesses integrate Environmental, Social, and Governance factors into their core strategy to ensure compliance, attract investment, and drive sustainable growth." },
    { q: "Why is ESG important?", a: "ESG is crucial for risk management, regulatory compliance, meeting stakeholder expectations, and unlocking new market opportunities." },
    { q: "Who needs ESG reporting?", a: "Publicly listed companies, businesses in supply chains of large corporations, and organizations seeking international funding or certifications." },
    { q: "How long does ESG implementation take?", a: "Timelines vary depending on the scope. A basic carbon footprint assessment may take weeks, while a full ESG strategy and report can take 3-6 months." },
    { q: "What industries do you serve?", a: "We serve a wide range of industries including manufacturing, textiles, IT, healthcare, logistics, and more." },
    { q: "Do you help with carbon accounting?", a: "Yes, we offer comprehensive Scope 1, 2, and 3 GHG emissions calculation and decarbonization planning using our proprietary ESGTech.ai platform." },
    { q: "Can you assist with EcoVadis certification?", a: "Absolutely. We guide companies through the EcoVadis assessment process to improve their sustainability scorecards." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-8 pb-16 md:pt-10 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-aos="fade-up">
              <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/20 px-3 py-1 text-xs">
                <Sparkles className="h-3 w-3 mr-2" />
                Global ESG & Business Sustainability Advisory
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-[1.15] tracking-tight">
                Empowering Enterprises with {" "}
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                  Data-Driven ESG Strategies
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We assist organizations in improving their sustainability performance, meeting global standards, and developing long-term value through strategy, reporting, and proprietary platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact">
                  <Button className="magnetic-btn bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-base h-12 px-6 shadow-lg shadow-blue-500/20 transition-all duration-300">
                    Book a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="outline" className="magnetic-btn border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white text-base h-12 px-6 transition-all duration-300">
                    Talk to an ESG Expert
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative" data-aos="fade-left" data-aos-delay="200">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 relative z-10 transform transition-transform hover:scale-[1.02] duration-500 max-w-md ml-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">ESGTech.ai Dashboard</h3>
                    <p className="text-xs text-gray-500">Real-time Impact Tracking</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" /> On Track
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/50">
                    <div className="text-xs font-medium text-blue-600 mb-1">Carbon Reduction Target</div>
                    <div className="flex items-end gap-2">
                      <div className="text-2xl font-extrabold text-gray-900">{siteStats.hero.carbonTarget}</div>
                      <div className="text-xs text-gray-500 mb-1">by 2030</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100/50">
                      <div className="text-xs font-medium text-green-600 mb-1">Global ESG Score</div>
                      <div className="text-xl font-bold text-gray-900">{siteStats.hero.esgScore}</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100/50">
                      <div className="text-xs font-medium text-purple-600 mb-1">Standards Covered</div>
                      <div className="text-xl font-bold text-gray-900">{siteStats.hero.standards}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 h-48 w-48 bg-gradient-to-br from-[#0066FF] to-purple-400 rounded-full blur-[60px] opacity-20" />
              <div className="absolute -bottom-6 -left-6 h-48 w-48 bg-gradient-to-br from-[#00C853] to-yellow-400 rounded-full blur-[60px] opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Company */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden" data-aos="fade-up">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10" />
        <div className="absolute -left-20 top-20 w-72 h-72 bg-green-50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="max-w-2xl">
              <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF] border-none px-3 py-1">
                About Growlity
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
                Your Trusted Partner for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00C853]">
                  ESG & Sustainability Excellence
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Growlity is a premier ESG consulting firm dedicated to guiding organizations toward sustainable, compliant, and profitable futures. We bridge the gap between complex regulatory requirements and practical business strategies.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Operating globally across India, USA, UK, Canada, Mexico, Thailand, and GCC countries, our multidisciplinary team empowers businesses to navigate sustainability frameworks, optimize supply chains, manage carbon footprints, and achieve recognized certifications.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/about">
                  <Button className="bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-6 rounded-lg text-base transition-all duration-300 shadow-lg shadow-blue-500/25">
                    Discover Our Journey
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative z-10 w-full max-w-lg mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-green-500/5 blur-2xl -z-10 rounded-full" />
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                
                <div className="flex flex-col gap-4 md:gap-6 mt-0 md:mt-12">
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,102,255,0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0047B3] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform duration-300">
                        <Briefcase className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1 tracking-tighter">{siteStats.about.yearsExp}<span className="text-[#0066FF]">+</span></div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Years Exp.</div>
                    </div>
                  </div>
                  
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,200,83,0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-green-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C853] to-[#009624] flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:rotate-6 transition-transform duration-300">
                        <Globe className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1 tracking-tighter">{siteStats.about.regions}<span className="text-[#00C853]">+</span></div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Global Regions</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:rotate-6 transition-transform duration-300">
                        <Factory className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1 tracking-tighter">{siteStats.about.industries}<span className="text-purple-500">+</span></div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Industries</div>
                    </div>
                  </div>
                  
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:rotate-6 transition-transform duration-300">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-1 tracking-tighter"><span className="text-xl">Global</span><span className="text-orange-500 text-xl pl-1">Team</span></div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">Expert Consultants</div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Our ESG Services */}
      <section className="py-10 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#0066FF]/10 text-[#0066FF]">Our Expertise</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900">End-to-End ESG Advisory & Solutions</h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">Comprehensive, tailored strategies to drive your organization's sustainability journey.</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              {services.map((svc, i) => {
                const Icon = svc.icon;
                const isActive = activeService === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveService(i)}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 border ${isActive ? 'bg-[#0066FF] border-[#0066FF] shadow-lg text-white transform scale-[1.02]' : 'bg-white border-gray-100 text-gray-700 hover:border-[#0066FF]/30 hover:bg-blue-50'}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors ${isActive ? 'bg-white/20' : 'bg-blue-50'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#0066FF]'}`} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>{svc.title}</h3>
                      <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'} hidden md:block`}>{svc.description}</p>
                    </div>
                    <ArrowRight className={`w-5 h-5 ml-auto transition-transform ${isActive ? 'translate-x-0 opacity-100 text-white' : '-translate-x-2 opacity-0'}`} />
                  </div>
                );
              })}
              <div className="mt-4 text-center lg:text-left">
                <a href="/solutions" className="text-[#0066FF] font-semibold hover:underline flex items-center justify-center lg:justify-start text-sm">
                  View all solutions <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
              {services.map((svc, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${activeService === i ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <Badge className="bg-[#00C853] text-white mb-3 hover:bg-[#00A844]">Featured Service</Badge>
                    <h3 className="text-3xl font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-white/80 text-lg max-w-lg mb-4">{svc.description}</p>
                    <Button variant="outline" className="border-white/50 bg-transparent text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Proprietary Tools */}
      <section className="py-16 bg-gray-50 border-t border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-purple-500/10 text-purple-600">Digital Solutions</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Next-Generation ESG Technology Platforms</h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">Leveraging advanced technology to simplify complex ESG data management and global reporting.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {proprietaryTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066FF] to-purple-600 flex items-center justify-center mb-6 shadow-md text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{tool.description}</p>
                  <Button variant="outline" className="w-full border-gray-200 text-[#0066FF] hover:bg-blue-50 hover:border-blue-200">
                    Explore Platform
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-10 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Delivering Sector-Specific Sustainability Impact</h2>
            <p className="text-base text-gray-500">Cross-sector expertise bringing specialized insights to your unique industry challenges.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={i} className="relative h-40 rounded-xl overflow-hidden group cursor-pointer shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <img src={ind.image} alt={ind.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300"></div>
                  <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-white z-10">
                    <Icon className="w-8 h-8 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-bold text-sm tracking-wide">{ind.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-10 bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-5">The Growlity Advantage</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                We combine deep technical expertise with strategic business acumen to ensure your sustainability initiatives are compliant, future-ready, and drive real value.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyChooseUs.map((reason, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block" data-aos="fade-left" data-aos-delay="200">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" alt="Consulting Team" className="rounded-2xl shadow-xl max-w-md ml-auto" />
              <div className="absolute inset-0 bg-blue-900/20 rounded-2xl mix-blend-multiply max-w-md ml-auto"></div>
              <div className="absolute -bottom-6 -left-2 bg-white p-4 rounded-xl shadow-lg text-gray-900 flex items-center gap-3">
                <Award className="w-8 h-8 text-[#00C853]" />
                <div>
                  <div className="font-bold text-base">Top Rated</div>
                  <div className="text-xs text-gray-500">Global Consultants</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ESG Standards We Support */}
      <section className="py-10 bg-white border-b border-gray-100 overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Expertise Across Global ESG Frameworks & Standards</h2>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {standards.map((std, i) => (
              <div key={i} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full font-bold text-gray-700 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-blue-50 transition-colors cursor-pointer shadow-sm">
                {std}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process */}
      <section className="py-10 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#00C853]/10 text-[#00C853]">Our Methodology</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900">Our Strategic 6-Step Methodology for ESG Success</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="relative p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-5xl font-black text-gray-50 absolute top-3 right-5 pointer-events-none transition-colors group-hover:text-blue-50">{step.step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 relative z-10 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xs mr-2">{step.step}</span>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 relative z-10 pl-8">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Success Stories & Impact */}
      <section className="py-10 bg-white relative overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Measurable Impact & Global Reach</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#0066FF]/30 transition-all">
                <div className="text-4xl font-black text-[#0066FF] mb-1">Global</div>
                <div className="font-semibold text-xs text-gray-600 mt-2 uppercase tracking-wide">Client Base</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#00C853]/30 transition-all">
                <div className="text-4xl font-black text-[#00C853] mb-1">{siteStats.impact.commitment}</div>
                <div className="font-semibold text-xs text-gray-600 mt-2 uppercase tracking-wide">Commitment</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#00C853]/30 transition-all">
                <div className="text-4xl font-black text-[#00C853] mb-1">Expert</div>
                <div className="font-semibold text-xs text-gray-600 mt-2 uppercase tracking-wide">Consultants</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#0066FF]/30 transition-all">
                <div className="text-4xl font-black text-[#0066FF] mb-1">{siteStats.impact.regions}</div>
                <div className="font-semibold text-xs text-gray-600 mt-2 uppercase tracking-wide">Operating Regions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Resources & Insights */}
      <section className="py-10 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <Badge className="mb-3 bg-[#0066FF]/10 text-[#0066FF]">Knowledge Hub</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Insights & Thought Leadership</h2>
            </div>
            <a href="/blogs" className="text-[#0066FF] font-semibold hover:underline flex items-center mt-3 md:mt-0 text-sm">
              View all resources <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Blogs', 'Whitepapers', 'Webinars'].map((cat, i) => (
              <a key={cat} href={`/${cat.toLowerCase()}`} className="group block">
                <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={`https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600&h=400&sig=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={cat} />
                  <Badge className="absolute top-3 left-3 z-20 bg-white text-gray-900 text-xs">{cat}</Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#0066FF] transition-colors">
                  Understanding the new CSRD regulations for 2024
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">A comprehensive guide on what businesses need to prepare for the upcoming EU corporate sustainability reporting directive.</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <section className="py-10 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#00C853]/10 text-[#00C853]">Support</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Navigating Your ESG Journey: Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                <AccordionTrigger className="text-left text-base font-semibold text-gray-800 hover:text-[#0066FF] py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm pb-4 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 12. Contact CTA */}
      <section className="py-10 relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00C853]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Take the Next Step in Your Sustainability Journey
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Let's build a sustainable, compliant, and future-ready business together. Talk to our experts today.
          </p>
          <a href="/contact">
            <Button className="magnetic-btn bg-white text-[#0066FF] hover:bg-gray-100 text-lg h-14 px-8 rounded-full shadow-xl transition-transform hover:scale-105">
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>

    </div>
  );
}
