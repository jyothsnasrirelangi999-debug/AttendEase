import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  Sparkles, 
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  Lock,
  ChevronDown,
  ChevronUp,
  Bot,
  FileText,
  Users,
  ShieldCheck,
  Menu,
  Zap,
  Smartphone,
  GraduationCap,
  BarChart3,
  ExternalLink,
} from 'lucide-react';

import './landing.css';
import logoImg from '../assets/logo.png';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const FAQS = [
  {
    question: 'How do students apply for duty-leave or permissions?',
    answer:
      "Students can log in to the Student Portal, click 'New Permission Request', select their date, time slot or periods, reason category, and upload proof documents. Once submitted, the request forwards to their assigned Faculty Advisor.",
  },
  {
    question: 'How does faculty mark attendance?',
    answer:
      'Faculty members log in, select the year and target section, choose the specific period, and mark students Present or Absent. Approved permissions are highlighted automatically.',
  },
  {
    question: 'What is the HOD Direct Exemption feature?',
    answer:
      'HODs can grant attendance exemptions to multiple students for academic events, hackathons, sports, and official college duties without requiring individual student submissions.',
  },
  {
    question: 'How can I export attendance to WhatsApp?',
    answer:
      "On the Public Permissions and Attendance page, use the WhatsApp sharing or report feature to format attendance lists with the date and time for sharing with official WhatsApp groups.",
  },
];

const SCREENSHOTS = [
  {
    title: 'Dashboard Overview',
    src: 'https://res.cloudinary.com/q40pqnho/image/upload/v1786111774/WhatsApp_Image_2026-08-07_at_7.31.38_PM_fs2vcw.jpg',
  },
  {
    title: 'Student Portal',
    src: 'https://res.cloudinary.com/ucckdidb/image/upload/v1787078511/Screenshot_20260819-001007_rtfv3g.png',
  },
  {
    title: 'Faculty Attendance',
    src: 'https://res.cloudinary.com/ucckdidb/image/upload/v1787078511/Screenshot_20260819-000150_yd6g1x.png',
  },
  {
    title: 'HOD Dashboard',
    src: 'https://res.cloudinary.com/ucckdidb/image/upload/v1787078511/Screenshot_20260819-000004_mojjji.png',
  },
  {
    title: 'Permissions Grid',
    src: 'https://res.cloudinary.com/q40pqnho/image/upload/v1786111849/WhatsApp_Image_2026-08-07_at_7.31.50_PM_1_kxqwb6.jpg',
  },
];

