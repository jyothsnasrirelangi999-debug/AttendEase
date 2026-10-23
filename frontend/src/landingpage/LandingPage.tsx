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
  CalendarCheck,
  ShieldCheck,
  Zap,
  GraduationCap,
} from 'lucide-react';

import './landing.css';
import logoImg from '../assets/logo.png';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const FAQS = [
  {
    question: 'How do students apply for duty-leave / permissions?',
    answer:
      "Students can log in to the Student Portal, click 'New Permission Request', select their date, time slot/periods, reason category, and upload proof documents. Once submitted, it forwards to their assigned Faculty Advisor.",
  },
  {
    question: 'How does Faculty mark attendance?',
    answer:
      'Faculty members log in, select the Year and Target Section (e.g. CSIT-B), select the specific period (P1 to P8), and tap student roll numbers to mark Present/Absent. Approved permissions automatically highlight in yellow.',
  },
  {
    question: 'What is the HOD Direct Exemption feature?',
    answer:
      'HODs can grant bulk attendance exemptions to multiple students directly for academic events, hackathons, sports, or official college duties without requiring individual student submissions.',
  },
  {
    question: 'How can I export attendance to WhatsApp?',
    answer:
      "On the Public Permissions & Attendance page, tap 'Share to WhatsApp' or 'WhatsApp Report' to automatically format sorted presentees and absentees lists with Date and Time, ready to paste directly into official WhatsApp groups.",
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
    icon: Lock,
    title: 'Flexible Login & Security',
    description:
      'Sign in with a password, 4-digit PIN, or registered biometric passkeys such as Touch ID, Face ID, and Windows Hello.',
    color: 'orange',
  },
  {
    icon: CheckCircle2,
    title: 'Instant Permission Sync',
    description:
      'Approved duty-leave requests automatically highlight students across faculty attendance and public permission pages.',
    color: 'green',
  },
  {
    icon: Clock,
    title: 'Period-Wise Attendance',
    description:
      'Manage attendance across periods P1–P8 with flexible period selection for everyday classroom workflows.',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'WhatsApp Reports',
    description:
      'Generate neatly formatted attendance reports with present and absent student lists, ready to share.',
    color: 'purple',
  },
];

