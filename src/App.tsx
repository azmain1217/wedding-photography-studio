import { useState, useEffect } from 'react';
import { 
  Camera, MapPin, ChevronRight, Check, X, Star, Menu, Send, ShieldCheck, Sparkles, Plus, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---

const GALLERY_CATEGORIES = ["All", "Real Weddings", "Engagements", "Elopements", "Editorial"];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Elegance at Villa d'Este",
    category: "Real Weddings",
    location: "Lake Como, Italy",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    aspect: "tall"
  },
  {
    id: 2,
    title: "Golden Hour Sunset Embrace",
    category: "Engagements",
    location: "Big Sur, California",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    aspect: "wide"
  },
  {
    id: 3,
    title: "Alpine Sanctuary Elopement",
    category: "Elopements",
    location: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    aspect: "square"
  },
  {
    id: 4,
    title: "Vogue Paris Bridal Editorial",
    category: "Editorial",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200",
    aspect: "tall"
  },
  {
    id: 5,
    title: "Coastal Estate Celebration",
    category: "Real Weddings",
    location: "Newport, Rhode Island",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
    aspect: "wide"
  },
  {
    id: 6,
    title: "Whispering Pines Ceremony",
    category: "Elopements",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=1200",
    aspect: "square"
  },
  {
    id: 7,
    title: "Monochrome Intimacy",
    category: "Editorial",
    location: "NYC Studio",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
    aspect: "tall"
  },
  {
    id: 8,
    title: "Tuscan Hillside Pre-Wedding",
    category: "Engagements",
    location: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
    aspect: "wide"
  }
];

interface PhotoItem {
  id: number | string;
  image: string;
  title: string;
  category: string;
  location: string;
}

const PACKAGES = [
  {
    id: 'elopement',
    name: 'Elopement Essentials',
    price: 3200,
    hours: '4 Hours',
    description: 'Designed for intimate ceremonies, vow renewals, or minimalist runaway celebrations.',
    features: ['Single Lead Photographer', 'Online High-Res Gallery', '30-Day Turnaround', 'Personal Print Rights', 'Timeline Planning Consultation']
  },
  {
    id: 'classic',
    name: 'Full-Day Classic',
    price: 5400,
    popular: true,
    hours: '8 Hours',
    description: 'Our standard comprehensive wedding experience covering preparation to reception highlights.',
    features: ['Lead + Associate Photographer', '500+ Hand-Edited High-Res Images', 'Private Digital Gallery + USB', 'Sneak Peek within 48 Hours', 'Pre-Wedding Engagement Session']
  },
  {
    id: 'luxury',
    name: 'Luxury Weekend',
    price: 8800,
    hours: 'Multi-Day (Up to 16h)',
    description: 'The pinnacle experience for multi-event weekend celebrations, rehearsal dinners, and epic galas.',
    features: ['2 Senior Photographers + Assistant', 'Rehearsal Dinner Coverage', 'Heirloom Linen Album (30 pgs)', 'Drone Aerial Stills', 'Priority 14-Day Delivery', 'Unlimited High-Res Gallery Access']
  }
];

const ADD_ONS = [
  { id: 'second_shooter', name: 'Second Senior Photographer', price: 800, desc: 'Extra angles and complete simultaneous coverage for groom/bride prep.' },
  { id: 'engagement', name: 'Standalone Engagement Session', price: 650, desc: '2 hours at a location of your choice with 40+ edited images.' },
  { id: 'album', name: 'Handcrafted Italian Leather Fine Art Album', price: 1200, desc: 'Custom lay-flat album, archival paper, bespoke foil embossing.' },
  { id: 'drone', name: 'Drone Aerial Photography', price: 450, desc: 'Licensed drone coverage for sweeping venue & landscape shots.' },
  { id: 'express', name: '7-Day Priority Gallery Delivery', price: 500, desc: 'Jump the editing queue to receive your complete gallery in one week.' }
];

