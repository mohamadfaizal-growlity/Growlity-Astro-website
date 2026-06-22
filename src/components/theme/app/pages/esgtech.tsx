import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Sparkles, BarChart3, FileText, Users, Shield, 
  Zap, Settings, Globe, CheckCircle2, ArrowRight 
} from "lucide-react";

export default function ESGTechPage() {
  const features = [
    { icon: BarChart3, title: "Executive Dashboard", desc: "Real-time ESG metrics and insights" },
    { icon: FileText, title: "Automated Reporting", desc: "GRI, ISSB, TCFD, CSRD compliance" },
    { icon: Sparkles, title: "Carbon Accounting", desc: "Scope 1, 2, 3 emissions tracking" },
    { icon: Shield, title: "Compliance Management", desc: "Stay ahead of regulations" },
    { icon: Users, title: "Supplier Management", desc: "Track supply chain ESG performance" },
    { icon: Zap, title: "ERP Integration", desc: "Seamless data connectivity" },
    { icon: Settings, title: "Workflow Automation", desc: "Streamline ESG processes" },
    { icon: Globe, title: "Multi-Entity Support", desc: "Manage global operations" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ESGTech.ai
            </h1>
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              The Enterprise Sustainability Intelligence Platform
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Streamline ESG data management, automate reporting, and accelerate your path to net-zero 
              with AI-powered insights and analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90 text-lg px-8">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  Watch Video
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage and report on your ESG performance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why ESGTech.ai?</h2>
              <div className="space-y-4">
                {[
                  "Save 80% time on ESG data collection and reporting",
                  "Ensure accuracy with AI-powered data validation",
                  "Stay compliant with automated regulatory updates",
                  "Gain actionable insights with advanced analytics",
                  "Collaborate seamlessly across teams and locations",
                  "Scale effortlessly with multi-entity support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-[#00C853] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6">Platform Highlights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-[#0066FF] mb-1">Multi-Framework Support</div>
                  <div className="text-sm text-muted-foreground">GRI, ISSB, SASB, TCFD, CSRD, BRSR, and more</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-[#00C853] mb-1">AI-Powered Insights</div>
                  <div className="text-sm text-muted-foreground">Automated recommendations and risk detection</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-600 mb-1">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">SOC 2, ISO 27001 compliant infrastructure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#00C853] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform Your ESG Management Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join leading organizations using ESGTech.ai to drive sustainability excellence
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90">
                Schedule Platform Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