const STATS = [
  { value: '01', label: 'Unified platform', icon: CalendarCheck },
  { value: 'P1–P8', label: 'Period management', icon: Clock },
  { value: '24/7', label: 'Portal accessibility', icon: Zap },
];

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        '👋 Hi! I am the AttendEase AI Support Assistant. Ask me anything about student permissions, faculty attendance, or portal features!',
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

    const updatedMessages = [
      ...messages,
      { role: 'user' as const, content: query },
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
            'I could not connect to the AI assistant right now. Please try again later.',
        },
      ]);
    } finally {
      setIsLoadingMsg(false);
    }
  };

  return (
    <div className="landing-page-wrapper">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-container landing-nav-inner">
          <Link to="/" className="landing-nav-logo">
            <img
              src={logoImg}
              alt="AttendEase logo"
              className="landing-nav-logo-img"
            />
            <span className="landing-nav-brand">
              Attend<span>Ease</span>
            </span>
          </Link>

          <div className="landing-nav-links">
            <a href="#features" className="landing-nav-text-link">
              Features
            </a>

            <a href="#faq" className="landing-nav-text-link">
              FAQs
            </a>

            <Link
              to="/permissions"
              className="landing-btn landing-btn-secondary"
            >
              View Attendance
            </Link>

            <Link to="/" className="landing-btn landing-btn-primary">
              Login <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="landing-hero landing-container">
        <motion.div
          className="landing-hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="landing-hero-badge">
            <Sparkles size={15} />
            <span>Smarter Campus Management</span>
          </div>

          <h1 className="landing-hero-title landing-display-font">
            Attendance made
            <br />
            <span className="landing-hero-highlight">simple. Smart. Seamless.</span>
          </h1>

          <p className="landing-hero-sub">
            Meet AttendEase — a unified attendance and permission management
            platform built for SRKR Engineering College. Spend less time on
            paperwork and more time on what matters.
          </p>

          <div className="landing-hero-ctas">
            <Link to="/" className="landing-btn landing-btn-primary">
              Get Started <ArrowRight size={17} />
            </Link>

            <Link to="/permissions" className="landing-btn landing-btn-secondary">
              Explore Attendance
            </Link>

            <a
              href="https://github.com/gowthamkrishna27/AttendEase/releases/download/stable/AttendEase-v1.1.0.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn landing-btn-download"
            >
              <Download size={17} />
              Android App
            </a>
          </div>

          <div className="landing-hero-trust">
            <span className="landing-trust-icon">
              <ShieldCheck size={17} />
            </span>
            <span>One platform for students, faculty and HODs</span>
          </div>
        </motion.div>

        <motion.div
          className="landing-hero-visual"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="landing-visual-orb landing-visual-orb-one" />
          <div className="landing-visual-orb landing-visual-orb-two" />

          <div className="landing-hero-glass-card">
            <div className="landing-visual-topline">
              <div className="landing-visual-brand">
                <img src={logoImg} alt="" />
                <div>
                  <strong>AttendEase</strong>
                  <span>Campus dashboard</span>
                </div>
              </div>

              <span className="landing-live-badge">
                <span /> Live
              </span>
            </div>

            <div className="landing-visual-welcome">
              <span>YOUR CAMPUS, ORGANIZED</span>
              <h2>Everything in one place.</h2>
              <p>Attendance, permissions and reports.</p>
            </div>

            <div className="landing-visual-metrics">
              <div className="landing-visual-metric">
                <div className="landing-metric-icon metric-orange">
                  <CalendarCheck size={19} />
                </div>
                <span>Attendance</span>
                <strong>Period-wise</strong>
              </div>

              <div className="landing-visual-metric">
                <div className="landing-metric-icon metric-green">
                  <CheckCircle2 size={19} />
                </div>
                <span>Permissions</span>
                <strong>Easy tracking</strong>
              </div>

              <div className="landing-visual-metric">
                <div className="landing-metric-icon metric-blue">
                  <FileText size={19} />
                </div>
                <span>Reports</span>
                <strong>Quick sharing</strong>
              </div>
            </div>

            <div className="landing-visual-footer">
              <div className="landing-visual-avatar">
                <GraduationCap size={20} />
              </div>
              <div>
                <strong>Built for campus life</strong>
                <span>Less paperwork. More productivity.</span>
              </div>
              <Sparkles size={20} className="landing-visual-sparkle" />
            </div>
          </div>

          <div className="landing-floating-note landing-floating-note-top">
            <span className="landing-floating-icon green">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <strong>Permission tracked</strong>
              <span>Workflow simplified</span>
            </div>
          </div>

          <div className="landing-floating-note landing-floating-note-bottom">
            <span className="landing-floating-icon orange">
              <Zap size={18} />
            </span>
            <div>
              <strong>Made for classrooms</strong>
              <span>Smart and efficient</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Quick highlights */}
      <section className="landing-stats-section">
        <div className="landing-container landing-stats-grid">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                className="landing-stat-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="landing-stat-icon">
                  <Icon size={21} />
                </div>
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Screenshots */}
      <section className="landing-marquee-wrapper" id="screenshots">
        <div className="landing-container landing-showcase-heading">
          <span className="landing-eyebrow">TAKE A CLOSER LOOK</span>
          <h2 className="landing-display-font">
            Designed around your workflow.
          </h2>
          <p>
            A clear, practical interface for everyday campus tasks.
          </p>
        </div>

        <div className="landing-marquee-container">
          {[...SCREENSHOTS, ...SCREENSHOTS].map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="landing-screenshot-item">
              <div className="landing-screenshot-frame">
                <img
                  src={item.src}
                  alt={item.title}
                  className="landing-phone-mockup"
                  loading="lazy"
                />
              </div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="landing-features-section" id="features">
        <div className="landing-container">
          <div className="landing-section-heading">
            <span className="landing-eyebrow">POWERFUL BY DESIGN</span>
            <h2 className="landing-section-title landing-display-font">
              Everything your campus needs.
            </h2>
            <p className="landing-section-sub">
              Thoughtful tools to simplify attendance and permission management
              for the entire department.
            </p>
          </div>

          <div className="landing-features-grid">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.article
                  key={feature.title}
                  className={`landing-feature-card landing-feature-${feature.color}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="landing-feature-icon">
                    <Icon size={24} />
                  </div>

                  <h3 className="landing-feature-title landing-display-font">
                    {feature.title}
                  </h3>

                  <p className="landing-feature-desc">
                    {feature.description}
                  </p>

                  <div className="landing-feature-bottom">
                    <span>Built for productivity</span>
                    <CheckCircle2 size={17} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it helps */}
      <section className="landing-workflow-section">
        <div className="landing-container landing-workflow-inner">
          <div className="landing-workflow-copy">
            <span className="landing-eyebrow">LESS EFFORT, MORE CLARITY</span>
            <h2 className="landing-display-font">
              Your daily campus workflow, simplified.
            </h2>
            <p>
              From submitting a permission request to reviewing attendance,
              AttendEase brings essential campus workflows together in one
              convenient place.
            </p>

            <div className="landing-workflow-list">
              <div>
                <CheckCircle2 size={19} />
                <span>Submit and review permission requests</span>
              </div>
              <div>
                <CheckCircle2 size={19} />
                <span>Manage period-wise attendance</span>
              </div>
              <div>
                <CheckCircle2 size={19} />
                <span>Share attendance reports with ease</span>
              </div>
            </div>

            <Link to="/permissions" className="landing-btn landing-btn-primary">
              Explore the Portal <ArrowRight size={17} />
            </Link>
          </div>

          <div className="landing-workflow-visual">
            <div className="landing-workflow-card">
              <div className="landing-workflow-card-header">
                <div className="landing-workflow-card-icon">
                  <CalendarCheck size={21} />
                </div>
                <div>
                  <strong>Permission workflow</strong>
                  <span>A simpler process</span>
                </div>
              </div>

              <div className="landing-workflow-step">
                <span className="landing-workflow-step-number">01</span>
                <div>
                  <strong>Submit a request</strong>
                  <p>Provide the date, periods and reason.</p>
                </div>
                <CheckCircle2 size={18} />
              </div>

              <div className="landing-workflow-connector" />

              <div className="landing-workflow-step">
                <span className="landing-workflow-step-number">02</span>
                <div>
                  <strong>Review and approval</strong>
                  <p>The request follows the assigned workflow.</p>
                </div>
                <CheckCircle2 size={18} />
              </div>

              <div className="landing-workflow-connector" />

              <div className="landing-workflow-step">
                <span className="landing-workflow-step-number">03</span>
                <div>
                  <strong>Track attendance</strong>
                  <p>View permission and attendance information.</p>
                </div>
                <CheckCircle2 size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-faq-section" id="faq">
        <div className="landing-container landing-faq-container">
          <div className="landing-section-heading">
            <span className="landing-eyebrow">HERE TO HELP</span>
            <h2 className="landing-display-font">
              Frequently asked questions.
            </h2>
            <p className="landing-section-sub">
              Find quick answers to common questions about AttendEase.
            </p>
          </div>

          <div className="landing-faq-list">
            {FAQS.map((faq, idx) => (
              <div
                key={faq.question}
                className={`landing-faq-item ${
                  activeFaq === idx ? 'landing-faq-active' : ''
                }`}
              >
                <button
                  type="button"
                  aria-expanded={activeFaq === idx}
                  onClick={() =>
                    setActiveFaq(activeFaq === idx ? null : idx)
                  }
                  className="landing-faq-question"
                >
                  <span>{faq.question}</span>
                  <span className="landing-faq-chevron">
                    {activeFaq === idx ? (
                      <ChevronUp size={19} />
                    ) : (
                      <ChevronDown size={19} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="landing-faq-answer-wrap"
                    >
                      <p className="landing-faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="landing-cta-section">
        <div className="landing-container">
          <div className="landing-cta-card">
            <div className="landing-cta-decoration landing-cta-decoration-one" />
            <div className="landing-cta-decoration landing-cta-decoration-two" />

            <div className="landing-cta-content">
              <span className="landing-cta-eyebrow">
                WELCOME TO ATTENDEASE
              </span>
              <h2 className="landing-display-font">
                Make campus management
                <br />
                a little easier.
              </h2>
              <p>
                Access your portal and experience a more organized way to
                manage attendance and permissions.
              </p>

              <div className="landing-cta-actions">
                <Link to="/" className="landing-btn landing-btn-cta">
                  Get Started <ArrowRight size={17} />
                </Link>
                <Link
                  to="/permissions"
                  className="landing-btn landing-btn-cta-secondary"
                >
                  View Attendance
                </Link>
              </div>
            </div>

            <div className="landing-cta-icon">
              <img src={logoImg} alt="AttendEase" />
              <Sparkles size={25} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <Link to="/" className="landing-nav-logo">
            <img
              src={logoImg}
              alt="AttendEase logo"
              className="landing-footer-logo"
            />
            <span className="landing-nav-brand">
              Attend<span>Ease</span>
            </span>
          </Link>

          <p>Making attendance management simpler.</p>

          <div className="landing-footer-links">
            <Link to="/">Login</Link>
            <Link to="/permissions">Public Attendance</Link>
            <a href="#faq">FAQs</a>
          </div>

          <span className="landing-footer-copyright">
            © {new Date().getFullYear()} AttendEase
          </span>
        </div>
      </footer>

      {/* AI Chatbot */}
      <div className="landing-chat-fab">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              className="landing-chat-window"
            >
              <div className="landing-chat-header">
                <div className="landing-chat-header-info">
                  <div className="landing-chat-avatar">
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <h4>AttendEase AI Support</h4>
                    <span>
                      <span className="landing-chat-status-dot" />
                      Assistant available
                    </span>
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
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
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
                    <span />
                    <span />
                    <span />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="landing-chat-suggestions">
                {[
                  'How to request permission?',
                  'WhatsApp Format?',
                  'HOD Exemption?',
                ].map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoadingMsg}
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
                  aria-label="Ask AttendEase AI"
                  className="landing-chat-input"
                />

                <button
                  type="submit"
                  disabled={isLoadingMsg || !inputMsg.trim()}
                  aria-label="Send message"
                  className="landing-chat-send"
                >
                  <Send size={17} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="landing-fab-btn"
          title="Ask AttendEase AI Assistant"
          aria-label={isChatOpen ? 'Close AI assistant' : 'Open AI assistant'}
          aria-expanded={isChatOpen}
        >
          {isChatOpen ? <X size={24} /> : <Bot size={25} />}
        </button>
      </div>
    </div>
  );
}
