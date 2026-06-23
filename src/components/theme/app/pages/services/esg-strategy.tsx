import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Target, CheckCircle2, ArrowRight, TrendingUp, Users, FileText, BarChart3 } from "lucide-react";

export default function ESGStrategyPage() {
  const benefits = [
    "Clear ESG vision and objectives aligned with business goals",
    "Enhanced stakeholder trust and investor confidence",
    "Improved risk management and regulatory compliance",
    "Competitive advantage through sustainability leadership",
    "Cost reduction through operational efficiency",
    "Access to ESG-linked financing and investment"
  ];

  const process = [
    {
      step: "1",
      title: "ESG Assessment",
      description: "Comprehensive baseline assessment of current ESG performance, identifying strengths, gaps, and opportunities"
    },
    {
      step: "2",
      title: "Materiality Analysis",
      description: "Identification and prioritization of ESG issues most relevant to your business and stakeholders"
    },
    {
      step: "3",
      title: "Strategy Development",
      description: "Creation of a tailored ESG strategy with clear goals, KPIs, and alignment with global frameworks"
    },
    {
      step: "4",
      title: "Roadmap Creation",
      description: "Development of a phased implementation roadmap with timelines, responsibilities, and milestones"
    },
    {
      step: "5",
      title: "Implementation Support",
      description: "Hands-on support for execution, change management, and stakeholder engagement"
    },
    {
      step: "6",
      title: "Monitoring & Optimization",
      description: "Continuous tracking, reporting, and refinement to ensure sustained progress and impact"
    }
  ];

  const deliverables = [
    "ESG Maturity Assessment Report",
    "Materiality Assessment Matrix",
    "Comprehensive ESG Strategy Document",
    "3-5 Year ESG Roadmap",
    "KPI Framework & Dashboard",
    "Governance Structure Recommendations",
    "Stakeholder Engagement Plan",
    "Implementation Toolkit"
  ];

  const faqs = [
    {
      question: "What is ESG Strategy?",
      answer: "ESG Strategy is a comprehensive plan that integrates Environmental, Social, and Governance factors into your core business strategy. It defines your sustainability vision, sets measurable goals, and creates a roadmap for achieving positive impact while driving business value."
    },
    {
      question: "How long does it take to develop an ESG Strategy?",
      answer: "Typically, developing a comprehensive ESG Strategy takes 8-12 weeks, depending on the organization's size, complexity, and data availability. This includes stakeholder consultations, materiality assessment, strategy development, and roadmap creation."
    },
    {
      question: "Which frameworks do you align with?",
      answer: "We align ESG strategies with leading global frameworks including GRI, ISSB, SASB, TCFD, UN SDGs, and industry-specific standards. We ensure your strategy meets both current and emerging regulatory requirements."
    },
    {
      question: "How do you measure ESG performance?",
      answer: "We establish a comprehensive KPI framework tailored to your material issues, aligned with industry benchmarks and investor expectations. This includes both quantitative metrics (emissions, diversity %, etc.) and qualitative indicators, tracked through our ESGTech.ai platform."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">ESG Consulting</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ESG Strategy Development</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Build a robust ESG strategy that drives sustainable value creation, enhances stakeholder trust, 
              and positions your organization for long-term success in a rapidly evolving business landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90">
                  Request Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Download Guide
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why ESG Strategy Matters</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In today's business environment, ESG is no longer optional—it's essential. Investors, customers, 
                employees, and regulators are demanding greater transparency and accountability on sustainability issues.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A well-crafted ESG strategy helps you navigate this landscape, turning sustainability challenges 
                into competitive advantages while creating lasting value for all stakeholders.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#0066FF]/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-4 w-4 text-[#0066FF]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Strategic Alignment</div>
                    <div className="text-muted-foreground">Integrate ESG into core business objectives and decision-making</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-[#00C853]" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Value Creation</div>
                    <div className="text-muted-foreground">Drive innovation, efficiency, and new revenue opportunities</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Stakeholder Trust</div>
                    <div className="text-muted-foreground">Build credibility with investors, customers, and communities</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Key Components</h3>
              <div className="space-y-4">
                {[
                  "Vision & Mission Alignment",
                  "Materiality Assessment",
                  "Goal Setting & KPIs",
                  "Governance Structure",
                  "Risk & Opportunity Analysis",
                  "Stakeholder Engagement Plan",
                  "Implementation Roadmap",
                  "Monitoring & Reporting Framework"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Business Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive ESG strategy delivers tangible value across your organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Methodology</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven 6-step approach to developing and implementing your ESG strategy
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl font-bold text-[#0066FF]/5">
                  {item.step}
                </div>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What You'll Receive</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive deliverables to guide your ESG journey
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {deliverables.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                  <FileText className="h-5 w-5 text-[#0066FF] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0066FF] to-[#00C853] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your ESG Strategy?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Connect with our ESG experts to start your sustainability transformation journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/esgtech">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore ESGTech.ai
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
