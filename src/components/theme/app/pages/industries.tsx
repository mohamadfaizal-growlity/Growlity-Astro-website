import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Factory, Recycle, Building2, Zap, Package, Shirt, ArrowRight } from "lucide-react";

export default function IndustriesPage() {
  const industries = [
    { icon: Factory, title: "Manufacturing", link: "/industries/manufacturing", desc: "ESG solutions for manufacturing excellence" },
    { icon: Recycle, title: "Chemicals", link: "/industries/chemicals", desc: "Sustainable chemical production" },
    { icon: Building2, title: "Pharmaceuticals", link: "/industries", desc: "Healthcare & pharma sustainability" },
    { icon: Building2, title: "Metals & Steel", link: "/industries", desc: "Decarbonizing heavy industry" },
    { icon: Zap, title: "Renewable Energy", link: "/industries", desc: "Clean energy solutions" },
    { icon: Package, title: "FMCG & Consumer Goods", link: "/industries", desc: "Sustainable consumer products" },
    { icon: Building2, title: "Construction", link: "/industries", desc: "Green building practices" },
    { icon: Shirt, title: "Textiles & Apparel", link: "/industries", desc: "Sustainable fashion" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">Industry Expertise</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tailored ESG Solutions for Every Industry</h1>
            <p className="text-xl text-white/90">
              Deep industry knowledge and sector-specific ESG strategies
            </p>
          </div>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <a key={index} href={industry.link}>
                  <Card className="h-full hover:shadow-xl transition-all hover:border-[#0066FF] group">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{industry.title}</CardTitle>
                      <CardDescription>{industry.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-[#0066FF] text-sm font-medium">
                        Explore solutions
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
      <Footer />
    </div>
  );
}
