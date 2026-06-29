import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CarbonAccountingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white">Carbon Management</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Carbon Accounting & GHG Emissions Measurement</h1>
            <p className="text-xl text-white/90 mb-8">
              Accurate measurement and management of your carbon footprint across Scope 1, 2, and 3 emissions
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#0066FF] hover:bg-white/90">
                Request Consultation <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#0066FF]">Scope 1 Emissions</h3>
              <p className="text-muted-foreground">Direct emissions from owned or controlled sources including facilities, vehicles, and processes</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-[#00C853]">Scope 2 Emissions</h3>
              <p className="text-muted-foreground">Indirect emissions from purchased electricity, steam, heating, and cooling</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-600">Scope 3 Emissions</h3>
              <p className="text-muted-foreground">All other indirect emissions in your value chain including suppliers and customers</p>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
