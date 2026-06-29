import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { CloudRain, ArrowRight } from "lucide-react";

export default function CDPPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-[#00C853] to-teal-600 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white">CDP Consulting</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">CDP Climate, Water & Forest Disclosure</h1>
            <p className="text-xl text-white/90 mb-8">
              Achieve A-List status with expert CDP response development and score improvement
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600">
                Improve Your Rating <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
