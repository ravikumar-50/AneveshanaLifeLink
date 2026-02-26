import { useState } from 'react';
import { X, Play, BookOpen, Clock, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CPR_IMG = 'https://images.unsplash.com/photo-1622115297822-a3798fdbe1f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDUFIlMjBmaXJzdCUyMGFpZCUyMGVtZXJnZW5jeSUyMHRyYWluaW5nfGVufDF8fHx8MTc3MjAyNzY5OHww&ixlib=rb-4.1.0&q=80&w=1080';
const BLEEDING_IMG = 'https://images.unsplash.com/photo-1650532092996-05eaf4a5381d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMGJsZWVkaW5nJTIwd291bmQlMjBiYW5kYWdlfGVufDF8fHx8MTc3MjAyNzY5OXww&ixlib=rb-4.1.0&q=80&w=1080';
const STROKE_IMG = 'https://images.unsplash.com/photo-1579043327150-862ad8f6c72d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJva2UlMjBicmFpbiUyMG1lZGljYWwlMjB3YXJuaW5nJTIwc2lnbnN8ZW58MXx8fHwxNzcyMDI3Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080';
const ACCIDENT_IMG = 'https://images.unsplash.com/photo-1673187139211-1e7ec3dd60ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwYWNjaWRlbnQlMjBlbWVyZ2VuY3klMjByZXNjdWUlMjBzdXBwb3J0fGVufDF8fHx8MTc3MjAyNzY5OXww&ixlib=rb-4.1.0&q=80&w=1080';

interface Guide {
  id: number;
  title: string;
  category: string;
  duration: string;
  image: string;
  badge: string;
  badgeColor: string;
  steps: string[];
  description: string;
}

const guides: Guide[] = [
  {
    id: 1,
    title: 'CPR Emergency',
    category: 'Life Support',
    duration: '5 min read',
    image: CPR_IMG,
    badge: 'Critical',
    badgeColor: '#E53935',
    description: 'Cardiopulmonary resuscitation (CPR) is a lifesaving technique. Learn how to perform CPR correctly in an emergency.',
    steps: [
      'Check if the person is responsive — tap their shoulders and call loudly.',
      'Call for emergency help immediately — dial 112 or 108.',
      'Tilt the head back gently and lift the chin to open airway.',
      'Check for breathing (no more than 10 seconds).',
      'Begin chest compressions — 30 compressions at center of chest.',
      'Push down at least 2 inches at a rate of 100-120 per minute.',
      'Give 2 rescue breaths after every 30 compressions.',
      'Continue until emergency services arrive or the person recovers.',
    ],
  },
  {
    id: 2,
    title: 'First Aid for Bleeding',
    category: 'Wound Care',
    duration: '3 min read',
    image: BLEEDING_IMG,
    badge: 'Important',
    badgeColor: '#D97706',
    description: 'Knowing how to control bleeding can prevent life-threatening blood loss. Follow these steps immediately.',
    steps: [
      'Protect yourself — wear gloves or use a clean cloth barrier if available.',
      'Apply firm, direct pressure on the wound using a clean cloth or bandage.',
      'Do not remove the cloth — if soaked, add more on top.',
      'Elevate the injured limb above heart level if possible.',
      'Tie a bandage firmly to maintain pressure — not too tight to cut circulation.',
      'If bleeding is severe or from a major artery, apply a tourniquet above the wound.',
      'Call 108 immediately for severe bleeding.',
      'Keep the person calm, warm, and lying down until help arrives.',
    ],
  },
  {
    id: 3,
    title: 'Stroke Warning Signs',
    category: 'Neurological',
    duration: '4 min read',
    image: STROKE_IMG,
    badge: 'Time Critical',
    badgeColor: '#7C3AED',
    description: 'Recognizing a stroke early can save lives and prevent permanent disability. Every minute counts.',
    steps: [
      'Use the FAST test — Face, Arms, Speech, Time.',
      'FACE: Ask person to smile — is one side drooping?',
      'ARMS: Ask to raise both arms — does one drift down?',
      'SPEECH: Ask to speak — is it slurred or strange?',
      'TIME: If YES to any, call 108 immediately — do not wait.',
      'Note the exact time symptoms started — tell doctors.',
      'Keep person calm and comfortable — no food or water.',
      'Do not give aspirin unless directed by a doctor.',
    ],
  },
  {
    id: 4,
    title: 'Accident Support',
    category: 'Trauma Care',
    duration: '6 min read',
    image: ACCIDENT_IMG,
    badge: 'Essential',
    badgeColor: '#059669',
    description: 'After a road accident, immediate correct action can prevent further injury and save lives.',
    steps: [
      'Ensure your own safety first — park safely, use hazard lights.',
      'Call 108 (Ambulance) and 112 (Emergency) immediately.',
      'Do not move the injured person unless in immediate danger.',
      'Check if they are conscious — talk to them gently.',
      'Control any visible bleeding with firm pressure.',
      'If breathing stops, begin CPR if you are trained.',
      'Keep injured person warm with a blanket or clothing.',
      'Stay with the person and keep them calm until help arrives.',
    ],
  },
];

const categories = ['All', 'Life Support', 'Wound Care', 'Neurological', 'Trauma Care'];

export function HelpGuides() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = guides.filter((g) => {
    const matchesCategory = activeCategory === 'All' || g.category === activeCategory;
    const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
            style={{ backgroundColor: '#EFF6FF', color: '#1E3A8A' }}
          >
            <BookOpen className="w-4 h-4" />
            Emergency Education
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#1E3A8A' }}>
            Emergency Help Guides
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Learn essential life-saving skills. These guides can help you act confidently in any emergency.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat ? 'text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
                style={activeCategory === cat ? { backgroundColor: '#1E3A8A' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedGuide(guide)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Badge */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-xs font-bold shadow"
                  style={{ backgroundColor: guide.badgeColor }}
                >
                  {guide.badge}
                </div>

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center shadow-xl">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Category at bottom */}
                <div className="absolute bottom-3 left-3">
                  <p className="text-white/80 text-xs">{guide.category}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-1">{guide.title}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {guide.duration}
                  </div>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold"
                    style={{ color: '#1E3A8A' }}
                  >
                    View Guide <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No guides found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl border-2 border-dashed flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          style={{ borderColor: '#BFDBFE', backgroundColor: '#EFF6FF' }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1E3A8A' }}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Full Video Guides Coming Soon!</p>
            <p className="text-gray-500 text-sm mt-0.5">
              Detailed step-by-step video guidance in Hindi, Telugu, and other regional languages will be available in the next version of LifeLink.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Guide Modal */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => e.target === e.currentTarget && setSelectedGuide(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-52">
                <img
                  src={selectedGuide.image}
                  alt={selectedGuide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Close */}
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Title on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="inline-block px-2.5 py-1 rounded-full text-white text-xs font-bold mb-2"
                    style={{ backgroundColor: selectedGuide.badgeColor }}
                  >
                    {selectedGuide.badge}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedGuide.title}</h2>
                  <div className="flex items-center gap-3 mt-1 text-white/80 text-xs">
                    <span>{selectedGuide.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selectedGuide.duration}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedGuide.description}</p>

                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold" style={{ color: '#1E3A8A' }}>
                    ✓
                  </span>
                  Step-by-Step Guide
                </h3>

                <div className="space-y-3">
                  {selectedGuide.steps.map((step, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-3 rounded-xl"
                      style={{ backgroundColor: i % 2 === 0 ? '#F8FAFC' : 'white', border: '1px solid #F0F0F0' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5"
                        style={{ backgroundColor: selectedGuide.badgeColor }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Video coming soon notice */}
                <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                  <Play className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-orange-800 text-sm">Video Guidance Coming Soon</p>
                    <p className="text-orange-600 text-xs mt-0.5">Full video guidance will be available in the next version of LifeLink.</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedGuide(null)}
                  className="mt-5 w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: '#1E3A8A' }}
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