const TESTIMONIALS = [
  {
    id: 1,
    names: "Camille & Julian",
    venue: "Villa Balbianello, Lake Como",
    rating: 5,
    quote: "Working with Elena was the most effortless part of our entire wedding planning process. She didn't just capture photos; she captured the exact emotion and soul of every moment. Looking back at our gallery feels like reliving the dream again.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    names: "Sophia & Marcus",
    venue: "The Plaza Hotel, NYC",
    rating: 5,
    quote: "Her command of light and eye for spontaneous, high-editorial beauty is unmatched. Our photos look like they belong straight in Vogue Weddings. We are endlessly grateful for her calm, reassuring presence on our big day.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    names: "Elena & Liam",
    venue: "San Ysidro Ranch, Santa Barbara",
    rating: 5,
    quote: "The custom investment calculator made booking so transparent and straightforward! Elena made two camera-shy people feel like absolute movie stars. Her attention to detail is remarkable.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=400"
  }
];

const FAQS = [
  {
    question: "What is your photography style and philosophy?",
    answer: "My style is editorial yet deeply candid—a blend of fine-art elegance and romantic documentary storytelling. I focus on natural light, organic interactions, clean warm tones, and emotional honesty without stiff, artificial posing."
  },
  {
    question: "How far in advance should we book our wedding date?",
    answer: "Because we limit our calendar to only 18 premier weddings per year to give every couple our full creative dedication, most couples book 9 to 18 months in advance. However, don't hesitate to reach out for short-notice elopements or weekday celebrations!"
  },
  {
    question: "Do you travel worldwide for destination weddings?",
    answer: "Absolutely! Over 60% of our weddings take place internationally or across different states. We handle all travel logistics, visas, and insurance personally, providing a seamless flat-rate travel quote for destination events."
  },
  {
    question: "When will we receive our photos and how are they delivered?",
    answer: "You will receive a curated 'Sneak Peek' gallery within 48 hours of your event to share with friends and family. Your full, high-resolution digital gallery will be delivered within 4 to 6 weeks through a private password-protected online portal."
  },
  {
    question: "What happens if weather conditions aren't ideal on our day?",
    answer: "Over ten years of experience means we thrive in all lighting conditions—bright sun, rain, mist, or moody skies! We come prepared with creative lighting setups, luxury clear umbrellas, and back-up indoor aesthetic concepts."
  }
];

