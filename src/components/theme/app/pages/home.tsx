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
  Briefcase
} from "lucide-react";

export default function HomePage() {
  const trustedClients = ["Fortune 500", "Global 2000", "FTSE 100", "Industry Leaders", "Innovators", "Pioneers"];

  const services = [
    { title: "ESG Strategy", description: "Develop practical sustainability roadmaps.", icon: Target },
    { title: "ESG Reporting", description: "GRI, BRSR, CSRD, ISSB, IFRS S1/S2.", icon: FileText },
    { title: "Carbon Accounting", description: "Measure Scope 1, 2 & 3 emissions.", icon: CloudRain },
    { title: "Life Cycle Assessment", description: "Product carbon footprint & environmental impact.", icon: Recycle },
    { title: "Net Zero Strategy", description: "Roadmaps and decarbonization planning.", icon: Leaf },
    { title: "EcoVadis Consulting", description: "Improve ESG ratings and supplier performance.", icon: Award },
    { title: "CDP Reporting", description: "Disclosure support for climate, water, and forests.", icon: BarChart3 },
    { title: "SBTi Target Setting", description: "Science-based targets for emission reduction.", icon: TrendingUp },
    { title: "EPD Development", description: "Environmental Product Declarations.", icon: Shield },
    { title: "Responsible Sourcing", description: "Supply chain sustainability and assessments.", icon: Globe },
    { title: "ESG Software", description: "Implementation and training for ESGTech platforms.", icon: Cpu },
    { title: "ESG Training", description: "Corporate workshops and capacity building.", icon: Users },
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory },
    { name: "Textile", icon: Recycle },
    { name: "Chemicals", icon: Zap },
    { name: "Construction", icon: Building2 },
    { name: "Automotive", icon: Truck },
    { name: "FMCG", icon: ShoppingCart },
    { name: "Healthcare", icon: Stethoscope },
    { name: "Food & Beverage", icon: Leaf },
    { name: "Logistics", icon: Globe },
    { name: "IT", icon: Cpu },
    { name: "Electronics", icon: Zap },
    { name: "Mining", icon: Pickaxe },
  ];

  const whyChooseUs = [
    "Certified ESG Experts",
    "End-to-End Consulting",
    "Global Reporting Standards",
    "Industry-Specific Solutions",
    "Customized Strategies",
    "Regulatory Compliance",
    "Faster Certification",
    "Dedicated Support"
  ];

  const standards = [
    "GRI", "BRSR", "ISSB", "IFRS", "CSRD", "CDP", 
    "EcoVadis", "SBTi", "GHG Protocol", "ISO 14064", "ISO 14001", "SA8000", 
    "RJC", "SMETA", "TCFD"
  ];

  const processSteps = [
    { step: "1", title: "Consultation", desc: "Understanding your current baseline and goals." },
    { step: "2", title: "Assessment", desc: "Gap analysis and materiality assessment." },
    { step: "3", title: "Strategy Development", desc: "Creating a tailored ESG roadmap." },
    { step: "4", title: "Implementation", desc: "Executing initiatives and data collection." },
    { step: "5", title: "Reporting", desc: "Aligning with global disclosure frameworks." },
    { step: "6", title: "Continuous Improvement", desc: "Ongoing monitoring and optimization." }
  ];

  const caseStudies = [
    { industry: "Manufacturing Company", metrics: ["35% reduction in emissions", "EcoVadis Silver", "Scope 3 assessment completed"] },
    { industry: "Retail Company", metrics: ["ESG Report Published", "BRSR Compliance Achieved", "Supplier assessments completed"] },
  ];

  const faqs = [
    { q: "What is ESG consulting?", a: "ESG consulting helps businesses integrate Environmental, Social, and Governance factors into their core strategy to ensure compliance, attract investment, and drive sustainable growth." },
    { q: "Why is ESG important?", a: "ESG is crucial for risk management, regulatory compliance, meeting stakeholder expectations, and unlocking new market opportunities." },
    { q: "Who needs ESG reporting?", a: "Publicly listed companies, businesses in supply chains of large corporations, and organizations seeking international funding or certifications." },
    { q: "How long does ESG implementation take?", a: "Timelines vary depending on the scope. A basic carbon footprint assessment may take weeks, while a full ESG strategy and report can take 3-6 months." },
    { q: "What industries do you serve?", a: "We serve a wide range of industries including manufacturing, textiles, IT, healthcare, logistics, and more." },
    { q: "Do you help with carbon accounting?", a: "Yes, we offer comprehensive Scope 1, 2, and 3 GHG emissions calculation and decarbonization planning." },
    { q: "Can you assist with EcoVadis certification?", a: "Absolutely. We guide companies through the EcoVadis assessment process to improve their sustainability scorecards." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20 md:pt-24 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div data-aos="fade-up">
              <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/20 px-3 py-1 text-xs">
                <Sparkles className="h-3 w-3 mr-2" />
                Premium ESG Consulting
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-[1.15] tracking-tight">
                ESG Consulting That Helps Businesses Achieve{" "}
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                  Compliance, Sustainability & Long-Term Growth
                </span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                We help organizations simplify ESG reporting, carbon accounting, sustainability strategy, certifications, climate risk management, and regulatory compliance.
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
                    <h3 className="font-bold text-lg text-gray-800">Sustainability Dashboard</h3>
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
                      <div className="text-2xl font-extrabold text-gray-900 stat-num" data-target="45" data-suffix="%">0%</div>
                      <div className="text-xs text-gray-500 mb-1">by 2030</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100/50">
                      <div className="text-xs font-medium text-green-600 mb-1">ESG Score</div>
                      <div className="text-xl font-bold text-gray-900 stat-num" data-target="85">0</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border border-purple-100/50">
                      <div className="text-xs font-medium text-purple-600 mb-1">Certifications</div>
                      <div className="text-xl font-bold text-gray-900 stat-num" data-target="12">0</div>
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

      {/* 2. Trusted By */}
      <section className="py-10 border-b border-gray-100 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
            Trusted by 200+ Businesses Worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {trustedClients.map((client) => (
              <div key={client} className="text-xl md:text-2xl font-bold text-gray-600 tracking-tight hover:text-[#0066FF] transition-colors cursor-pointer">
                {client}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8 font-medium">
            Helping businesses across manufacturing, IT, textiles, healthcare, logistics, and more.
          </p>
        </div>
      </section>

      {/* 3. About Company */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Who We Are</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              We are an ESG consulting company helping organizations meet global sustainability standards through expert advisory, ESG reporting, carbon management, supply chain assessments, and certification support.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0066FF]/30 hover:shadow-md transition-all">
                <div className="text-2xl font-extrabold text-[#0066FF] mb-1 stat-num" data-target="15" data-suffix="+">0+</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Years Exp.</div>
              </div>
              <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#00C853]/30 hover:shadow-md transition-all">
                <div className="text-2xl font-extrabold text-[#00C853] mb-1 stat-num" data-target="20" data-suffix="+">0+</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industries</div>
              </div>
              <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#0066FF]/30 hover:shadow-md transition-all">
                <div className="text-2xl font-extrabold text-[#0066FF] mb-1 stat-num" data-target="25" data-suffix="+">0+</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Countries</div>
              </div>
              <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#00C853]/30 hover:shadow-md transition-all">
                <div className="text-2xl font-extrabold text-[#00C853] mb-1 stat-num" data-target="50" data-suffix="+">0+</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Consultants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our ESG Services */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#0066FF]/10 text-[#0066FF]">Our Expertise</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900">Our ESG Services</h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">Comprehensive solutions tailored to your sustainability journey.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Card key={i} className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-gray-100 hover:-translate-y-1 hover:border-[#0066FF]/30 cursor-pointer">
                  <CardHeader className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#0066FF] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#0066FF] group-hover:text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-[#0066FF] transition-colors">{svc.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">{svc.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Industries We Serve */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Industries We Serve</h2>
            <p className="text-base text-gray-500">Cross-sector expertise delivering specialized sustainability impact.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 text-center hover:border-[#00C853] hover:shadow-md transition-all group cursor-pointer">
                  <Icon className="w-6 h-6 mx-auto text-gray-400 group-hover:text-[#00C853] group-hover:-translate-y-1 transition-all mb-2" />
                  <span className="font-semibold text-xs text-gray-700">{ind.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-5">Why Partner With Us?</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                We combine deep technical expertise with strategic business acumen to ensure your sustainability initiatives drive real value.
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
              {/* Floating highlight */}
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
      <section className="py-20 bg-white border-b border-gray-100 overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">ESG Standards & Frameworks We Support</h2>
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
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#00C853]/10 text-[#00C853]">Our Methodology</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 text-gray-900">A Proven 6-Step Process</h2>
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

      {/* 9. Case Studies & 10. Numbers */}
      <section className="py-20 bg-white relative overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Case Studies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Success Stories</h2>
              <div className="space-y-4">
                {caseStudies.map((cs, i) => (
                  <div key={i} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-50/20 border border-blue-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <h3 className="text-lg font-bold text-[#0066FF] mb-3 flex items-center">
                      <Briefcase className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform"/> {cs.industry}
                    </h3>
                    <ul className="space-y-2">
                      {cs.metrics.map((metric, j) => (
                        <li key={j} className="flex items-start text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#00C853] mr-2 shrink-0 mt-0.5" />
                          <span className="font-medium">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Numbers */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Our Impact in Numbers</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#0066FF]/30 transition-all">
                  <div className="text-4xl font-black text-[#0066FF] mb-1 stat-num" data-target="500" data-suffix="+">0+</div>
                  <div className="font-semibold text-xs text-gray-600">Projects Delivered</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#00C853]/30 transition-all">
                  <div className="text-4xl font-black text-[#00C853] mb-1 stat-num" data-target="95" data-suffix="%">0%</div>
                  <div className="font-semibold text-xs text-gray-600">Client Satisfaction</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#00C853]/30 transition-all">
                  <div className="text-4xl font-black text-[#00C853] mb-1 stat-num" data-target="100" data-suffix="+">0+</div>
                  <div className="font-semibold text-xs text-gray-600">Certifications</div>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:bg-white hover:shadow-md hover:border-[#0066FF]/30 transition-all">
                  <div className="text-4xl font-black text-[#0066FF] mb-1 stat-num" data-target="25" data-suffix="+">0+</div>
                  <div className="font-semibold text-xs text-gray-600">Global Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-20 bg-gray-900 text-white" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-white/10 text-white hover:bg-white/20">Testimonials</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((item) => (
              <div key={item} className="p-6 rounded-xl bg-white/5 border border-white/10 relative hover:bg-white/10 transition-colors">
                <div className="text-5xl font-serif text-[#00C853] absolute top-2 right-4 opacity-40">"</div>
                <p className="text-sm text-gray-300 italic mb-6 relative z-10 leading-relaxed">
                  "Growlity transformed our approach to sustainability. Their expertise in carbon accounting and ESG strategy helped us achieve EcoVadis Gold rating in our first year."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#0066FF] to-[#00C853] rounded-full flex items-center justify-center font-bold text-white shadow-md text-sm">SJ</div>
                  <div>
                    <div className="font-bold text-white text-sm">Sarah Jenkins</div>
                    <div className="text-xs text-gray-400">Chief Sustainability Officer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Resources & Insights */}
      <section className="py-20 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <Badge className="mb-3 bg-[#0066FF]/10 text-[#0066FF]">Insights</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Resources</h2>
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

      {/* 13. FAQs */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#00C853]/10 text-[#00C853]">Support</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">Frequently Asked Questions</h2>
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

      {/* 14. Contact CTA */}
      <section className="py-20 relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00C853]"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Ready to Accelerate Your ESG Journey?
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
