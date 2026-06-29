import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Target, BarChart3, Leaf, FileText, Award, CloudRain, 
  TrendingUp, Shield, Users, Recycle, Building2, ArrowRight 
} from "lucide-react";

export default function ServicesPage() {
  const serviceCategories = [
    {
      category: "ESG Strategy & Advisory",
      services: [
        { icon: Target, title: "ESG Strategy", link: "/services/esg-strategy", description: "Comprehensive ESG strategy development and implementation" },
        { icon: TrendingUp, title: "ESG Transformation", link: "/services", description: "End-to-end ESG transformation programs" },
        { icon: Shield, title: "ESG Risk Assessment", link: "/services", description: "Identify and mitigate ESG-related risks" },
        { icon: Users, title: "ESG Governance", link: "/services", description: "Build robust ESG governance structures" }
      ]
    },
    {
      category: "Carbon & Climate",
      services: [
        { icon: BarChart3, title: "Carbon Accounting", link: "/services/carbon-accounting", description: "GHG emissions measurement and carbon footprint analysis" },
        { icon: Leaf, title: "Net Zero Strategy", link: "/services/net-zero", description: "Science-based decarbonization roadmaps" },
        { icon: CloudRain, title: "Climate Risk Assessment", link: "/services", description: "Physical and transition risk analysis" },
        { icon: TrendingUp, title: "Decarbonization", link: "/services", description: "Carbon reduction initiatives and programs" }
      ]
    },
    {
      category: "Reporting & Compliance",
      services: [
        { icon: FileText, title: "ESG Reporting", link: "/services/esg-reporting", description: "Comprehensive sustainability reporting" },
        { icon: FileText, title: "GRI Reporting", link: "/services", description: "Global Reporting Initiative compliance" },
        { icon: FileText, title: "ISSB Standards", link: "/services", description: "International Sustainability Standards" },
        { icon: Shield, title: "CSRD Compliance", link: "/services", description: "Corporate Sustainability Reporting Directive" }
      ]
    },
    {
      category: "Ratings & Certifications",
      services: [
        { icon: Award, title: "EcoVadis", link: "/services/ecovadis", description: "Achieve Bronze, Silver, Gold, or Platinum ratings" },
        { icon: Award, title: "CDP", link: "/services/cdp", description: "Climate, Water, and Forest disclosure" },
        { icon: Award, title: "ISO 14001", link: "/services", description: "Environmental management certification" },
        { icon: Award, title: "ResponsibleSteel", link: "/services", description: "Steel industry sustainability standard" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive ESG Solutions
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              From strategy to execution, we deliver end-to-end ESG consulting services tailored to your industry and objectives
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      {serviceCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-10 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                {category.category}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <a key={index} href={service.link}>
                    <Card className="h-full hover:shadow-xl transition-all hover:border-[#0066FF] group">
                      <CardHeader>
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="group-hover:text-[#0066FF] transition-colors">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-[#0066FF] font-medium text-sm">
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
      ))}

      <Footer />
    </div>
  );
}
