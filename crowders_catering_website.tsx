import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, Search, Filter, Plus, Minus, Trash2, X, 
  Check, Calendar, Clock, MapPin, Users, Phone, Mail, User, 
  ChefHat, Award, Star, UtensilsCrossed, ArrowRight, 
  CheckCircle2, Info, Sparkles, Heart, FileText, Truck, Flame, Cake
} from 'lucide-react';

// Inline SVG matching the Crowder's Catering logo (Plate with fork/knife loop)
const CrowdersLogo = ({ className = "h-16 w-auto" }) => (
  <div className="flex flex-col items-center justify-center text-[#7A1C29]">
    <svg 
      viewBox="0 0 500 200" 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Plate Circles */}
      <circle cx="250" cy="85" r="42" strokeWidth="3" />
      <circle cx="250" cy="85" r="32" strokeWidth="2.5" />
      
      {/* Continuous Loop Left - Fork */}
      <path d="M 150 85 C 170 65, 180 115, 195 85 L 195 65" />
      <path d="M 191 65 L 191 50 M 194 65 L 194 50 M 197 65 L 197 50 M 200 65 L 200 50" strokeWidth="2" />
      <path d="M 195 85 C 195 115, 190 120, 205 85 C 215 65, 230 100, 240 85" />

      {/* Continuous Loop Right - Knife */}
      <path d="M 260 85 C 270 70, 285 105, 295 85 C 310 50, 305 115, 305 75 C 305 55, 312 50, 312 85 L 312 120" />
      <path d="M 305 75 C 305 60, 312 55, 312 85" strokeWidth="2" fill="currentColor" />
      <path d="M 312 85 C 325 65, 335 115, 350 85" />
    </svg>
    <div className="text-center font-serif text-2xl md:text-3xl tracking-wide text-[#7A1C29] -mt-2 font-bold italic" style={{ fontFamily: 'Georgia, serif' }}>
      Crowder's Catering
    </div>
    <div className="text-xs uppercase tracking-widest text-[#5A141E] font-medium -mt-1">
      Catering Services
    </div>
  </div>
);

