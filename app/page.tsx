"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  MapPin,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Briefcase,
  Globe,
  Monitor,
  Database,
  Lock,
  Palette,
  ArrowRight,
  Mail,
  Phone,
  BarChart,
  Shield,
  Send,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// Simple WhatsApp SVG component since it's missing from Lucide
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [demoUrl, setDemoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Initialize EmailJS early
    emailjs.init("1j5oivNALyGdQSNaK");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      phone: formData.get("phone") || "Not provided",
      message: formData.get("message"),
      to_email: "solutions@austivetechs.co.za",
    };

    try {
      await emailjs.send("service_5n22mrr", "template_s9hht8n", templateParams);
      setFormStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      setFormStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus({ type: null, message: "" }), 8000);
    }
  };

  const openDemo = (type: string) => {
    const validDemos: Record<string, string> = {
      lms: "https://austivetechs.co.za/demos/lms/login.php",
      sms: "https://austivetechs.co.za/demos/sms",
      web: "https://austivetechs.co.za/demos/web",
    };

    if (validDemos[type]) {
      setDemoUrl(validDemos[type]);
    } else {
      alert("Demo not available. Please contact us for more information.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-blue/20">
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-slate-200 ${
          isScrolled ? "h-16" : "h-20"
        } px-6 md:px-12 flex justify-between items-center`}
      >
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <a
            href="#home"
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-sky-blue to-navy rounded-lg"></div>
            <span className="text-lg md:text-xl font-black tracking-tighter text-navy uppercase">
              Austive <span className="text-sky-blue">Technologies</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 uppercase tracking-widest">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-navy transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="text-sky-blue hover:text-navy transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-navy p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-8 pb-8 flex flex-col gap-6 w-full shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-navy py-4 border-b border-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-6 border border-slate-200 text-sky-blue hover:text-navy text-center py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-colors shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50"
      >
        <div className="absolute inset-0 hidden">
          <Image
            src="https://picsum.photos/seed/austivehero/1920/1080"
            alt="Hero Background"
            fill
            className="object-cover opacity-0"
            priority
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="px-3 py-1 bg-blue-100 text-sky-blue text-xs font-bold rounded-full uppercase tracking-tighter mb-6 inline-block">
              Next-Gen Software Partner
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-navy mb-6 leading-[0.95] tracking-tight !text-balance">
              Smart Software <br className="hidden md:block"/>
              <span className="text-sky-blue">Solutions</span> for <br className="hidden md:block"/>
              Modern Business
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto !text-balance">
              Specializing in Loan Management Systems, custom web portals, and system integrations that automate your workflow and scale your growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => openDemo("lms")}
                className="w-full sm:w-auto bg-navy hover:bg-[#253a7a] text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Briefcase size={16} /> Try LMS Demo
              </button>
              <a
                href="#services"
                className="w-full sm:w-auto bg-white border border-slate-200 text-slate-500 hover:text-navy hover:border-slate-300 px-8 py-3 rounded-xl font-bold text-sm transition-colors text-center shadow-sm"
              >
                Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy tracking-tight mb-2">
              About Austive Technologies
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-2xl mx-auto">
              Your trusted partner in digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              <Image
                src="https://picsum.photos/seed/austiveteam/800/600"
                width={800}
                height={600}
                alt="Professional software development team"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-black text-navy mb-6 tracking-tight">
                Empowering Businesses Through Technology
              </h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                At Austive Technologies, we specialize in delivering innovative software solutions that drive business growth and digital transformation. Our team of experienced developers and consultants is dedicated to providing cutting-edge technology services tailored to your unique business needs.
              </p>
              <p className="text-slate-500 mb-10 leading-relaxed">
                From custom Loan Management Systems to enterprise web applications, we leverage modern technologies and best practices to help your business stay competitive in today&apos;s rapidly evolving digital landscape.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10+", label: "Live Projects" },
                  { value: "5+", label: "Happy Clients" },
                  { value: "99.9%", label: "Uptime Sync" },
                ].map((stat, i) => (
                  <div key={i} className="flex gap-4">
                    {i > 0 && <div className="hidden sm:block h-8 w-px bg-slate-200 my-auto -ml-2"></div>}
                    <div>
                      <div className="text-2xl font-black text-navy">{stat.value}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy tracking-tight mb-2">
              Our Services
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-2xl mx-auto">
              Comprehensive software solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Loan Management Systems",
                img: "https://picsum.photos/seed/finance/600/400",
                icon: <Briefcase size={24} className="text-sky-blue mb-4" />,
                desc: "Complete end-to-end borrower workflows, automated repayment tracking, digital contracts, and comprehensive reporting.",
              },
              {
                title: "Web Applications",
                img: "https://picsum.photos/seed/webapp/600/400",
                icon: <Monitor size={24} className="text-sky-blue mb-4" />,
                desc: "Custom portals, RESTful APIs, business automation tools, and enterprise-grade systems built with modern frameworks.",
              },
              {
                title: "System Integrations",
                img: "https://picsum.photos/seed/integration/600/400",
                icon: <Database size={24} className="text-sky-blue mb-4" />,
                desc: "Seamless payment gateway integrations, SMS API connections, identity verification, and third-party synchronization.",
              },
              {
                title: "IT Consulting",
                img: "https://picsum.photos/seed/consulting/600/400",
                icon: <BarChart size={24} className="text-sky-blue mb-4" />,
                desc: "Strategic technology consulting to optimize processes and leverage technology for competitive advantage.",
              },
              {
                title: "Security & Compliance",
                img: "https://picsum.photos/seed/security/600/400",
                icon: <Shield size={24} className="text-sky-blue mb-4" />,
                desc: "Security audits, data protection strategies, compliance consulting, and standard security protocol implementation.",
              },
              {
                title: "UI/UX Design",
                img: "https://picsum.photos/seed/design/600/400",
                icon: <Palette size={24} className="text-sky-blue mb-4" />,
                desc: "User-centered design solutions that create intuitive, engaging digital experiences driving conversions.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                <div className="hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  {service.icon}
                  <h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sky-blue text-xs font-bold uppercase tracking-widest hover:text-navy transition-colors group/link mt-auto"
                  >
                    Learn More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy tracking-tight mb-2">
              Our Portfolio
            </h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest max-w-2xl mx-auto">
              Explore our successful projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: "lms", title: "Loan Management", desc: "Complete borrower management with payment tracking" },
              { id: "sms", title: "Student Management", desc: "Education platform with enrollment and grading" },
              { id: "web", title: "Business Web Apps", desc: "Custom portals and dashboards for various needs" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => openDemo(item.id)}
                className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-end p-6"
              >
                <Image
                  src={`https://picsum.photos/seed/${item.id}portfolio/600/800`}
                  alt={item.title}
                  fill
                  className="object-cover opacity-80 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="text-[10px] text-sky-blue font-bold uppercase tracking-widest mb-1">Live Demo</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-navy relative border-t border-slate-200 shadow-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Contact Info (Left aligned now) */}
          <div className="lg:col-span-5 text-white">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Let&apos;s Build <br/>Something Great
            </h2>
            <p className="text-sky-blue/80 mb-10 max-w-md text-sm uppercase tracking-widest font-bold">
              Get in touch to discuss your next project
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-5 text-white">
              
              <div className="space-y-6">
                <a 
                  href="mailto:solutions@austivetechs.co.za"
                  className="flex items-center gap-4 hover:bg-white/5 p-3 -ml-3 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-sky-blue transition-colors text-white">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Email</div>
                    <p className="text-sm text-white/90 group-hover:text-white transition-colors">solutions@austivetechs.co.za</p>
                  </div>
                </a>

                {/* Updated Phone to include WhatsApp integration and tel link */}
                <div className="flex items-center gap-4 group p-3 -ml-3 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Phone / WhatsApp</div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center text-sm">
                       <a href="tel:0645480833" className="text-white/90 hover:text-white transition-colors block w-fit">
                         064 548 0833
                       </a>
                       <a href="https://wa.me/27645480833" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#25D366]/20 text-[#25D366] px-2.5 py-1 rounded text-xs font-bold border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-colors w-fit">
                         <WhatsAppIcon className="w-3 h-3" /> Chat
                       </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 group p-3 -ml-3 rounded-xl">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Location</div>
                    <p className="text-sm text-white/90">South Africa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-slate-200">
              <h3 className="text-2xl font-bold text-navy mb-1">Inquire Now</h3>
              <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">Our team responds within 2 business hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={100}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-blue transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={100}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={20}
                    placeholder="+27 12 345 6789"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-blue transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Brief</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={1000}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl h-32 resize-none text-sm focus:outline-none focus:border-sky-blue transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy text-white font-bold py-3 mt-4 rounded-xl text-sm hover:bg-[#253a7a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Proposal Request"
                  )}
                </button>

                {formStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg text-xs text-center font-bold uppercase tracking-widest mt-4 border ${
                      formStatus.type === "success" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-blue opacity-10 rounded-full blur-3xl -mr-32 -mt-32 hidden md:block"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold opacity-5 rounded-full blur-3xl -ml-40 -mb-40 hidden md:block"></div>
      </section>

      {/* Compact Footer */}
      <footer className="bg-white px-6 md:px-12 py-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} AUSTIVE TECHNOLOGIES. ALL RIGHTS RESERVED. SOUTH AFRICA
          </div>
          <div className="text-[10px] text-slate-400 font-bold flex flex-wrap justify-center gap-4 uppercase tracking-widest">
             <span>LMS</span> <span className="text-slate-200">•</span> <span>WEB</span> <span className="text-slate-200">•</span> <span>API</span> <span className="text-slate-200">•</span> <span>SECURITY</span>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <AnimatePresence>
        {demoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy/90 backdrop-blur-sm"
            onClick={() => setDemoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-navy p-4 flex justify-between items-center text-white shrink-0">
                <span className="font-bold flex items-center gap-2">
                  <Globe size={18} /> Demo Viewer
                </span>
                <button
                  onClick={() => setDemoUrl(null)}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <iframe
                src={demoUrl}
                title="Demo"
                className="w-full flex-1 border-0"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
