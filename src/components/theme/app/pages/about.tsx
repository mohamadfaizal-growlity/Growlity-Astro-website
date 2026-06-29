import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Globe, Users, Award, TrendingUp, Target, Leaf, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Excellence", description: "Delivering world-class ESG solutions" },
    { icon: Leaf, title: "Sustainability", description: "Committed to positive environmental impact" },
    { icon: Users, title: "Collaboration", description: "Partnering for shared success" },
    { icon: Award, title: "Innovation", description: "Pioneering AI-powered ESG technology" }
  ];

  const milestones = [
    { year: "2015", event: "Founded Growlity" },
    { year: "2018", event: "500+ Clients Milestone" },
    { year: "2020", event: "Launched ESGTech.ai Platform" },
    { year: "2023", event: "Global Expansion - 50+ Countries" },
    { year: "2025", event: "1000+ ESG Projects Delivered" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">About Growlity</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Leading the ESG Transformation
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Empowering organizations worldwide to achieve sustainable growth through expert ESG consulting 
              and innovative AI-powered technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-[#0066FF]">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 text-[#0066FF]">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To accelerate the global transition to sustainable business practices by providing 
                  world-class ESG consulting services and cutting-edge technology solutions that drive 
                  measurable impact.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#00C853]">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 text-[#00C853]">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be the most trusted global partner for ESG transformation, enabling every organization 
                  to achieve net-zero emissions and create lasting positive impact for people and planet.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">Key milestones in our growth story</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{milestone.year}</span>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="py-6">
                      <p className="text-lg font-semibold">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Us on the Journey</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Partner with Growlity to transform your sustainability ambitions into reality
            </p>
            <a href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844]">
                Get Started
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
