import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Recycle, ArrowRight } from "lucide-react";

export default function ChemicalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white">Chemicals Industry</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sustainable Chemical Production</h1>
            <p className="text-xl text-white/90 mb-8">
              Navigate complex ESG requirements and achieve sustainable growth in the chemicals sector
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#0066FF]">
                Learn More <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
