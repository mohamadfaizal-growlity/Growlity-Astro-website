import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Linkedin, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/growlity-logo.png" alt="Growlity Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Growth with Sustainability. Your trusted partner for ESG transformation and climate action.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#0066FF] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#0066FF] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#00C853] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#00C853] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/services/esg-strategy" className="hover:text-[#0066FF] transition-colors">ESG Strategy</a></li>
              <li><a href="/services/carbon-accounting" className="hover:text-[#0066FF] transition-colors">Carbon Accounting</a></li>
              <li><a href="/services/net-zero" className="hover:text-[#0066FF] transition-colors">Net Zero Advisory</a></li>
              <li><a href="/services/esg-reporting" className="hover:text-[#0066FF] transition-colors">ESG Reporting</a></li>
              <li><a href="/services/ecovadis" className="hover:text-[#0066FF] transition-colors">EcoVadis</a></li>
              <li><a href="/services/cdp" className="hover:text-[#0066FF] transition-colors">CDP</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/industries/manufacturing" className="hover:text-[#0066FF] transition-colors">Manufacturing</a></li>
              <li><a href="/industries/chemicals" className="hover:text-[#0066FF] transition-colors">Chemicals</a></li>
              <li><a href="/frameworks/gri" className="hover:text-[#0066FF] transition-colors">GRI Reporting</a></li>
              <li><a href="/frameworks/issb" className="hover:text-[#0066FF] transition-colors">ISSB Standards</a></li>
              <li><a href="/frameworks/tcfd" className="hover:text-[#0066FF] transition-colors">TCFD Framework</a></li>
              <li><a href="/esgtech" className="hover:text-[#0066FF] transition-colors">ESGTech.ai Platform</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-[#0066FF] transition-colors">About Us</a></li>
              <li><a href="/customer-success" className="hover:text-[#0066FF] transition-colors">Case Studies</a></li>
              <li><a href="/resources" className="hover:text-[#0066FF] transition-colors">Resources</a></li>
              <li><a href="/contact" className="hover:text-[#0066FF] transition-colors">Contact Us</a></li>
              <li><a href="/careers" className="hover:text-[#0066FF] transition-colors">Careers</a></li>
              <li><a href="/partners" className="hover:text-[#0066FF] transition-colors">Partners</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-[#0066FF]" />
                <a href="mailto:info@growlity.com" className="hover:text-[#0066FF] transition-colors">
                  info@growlity.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-[#00C853]" />
                <a href="tel:+1234567890" className="hover:text-[#00C853] transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[#0066FF]" />
                <span>Global Offices:<br />USA, UK, India, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-2xl">
            <h4 className="font-semibold mb-2">Subscribe to ESG Insights</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest ESG trends, regulations, and best practices delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" type="email" className="max-w-xs" />
              <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Growlity. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <a href="/privacy" className="hover:text-[#0066FF] transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#0066FF] transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-[#0066FF] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