const FEATURES = [
  {
    icon: CheckCircle2,
    title: 'Smart Attendance',
    description:
      'Manage student attendance with period-wise selection and streamlined faculty workflows.',
    color: 'orange',
  },
  {
    icon: FileText,
    title: 'Digital Permissions',
    description:
      'Submit and review duty-leave requests with supporting documents and approval tracking.',
    color: 'blue',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Access',
    description:
      'Use the authentication methods configured for your account to access the appropriate portal.',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Easy Reporting',
    description:
      'View attendance information and prepare formatted reports for sharing with your team.',
    color: 'green',
  },
];

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        '👋 Hi! Welcome to AttendEase AI Support. Ask me anything about student permissions, faculty attendance, or portal features!',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isLoadingMsg, setIsLoadingMsg] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingMsg]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputMsg).trim();

    if (!query || isLoadingMsg) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: query },
    ];

    setMessages(updatedMessages);
    setInputMsg('');
    setIsLoadingMsg(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error('Chat request failed');
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.reply ||
            'Thank you for reaching out! How else can I assist you?',
        },
      ]);
    } catch (error) {
      console.error('Chat request error:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Unable to connect to AttendEase AI Support right now. Please try again later.',
        },
      ]);
    } finally {
      setIsLoadingMsg(false);
    }
  };

  return (
    <div className="landing-page-wrapper" id="home">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-container landing-nav-inner">
          <Link
            to="/"
            className="landing-nav-logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={logoImg}
              alt="AttendEase logo"
              className="landing-nav-logo-img"
            />

            <span className="landing-nav-brand">AttendEase</span>
          </Link>

          <button
            type="button"
            className="landing-mobile-menu"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div
            className={`landing-nav-links ${
              isMobileMenuOpen ? 'landing-nav-links-open' : ''
            }`}
          >
            <a
              href="#features"
              className="landing-nav-text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>

            <a
              href="#screenshots"
              className="landing-nav-text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Preview
            </a>

            <a
              href="#faq"
              className="landing-nav-text-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Support
            </a>

            <Link
              to="/permissions"
              className="landing-btn landing-btn-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              View Attendance
            </Link>

            <Link
              to="/"
              className="landing-btn landing-btn-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="landing-hero landing-container">
        <div className="landing-hero-copy">
          <motion.div
            className="landing-hero-badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} />
            <span>Smarter Campus Management</span>
          </motion.div>

          <motion.h1
            className="landing-hero-title landing-display-font"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Attendance made
            <br />
            <span className="landing-gradient-text">simple and smart.</span>
          </motion.h1>

          <motion.p
            className="landing-hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Meet AttendEase — a streamlined attendance and permission
            management platform designed for SRKR Engineering College.
            Manage attendance, handle permissions, and simplify everyday
            academic workflows in one place.
          </motion.p>

          <motion.div
            className="landing-hero-ctas"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/" className="landing-btn landing-btn-primary">
              Sign In to Portal <ArrowRight size={17} />
            </Link>

            <Link to="/permissions" className="landing-btn landing-btn-secondary">
              Explore Attendance
            </Link>
          </motion.div>

          <div className="landing-hero-trust">
            <span className="landing-trust-icon">
              <ShieldCheck size={17} />
            </span>

            <span>One platform for students, faculty, and HODs</span>
          </div>
        </div>

        {/* Glass Dashboard Preview */}
        <motion.div
          className="landing-hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="landing-orb landing-orb-orange" />
          <div className="landing-orb landing-orb-blue" />

          <div className="landing-dashboard-card">
            <div className="landing-dashboard-top">
              <div className="landing-dashboard-brand">
                <img src={logoImg} alt="" />
                <div>
                  <strong>AttendEase</strong>
                  <span>Campus dashboard preview</span>
                </div>
              </div>

              <span className="landing-dashboard-status">
                <span /> Smart workflow
              </span>
            </div>

            <div className="landing-dashboard-welcome">
              <span className="landing-mini-label">WELCOME TO</span>
              <h2>Attendance overview</h2>
              <p>A simpler way to manage academic workflows.</p>
            </div>

            <div className="landing-dashboard-grid">
              <div className="landing-stat-card">
                <div className="landing-stat-icon orange">
                  <Users size={19} />
                </div>
                <span>Student records</span>
                <strong>Organized</strong>
                <small>Easy to access</small>
              </div>

              <div className="landing-stat-card">
                <div className="landing-stat-icon blue">
                  <CheckCircle2 size={19} />
                </div>
                <span>Attendance</span>
                <strong>Period-wise</strong>
                <small>Simple tracking</small>
              </div>

              <div className="landing-stat-card">
                <div className="landing-stat-icon purple">
                  <FileText size={19} />
                </div>
                <span>Permissions</span>
                <strong>Digital</strong>
                <small>Approval workflow</small>
              </div>

              <div className="landing-stat-card">
                <div className="landing-stat-icon green">
                  <Zap size={19} />
                </div>
                <span>Reports</span>
                <strong>Share-ready</strong>
                <small>Convenient exports</small>
              </div>
            </div>

            <div className="landing-dashboard-bottom">
              <div className="landing-dashboard-bottom-icon">
                <GraduationCap size={21} />
              </div>

              <div>
                <strong>Built for campus workflows</strong>
                <p>Students · Faculty · HODs</p>
              </div>

              <CheckCircle2 size={20} className="landing-dashboard-check" />
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card-top">
            <div className="landing-floating-icon">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <strong>Less paperwork</strong>
              <span>Streamlined workflows</span>
            </div>
          </div>

          <div className="landing-floating-card landing-floating-card-bottom">
            <div className="landing-floating-icon blue">
              <Smartphone size={18} />
            </div>
            <div>
              <strong>Mobile friendly</strong>
              <span>Access on the go</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Value Highlights */}
      <section className="landing-highlights">
        <div className="landing-container landing-highlights-grid">
          <div className="landing-highlight">
            <div className="landing-highlight-icon">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <strong>Attendance tracking</strong>
              <span>Organized by period</span>
            </div>
          </div>

          <div className="landing-highlight">
            <div className="landing-highlight-icon">
              <FileText size={21} />
            </div>
            <div>
              <strong>Permission management</strong>
              <span>Digital request workflow</span>
            </div>
          </div>

          <div className="landing-highlight">
            <div className="landing-highlight-icon">
              <Lock size={21} />
            </div>
            <div>
              <strong>Role-based portal</strong>
              <span>Designed for campus roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features-section" id="features">
        <div className="landing-container">
          <div className="landing-section-heading">
            <span className="landing-section-eyebrow">
              <Sparkles size={14} /> EVERYTHING IN ONE PLACE
            </span>

            <h2 className="landing-section-title landing-display-font">
              Your campus workflow,
              <br />
              <span className="landing-gradient-text">reimagined.</span>
            </h2>

            <p className="landing-section-sub">
              Powerful tools that help simplify everyday attendance and
              permission management.
            </p>
          </div>

          <div className="landing-features-grid">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  className="landing-feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div
                    className={`landing-feature-icon landing-feature-icon-${feature.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <span className="landing-feature-number">
                    0{index + 1}
                  </span>

                  <h3 className="landing-feature-title landing-display-font">
                    {feature.title}
                  </h3>

                  <p className="landing-feature-desc">
                    {feature.description}
                  </p>

                  <div className="landing-feature-bottom">
                    <span>Explore functionality</span>
                    <ArrowRight size={16} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="landing-showcase-section" id="screenshots">
        <div className="landing-container">
          <div className="landing-section-heading">
            <span className="landing-section-eyebrow">
              <Smartphone size={14} /> PRODUCT PREVIEW
            </span>

            <h2 className="landing-section-title landing-display-font">
              A closer look at
              <br />
              <span className="landing-gradient-text">AttendEase.</span>
            </h2>

            <p className="landing-section-sub">
              Explore the interfaces built for students, faculty, and
              administrators.
            </p>
          </div>
        </div>

        <div className="landing-marquee-wrapper">
          <div className="landing-marquee-container">
            {[...SCREENSHOTS, ...SCREENSHOTS].map((item, index) => (
              <motion.article
                key={`${item.title}-${index}`}
                className="landing-showcase-item"
                whileHover={{ y: -8 }}
              >
                <div className="landing-phone-frame">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="landing-phone-mockup"
                    loading="lazy"
                  />
                </div>

                <p>{item.title}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Android Download CTA */}
      <section className="landing-download-section">
        <div className="landing-container">
          <div className="landing-download-card">
            <div className="landing-download-decoration landing-download-decoration-one" />
            <div className="landing-download-decoration landing-download-decoration-two" />

            <div className="landing-download-content">
              <span className="landing-section-eyebrow landing-download-eyebrow">
                <Smartphone size={14} /> ATTENDEASE FOR ANDROID
              </span>

              <h2 className="landing-display-font">
                Your campus,
                <br />
                <span>closer than ever.</span>
              </h2>

              <p>
                Access AttendEase on your Android device with the available
                application download.
              </p>

              <a
                href="https://github.com/gowthamkrishna27/AttendEase/releases/download/stable/AttendEase-v1.1.0.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn landing-btn-download"
              >
                <Download size={18} />
                Download Android App
                <ExternalLink size={15} />
              </a>

              <span className="landing-download-note">
                Download availability depends on the release link.
              </span>
            </div>

            <div className="landing-download-visual">
              <div className="landing-download-phone">
                <div className="landing-download-phone-camera" />
                <img src={logoImg} alt="AttendEase app logo" />
                <strong>AttendEase</strong>
                <span>Campus management</span>

                <div className="landing-download-phone-line" />
                <div className="landing-download-phone-line short" />

                <div className="landing-download-phone-status">
                  <CheckCircle2 size={15} />
                  Simple. Smart. Connected.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-faq-section" id="faq">
        <div className="landing-container landing-faq-container">
          <div className="landing-section-heading">
            <span className="landing-section-eyebrow">
              <Sparkles size={14} /> HELP &amp; ANSWERS
            </span>

            <h2 className="landing-section-title landing-display-font">
              Got questions?
              <br />
              <span className="landing-gradient-text">We've got answers.</span>
            </h2>

            <p className="landing-section-sub">
              Find quick answers about attendance, permissions, and portal
              features.
            </p>
          </div>

          <div className="landing-faq-list">
            {FAQS.map((faq, index) => (
              <article
                key={faq.question}
                className={`landing-faq-item ${
                  activeFaq === index ? 'landing-faq-item-active' : ''
                }`}
              >
                <button
                  type="button"
                  aria-expanded={activeFaq === index}
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="landing-faq-question"
                >
                  <span className="landing-faq-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>{faq.question}</span>

                  {activeFaq === index ? (
                    <ChevronUp size={19} />
                  ) : (
                    <ChevronDown size={19} />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="landing-faq-answer-wrapper"
                    >
                      <p className="landing-faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="landing-final-cta">
        <div className="landing-container">
          <div className="landing-final-cta-card">
            <div className="landing-final-cta-glow" />

            <span className="landing-final-cta-label">
              <Sparkles size={15} /> READY TO GET STARTED?
            </span>

            <h2 className="landing-display-font">
              Make attendance
              <br />
              <span>easier with AttendEase.</span>
            </h2>

            <p>
              Step into a simpler campus workflow with attendance and
              permission management in one place.
            </p>

            <div className="landing-final-cta-buttons">
              <Link to="/" className="landing-btn landing-btn-primary">
                Login to AttendEase <ArrowRight size={17} />
              </Link>

              <Link
                to="/permissions"
                className="landing-btn landing-btn-secondary"
              >
                View Public Attendance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <Link to="/" className="landing-footer-brand">
            <img src={logoImg} alt="" />
            <span>AttendEase</span>
          </Link>

          <p>
            Simplifying attendance and permission management at SRKR
            Engineering College.
          </p>

          <div className="landing-footer-links">
            <a href="#home">Back to top ↑</a>
            <a href="#features">Features</a>
            <a href="#faq">Support</a>
          </div>

          <span className="landing-footer-copy">
            © {new Date().getFullYear()} AttendEase
          </span>
        </div>
      </footer>

      {/* Floating AI Chatbot */}
      <div className="landing-chat-fab">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="landing-chat-window"
            >
              <div className="landing-chat-header">
                <div className="landing-chat-header-info">
                  <div className="landing-chat-avatar">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <h4>AttendEase AI Support</h4>
                    <span>Ask us about the portal</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close chat"
                  className="landing-chat-close"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="landing-chat-messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.role === 'user'
                        ? 'landing-msg-user'
                        : 'landing-msg-bot'
                    }
                  >
                    {msg.content}
                  </div>
                ))}

                {isLoadingMsg && (
                  <div className="landing-msg-bot landing-chat-thinking">
                    Thinking...
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="landing-chat-suggestions">
                {[
                  'How to request permission?',
                  'WhatsApp format?',
                  'HOD exemption?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isLoadingMsg}
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                className="landing-chat-input-area"
                onSubmit={(event) => {
                  event.preventDefault();
                  void handleSendMessage();
                }}
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(event) => setInputMsg(event.target.value)}
                  placeholder="Ask a question..."
                  aria-label="Ask AttendEase AI Support"
                />

                <button
                  type="submit"
                  disabled={isLoadingMsg || !inputMsg.trim()}
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsChatOpen((open) => !open)}
          className="landing-fab-btn"
          aria-label={isChatOpen ? 'Close AI support' : 'Open AI support'}
          title="Ask AttendEase AI Support"
        >
          {isChatOpen ? <X size={24} /> : <Bot size={26} />}
          {!isChatOpen && <span className="landing-fab-pulse" />}
        </button>
      </div>
    </div>
  );
}
