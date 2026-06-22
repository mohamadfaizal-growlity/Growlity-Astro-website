import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  Settings,
  Zap
} from "lucide-react";

export default function HomePage() {
  const stats = [
    { value: "500+", label: "Global Clients" },
    { value: "50+", label: "Countries Served" },
    { value: "1000+", label: "ESG Projects Delivered" },
    { value: "95%", label: "Client Satisfaction" },
  ];

  const services = [
    {
      icon: Target,
      title: "ESG Strategy",
      description: "Comprehensive ESG strategy development and implementation",
      link: "/services/esg-strategy",
      color: "from-[#0066FF] to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Carbon Accounting",
      description: "GHG emissions measurement and carbon footprint analysis",
      link: "/services/carbon-accounting",
      color: "from-[#00C853] to-green-600"
    },
    {
      icon: Leaf,
      title: "Net Zero Strategy",
      description: "Science-based decarbonization roadmaps and climate action",
      link: "/services/net-zero",
      color: "from-[#0066FF] to-[#00C853]"
    },
    {
      icon: FileText,
      title: "ESG Reporting",
      description: "Comprehensive sustainability reporting and disclosures",
      link: "/services/esg-reporting",
      color: "from-purple-600 to-[#0066FF]"
    },
    {
      icon: Award,
      title: "EcoVadis Consulting",
      description: "Achieve Bronze, Silver, Gold, or Platinum ratings",
      link: "/services/ecovadis",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: CloudRain,
      title: "CDP Consulting",
      description: "Climate, Water, and Forest disclosure excellence",
      link: "/services/cdp",
      color: "from-[#00C853] to-teal-600"
    },
  ];

  const industries = [
    { name: "Manufacturing", icon: Factory, link: "/industries/manufacturing" },
    { name: "Chemicals", icon: Recycle, link: "/industries/chemicals" },
    { name: "Pharmaceuticals", icon: Building2, link: "/industries" },
    { name: "Metals & Steel", icon: Building2, link: "/industries" },
    { name: "Renewable Energy", icon: Zap, link: "/industries" },
    { name: "FMCG", icon: Building2, link: "/industries" },
  ];

  const frameworks = [
    { name: "GRI", description: "Global Reporting Initiative", link: "/frameworks/gri" },
    { name: "ISSB", description: "International Sustainability Standards", link: "/frameworks/issb" },
    { name: "SASB", description: "Sustainability Accounting Standards", link: "/frameworks/sasb" },
    { name: "TCFD", description: "Task Force on Climate-related Disclosures", link: "/frameworks/tcfd" },
    { name: "TNFD", description: "Task Force on Nature-related Disclosures", link: "/frameworks" },
    { name: "SBTi", description: "Science Based Targets initiative", link: "/frameworks" },
    { name: "CSRD", description: "Corporate Sustainability Reporting Directive", link: "/frameworks" },
    { name: "BRSR", description: "Business Responsibility & Sustainability Reporting", link: "/frameworks" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF] hover:bg-[#0066FF]/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered ESG Intelligence
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                  ESG Consulting
                </span>
                <br />
                & Sustainability Intelligence Platform
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Transform your sustainability journey with expert ESG consulting services and AI-powered ESGTech.ai platform. 
                From strategy to execution, we help global organizations achieve their net-zero goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-lg h-12 px-8">
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="/contact">
                  <Button size="lg" variant="outline" className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white text-lg h-12 px-8">
                    Book Consultation
                  </Button>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left lg:text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0066FF]/10 to-[#00C853]/10 rounded-lg">
                    <span className="font-semibold">ESG Score</span>
                    <span className="text-2xl font-bold text-[#00C853]">85/100</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Carbon Footprint</div>
                      <div className="text-xl font-bold text-[#0066FF]">12,450 tCO2e</div>
                      <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" />
                        -15% YoY
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-muted-foreground">Net Zero Target</div>
                      <div className="text-xl font-bold text-[#00C853]">2035</div>
                      <div className="text-xs text-muted-foreground mt-1">On Track</div>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Framework Compliance</div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-[#0066FF] text-white">GRI</Badge>
                      <Badge variant="secondary" className="bg-[#00C853] text-white">TCFD</Badge>
                      <Badge variant="secondary" className="bg-purple-600 text-white">ISSB</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-gradient-to-br from-[#0066FF] to-[#00C853] rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-gradient-to-br from-[#00C853] to-[#0066FF] rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {["Fortune 500", "Global 2000", "FTSE 100", "Industry Leaders", "Innovators"].map((name) => (
              <div key={name} className="text-xl font-semibold text-gray-400">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Consulting Overview */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF]">ESG Consulting Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive ESG Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end ESG consulting services to transform your sustainability strategy into measurable impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <a key={index} href={service.link}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-[#0066FF] group">
                    <CardHeader>
                      <div className={`h-12 w-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-[#0066FF] transition-colors">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-[#0066FF] font-medium">
                        Learn more
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ESGTech.ai Platform */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Platform
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ESGTech.ai
                <br />
                Sustainability Intelligence Platform
              </h2>
              <p className="text-lg mb-8 text-white/90 leading-relaxed">
                Streamline ESG data management, automate reporting, and accelerate your path to net-zero 
                with our enterprise-grade AI-powered platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <div className="font-semibold">Executive Dashboard</div>
                    <div className="text-sm text-white/80">Real-time ESG metrics</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <div className="font-semibold">Carbon Accounting</div>
                    <div className="text-sm text-white/80">Scope 1, 2, 3 tracking</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <div className="font-semibold">Automated Reporting</div>
                    <div className="text-sm text-white/80">GRI, ISSB, TCFD, CSRD</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-1 text-white" />
                  <div>
                    <div className="font-semibold">AI Insights</div>
                    <div className="text-sm text-white/80">Actionable recommendations</div>
                  </div>
                </div>
              </div>

              <a href="/esgtech">
                <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90">
                  Explore Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span>Multi-Entity Management</span>
                  <Settings className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span>ERP Integrations</span>
                  <Zap className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span>Compliance Management</span>
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span>Supplier ESG Assessment</span>
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#00C853]/10 text-[#00C853]">Industry Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Serving Diverse Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep industry knowledge and tailored ESG solutions for your sector
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <a key={index} href={industry.link}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-[#00C853] group text-center">
                    <CardContent className="pt-6">
                      <Icon className="h-10 w-10 mx-auto mb-3 text-[#00C853] group-hover:scale-110 transition-transform" />
                      <div className="font-semibold text-sm">{industry.name}</div>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF]">Global Standards</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Framework Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert guidance on all major ESG reporting frameworks and standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <a key={index} href={framework.link}>
                <Card className="h-full hover:shadow-lg transition-all hover:border-[#0066FF] group">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                      {framework.name}
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-[#0066FF] text-sm font-medium">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#00C853] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Track Record
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Delivering measurable impact for organizations worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-white/80">ESG Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">30M+</div>
              <div className="text-white/80">Tonnes CO2 Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">200+</div>
              <div className="text-white/80">EcoVadis Medals Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your ESG Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with our ESG experts to discuss your sustainability goals and discover how we can help you achieve them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844]">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/resources">
                <Button size="lg" variant="outline" className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white">
                  Download ESG Guide
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
