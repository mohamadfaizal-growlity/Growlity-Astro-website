import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, BookOpen, Video, Calendar, Download, ArrowRight } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    { icon: FileText, title: "Blog & Articles", desc: "Latest ESG trends and insights", count: "250+ Articles" },
    { icon: Download, title: "Whitepapers", desc: "In-depth research and guides", count: "50+ Downloads" },
    { icon: BookOpen, title: "ESG Guides", desc: "Framework implementation guides", count: "30+ Guides" },
    { icon: Video, title: "Webinars", desc: "Expert-led training sessions", count: "40+ Recordings" },
    { icon: Calendar, title: "Events", desc: "Industry conferences and workshops", count: "Upcoming" },
    { icon: FileText, title: "Case Studies", desc: "Real-world success stories", count: "100+ Stories" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">Resources</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ESG Knowledge Hub</h1>
            <p className="text-xl text-white/90">
              Expert insights, guides, and resources to support your ESG journey
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription>{resource.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-4">{resource.count}</Badge>
                    <Button variant="outline" className="w-full border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