export default function App() {
  // Navigation & UI States
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<PhotoItem | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Investment Calculator State
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1].id);
  const [selectedAddOns, setSelectedAddOns] = useState(['engagement']);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    coupleNames: '',
    email: '',
    phone: '',
    weddingDate: '',
    venueLocation: '',
    estimatedGuests: '100-150',
    selectedPackageChoice: 'Full-Day Classic',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Handle scroll events for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter Gallery Items
  const filteredGallery = activeCategory === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Calculate Total Investment
  const currentBasePackage = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[1];
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ONS.find(a => a.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalEstimate = currentBasePackage.price + addOnsTotal;

  // Toggle Add-on in Calculator
  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

  // Form Submission Simulator
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  // Pre-fill form when clicking "Book Package" in calculator
  const handleSelectPackageForBooking = (pkgName: string) => {
    setFormData(prev => ({ ...prev, selectedPackageChoice: pkgName }));
    const inquirySection = document.getElementById('inquiry');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2A29] font-serif antialiased selection:bg-[#E2D4C3] selection:text-[#2C2A29]">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-[#FAF8F5]/90 backdrop-blur-md py-4 shadow-sm border-b border-[#EADFCF]' : 'bg-linear-to-b from-black/60 via-black/20 to-transparent py-6 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Brand Logo */}
          <a href="#" className="flex flex-col tracking-widest text-center group">
            <span className={`text-xl md:text-2xl font-light tracking-[0.25em] uppercase transition-colors ${scrolled ? 'text-[#1C1917]' : 'text-white'}`}>
              ELENA GRAND
            </span>
            <span className={`text-[9px] font-sans tracking-[0.4em] uppercase transition-colors ${scrolled ? 'text-[#8C827A]' : 'text-stone-300'}`}>
              Fine Art Photography
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className={`hidden md:flex items-center space-x-8 font-sans text-xs tracking-[0.2em] uppercase font-medium ${scrolled ? 'text-[#4A4540]' : 'text-white/90'}`}>
            <a href="#about" className="hover:text-[#B89B72] transition-colors">About</a>
            <a href="#portfolio" className="hover:text-[#B89B72] transition-colors">Portfolio</a>
            <a href="#investment" className="hover:text-[#B89B72] transition-colors">Investment</a>
            <a href="#testimonials" className="hover:text-[#B89B72] transition-colors">Stories</a>
            <a href="#faq" className="hover:text-[#B89B72] transition-colors">FAQ</a>
            <a 
              href="#inquiry" 
              className={`px-6 py-2.5 rounded-full border transition-all duration-300 ${
                scrolled 
                  ? 'border-[#2C2A29] text-[#2C2A29] hover:bg-[#2C2A29] hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-stone-900'
              }`}
            >
              Inquire
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[#2C2A29]' : 'text-white'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#FAF8F5] border-b border-[#EADFCF] py-6 px-8 flex flex-col space-y-4 font-sans text-sm tracking-widest uppercase shadow-xl text-[#2C2A29]">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#investment" onClick={() => setMobileMenuOpen(false)}>Investment</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Stories</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a 
              href="#inquiry" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 bg-[#2C2A29] text-white rounded-full font-medium"
            >
              Inquire Now
            </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Ambient Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000" 
            alt="Bride and Groom Editorial Moment" 
            className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-900/40 to-stone-950/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-6 pt-16">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans text-xs uppercase tracking-[0.25em] text-stone-200">
            <Sparkles size={12} className="text-[#EADFCF]" />
            <span>Worldwide Luxury Destination Photographer</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1]">
            Capturing Timeless <br />
            <span className="italic font-normal font-serif text-[#F3EBE1]">Love Stories</span>
          </h1>

          <p className="font-sans text-stone-300 text-sm md:text-lg max-w-2xl mx-auto tracking-wide font-light leading-relaxed">
            Authentic, romantic, and high-editorial imagery crafted for couples who treasure real emotion, luminous natural light, and quiet luxury.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 font-sans text-xs tracking-widest uppercase">
            <a 
              href="#portfolio" 
              className="w-full sm:w-auto px-8 py-4 bg-[#F3EBE1] text-[#2C2A29] rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl font-medium"
            >
              Explore Gallery
            </a>
            <a 
              href="#investment" 
              className="w-full sm:w-auto px-8 py-4 border border-white/50 text-white rounded-full hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Calculate Investment
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 flex flex-col items-center space-y-2 font-sans text-[10px] tracking-widest uppercase">
          <span>Scroll To Discover</span>
          <div className="w-5 h-8 border border-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- STATS & BADGES STRIP --- */}
      <section className="border-y border-[#EADFCF] bg-[#F4EFEA] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sans">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-serif text-[#2C2A29]">12+</p>
            <p className="text-xs uppercase tracking-widest text-[#7C746E]">Years Experience</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-serif text-[#2C2A29]">200+</p>
            <p className="text-xs uppercase tracking-widest text-[#7C746E]">Weddings Photographed</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-serif text-[#2C2A29]">18</p>
            <p className="text-xs uppercase tracking-widest text-[#7C746E]">Countries Covered</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-serif text-[#2C2A29]">VOGUE</p>
            <p className="text-xs uppercase tracking-widest text-[#7C746E]">Featured Photographer</p>
          </div>
        </div>
      </section>

      {/* --- ABOUT THE PHOTOGRAPHER --- */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Image composition */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-3/4 rounded-2xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
                alt="Elena Grand Photographer Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Overlay Box */}
            <div className="absolute -bottom-6 -right-6 bg-[#E8DDD0] p-6 rounded-2xl hidden sm:block max-w-xs shadow-lg border border-[#D8C9B8]">
              <p className="font-serif italic text-sm text-[#2C2A29]">
                "Every frame should feel like a piece of quiet poetry that outlasts generations."
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#7C746E] mt-3 font-semibold">
                — Elena Grand, Founder
              </p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A38A66] font-semibold">Meet The Artist</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2A29] leading-tight">
                Hello, I'm Elena. I document real, effortless romance for modern visual storytellers.
              </h2>
            </div>

            <p className="text-[#59534E] leading-relaxed font-sans text-sm md:text-base font-light">
              Based between New York and Florence, I spent over a decade refining a signature aesthetic that bridges fine art editorial portraiture with raw, candid human emotion. I believe wedding photos shouldn't feel staged or rushed—they should breathe with the rhythm of your day.
            </p>

            <p className="text-[#59534E] leading-relaxed font-sans text-sm md:text-base font-light">
              When I'm not traveling with my dual Leica cameras, you'll find me exploring coastal antique markets, sipping espresso in sunlit cafes, or hunting down vintage editorial magazines for creative inspiration.
            </p>

            {/* Accolades List */}
            <div className="pt-4 border-t border-[#EADFCF] grid grid-cols-2 gap-4 font-sans text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#B89B72]" />
                <span className="text-[#4A4540]">Style Me Pretty Feature</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#B89B72]" />
                <span className="text-[#4A4540]">Harper's Bazaar Top 100</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#B89B72]" />
                <span className="text-[#4A4540]">Over The Moon Highlight</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-[#B89B72]" />
                <span className="text-[#4A4540]">Kodak Film Artisan 2024</span>
              </div>
            </div>

            <div className="pt-4">
              <a 
                href="#inquiry" 
                className="inline-flex items-center space-x-3 font-sans text-xs tracking-widest uppercase text-[#2C2A29] font-semibold hover:text-[#B89B72] transition-colors group"
              >
                <span>Inquire For Availability</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* --- PORTFOLIO GALLERY SECTION --- */}
      <section id="portfolio" className="py-20 bg-[#F4EFEA] border-y border-[#EADFCF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Header & Filter Controls */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A38A66] font-semibold">Selected Works</span>
            <h2 className="text-3xl sm:text-5xl font-light text-[#2C2A29]">
              The Portfolio Gallery
            </h2>
            <p className="font-sans text-sm text-[#7C746E] font-light">
              Explore recent love stories, destination elopements, and romantic bridal editorials worldwide.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 pt-6 font-sans text-xs tracking-widest uppercase">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-[#2C2A29] text-white shadow-md' 
                      : 'bg-white/60 text-[#59534E] hover:bg-white border border-[#E0D5C7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry / Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedImage(item as any)}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-stone-200 aspect-3/4 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Hover Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-stone-300">
                    {item.category} • {item.location}
                  </span>
                  <h3 className="text-lg font-serif mt-1 font-light">{item.title}</h3>
                  <div className="mt-3 inline-flex items-center space-x-2 font-sans text-xs text-[#E2D4C3]">
                    <span>View Full Photograph</span>
                    <Plus size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Image Preview */}
            <div className="md:w-2/3 bg-black flex items-center justify-center min-h-75 md:min-h-137.5">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="max-h-[85vh] w-auto object-contain"
              />
            </div>

            {/* Details Sidebar */}
            <div className="md:w-1/3 p-8 flex flex-col justify-between bg-[#FAF8F5]">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#EADFCF] font-sans text-[10px] uppercase tracking-widest text-[#2C2A29]">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-serif text-[#2C2A29]">{selectedImage.title}</h3>
                
                <div className="space-y-2 font-sans text-xs text-[#7C746E]">
                  <p className="flex items-center space-x-2">
                    <MapPin size={14} className="text-[#B89B72]" />
                    <span>{selectedImage.location}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Camera size={14} className="text-[#B89B72]" />
                    <span>35mm Medium Format & Digital Stills</span>
                  </p>
                </div>

                <p className="font-sans text-xs text-[#59534E] leading-relaxed font-light pt-4 border-t border-[#EADFCF]">
                  Captured during peak golden hour with soft ambient side-lighting. Hand-edited to preserve skin tones and natural film grain texture.
                </p>
              </div>

              <div className="pt-6 border-t border-[#EADFCF]">
                <a 
                  href="#inquiry" 
                  onClick={() => setSelectedImage(null)}
                  className="block text-center py-3 bg-[#2C2A29] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[#B89B72] transition-colors"
                >
                  Book A Similar Session
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- INTERACTIVE INVESTMENT CALCULATOR SECTION --- */}
      <section id="investment" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A38A66] font-semibold">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-5xl font-light text-[#2C2A29]">
            Interactive Package & Investment Estimator
          </h2>
          <p className="font-sans text-sm text-[#7C746E] font-light">
            Tailor your photographic collection to your unique celebration vision. Select a base package and add tailored elements for an instant custom estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Package & Add-ons Selection Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Step 1: Base Package Selection */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs uppercase tracking-widest text-[#2C2A29] font-bold flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#EADFCF] text-[#2C2A29] inline-flex items-center justify-center text-[10px]">1</span>
                <span>Select Your Core Base Collection</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => (
                  <div 
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
                      selectedPackage === pkg.id 
                        ? 'bg-white border-[#2C2A29] shadow-xl ring-2 ring-[#2C2A29]/10' 
                        : 'bg-[#F4EFEA] border-[#E5DACB] hover:border-[#B89B72]'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 right-4 bg-[#B89B72] text-white text-[9px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-medium">
                        Most Requested
                      </span>
                    )}
                    <h4 className="font-serif text-lg text-[#2C2A29]">{pkg.name}</h4>
                    <p className="font-sans text-xs text-[#8C827A] mt-1">{pkg.hours}</p>
                    <p className="font-serif text-2xl text-[#2C2A29] mt-4">${pkg.price.toLocaleString()}</p>
                    <p className="font-sans text-xs text-[#59534E] mt-3 leading-relaxed font-light">
                      {pkg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Bespoke Add-Ons */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs uppercase tracking-widest text-[#2C2A29] font-bold flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-[#EADFCF] text-[#2C2A29] inline-flex items-center justify-center text-[10px]">2</span>
                <span>Choose Optional Add-Ons & Upgrades</span>
              </h3>

              <div className="space-y-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`cursor-pointer rounded-xl p-4 flex items-center justify-between transition-all border ${
                        isChecked 
                          ? 'bg-white border-[#B89B72] shadow-sm' 
                          : 'bg-[#F4EFEA] border-[#E5DACB] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#2C2A29] text-white' : 'border border-[#A38A66] bg-white'
                        }`}>
                          {isChecked && <Check size={12} />}
                        </div>
                        <div>
                          <p className="font-serif text-sm font-medium text-[#2C2A29]">{addon.name}</p>
                          <p className="font-sans text-xs text-[#7C746E] font-light">{addon.desc}</p>
                        </div>
                      </div>
                      <span className="font-serif text-sm font-semibold text-[#2C2A29] whitespace-nowrap pl-4">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Sticky Estimate Summary Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-[#2C2A29] text-white rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89B72]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#D8C9B8]">Custom Estimate Summary</span>
                <h3 className="font-serif text-2xl text-white">Investment Projection</h3>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 font-sans text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Base: {currentBasePackage.name}</span>
                  <span className="font-medium text-white">${currentBasePackage.price.toLocaleString()}</span>
                </div>

                {selectedAddOns.map(id => {
                  const item = ADD_ONS.find(a => a.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex justify-between text-stone-400">
                      <span>+ {item.name}</span>
                      <span className="text-stone-200">${item.price}</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <p className="font-sans text-xs uppercase tracking-widest text-stone-400">Estimated Total</p>
                  <p className="font-serif text-3xl font-light text-[#EADFCF]">${totalEstimate.toLocaleString()}</p>
                </div>
                <span className="font-sans text-[10px] text-stone-400">Taxes Included</span>
              </div>

              <button 
                onClick={() => handleSelectPackageForBooking(currentBasePackage.name)}
                className="w-full py-4 bg-[#EADFCF] text-[#2C2A29] rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-white transition-all shadow-lg flex items-center justify-center space-x-2 group"
              >
                <span>Book This Package</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-stone-400 font-sans text-[11px] pt-2">
                <ShieldCheck size={14} className="text-[#B89B72]" />
                <span>Custom payment plans available upon booking</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- TESTIMONIALS CAROUSEL SECTION --- */}
      <section id="testimonials" className="py-24 bg-[#F4EFEA] border-y border-[#EADFCF]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12">
          
          <div className="space-y-2">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A38A66] font-semibold">Love Notes</span>
            <h2 className="text-3xl sm:text-5xl font-light text-[#2C2A29]">
              Kind Words From Past Couples
            </h2>
          </div>

          <div className="relative bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-[#EADFCF]">
            <div className="flex justify-center space-x-1 text-[#B89B72] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="font-serif text-lg md:text-2xl text-[#2C2A29] italic leading-relaxed max-w-3xl mx-auto">
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>

            <div className="mt-8 flex flex-col items-center space-y-3">
              <img 
                src={TESTIMONIALS[activeTestimonial].image} 
                alt={TESTIMONIALS[activeTestimonial].names} 
                className="w-16 h-16 rounded-full object-cover shadow-md border-2 border-[#EADFCF]"
              />
              <div>
                <h4 className="font-serif text-lg text-[#2C2A29]">{TESTIMONIALS[activeTestimonial].names}</h4>
                <p className="font-sans text-xs uppercase tracking-widest text-[#7C746E]">
                  {TESTIMONIALS[activeTestimonial].venue}
                </p>
              </div>
            </div>

            {/* Testimonial Switch Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === idx ? 'bg-[#2C2A29] w-8' : 'bg-[#E0D5C7]'
                  }`}
                  aria-label={`Testimonial slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION --- */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A38A66] font-semibold">Common Questions</span>
          <h2 className="text-3xl sm:text-5xl font-light text-[#2C2A29]">
            Frequently Asked Details
          </h2>
          <p className="font-sans text-sm text-[#7C746E] font-light">
            Everything you need to know about the reservation process, image delivery, and destination logistics.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const [isOpen, setIsOpen] = useState(index === 0);
            return (
              <div 
                key={index} 
                className="border border-[#EADFCF] rounded-2xl bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full text-left p-6 flex justify-between items-center space-x-4 font-serif text-lg text-[#2C2A29]"
                >
                  <span>{faq.question}</span>
                  <div className={`p-2 rounded-full bg-[#FAF8F5] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronRight size={18} className="text-[#8C827A]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 font-sans text-sm text-[#59534E] leading-relaxed font-light border-t border-[#F4EFEA] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* --- BOOKING / INQUIRY FORM SECTION --- */}
      <section id="inquiry" className="py-24 bg-[#2C2A29] text-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#D8C9B8]">Begin Your Story</span>
            <h2 className="text-4xl sm:text-5xl font-light text-white leading-tight">
              Let's Create Magic Together
            </h2>
            <p className="font-sans text-sm text-stone-300 font-light leading-relaxed">
              We accept a limited number of commissions each year to maintain an intimate, personalized level of artistry. Fill out the inquiry form to check availability for your date.
            </p>

            <div className="space-y-4 font-sans text-xs text-stone-300 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#B89B72]" />
                <span>New York • Florence • Available Worldwide</span>
              </div>
              <div className="flex items-center space-x-3">
                <Camera size={16} className="text-[#B89B72]" />
                <span>hello@elenagrandphotography.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF8F5] text-[#2C2A29] rounded-3xl p-8 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#EADFCF] rounded-full flex items-center justify-center mx-auto text-[#2C2A29]">
                  <Check size={32} />
                </div>
                <h3 className="font-serif text-3xl">Inquiry Received</h3>
                <p className="font-sans text-sm text-[#7C746E] max-w-md mx-auto font-light">
                  Thank you for reaching out! I will review your wedding details and reply within 24 business hours with full pricing & date availability.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)} 
                  className="mt-4 px-6 py-2.5 border border-[#2C2A29] rounded-full font-sans text-xs uppercase tracking-widest"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="space-y-4 font-sans text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Couple Names *</label>
                    <input 
                      type="text" 
                      name="coupleNames" 
                      required 
                      value={formData.coupleNames}
                      onChange={handleInputChange}
                      placeholder="e.g. Clara & Thomas" 
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="clara@example.com" 
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Wedding / Event Date</label>
                    <input 
                      type="date" 
                      name="weddingDate" 
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Venue / City Location *</label>
                    <input 
                      type="text" 
                      name="venueLocation" 
                      required
                      value={formData.venueLocation}
                      onChange={handleInputChange}
                      placeholder="e.g. Villa d'Este, Lake Como" 
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Estimated Guests</label>
                    <select 
                      name="estimatedGuests"
                      value={formData.estimatedGuests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    >
                      <option>Under 50 (Intimate/Elopement)</option>
                      <option>50 - 100 Guests</option>
                      <option>100 - 200 Guests</option>
                      <option>200+ Guests</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="uppercase tracking-widest text-[#59534E] font-medium">Package Preference</label>
                    <select 
                      name="selectedPackageChoice"
                      value={formData.selectedPackageChoice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                    >
                      <option>Elopement Essentials</option>
                      <option>Full-Day Classic</option>
                      <option>Luxury Weekend</option>
                      <option>Undecided / Custom Quote Needed</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="uppercase tracking-widest text-[#59534E] font-medium">Tell Us About Your Vision & Details</label>
                  <textarea 
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Share your love story, vibe, special requests, or questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D5C7] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2C2A29]"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="w-full py-4 bg-[#2C2A29] text-white rounded-full uppercase tracking-widest font-semibold hover:bg-[#B89B72] transition-colors shadow-lg flex items-center justify-center space-x-2"
                >
                  {formLoading ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Official Inquiry</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-[#1C1917] text-white py-16 border-t border-stone-800 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <span className="text-xl font-serif tracking-widest uppercase block">ELENA GRAND</span>
            <p className="text-stone-400 font-light leading-relaxed">
              Luxury wedding & editorial photography celebrating authentic romance across the world's most breathtaking destinations.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-[#D8C9B8] font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-stone-400 font-light">
              <li><a href="#about" className="hover:text-white transition-colors">About Elena</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio Gallery</a></li>
              <li><a href="#investment" className="hover:text-white transition-colors">Investment Estimator</a></li>
              <li><a href="#inquiry" className="hover:text-white transition-colors">Check Availability</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-[#D8C9B8] font-semibold">Connect & Follow</h4>
            <div className="flex space-x-4 text-stone-300">
              <a href="#" className="p-2.5 rounded-full bg-stone-800 hover:bg-[#B89B72] transition-colors" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-800 hover:bg-[#B89B72] transition-colors" aria-label="Pinterest">
                <Camera size={18} />
              </a>
            </div>
            <p className="text-stone-400 font-light text-[11px] pt-2">@elenagrandphoto on social</p>
          </div>

          <div className="space-y-3">
            <h4 className="uppercase tracking-widest text-[#D8C9B8] font-semibold">Love Notes Newsletter</h4>
            <p className="text-stone-400 font-light">Subscribe for seasonal travel dates and elopement location guides.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-stone-800 text-white px-4 py-2.5 rounded-l-xl focus:outline-none w-full text-xs"
              />
              <button className="bg-[#EADFCF] text-[#2C2A29] px-4 py-2.5 rounded-r-xl font-semibold uppercase hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-stone-800 text-center text-stone-500 text-[11px] flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Elena Grand Photography LLC. All Rights Reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}