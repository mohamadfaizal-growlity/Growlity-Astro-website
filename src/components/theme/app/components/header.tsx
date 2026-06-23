import { useState } from "react";
import { Button } from "./ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Menu, X, ChevronDown, Sparkles, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header({ siteLogo = "/growlity-logo.png" }: { siteLogo?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState("Strategy and Advisory");
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const services = [
    {
      category: "Strategy and Advisory",
      items: [
        { name: "ESG Assessment", href: "/services" },
        { name: "Net Zero & Decarbonisation", href: "/services" },
        { name: "Science Based Targets Initiative (SBTi)", href: "/services" },
        { name: "Lifecycle Assessment (LCA)", href: "/services" },
        { name: "Product Carbon Footprint (PCF)", href: "/services" },
        { name: "Sustainable Development Goals", href: "/services" },
        { name: "Carbon Credits", href: "/services" },
      ]
    },
    {
      category: "Ratings and Disclosures",
      items: [
        { name: "EcoVadis Assessment", href: "/services" },
        { name: "Carbon Disclosure Project (CDP)", href: "/services" },
        { name: "Environmental Product Declaration (EPD)", href: "/services" },
        { name: "S&P ESG Score", href: "/services" },
        { name: "Sustainalytics ESG Rating Support", href: "/services" },
      ]
    },
    {
      category: "Certifications",
      items: [
        { name: "RJC Certification", href: "/services" },
        { name: "SCS-007 (Diamonds)", href: "/services" },
        { name: "ISO Certification", href: "/services" },
        { name: "Green Building Certification", href: "/services" },
        { name: "B-Corporation", href: "/services" },
        { name: "SA8000 Consulting Services", href: "/services" },
      ]
    },
    {
      category: "Reporting and Training",
      items: [
        { name: "Annual Sustainability Report (ASR)", href: "/services" },
        { name: "ESG Reporting", href: "/services" },
        { name: "BRSR", href: "/services" },
        { name: "Materiality Assessment", href: "/services" },
        { name: "GHG Emissions & Inventory Accounting", href: "/services" },
        { name: "CBAM Reporting", href: "/services" },
        { name: "ESG Assurance", href: "/services" },
        { name: "Value Chain Partner Assessment", href: "/services" },
        { name: "Climate Risk Assessment", href: "/services" },
      ]
    },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0066FF] to-[#00C853] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>New: ESGTech.ai Platform Now Available - Request Your Demo Today</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <img src={siteLogo} alt="Growlity Logo" className="h-10 w-auto object-contain" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>About us</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <a href="/about" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Our Company</a>
                        </li>
                        <li>
                          <a href="/about/initiatives" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Our Initiatives</a>
                        </li>
                        <li>
                          <a href="/about/collaborations" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Our Collaborations</a>
                        </li>
                        <li>
                          <a href="/about/team" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Our Team</a>
                        </li>
                        <li>
                          <a href="/about/careers" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Careers</a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent className="md:-left-48">
                      <div className="flex w-[920px] min-h-[350px] p-6">
                        {/* Left column: Categories */}
                        <div className="w-[300px] shrink-0 border-r pr-6 flex flex-col gap-2">
                          {services.map((cat) => (
                            <button
                              key={cat.category}
                              onMouseEnter={() => setActiveService(cat.category)}
                              onClick={() => setActiveService(cat.category)}
                              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors text-left ${
                                activeService === cat.category 
                                  ? 'bg-[#0066FF]/10 text-[#0066FF]' 
                                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                              }`}
                            >
                              <span>{cat.category}</span>
                              <ChevronRight className={`h-4 w-4 ${activeService === cat.category ? 'opacity-100' : 'opacity-0 -translate-x-2'} transition-all`} />
                            </button>
                          ))}
                        </div>
                        {/* Right column: Items */}
                        <div className="flex-1 pl-8 py-2">
                          <h4 className="mb-6 text-base font-semibold text-[#0066FF]">
                            {activeService}
                          </h4>
                          <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                            {services.find(c => c.category === activeService)?.items.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors py-1"
                                >
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <a href="/customers">
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        Customers
                      </NavigationMenuLink>
                    </a>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <a href="/blogs" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Blogs</a>
                        </li>
                        <li>
                          <a href="/case-studies" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Case Studies</a>
                        </li>
                        <li>
                          <a href="/webinars" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Webinars</a>
                        </li>
                        <li>
                          <a href="/publications" className="block text-sm text-muted-foreground hover:text-[#0066FF] transition-colors">Publications</a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <a href="/contact" className="hidden md:block">
                <Button variant="outline" className="border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white">
                  Login
                </Button>
              </a>
              <a href="/contact">
                <Button className="bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844]">
                  Contact Us
                </Button>
              </a>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:max-w-md p-0 flex flex-col bg-slate-50/95 backdrop-blur-md border-l-0">
                  <div className="p-6 border-b bg-white flex items-center justify-between">
                    <img src={siteLogo} alt="Growlity Logo" className="h-8 w-auto object-contain" />
                  </div>
                  
                  <nav className="flex-1 flex flex-col gap-2 p-6 overflow-y-auto">
                    {/* About us Accordion */}
                    <div className="flex flex-col shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-200">
                      <button 
                        onClick={() => setOpenMobileAccordion(openMobileAccordion === 'about' ? null : 'about')}
                        className="flex items-center justify-between text-base font-semibold text-slate-800 p-4 hover:bg-slate-50 w-full text-left"
                      >
                        About us
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openMobileAccordion === 'about' ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'}`} />
                      </button>
                      {openMobileAccordion === 'about' && (
                        <div className="flex flex-col gap-2 px-4 pb-4 bg-slate-50/50">
                          <a href="/about" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Our Company</a>
                          <a href="/about/initiatives" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Our Initiatives</a>
                          <a href="/about/collaborations" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Our Collaborations</a>
                          <a href="/about/team" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Our Team</a>
                          <a href="/about/careers" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Careers</a>
                        </div>
                      )}
                    </div>

                    {/* Services Accordion */}
                    <div className="flex flex-col shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-200">
                      <button 
                        onClick={() => setOpenMobileAccordion(openMobileAccordion === 'services' ? null : 'services')}
                        className="flex items-center justify-between text-base font-semibold text-slate-800 p-4 hover:bg-slate-50 w-full text-left"
                      >
                        Services
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openMobileAccordion === 'services' ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'}`} />
                      </button>
                      {openMobileAccordion === 'services' && (
                        <div className="flex flex-col gap-4 px-4 pb-4 bg-slate-50/50">
                          {services.map((category) => (
                            <div key={category.category} className="mb-1">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-2 px-2 pt-2">{category.category}</h4>
                              <ul className="flex flex-col gap-1">
                                {category.items.map(item => (
                                  <li key={item.name}>
                                    <a href={item.href} className="block text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <a href="/customers" className="flex shrink-0 items-center text-base font-semibold text-slate-800 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:text-[#0066FF] transition-all" onClick={() => setIsOpen(false)}>
                      Customers
                    </a>

                    {/* Resources Accordion */}
                    <div className="flex flex-col shrink-0 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-200">
                      <button 
                        onClick={() => setOpenMobileAccordion(openMobileAccordion === 'resources' ? null : 'resources')}
                        className="flex items-center justify-between text-base font-semibold text-slate-800 p-4 hover:bg-slate-50 w-full text-left"
                      >
                        Resources
                        <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${openMobileAccordion === 'resources' ? 'rotate-180 text-[#0066FF]' : 'text-slate-400'}`} />
                      </button>
                      {openMobileAccordion === 'resources' && (
                        <div className="flex flex-col gap-2 px-4 pb-4 bg-slate-50/50">
                          <a href="/blogs" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Blogs</a>
                          <a href="/case-studies" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Case Studies</a>
                          <a href="/webinars" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Webinars</a>
                          <a href="/publications" className="text-sm font-medium text-slate-600 hover:text-[#0066FF] hover:bg-white p-2 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>Publications</a>
                        </div>
                      )}
                    </div>
                  </nav>

                  <div className="p-6 bg-white border-t mt-auto space-y-3 shadow-[0_-4px_20px_-15px_rgba(0,0,0,0.1)]">
                    <a href="/contact" onClick={() => setIsOpen(false)} className="block">
                      <Button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844] text-white shadow-md shadow-blue-500/20 h-12 text-base font-semibold">
                        Contact Us
                      </Button>
                    </a>
                    <a href="/login" onClick={() => setIsOpen(false)} className="block">
                      <Button variant="outline" className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0066FF] h-12 text-base font-semibold">
                        Login
                      </Button>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
