import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Award, TrendingUp, CheckCircle2, Quote, ArrowRight } from "lucide-react";

export default function CustomerSuccessPage() {
  const caseStudies = [
    {
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      achievement: "Achieved EcoVadis Gold Medal",
      impact: "35% reduction in carbon emissions"
    },
    {
      company: "Pharma Innovations Ltd",
      industry: "Pharmaceuticals",
      achievement: "CDP A-List Status",
      impact: "Net Zero commitment by 2035"
    },
    {
      company: "Chemical Solutions Inc",
      industry: "Chemicals",
      achievement: "ISO 14001 Certification",
      impact: "50% waste reduction"
    }
  ];

  const testimonials = [
    {
      quote: "Growlity transformed our ESG strategy and helped us achieve our sustainability goals ahead of schedule.",
      author: "Sarah Johnson",
      title: "Chief Sustainability Officer",
      company: "Fortune 500 Company"
    },
    {
      quote: "The ESGTech.ai platform streamlined our reporting process and saved us countless hours of manual work.",
      author: "Michael Chen",
      title: "ESG Director",
      company: "Global Enterprise"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">Success Stories</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Success Stories</h1>
            <p className="text-xl text-white/90">
              Real results from organizations transforming their ESG performance
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Case Studies</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{study.company}</CardTitle>
                  <CardDescription>{study.industry}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-[#00C853] flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">{study.achievement}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-5 w-5 text-[#0066FF] flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{study.impact}</span>
                    </div>
                  </div>
                  <Button variant="link" className="mt-4 p-0 text-[#0066FF]">
                    Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-[#0066FF] mb-4" />
                  <p className="text-lg mb-6 italic">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
