import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function TCFDPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white">TCFD Framework</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Task Force on Climate-related Financial Disclosures</h1>
            <p className="text-xl text-white/90 mb-8">
              Comprehensive climate risk reporting across governance, strategy, risk management, and metrics
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-[#0066FF]">
                Get Expert Guidance <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
