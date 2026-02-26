import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  X,
  Send,
  Wifi,
  Shield,
  Clock,
  Heart,
  ChevronRight,
  Volume2,
  MoreVertical,
  Maximize,
  Minimize,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DOCTOR_IMG =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMG1lZGljYWx8ZW58MXx8fHwxNzcyMDI3Njk4fDA&ixlib=rb-4.1.0&q=80&w=400";

interface ChatMessage {
  id: number;
  sender: "doctor" | "you";
  text: string;
  time: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "doctor",
    text: "Hello! I am Dr. Priya Sharma. I can see you have activated the emergency SOS. Please tell me what happened.",
    time: "8:01 PM",
  },
  {
    id: 2,
    sender: "you",
    text: "My father is unconscious and not responding.",
    time: "8:02 PM",
  },
  {
    id: 3,
    sender: "doctor",
    text: "Stay calm. Is he breathing? Place your ear near his mouth and check. I will guide you step by step.",
    time: "8:02 PM",
  },
  {
    id: 4,
    sender: "doctor",
    text: "An ambulance from Tadepalligudem PHC has been dispatched. ETA ~8 minutes. Keep him in recovery position.",
    time: "8:03 PM",
  },
];

function now() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function VideoCall() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [connectionQuality] = useState<"excellent" | "good" | "poor">("good");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const formatDuration = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender: "you",
      text: input.trim(),
      time: now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    // Simulate doctor reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          text: "Understood. Continue monitoring his breathing. Help is on the way.",
          time: now(),
        },
      ]);
    }, 2000);
  };

  const handleEndCall = () => {
    setCallEnded(true);
    setTimeout(() => navigate("/emergency"), 2200);
  };

  const qualityColor = {
    excellent: "#22C55E",
    good: "#F59E0B",
    poor: "#EF4444",
  }[connectionQuality];
  const qualityLabel = { excellent: "Excellent", good: "Good", poor: "Poor" }[
    connectionQuality
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ backgroundColor: "#0A0E1A" }}
    >
      {/* Call Ended Overlay */}
      <AnimatePresence>
        {callEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ backgroundColor: "rgba(10,14,26,0.95)" }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <PhoneOff className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Call Ended</h2>
              <p className="text-gray-400 text-sm">
                Duration: {formatDuration(callDuration)}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Returning to Emergency screen...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content Area */}
      <div
        className={`flex-1 flex flex-col relative ${chatOpen ? "md:mr-80" : ""} transition-all duration-300`}
      >
        {/* TOP BAR */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,14,26,0.9), transparent)",
          }}
        >
          {/* Live Badge + Info */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 bg-red-600 rounded-full px-3 py-1 shadow-lg"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold tracking-wider">
                LIVE
              </span>
            </motion.div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">
                Dr. Priya Sharma
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                General Physician · Tadepalligudem PHC
              </p>
            </div>
          </div>

          {/* Timer + Quality + Controls */}
          <div className="flex items-center gap-3">
            {/* Connection Quality */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Wifi className="w-3.5 h-3.5" style={{ color: qualityColor }} />
              <span
                className="text-xs font-medium"
                style={{ color: qualityColor }}
              >
                {qualityLabel}
              </span>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="text-white text-xs font-mono font-bold">
                {formatDuration(callDuration)}
              </span>
            </div>

            {/* Chat Toggle */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{
                backgroundColor: chatOpen
                  ? "#1E3A8A"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              <MessageSquare className="w-4 h-4 text-white" />
              {messages.length > 4 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {messages.length - 4}
                </span>
              )}
            </button>

            {/* More options */}
            <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <MoreVertical className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* DOCTOR VIDEO (Main) */}
        <div className="flex-1 relative overflow-hidden">
          {/* Doctor video background */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#111827" }}
          >
            <img
              src={DOCTOR_IMG}
              alt="Doctor"
              className="w-full h-full object-cover opacity-80"
              style={{ filter: "blur(0px)" }}
            />
            {/* Vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(10,14,26,0.6) 100%)",
              }}
            />
          </div>

          {/* Doctor Speaking Indicator */}
          <motion.div
            className="absolute bottom-28 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <div className="flex gap-0.5 items-end h-4">
                {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-green-400"
                    animate={{ height: [h, h + 6, h, h + 4, h] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    style={{ height: h }}
                  />
                ))}
              </div>
              <span className="text-white text-xs font-medium">
                Dr. Priya Sharma is speaking
              </span>
            </div>
          </motion.div>

          {/* Emergency Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-16 left-4 sm:top-20"
          >
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 shadow-xl border border-red-500/30"
              style={{
                backgroundColor: "rgba(229,57,53,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <div>
                <p className="text-white text-xs font-bold">Emergency Active</p>
                <p className="text-red-300 text-[10px]">
                  Ambulance ETA: ~6 min
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PATIENT VIDEO (Self – small PIP) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`absolute bottom-24 right-4 w-28 h-40 sm:w-36 sm:h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl cursor-pointer z-10 ${isFullscreen ? "bottom-28" : ""}`}
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isCameraOff ? (
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ backgroundColor: "#1F2937" }}
            >
              <VideoOff className="w-8 h-8 text-gray-500" />
              <p className="text-gray-500 text-xs mt-2">Camera Off</p>
            </div>
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center text-white"
              style={{
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <p className="text-white text-[10px] font-medium">You</p>
              <p className="text-blue-300 text-[9px]">Tadepalligudem</p>

              {/* Fake camera noise */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>
          )}

          {/* PIP resize icon */}
          <div className="absolute top-2 right-2">
            {isFullscreen ? (
              <Minimize className="w-3 h-3 text-white/60" />
            ) : (
              <Maximize className="w-3 h-3 text-white/60" />
            )}
          </div>

          {/* Muted indicator on self */}
          {isMuted && (
            <div className="absolute bottom-2 left-2">
              <MicOff className="w-3.5 h-3.5 text-red-400" />
            </div>
          )}
        </motion.div>

        {/* BOTTOM CONTROLS */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-4 pb-8 pt-6"
          style={{
            background:
              "linear-gradient(to top, rgba(10,14,26,0.95), transparent)",
          }}
        >
          {/* Mute */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg group-hover:scale-105"
              style={{
                backgroundColor: isMuted ? "#E53935" : "rgba(255,255,255,0.15)",
              }}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </div>
            <span className="text-white/60 text-xs">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </motion.button>

          {/* Camera */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCameraOff(!isCameraOff)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg group-hover:scale-105"
              style={{
                backgroundColor: isCameraOff
                  ? "#E53935"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              {isCameraOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-white" />
              )}
            </div>
            <span className="text-white/60 text-xs">
              {isCameraOff ? "Start Cam" : "Stop Cam"}
            </span>
          </motion.button>

          {/* END CALL – center prominent */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleEndCall}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-105"
              style={{
                backgroundColor: "#E53935",
                boxShadow:
                  "0 0 0 4px rgba(229,57,53,0.3), 0 8px 32px rgba(229,57,53,0.5)",
              }}
            >
              <PhoneOff className="w-7 h-7 text-white" />
            </div>
            <span className="text-red-400 text-xs font-semibold">End Call</span>
          </motion.button>

          {/* Volume */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-colors">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/60 text-xs">Speaker</span>
          </motion.button>

          {/* Shield */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-colors">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/60 text-xs">Secure</span>
          </motion.button>
        </div>
      </div>

      {/* CHAT SIDEBAR */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-80 flex flex-col z-30"
            style={{
              backgroundColor: "#111827",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Chat Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-white font-semibold text-sm">
                  Chat with Doctor
                </h3>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Doctor Info Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "rgba(30,58,138,0.2)",
              }}
            >
              <img
                src={DOCTOR_IMG}
                alt="Dr. Priya Sharma"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <div>
                <p className="text-white text-sm font-semibold">
                  Dr. Priya Sharma
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">
                    Online • Tadepalligudem PHC
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${msg.sender === "you" ? "order-2" : "order-1"}`}
                  >
                    {msg.sender === "doctor" && (
                      <p className="text-xs text-blue-400 mb-1 font-medium">
                        Dr. Priya Sharma
                      </p>
                    )}
                    <div
                      className="rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm"
                      style={{
                        backgroundColor:
                          msg.sender === "you" ? "#1E3A8A" : "#1F2937",
                        borderRadius:
                          msg.sender === "you"
                            ? "18px 18px 4px 18px"
                            : "18px 18px 18px 4px",
                      }}
                    >
                      <p className="text-white">{msg.text}</p>
                    </div>
                    <p className="text-gray-600 text-[10px] mt-1 text-right">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 flex gap-2 flex-wrap">
              {["He is breathing", "Need ambulance", "I need help"].map(
                (quick) => (
                  <button
                    key={quick}
                    onClick={() => setInput(quick)}
                    className="text-xs text-blue-300 border border-blue-800 rounded-full px-3 py-1 hover:bg-blue-900/40 transition-colors"
                  >
                    {quick} <ChevronRight className="w-3 h-3 inline" />
                  </button>
                ),
              )}
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                  style={{ backgroundColor: "#1E3A8A" }}
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
