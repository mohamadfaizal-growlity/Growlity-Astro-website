import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Linkedin, Twitter, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer({ siteLogo = "/growlity-logo.png" }: { siteLogo?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-slate-600 border-t border-gray-200">
      {/* Testimonials (Global) */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#0066FF]/10 text-[#0066FF] hover:bg-[#0066FF]/20 border-0">Client Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">
              On the side of <span className="text-[#0066FF]">ambitious action</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Trusted by global leaders to drive measurable ESG impact and sustainable growth.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-2xl hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed italic flex-grow">"This recognition aligned and unified our ESG efforts globally. Thanks to Growlity, our governance and disclosures reached new heights."</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                {/* For future: replace this URL with your actual image path like "/images/don-stover.jpg" */}
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150" alt="Mr. Don Stover" className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm" />
                <div>
                  <div className="font-bold text-gray-900">Mr. Don Stover</div>
                  <div className="text-xs text-gray-500 mb-1">Director of Corporate Quality</div>
                  <div className="text-xs font-semibold text-[#00C853]">APackaging Group LLC</div>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-2xl hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Top 1% Global</div>
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed italic flex-grow">"Rated in the top 1%, this reflects our core belief: sustainability is central to business, not separate — it's how we create lasting impact."</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                {/* For future: replace this URL with your actual image path like "/images/gyanesh-chaudhary.jpg" */}
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150" alt="Mr. Gyanesh Chaudhary" className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm" />
                <div>
                  <div className="font-bold text-gray-900">Mr. Gyanesh Chaudhary</div>
                  <div className="text-xs text-gray-500 mb-1">Chairman & Managing Director</div>
                  <div className="text-xs font-semibold text-[#0066FF]">Vikram Solar Group</div>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-2xl hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed italic flex-grow">"Receiving the EcoVadis Gold Medal is a proud milestone in our sustainability journey, reflecting our focused efforts to embed ESG at the core."</p>
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                {/* For future: replace this URL with your actual image path like "/images/sanjay-kumar.jpg" */}
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" alt="Mr. Sanjay Kumar" className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm" />
                <div>
                  <div className="font-bold text-gray-900">Mr. Sanjay Kumar</div>
                  <div className="text-xs text-gray-500 mb-1">Chief Strategy & Sustainability</div>
                  <div className="text-xs font-semibold text-[#00C853]">Granules India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