// Initial Menu Data focusing on Catering Quotes, Holiday Turkeys (with Oil-Less options), and Cakes
const INITIAL_MENU = [
  // HOLIDAY TURKEYS
  {
    id: 't1',
    name: 'Oil-Less Fried Holiday Turkey',
    category: 'Holiday Turkeys',
    price: 55.00,
    unit: '10-12 lbs (Feeds 6-8)',
    description: 'Crispy, golden-brown skin on the outside and juicy on the inside without oil! Prepared using radiant heat for a healthier, delicious holiday centerpice.',
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=800&q=80',
    isTurkey: true,
    prepStyles: ['Oil-Less Fried', 'Cajun Oil-Less', 'Hickory Smoked', 'Deep-Fried', 'Herb-Roasted'],
    sizeOptions: [
      { size: 'Small (10-12 lbs)', price: 55.00 },
      { size: 'Medium (13-15 lbs)', price: 62.00 },
      { size: 'Large (16-18+ lbs)', price: 70.00 }
    ],
    seasonings: ['Garlic Butter & Herb', 'Cajun Spice Rub', 'Sweet Smoked BBQ', 'Traditional Butter & Sage'],
    popular: true
  },
  {
    id: 't2',
    name: 'Signature Hickory Smoked Turkey',
    category: 'Holiday Turkeys',
    price: 55.00,
    unit: '10-12 lbs (Feeds 6-8)',
    description: 'Slow-smoked over hardwood hickory for over 8 hours. Rich, aromatic smoke flavor carved ready for your holiday meal.',
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isTurkey: true,
    prepStyles: ['Hickory Smoked', 'Oil-Less Fried', 'Deep-Fried', 'Herb-Roasted'],
    sizeOptions: [
      { size: 'Small (10-12 lbs)', price: 55.00 },
      { size: 'Medium (13-15 lbs)', price: 62.00 },
      { size: 'Large (16-18+ lbs)', price: 70.00 }
    ],
    seasonings: ['Garlic Butter & Herb', 'Cajun Spice Rub', 'Sweet Smoked BBQ'],
    popular: true
  },
  {
    id: 't3',
    name: 'Deep-Fried Seasoned Turkey',
    category: 'Holiday Turkeys',
    price: 55.00,
    unit: '10-12 lbs (Feeds 6-8)',
    description: 'Flash-fried in 100% peanut oil for maximum crispiness and locked-in moisture. Injected with custom house seasonings.',
    dietary: ['GF'],
    image: 'https://images.unsplash.com/photo-1514944288352-ffbb99f0bdf1?auto=format&fit=crop&w=800&q=80',
    isTurkey: true,
    prepStyles: ['Deep-Fried', 'Oil-Less Fried', 'Hickory Smoked'],
    sizeOptions: [
      { size: 'Small (10-12 lbs)', price: 55.00 },
      { size: 'Medium (13-15 lbs)', price: 62.00 },
      { size: 'Large (16-18+ lbs)', price: 70.00 }
    ],
    seasonings: ['Cajun Butter Injection', 'Garlic & Herb', 'Southern Style Rub']
  },

  // SPECIALTY CAKES & BAKERY
  {
    id: 'c1',
    name: 'Custom Celebration Cake',
    category: 'Specialty Cakes',
    price: 45.00,
    unit: 'Starting at 8" Round (Feeds 12-16)',
    description: 'Handcrafted custom cake layered with smooth buttercream icing. Perfect for birthdays, anniversaries, and family celebrations.',
    dietary: ['V'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    isCake: true,
    flavors: ['Classic Vanilla Bean', 'Rich Chocolate Fudge', 'Red Velvet with Cream Cheese', 'Lemon Sunshine', 'Strawberry Shortcake'],
    sizes: ['8" Round (Feeds 12-16)', '10" Round (Feeds 20-24)', '1/4 Sheet Cake (Feeds 20-30)', '1/2 Sheet Cake (Feeds 40-50)'],
    popular: true
  },
  {
    id: 'c2',
    name: 'Signature Tiered Wedding & Event Cake',
    category: 'Specialty Cakes',
    price: 120.00,
    unit: 'Custom Tiered Quote',
    description: 'Elegant multi-tiered custom cake designed to match your event theme. Custom flavors, filling, and decorative floral touches.',
    dietary: ['V'],
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    isCake: true,
    flavors: ['Vanilla Bean & Raspberry', 'Chocolate Ganache', 'Lemon Blueberry', 'Salted Caramel Pecan'],
    sizes: ['2-Tier (Feeds 35-45)', '3-Tier (Feeds 60-80)', 'Custom Multi-Tier (100+ Guests)'],
    popular: true
  },
  {
    id: 'c3',
    name: 'Holiday Sweet Potato & Specialty Pie',
    category: 'Specialty Cakes',
    price: 25.00,
    unit: '9" Deep Dish Pie',
    description: 'Southern sweet potato pie made from our family recipe with warm spices, brown sugar, and a flaky handmade crust.',
    dietary: ['V'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    isCake: false
  },

  // CATERING PACKAGES (QUOTE ONLY)
  {
    id: 'cat1',
    name: 'Full-Service Buffet Catering',
    category: 'Catering Events',
    price: 0,
    unit: 'Custom Quote Per Guest',
    description: 'Complete mobile catering setup including main proteins, home-style sides, warm rolls, and chafing dish service at your venue.',
    dietary: ['Customizable'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    isQuoteOnly: true,
    popular: true
  },
  {
    id: 'cat2',
    name: 'Family Reunion & Outdoor BBQ Feast',
    category: 'Catering Events',
    price: 0,
    unit: 'Custom Quote Per Guest',
    description: 'Slow-smoked meats, savory mac & cheese, baked beans, green beans, and freshly baked corn muffins brought right to your park or backyard.',
    dietary: ['Customizable'],
    image: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&w=800&q=80',
    isQuoteOnly: true
  },
  {
    id: 'cat3',
    name: 'Corporate Lunch & Event Drop-Off',
    category: 'Catering Events',
    price: 0,
    unit: 'Custom Quote Per Guest',
    description: 'Convenient hot box delivery for corporate meetings, office parties, and church functions. Fully packaged and ready to serve.',
    dietary: ['Customizable'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    isQuoteOnly: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Customization modal state
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrep, setSelectedPrep] = useState('');
  const [selectedSeasoning, setSelectedSeasoning] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  // Checkout / Quote Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Holiday Order',
    eventDate: '',
    eventTime: '',
    guestCount: '25',
    address: '',
    city: '',
    specialInstructions: ''
  });

  const categories = ['All', 'Holiday Turkeys', 'Specialty Cakes', 'Catering Events'];

  // Filtered menu
  const filteredMenu = useMemo(() => {
    return INITIAL_MENU.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Open customization modal
  const handleOpenCustomization = (item) => {
    setSelectedItemForCustomization(item);
    if (item.isTurkey) {
      setSelectedSize(item.sizeOptions[0].size);
      setSelectedPrep(item.prepStyles ? item.prepStyles[0] : 'Oil-Less Fried');
      setSelectedSeasoning(item.seasonings ? item.seasonings[0] : 'Garlic Butter & Herb');
    } else if (item.isCake) {
      setSelectedFlavor(item.flavors ? item.flavors[0] : 'Classic Vanilla Bean');
      setSelectedSize(item.sizes ? item.sizes[0] : '8" Round (Feeds 12-16)');
    }
    setCustomNotes('');
  };

  // Add item to cart
  const handleAddToCart = () => {
    const item = selectedItemForCustomization;
    if (!item) return;

    let finalPrice = item.price;
    let details = [];

    if (item.isTurkey) {
      const chosenSizeObj = item.sizeOptions.find(s => s.size === selectedSize);
      if (chosenSizeObj) finalPrice = chosenSizeObj.price;
      details.push(`Size: ${selectedSize}`);
      details.push(`Preparation: ${selectedPrep}`);
      details.push(`Seasoning: ${selectedSeasoning}`);
    }

    if (item.isCake) {
      details.push(`Flavor: ${selectedFlavor}`);
      details.push(`Size/Tiers: ${selectedSize}`);
    }

    if (customNotes) {
      details.push(`Notes: ${customNotes}`);
    }

    const cartItemId = `${item.id}-${Date.now()}`;
    const cartItem = {
      cartItemId,
      id: item.id,
      name: item.name,
      category: item.category,
      price: finalPrice,
      isQuoteOnly: item.isQuoteOnly || false,
      details: details.join(' | '),
      quantity: 1,
      image: item.image
    };

    setCart(prev => [...prev, cartItem]);
    setSelectedItemForCustomization(null);
    setIsCartOpen(true);
  };

  // Cart helper functions
  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Calculate Subtotal (excludes quote-only items)
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.isQuoteOnly ? 0 : item.price * item.quantity), 0);
  }, [cart]);

  const hasQuoteOnlyItems = useMemo(() => {
    return cart.some(item => item.isQuoteOnly);
  }, [cart]);

  // Submit quote / order
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const confirmationData = {
      orderId: 'CC-' + Math.floor(100000 + Math.random() * 900000),
      customer: formData,
      items: [...cart],
      total: cartSubtotal,
      dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setOrderConfirmed(confirmationData);
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2522] font-sans flex flex-col antialiased">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#5A141E] text-white text-xs md:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Now Accepting Orders for Thanksgiving & Christmas Turkeys (Featuring <strong>Oil-Less Fried</strong>, Smoked & Deep Fried)!</span>
        <span className="hidden sm:inline-block bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide">Mobile Catering</span>
      </div>

      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('Home')}
              className="cursor-pointer transform hover:scale-105 transition duration-200"
            >
              <CrowdersLogo className="h-12 md:h-14 w-auto" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-[#4A3E39]">
              <button 
                onClick={() => { setActiveTab('Home'); setSelectedCategory('All'); }}
                className={`transition hover:text-[#7A1C29] ${activeTab === 'Home' ? 'text-[#7A1C29] font-bold border-b-2 border-[#7A1C29] pb-1' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setActiveTab('Menu'); setSelectedCategory('Holiday Turkeys'); }}
                className={`transition hover:text-[#7A1C29] ${selectedCategory === 'Holiday Turkeys' && activeTab === 'Menu' ? 'text-[#7A1C29] font-bold border-b-2 border-[#7A1C29] pb-1' : ''}`}
              >
                🦃 Holiday Turkeys
              </button>
              <button 
                onClick={() => { setActiveTab('Menu'); setSelectedCategory('Specialty Cakes'); }}
                className={`transition hover:text-[#7A1C29] ${selectedCategory === 'Specialty Cakes' && activeTab === 'Menu' ? 'text-[#7A1C29] font-bold border-b-2 border-[#7A1C29] pb-1' : ''}`}
              >
                🍰 Special Cakes
              </button>
              <button 
                onClick={() => { setActiveTab('Menu'); setSelectedCategory('Catering Events'); }}
                className={`transition hover:text-[#7A1C29] ${selectedCategory === 'Catering Events' && activeTab === 'Menu' ? 'text-[#7A1C29] font-bold border-b-2 border-[#7A1C29] pb-1' : ''}`}
              >
                📜 Catering Quotes
              </button>
              <button 
                onClick={() => setActiveTab('About')}
                className={`transition hover:text-[#7A1C29] ${activeTab === 'About' ? 'text-[#7A1C29] font-bold border-b-2 border-[#7A1C29] pb-1' : ''}`}
              >
                About Us
              </button>
            </nav>

            {/* Quick Contact & Cart Buttons */}
            <div className="flex items-center gap-3 md:gap-4">
              <a 
                href="tel:9195782075" 
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#7A1C29] bg-[#7A1C29]/10 hover:bg-[#7A1C29]/20 px-3 py-2 rounded-full transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(919) 578-2075</span>
              </a>

              {/* Shopping Bag / Quote Drawer Trigger */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#7A1C29] text-white p-2.5 rounded-full hover:bg-[#5A141E] transition shadow-md flex items-center justify-center"
                aria-label="View Order Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-amber-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Row */}
          <div className="flex lg:hidden overflow-x-auto gap-4 pt-3 pb-1 border-t border-[#E8DFD5]/60 mt-2 text-xs font-semibold whitespace-nowrap scrollbar-none">
            <button 
              onClick={() => { setActiveTab('Home'); setSelectedCategory('All'); }}
              className={`px-3 py-1.5 rounded-full ${activeTab === 'Home' ? 'bg-[#7A1C29] text-white' : 'bg-[#E8DFD5]/50 text-[#4A3E39]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('Menu'); setSelectedCategory('Holiday Turkeys'); }}
              className={`px-3 py-1.5 rounded-full ${selectedCategory === 'Holiday Turkeys' ? 'bg-[#7A1C29] text-white' : 'bg-[#E8DFD5]/50 text-[#4A3E39]'}`}
            >
              🦃 Holiday Turkeys
            </button>
            <button 
              onClick={() => { setActiveTab('Menu'); setSelectedCategory('Specialty Cakes'); }}
              className={`px-3 py-1.5 rounded-full ${selectedCategory === 'Specialty Cakes' ? 'bg-[#7A1C29] text-white' : 'bg-[#E8DFD5]/50 text-[#4A3E39]'}`}
            >
              🍰 Special Cakes
            </button>
            <button 
              onClick={() => { setActiveTab('Menu'); setSelectedCategory('Catering Events'); }}
              className={`px-3 py-1.5 rounded-full ${selectedCategory === 'Catering Events' ? 'bg-[#7A1C29] text-white' : 'bg-[#E8DFD5]/50 text-[#4A3E39]'}`}
            >
              📜 Catering Quotes
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-grow">
        
        {/* HERO BANNER (Show on Home Tab) */}
        {activeTab === 'Home' && (
          <section className="relative bg-[#2D2522] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1600&q=80')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D2522] via-[#2D2522]/90 to-transparent z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#7A1C29]/80 backdrop-blur border border-amber-300/30 text-amber-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                  <Truck className="w-3.5 h-3.5" /> 100% Mobile Catering — We Come To You!
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                  Your Special Occasion, <span className="text-amber-300 italic">Our Passion.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#E8DFD5] max-w-xl">
                  Family-owned catering services for weddings, reunions, and corporate events. Reserve your custom Thanksgiving & Christmas **Oil-Less**, Hickory Smoked, or Fried Turkeys ($55 - $70), plus custom specialty cakes!
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => { setActiveTab('Menu'); setSelectedCategory('Holiday Turkeys'); }}
                    className="bg-[#7A1C29] hover:bg-[#5A141E] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    <Flame className="w-5 h-5 text-amber-300" />
                    Order Holiday Turkeys ($55-$70)
                  </button>
                  <button 
                    onClick={() => { setActiveTab('Menu'); setSelectedCategory('Catering Events'); }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur border border-white/20 transition flex items-center gap-2"
                  >
                    Request Catering Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-[#E8DFD5]">
                  <div>
                    <span className="block font-bold text-white text-sm">📞 Phone</span>
                    (919) 578-2075
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm">✉️ Email</span>
                    crowdercaterings@gmail.com
                  </div>
                  <div>
                    <span className="block font-bold text-white text-sm">📍 Location</span>
                    Fully Mobile (NC Area)
                  </div>
                </div>
              </div>

              {/* Featured Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Feature 1: Oil-Less Turkeys */}
                <div className="bg-[#FAF7F2] text-[#2D2522] p-5 rounded-2xl shadow-xl border-t-4 border-[#7A1C29]">
                  <div className="w-10 h-10 rounded-full bg-[#7A1C29]/10 text-[#7A1C29] flex items-center justify-center font-bold mb-3">
                    🦃
                  </div>
                  <h3 className="font-bold text-lg text-[#7A1C29]">Oil-Less & Smoked Turkeys</h3>
                  <p className="text-xs text-[#5A4E48] mt-1">
                    Specialty Oil-Less Fried, Hickory Smoked & Cajun Turkeys for Thanksgiving & Christmas. Sizes from $55 - $70.
                  </p>
                  <button 
                    onClick={() => { setActiveTab('Menu'); setSelectedCategory('Holiday Turkeys'); }}
                    className="mt-3 text-xs font-bold text-[#7A1C29] flex items-center gap-1 hover:underline"
                  >
                    Select Turkey Options →
                  </button>
                </div>

                {/* Feature 2: Special Cakes */}
                <div className="bg-[#FAF7F2] text-[#2D2522] p-5 rounded-2xl shadow-xl border-t-4 border-[#7A1C29]">
                  <div className="w-10 h-10 rounded-full bg-[#7A1C29]/10 text-[#7A1C29] flex items-center justify-center font-bold mb-3">
                    🎂
                  </div>
                  <h3 className="font-bold text-lg text-[#7A1C29]">Specialty Cakes</h3>
                  <p className="text-xs text-[#5A4E48] mt-1">
                    Custom birthday, anniversary, and multi-tier wedding cakes baked to order with custom flavor pairings.
                  </p>
                  <button 
                    onClick={() => { setActiveTab('Menu'); setSelectedCategory('Specialty Cakes'); }}
                    className="mt-3 text-xs font-bold text-[#7A1C29] flex items-center gap-1 hover:underline"
                  >
                    View Cake Options →
                  </button>
                </div>

                {/* Feature 3: Catering Quotes */}
                <div className="sm:col-span-2 bg-[#FAF7F2] text-[#2D2522] p-5 rounded-2xl shadow-xl border-t-4 border-[#7A1C29] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#7A1C29]">Full Event Catering Quotes</h3>
                    <p className="text-xs text-[#5A4E48] mt-0.5">
                      No fixed menu prices for large events. Build your request and we will provide a custom quote!
                    </p>
                  </div>
                  <button 
                    onClick={() => { setActiveTab('Menu'); setSelectedCategory('Catering Events'); }}
                    className="bg-[#7A1C29] text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap hover:bg-[#5A141E]"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION HEADER FOR MENU */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Banner Notice for Mobile Catering */}
          <div className="bg-amber-100 border border-amber-300 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500 text-white rounded-lg">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-amber-950 text-sm">We are 100% Mobile — No Brick & Mortar Storefront!</h4>
                <p className="text-xs text-amber-900">We deliver holiday turkeys & cakes directly to your location or cater your event on-site.</p>
              </div>
            </div>
            <div className="text-xs font-bold text-amber-950 bg-amber-200/80 px-3 py-1.5 rounded-lg border border-amber-400">
              📞 (919) 578-2075
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setActiveTab('Menu'); }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat 
                      ? 'bg-[#7A1C29] text-white shadow-md' 
                      : 'bg-white text-[#4A3E39] border border-[#E8DFD5] hover:bg-[#E8DFD5]/40'
                  }`}
                >
                  {cat === 'Holiday Turkeys' && '🦃 '}
                  {cat === 'Specialty Cakes' && '🍰 '}
                  {cat === 'Catering Events' && '📜 '}
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search turkeys, cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8DFD5] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1C29]"
              />
            </div>
          </div>

          {/* MENU GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-[#E8DFD5] flex flex-col justify-between transition duration-200"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-[#7A1C29] uppercase tracking-wider shadow">
                      {item.category}
                    </div>
                    {item.isTurkey && (
                      <div className="absolute bottom-3 left-3 bg-[#7A1C29] text-white text-xs font-bold px-3 py-1 rounded-lg shadow flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-300" /> Oil-Less & Fried Options
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-lg text-[#2D2522] leading-snug">{item.name}</h3>
                    </div>

                    <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Price / Unit Tag */}
                    <div className="mt-4 pt-3 border-t border-[#E8DFD5]/60 flex items-center justify-between">
                      <div>
                        {item.isQuoteOnly ? (
                          <span className="text-xs font-bold text-[#7A1C29] bg-[#7A1C29]/10 px-2.5 py-1 rounded-md">
                            Quote Request Only
                          </span>
                        ) : (
                          <div>
                            <span className="text-xl font-bold text-[#7A1C29]">
                              {item.isTurkey ? '$55 - $70' : `$${item.price.toFixed(2)}`}
                            </span>
                            <span className="text-[11px] text-gray-500 block">{item.unit}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => handleOpenCustomization(item)}
                        className="bg-[#7A1C29] text-white hover:bg-[#5A141E] px-4 py-2 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
                      >
                        {item.isQuoteOnly ? 'Add to Quote Request' : 'Select Options'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD5] my-6">
              <UtensilsCrossed className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-700">No items found</h3>
              <p className="text-xs text-gray-500 mt-1">Try adjusting your category filter or search terms.</p>
            </div>
          )}

        </div>

        {/* ABOUT / MOBILE CATERING INFO SECTION */}
        {activeTab === 'About' && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-[#E8DFD5] space-y-8">
              <div className="text-center space-y-3">
                <CrowdersLogo className="h-20 w-auto mx-auto" />
                <h2 className="text-3xl font-serif font-bold text-[#7A1C29]">About Crowder's Catering</h2>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  We are a proud family-owned mobile catering service dedicated to bringing authentic, savory home-style meals and holiday traditions directly to your door or event venue.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5]/80 text-center space-y-2">
                  <div className="w-12 h-12 bg-[#7A1C29]/10 text-[#7A1C29] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    🚚
                  </div>
                  <h4 className="font-bold text-[#7A1C29]">100% Mobile Service</h4>
                  <p className="text-xs text-gray-600">
                    We do not have a physical store location. We come directly to your venue, home, or office with fully prepared catering.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5]/80 text-center space-y-2">
                  <div className="w-12 h-12 bg-[#7A1C29]/10 text-[#7A1C29] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    🦃
                  </div>
                  <h4 className="font-bold text-[#7A1C29]">Oil-Less Holiday Turkeys</h4>
                  <p className="text-xs text-gray-600">
                    Featuring our popular **Oil-Less Fried Turkeys** ($55-$70) along with smoked and deep-fried options for Thanksgiving & Christmas.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5]/80 text-center space-y-2">
                  <div className="w-12 h-12 bg-[#7A1C29]/10 text-[#7A1C29] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    🎂
                  </div>
                  <h4 className="font-bold text-[#7A1C29]">Custom Baked Cakes</h4>
                  <p className="text-xs text-gray-600">
                    Specialty custom cakes designed and baked for your birthdays, weddings, anniversaries, and family celebrations.
                  </p>
                </div>
              </div>

              {/* Direct Contact Details */}
              <div className="bg-[#7A1C29] text-white p-6 rounded-2xl text-center space-y-4">
                <h4 className="text-xl font-serif font-bold">Ready to Plan Your Event?</h4>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                  <a href="tel:9195782075" className="flex items-center gap-2 hover:underline">
                    <Phone className="w-4 h-4 text-amber-300" /> (919) 578-2075
                  </a>
                  <a href="mailto:crowdercaterings@gmail.com" className="flex items-center gap-2 hover:underline">
                    <Mail className="w-4 h-4 text-amber-300" /> crowdercaterings@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#2D2522] text-[#E8DFD5] pt-12 pb-8 border-t border-amber-900/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <CrowdersLogo className="h-14 w-auto text-white" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Family-owned catering service serving delicious holiday turkeys, specialty cakes, and full-service event catering.
              </p>
            </div>

            {/* Col 2: Offerings */}
            <div>
              <h4 className="font-bold text-white text-sm mb-3">Our Offerings</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Oil-Less Fried Turkeys</li>
                <li>• Hickory Smoked Turkeys</li>
                <li>• Deep-Fried Turkeys</li>
                <li>• Custom Celebration Cakes</li>
                <li>• Wedding Cakes</li>
                <li>• Full-Service Event Catering</li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h4 className="font-bold text-white text-sm mb-3">Contact Us</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> (919) 578-2075
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> crowdercaterings@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-amber-400" /> 100% Mobile Service (We Come To You!)
                </li>
              </ul>
            </div>

            {/* Col 4: Seasonal Hours */}
            <div>
              <h4 className="font-bold text-white text-sm mb-3">Holiday Ordering</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Now taking advance pre-orders for Thanksgiving and Christmas holiday turkeys ($55 - $70). Call or order online to reserve your slot!
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Crowder's Catering. All rights reserved. (919) 578-2075
          </div>
        </div>
      </footer>

      {/* CUSTOMIZATION MODAL FOR TURKEYS & CAKES */}
      {selectedItemForCustomization && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DFD5] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="relative h-40 bg-gray-100">
              <img 
                src={selectedItemForCustomization.image} 
                alt={selectedItemForCustomization.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedItemForCustomization(null)}
                className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#7A1C29] text-white text-xs font-bold px-3 py-1 rounded-lg">
                {selectedItemForCustomization.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <h3 className="text-xl font-bold text-[#7A1C29]">{selectedItemForCustomization.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{selectedItemForCustomization.description}</p>
              </div>

              {/* TURKEY OPTIONS */}
              {selectedItemForCustomization.isTurkey && (
                <div className="space-y-4 pt-2">
                  {/* Size Option ($55 - $70) */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      1. Select Turkey Size
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedItemForCustomization.sizeOptions.map(opt => (
                        <label 
                          key={opt.size} 
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition ${
                            selectedSize === opt.size ? 'border-[#7A1C29] bg-[#7A1C29]/5 font-bold text-[#7A1C29]' : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="turkeySize" 
                              checked={selectedSize === opt.size} 
                              onChange={() => setSelectedSize(opt.size)}
                              className="text-[#7A1C29] focus:ring-[#7A1C29]"
                            />
                            <span>{opt.size}</span>
                          </div>
                          <span className="font-bold text-sm">${opt.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preparation Style */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      2. Preparation Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedItemForCustomization.prepStyles.map(prep => (
                        <button
                          key={prep}
                          type="button"
                          onClick={() => setSelectedPrep(prep)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                            selectedPrep === prep ? 'border-[#7A1C29] bg-[#7A1C29] text-white shadow' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {prep}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seasoning Rub */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      3. Seasoning Blend
                    </label>
                    <select 
                      value={selectedSeasoning}
                      onChange={(e) => setSelectedSeasoning(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7A1C29]"
                    >
                      {selectedItemForCustomization.seasonings.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* CAKE OPTIONS */}
              {selectedItemForCustomization.isCake && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Cake Flavor
                    </label>
                    <select 
                      value={selectedFlavor}
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7A1C29]"
                    >
                      {selectedItemForCustomization.flavors.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Cake Size / Portion
                    </label>
                    <select 
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#7A1C29]"
                    >
                      {selectedItemForCustomization.sizes.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Special Notes / Writing on Cake
                </label>
                <textarea 
                  rows="2"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="E.g., Extra crispy skin, write 'Happy Thanksgiving Family!', etc."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                ></textarea>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button 
                onClick={() => setSelectedItemForCustomization(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddToCart}
                className="bg-[#7A1C29] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-[#5A141E] transition flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Request
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SHOPPING BAG / QUOTE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#7A1C29]" />
                <h3 className="font-bold text-lg text-[#2D2522]">Your Order & Quote Bag</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-5 flex-grow overflow-y-auto space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400 space-y-3">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                  <p className="text-sm font-medium">Your request bag is empty.</p>
                  <p className="text-xs">Add holiday turkeys, cakes, or catering packages to get started.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.cartItemId} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5] space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-sm text-[#7A1C29]">{item.name}</div>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.details && (
                      <p className="text-[11px] text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                        {item.details}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="font-bold">
                        {item.isQuoteOnly ? 'Price: TBD (Quote Item)' : `$${(item.price * item.quantity).toFixed(2)}`}
                      </span>
                      
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="text-gray-500 hover:text-black">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="text-gray-500 hover:text-black">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-[#FAF7F2] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Turkey & Cake Subtotal:</span>
                    <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {hasQuoteOnlyItems && (
                    <div className="text-[11px] text-[#7A1C29] italic bg-amber-50 p-2 rounded-lg border border-amber-200">
                      * Includes Catering Quote Items. Final total will be provided in your custom proposal.
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  className="w-full bg-[#7A1C29] text-white py-3.5 rounded-xl font-bold text-sm shadow hover:bg-[#5A141E] transition flex items-center justify-center gap-2"
                >
                  Proceed to Order & Quote Request →
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* CHECKOUT / QUOTE INQUIRY MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8DFD5] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#7A1C29] text-white flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold">Complete Your Order Request</h3>
                <p className="text-xs text-amber-200">Crowder's Catering — 100% Mobile Service</p>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
              
              {/* Customer Contact Details */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#7A1C29] uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4" /> 1. Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Crowder"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(919) 578-2075"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="crowdercaterings@gmail.com"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                </div>
              </div>

              {/* Event / Delivery Details */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-sm text-[#7A1C29] uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> 2. Delivery & Event Location
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Target Date *</label>
                    <input 
                      type="date" 
                      required 
                      value={formData.eventDate}
                      onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Time *</label>
                    <input 
                      type="time" 
                      required 
                      value={formData.eventTime}
                      onChange={e => setFormData({ ...formData, eventTime: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Delivery Street Address / Venue Location *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Main St or Venue Name"
                      className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7A1C29]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5] text-xs space-y-1">
                  <div className="font-bold text-[#7A1C29]">Order Summary:</div>
                  <div>Total Items: {cart.reduce((a, b) => a + b.quantity, 0)}</div>
                  {cartSubtotal > 0 && <div className="font-bold text-gray-900">Estimated Total: ${cartSubtotal.toFixed(2)}</div>}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#7A1C29] text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-[#5A141E] transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Order / Quote Request
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-[#E8DFD5] text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-[#7A1C29]">Request Received!</h3>
              <p className="text-xs text-gray-500">Order Reference: <strong>{orderConfirmed.orderId}</strong></p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Thank you, <strong>{orderConfirmed.customer.name}</strong>! We have received your order request for Crowder's Catering. Our team will contact you at <strong>{orderConfirmed.customer.phone}</strong> or <strong>{orderConfirmed.customer.email}</strong> to confirm your details.
            </p>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD5] text-left text-xs space-y-2">
              <div className="font-bold text-[#7A1C29] border-b pb-1">Items Requested:</div>
              {orderConfirmed.items.map(item => (
                <div key={item.cartItemId} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span className="font-bold">{item.isQuoteOnly ? 'Quote Item' : `$${(item.price * item.quantity).toFixed(2)}`}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setOrderConfirmed(null)}
              className="w-full bg-[#7A1C29] text-white py-3 rounded-xl font-bold text-xs hover:bg-[#5A141E] transition"
            >
              Back to Home Page
            </button>
          </div>
        </div>
      )}

    </div>
  );
}