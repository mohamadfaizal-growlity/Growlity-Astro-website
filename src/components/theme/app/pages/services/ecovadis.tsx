import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Award, ArrowRight } from "lucide-react";

export default function EcoVadisPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white">EcoVadis Consulting</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">EcoVadis Assessment & Medal Achievement</h1>
            <p className="text-xl text-white/90 mb-8">
              Expert guidance to achieve Bronze, Silver, Gold, or Platinum EcoVadis ratings
            </p>
            <a href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600">
                Improve Your Score <ArrowRight className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
