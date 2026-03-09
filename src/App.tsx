import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Printer,
  Package,
  Star,
  ChevronRight,
  Menu,
  X,
  Truck,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { PRODUCTS } from './constants';

const WHATSAPP_NUMBER = "917898799101"; // Updated with user's number

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleWhatsAppOrder = (productName?: string) => {
    const message = productName 
      ? `Hi Destiny Clothing, I'm interested in ordering: ${productName}. Please provide more details.`
      : `Hi Destiny Clothing, I'd like to place an order.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold tracking-tighter">DESTINY</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-sm font-bold hover:text-stone-500 transition-colors">Products</a>
              <a href="#about" className="text-sm font-bold hover:text-stone-500 transition-colors">About</a>
              <a href="#contact" className="text-sm font-bold hover:text-stone-500 transition-colors">Contact</a>
              <button 
                onClick={() => handleWhatsAppOrder()}
                className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-stone-800 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Order Now
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-serif font-bold">
              <a href="#products" onClick={() => setIsMenuOpen(false)}>Products</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <button 
                onClick={() => { handleWhatsAppOrder(); setIsMenuOpen(false); }}
                className="bg-stone-900 text-white px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" /> WhatsApp Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              Premium Clothing Solutions • India
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-8">
              Premium <br />
              <span className="italic font-normal text-stone-500">Collection.</span>
            </h1>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-4">
              Introducing our 100% Cotton, Double Bio-Washed Oversized Tees. 
              The ultimate choice for comfort, durability, and streetwear style.
            </p>
            <p className="text-xs md:text-sm text-stone-400 uppercase tracking-[0.2em] mb-10">
              We believe in <span className="font-semibold text-stone-600">quality</span>, not quantity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#products" className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white font-bold rounded-2xl hover:scale-105 transition-all">
                View Catalog
              </a>
              <button 
                onClick={() => handleWhatsAppOrder()}
                className="w-full sm:w-auto px-10 py-4 border border-stone-300 font-bold rounded-2xl hover:bg-stone-100 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-green-600" /> Order via WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-white py-10 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-6 h-6 mb-3 text-stone-400" />
              <span className="text-sm font-bold">Pan India Delivery</span>
              <span className="text-xs text-stone-500">Contact for bulk and corporate orders</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-6 h-6 mb-3 text-stone-400" />
              <span className="text-sm font-bold">Quality Assured</span>
              <span className="text-xs text-stone-500">Premium GSM fabrics only</span>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="w-6 h-6 mb-3 text-stone-400" />
              <span className="text-sm font-bold">Secure Payments</span>
              <span className="text-xs text-stone-500">Online payments for all orders</span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 px-4 py-3 text-[11px] text-stone-100 text-center sm:text-left"
          >
            <p>
              Minimum order value is <span className="font-bold">₹999</span> and bulk order MOQ is{' '}
              <span className="font-bold">25 pieces</span>. Delivery charges are applicable based on location and order
              size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Our Catalog</h2>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Round Neck', 'Polos'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                      activeCategory === cat ? "bg-stone-900 text-white" : "bg-white border border-stone-200 text-stone-500 hover:bg-stone-50"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-sm text-stone-400 italic">Tap on a product to order via WhatsApp</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                onClick={() => handleWhatsAppOrder(product.name)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-stone-200 mb-4 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.name.includes('220 GSM') && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Premium Choice
                      </span>
                    </div>
                  )}
                  {product.name.includes('Signature') && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Signature Series
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-xl">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-stone-900 text-white px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              One Stop Solution <br />
              <span className="italic font-normal text-stone-400">For Your Clothing Needs.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Premium Collection</h4>
                  <p className="text-stone-400 text-sm">From 180 GSM basics to 350 GSM winter essentials. 100% Cotton, Double Bio-Washed for a soft, durable finish.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Custom Printing</h4>
                  <p className="text-stone-400 text-sm">State of the art DTF and Screen printing services. Your designs, our high-quality execution.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Quality & Comfort</h4>
                  <p className="text-stone-400 text-sm">Our collection features French Terry, Matty, and Fleece fabrics. Designed for the bold, crafted for the comfortable.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-full border border-white/10 absolute -top-20 -right-20 w-[120%] animate-pulse" />
            <img 
              src="/images/220gsm-rack.png"
              alt="Destiny Clothing premium t-shirt collection on display" 
              className="rounded-3xl relative z-10 shadow-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

     {/* Meet the Product Head Section */}
      <section className="py-24 bg-stone-50 px-4 border-b border-stone-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center justify-items-center">
          
          {/* Text Section - Left Side */}
          <div className="order-1 md:justify-self-end max-w-md group/text">
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 block">The Visionary</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight text-stone-900">
              Head of Product &amp; Design
            </h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-stone-900 mb-1 text-balance">Akash Singh Chauhan</h3>
              <p className="text-stone-500 italic text-sm">Head of Product &amp; Design, Destiny</p>
            </div>

            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              With over 20 years of experience in apparel and product design, Akash Singh Chauhan leads every aspect of Destiny&apos;s clothing vision—from first sketch to final stitch.
            </p>

            <p className="text-stone-500 leading-relaxed mb-8 text-sm">
              Akash is responsible for everything related to product: clothing design concepts, fabric sourcing, and quality control, ensuring a balance of comfort and streetwear style.
            </p>

            {/* Quality Badge with Hover Effect */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-200 inline-flex shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-stone-900" />
              </div>
              <div>
                <p className="text-xs font-bold">Commitment to Quality</p>
                <p className="text-[10px] text-stone-400">Every piece is personally inspected</p>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-2 md:justify-self-start group/image">
            <div className="relative inline-block">
              <img 
                src="/images/founder.png" 
                alt="Akash Singh Chauhan" 
                className="rounded-3xl shadow-2xl grayscale group-hover/image:grayscale-0 transition-all duration-700 max-w-sm w-full"
                loading="lazy"
              />
              
              {/* Experience Badge with complementary hover lift */}
              <div className="absolute -bottom-6 -left-6 bg-stone-900 text-white p-5 rounded-2xl shadow-xl max-w-[150px] group-hover/image:-translate-y-2 transition-transform duration-500">
                <p className="text-2xl font-serif font-bold leading-none mb-1">20+</p>
                <p className="text-[9px] uppercase tracking-widest opacity-80 leading-tight">Years Experience in Product &amp; Design</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Get In Touch</h2>
          <p className="text-stone-500 mb-12">Have questions about our collection or custom orders? We're just a message away.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-all">
              <Phone className="w-6 h-6 mx-auto mb-4 text-stone-400" />
              <h4 className="font-bold mb-1">Call Us</h4>
              <p className="text-xs text-stone-500">+91 78987 99101</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-all">
              <Mail className="w-6 h-6 mx-auto mb-4 text-stone-400" />
              <h4 className="font-bold mb-1">Email</h4>
              <p className="text-xs text-stone-500">destinygroup359@gmail.com</p>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-stone-200 hover:shadow-xl transition-all">
              <MapPin className="w-6 h-6 mx-auto mb-4 text-stone-400" />
              <h4 className="font-bold mb-1">Visit</h4>
              <p className="text-xs text-stone-500">Birla Nagar - Gwalior - MP</p>
            </div>
          </div>

          <button 
            onClick={() => handleWhatsAppOrder()}
            className="w-full py-6 bg-green-600 text-white rounded-3xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg shadow-green-200"
          >
            <MessageCircle className="w-8 h-8" /> Chat on WhatsApp
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-200 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-serif font-bold tracking-tighter">DESTINY</span>
          <div className="flex gap-8 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <a href="#products" className="hover:text-stone-900">Catalog</a>
            <a href="#about" className="hover:text-stone-900">About</a>
            <a href="#contact" className="hover:text-stone-900">Contact</a>
          </div>
          <p className="text-xs text-stone-400">© 2026 Destiny Clothing. Built for India.</p>
        </div>
      </footer>
      {/* Floating intro offer plane */}
      <div className="fixed bottom-4 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="offer-plane-track">
            <div className="offer-plane">
              <img
                src="/images/plane-main.png"
                alt="Intro offers on Destiny Clothing t-shirts"
                className="offer-plane-img"
                loading="lazy"
              />
              <span className="offer-flag">
                &nbsp;&nbsp;Intro offers: 3 round neck t-shirts for ₹999 &amp; 3 polo t-shirts for ₹1200
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
