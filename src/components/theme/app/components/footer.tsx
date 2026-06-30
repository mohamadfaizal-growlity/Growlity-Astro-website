import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Linkedin, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer({ siteLogo = "/growlity-logo.png" }: { siteLogo?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-slate-600 border-t border-gray-200">
      {/* Testimonials (Global) */}
      <section className="py-16 bg-[#F9FAFB] border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#0066FF]/10 text-[#0066FF]">Client Stories</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">On the side of ambitious action</h2>
          </div>
          
          <div className="relative group">
            <div id="testi-scroll-container" className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {/* Card 1 */}
              <div className="flex-none w-[350px] snap-center bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="text-6xl text-[#00C853]/40 font-serif leading-3 mb-4 mt-2">"</div>
                <p className="text-gray-600 mb-6 italic min-h-[100px]">This recognition aligned and unified our ESG efforts globally. Thanks to Growlity, our governance and disclosures reached new heights.</p>
                <div className="h-px bg-gray-100 mb-4 w-full"></div>
                <div className="font-bold text-gray-900">Mr. Don Stover</div>
                <div className="text-sm text-gray-500 mb-1">Director of Corporate Quality</div>
                <div className="text-sm font-semibold text-[#0066FF]">APackaging Group LLC — EcoVadis Platinum</div>
              </div>
              
              {/* Card 2 */}
              <div className="flex-none w-[350px] snap-center bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="text-6xl text-[#00C853]/40 font-serif leading-3 mb-4 mt-2">"</div>
                <p className="text-gray-600 mb-6 italic min-h-[100px]">Rated in the top 1%, this reflects our core belief: sustainability is central to business, not separate — it's how we create lasting impact.</p>
                <div className="h-px bg-gray-100 mb-4 w-full"></div>
                <div className="font-bold text-gray-900">Mr. Gyanesh Chaudhary</div>
                <div className="text-sm text-gray-500 mb-1">Chairman and Managing Director</div>
                <div className="text-sm font-semibold text-[#0066FF]">Vikram Solar Group — EcoVadis Platinum</div>
              </div>
              
              {/* Card 3 */}
              <div className="flex-none w-[350px] snap-center bg-white p-6 rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="text-6xl text-[#00C853]/40 font-serif leading-3 mb-4 mt-2">"</div>
                <p className="text-gray-600 mb-6 italic min-h-[100px]">Receiving the EcoVadis Gold Medal is a proud milestone in our sustainability journey, reflecting our focused efforts to embed ESG at the core.</p>
                <div className="h-px bg-gray-100 mb-4 w-full"></div>
                <div className="font-bold text-gray-900">Mr. Sanjay Kumar</div>
                <div className="text-sm text-gray-500 mb-1">Chief Strategy and Sustainability Officer</div>
                <div className="text-sm font-semibold text-[#0066FF]">Granules India — EcoVadis Gold</div>
              </div>
            </div>
            

          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />
      </section>

      {/* Top Newsletter Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Stay Ahead in ESG & Sustainability</h4>
            <p className="text-slate-500">
              Join thousands of professionals receiving our latest insights, regulatory updates, and best practices.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Enter your work email" 
              type="email" 
              className="bg-gray-50 border-gray-200 text-slate-900 placeholder:text-slate-400 w-full sm:w-72 focus-visible:ring-[#00C853]" 
            />
            <Button className="bg-[#00C853] hover:bg-[#00b048] text-white font-semibold px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4 pr-4">
            <div className="mb-6">
              <img src={siteLogo} alt="Growlity Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Growth with Sustainability. We are your trusted global partner for ESG transformation, climate action, and sustainable business practices.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-slate-400 hover:border-[#ff0000] hover:text-[#ff0000] transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="/solutions/esg-strategy" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> ESG Strategy</a></li>
              <li><a href="/solutions/carbon-accounting" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> Carbon Accounting</a></li>
              <li><a href="/solutions/net-zero" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> Net Zero Advisory</a></li>
              <li><a href="/solutions/esg-reporting" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> ESG Reporting</a></li>
              <li><a href="/solutions/ecovadis" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> EcoVadis</a></li>
              <li><a href="/solutions/cdp" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> CDP</a></li>
            </ul>
          </div>

          {/* Solutions & Company combined for better layout */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="/about" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> About Us</a></li>
              <li><a href="/case-studie" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> Case Studies</a></li>
              <li><a href="/resources" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> Resources</a></li>
              <li><a href="/esgtech" className="text-[#0066FF] font-medium transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span> ESGTech.ai</a></li>
              <li><a href="/careers" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#00C853] transition-colors"></span> Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Global Presence</h4>
            <div className="space-y-6 text-slate-500">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <MapPin className="h-5 w-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium mb-1">Office Locations</p>
                  <p className="text-sm leading-relaxed">USA • UK • India • UAE</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <Mail className="h-5 w-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium mb-1">Email Us</p>
                  <a href="mailto:info@growlity.com" className="text-sm hover:text-[#0066FF] transition-colors">info@growlity.com</a>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  <Phone className="h-5 w-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-slate-900 font-medium mb-1">Call Us</p>
                  <a href="tel:+1234567890" className="text-sm hover:text-[#00C853] transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} Growlity. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-slate-900 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
