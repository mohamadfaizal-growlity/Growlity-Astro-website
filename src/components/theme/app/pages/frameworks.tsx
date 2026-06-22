import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FileText, ArrowRight } from "lucide-react";

export default function FrameworksPage() {
  const frameworks = [
    { name: "GRI", full: "Global Reporting Initiative", link: "/frameworks/gri", desc: "Comprehensive sustainability reporting" },
    { name: "ISSB", full: "International Sustainability Standards Board", link: "/frameworks/issb", desc: "Global baseline for sustainability disclosures" },
    { name: "SASB", full: "Sustainability Accounting Standards Board", link: "/frameworks/sasb", desc: "Industry-specific materiality standards" },
    { name: "TCFD", full: "Task Force on Climate-related Financial Disclosures", link: "/frameworks/tcfd", desc: "Climate risk reporting framework" },
    { name: "TNFD", full: "Task Force on Nature-related Financial Disclosures", link: "/frameworks", desc: "Nature-related risk disclosure" },
    { name: "SBTi", full: "Science Based Targets initiative", link: "/frameworks", desc: "Science-based emission reduction targets" },
    { name: "CSRD", full: "Corporate Sustainability Reporting Directive", link: "/frameworks", desc: "EU sustainability reporting mandate" },
    { name: "BRSR", full: "Business Responsibility & Sustainability Reporting", link: "/frameworks", desc: "India's ESG reporting framework" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">ESG Frameworks</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Global ESG Reporting Standards</h1>
            <p className="text-xl text-white/90">
              Expert guidance on all major ESG frameworks and reporting standards
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <a key={index} href={framework.link}>
                <Card className="h-full hover:shadow-xl transition-all hover:border-[#0066FF] group">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00C853] bg-clip-text text-transparent">
                      {framework.name}
                    </CardTitle>
                    <CardDescription className="font-semibold text-sm">{framework.full}</CardDescription>
                    <CardDescription>{framework.desc}</CardDescription>
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
      <Footer />
    </div>
  );
}
