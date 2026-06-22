import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0066FF] to-[#00C853] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white">Contact Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Start Your ESG Journey</h1>
            <p className="text-xl text-white/90">
              Connect with our ESG experts to discuss your sustainability goals
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (234) 567-8900" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your ESG goals and how we can help..."
                        rows={6}
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#0066FF] to-[#00C853] hover:from-[#0052CC] hover:to-[#00A844]">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#0066FF]" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="mailto:info@growlity.com" className="text-[#0066FF] hover:underline">
                    info@growlity.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#00C853]" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a href="tel:+1234567890" className="text-[#00C853] hover:underline">
                    +1 (234) 567-890
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    Mon-Fri: 9AM - 6PM EST
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#0066FF]" />
                    Global Offices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="font-semibold">United States</div>
                      <div className="text-muted-foreground">New York, NY</div>
                    </div>
                    <div>
                      <div className="font-semibold">United Kingdom</div>
                      <div className="text-muted-foreground">London</div>
                    </div>
                    <div>
                      <div className="font-semibold">India</div>
                      <div className="text-muted-foreground">Mumbai, Bangalore</div>
                    </div>
                    <div>
                      <div className="font-semibold">UAE</div>
                      <div className="text-muted-foreground">Dubai</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to connect with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00C853] flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Request Demo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See ESGTech.ai in action
                </p>
                <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC]">
                  Schedule Demo
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#00C853] to-[#0066FF] flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Book Consultation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Talk to our ESG experts
                </p>
                <Button className="w-full bg-[#00C853] hover:bg-[#00A844]">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-[#0066FF] flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Request Proposal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a custom solution
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Get Proposal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
