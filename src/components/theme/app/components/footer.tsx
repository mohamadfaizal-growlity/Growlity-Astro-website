import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Linkedin, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer({ siteLogo = "/growlity-logo.png" }: { siteLogo?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] text-slate-300 border-t border-slate-800">
      {/* Top Newsletter Section */}
      <div className="border-b border-slate-800/60 bg-slate-900/50">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h4 className="text-2xl font-bold text-white mb-2">Stay Ahead in ESG & Sustainability</h4>
            <p className="text-slate-400">
              Join thousands of professionals receiving our latest insights, regulatory updates, and best practices.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <Input 
              placeholder="Enter your work email" 
              type="email" 
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 w-full sm:w-72 focus-visible:ring-[#00C853]" 
            />
            <Button className="bg-[#00C853] hover:bg-[#00e65e] text-slate-900 font-semibold px-8">
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
            <div className="bg-white/5 inline-block p-2 rounded-xl mb-6 backdrop-blur-sm border border-white/10">
              <img src={siteLogo} alt="Growlity Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Growth with Sustainability. We are your trusted global partner for ESG transformation, climate action, and sustainable business practices.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0066FF] hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ff0000] hover:text-white transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/solutions/esg-strategy" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> ESG Strategy</a></li>
              <li><a href="/solutions/carbon-accounting" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> Carbon Accounting</a></li>
              <li><a href="/solutions/net-zero" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> Net Zero Advisory</a></li>
              <li><a href="/solutions/esg-reporting" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> ESG Reporting</a></li>
              <li><a href="/solutions/ecovadis" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> EcoVadis</a></li>
              <li><a href="/solutions/cdp" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> CDP</a></li>
            </ul>
          </div>

          {/* Solutions & Company combined for better layout */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/about" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> About Us</a></li>
              <li><a href="/case-studie" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> Case Studies</a></li>
              <li><a href="/resources" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> Resources</a></li>
              <li><a href="/esgtech" className="hover:text-[#0066FF] font-medium transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span> ESGTech.ai</a></li>
              <li><a href="/careers" className="hover:text-[#00C853] transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#00C853] transition-colors"></span> Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Global Presence</h4>
            <div className="space-y-6 text-slate-400">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
                  <MapPin className="h-5 w-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Office Locations</p>
                  <p className="text-sm leading-relaxed">USA • UK • India • UAE</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
                  <Mail className="h-5 w-5 text-[#0066FF]" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email Us</p>
                  <a href="mailto:info@growlity.com" className="text-sm hover:text-[#0066FF] transition-colors">info@growlity.com</a>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700">
                  <Phone className="h-5 w-5 text-[#00C853]" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Call Us</p>
                  <a href="tel:+1234567890" className="text-sm hover:text-[#00C853] transition-colors">+1 (234) 567-890</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/60 bg-[#0b1120]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} Growlity. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
