"use client";

import { useEffect, useRef, useState } from "react";
import { submitRSVP } from "./actions";

const PRESENTES = [
  { icon: "🏡", nome: "Lar dos Noivos", desc: "Contribuição para a decoração e equipamento do nosso novo lar.", valor: "Qualquer valor" },
  { icon: "✈️", nome: "Lua de Mel", desc: "Ajude-nos a tornar a nossa viagem dos sonhos inesquecível.", valor: "Qualquer valor" },
  { icon: "🍽️", nome: "Enxoval da Cozinha", desc: "Utensílios e electrodomésticos para a nossa cozinha.", valor: "A partir de 50 €" },
  { icon: "🛏️", nome: "Enxoval de Cama", desc: "Roupa de cama e banho para o nosso lar.", valor: "A partir de 40 €" },
  { icon: "📸", nome: "Álbum de Memórias", desc: "Contribuição para o álbum fotográfico e vídeo do nosso grande dia.", valor: "A partir de 30 €" },
  { icon: "💐", nome: "Surpresa dos Noivos", desc: "Deixamos ao seu critério! Qualquer gesto será recebido com muito amor.", valor: "Com amor" },
];

function GoldDivider() {
  return (
    <div className="gold-divider">
      <div className="gold-divider-line"></div>
      <div className="gold-divider-diamond"></div>
      <div className="gold-divider-line"></div>
    </div>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedGift, setSelectedGift] = useState<string>("");
  const [pixCopied, setPixCopied] = useState(false);
  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<HTMLElement[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [invitationOpened, setInvitationOpened] = useState(false);

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 60);
      if (heroPhotoRef.current) {
        heroPhotoRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(()=>{});
      }
      setIsPlaying(!isPlaying);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string).trim();
    const phone = fd.get("phone") as string;
    const numberOfPeople = parseInt(fd.get("numberOfPeople") as string) || 1;
    const attendance = fd.get("attendance") as string;
    const message = fd.get("message") as string;

    if (!name || !attendance) return;

    setFormState("loading");
    const result = await submitRSVP({ name, phone, numberOfPeople, attendance, message, chosenGift: selectedGift });
    if (result.success) {
      setFormState("success");
    } else {
      setFormState("error");
    }
  }

  function handleCopyPix() {
    navigator.clipboard?.writeText("convite@mpesa.mz").catch(() => {});
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2200);
  }

  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setNavOpen(false);
  }

  return (
    <>
      {!invitationOpened && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "var(--black)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--gold-light)", fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: "normal", textAlign: "center" }}>
            Noiva <span style={{ color: "var(--gold-dim)" }}>&amp;</span> Paulo
          </h1>
          <p style={{ fontFamily: "var(--font-title)", fontSize: "11px", letterSpacing: "0.2em", color: "var(--gold-dim)", textTransform: "uppercase", marginBottom: "3rem", textAlign: "center" }}>
            Convite de Casamento
          </p>
          <button 
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.play().catch(()=>{});
              }
              setInvitationOpened(true);
            }}
            style={{
              background: "transparent",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              padding: "15px 30px",
              fontFamily: "var(--font-title)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Abrir Convite
          </button>
        </div>
      )}

      {/* ═══ NAVEGAÇÃO ═══ */}
      <nav id="nav" className={navScrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo" onClick={(e) => handleSmoothScroll(e, "#hero")}>
          ✦ Convite
        </a>
        <ul className={`nav-links${navOpen ? " open" : ""}`} id="navLinks">
          <li><a href="#hero" onClick={(e) => handleSmoothScroll(e, "#hero")}>Início</a></li>
          <li><a href="#cerimonia" onClick={(e) => handleSmoothScroll(e, "#cerimonia")}>Cerimónia</a></li>
          <li><a href="#presentes" onClick={(e) => handleSmoothScroll(e, "#presentes")}>Presentes</a></li>
          <li><a href="#confirmacao" onClick={(e) => handleSmoothScroll(e, "#confirmacao")}>Confirmação</a></li>
        </ul>
        <div className="nav-toggle" id="navToggle" onClick={() => setNavOpen(!navOpen)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {/* ═══ AUDIO PLAYER ═══ */}
      <audio 
        ref={audioRef} 
        src="/som.m4a" 
        loop 
        preload="auto" 
        autoPlay 
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button 
        onClick={toggleAudio}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 100,
          background: "rgba(10,10,10,0.8)",
          border: "1px solid var(--gold)",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "var(--gold)",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          fontSize: "1.2rem",
          transition: "all 0.3s ease",
          opacity: navScrolled ? 1 : 0.8,
        }}
        title={isPlaying ? "Pausar música" : "Tocar música"}
      >
        {isPlaying ? (
          <span style={{ fontSize: "1.2rem" }}>⏸</span>
        ) : (
          <span style={{ fontSize: "1.5rem", marginLeft: "3px" }}>▶</span>
        )}
      </button>

      {/* ═══ HERO ═══ */}
      <section id="hero">
        <div className="hero-photo" id="heroPhoto" ref={heroPhotoRef}></div>
        <div className="hero-frame">
          <div className="hero-corner tr"></div>
          <div className="hero-corner bl"></div>
        </div>
        <div className="hero-content">
          <p className="hero-date-badge">[ 14 de Setembro de 2025 ]</p>
          <h1 className="hero-names">
            Noiva
            <span className="hero-ampersand">&amp;</span>
            Paulo
          </h1>
          <p className="hero-subtitle">Celebração do Sagrado Matrimónio</p>
        </div>
        <div className="hero-scroll-cue">
          <span>Descer</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ═══ VERSÍCULO ═══ */}
      <section id="versiculo">
        <GoldDivider />
        <p className="verse-text reveal reveal-up d2">
          &quot;Por isso, deixará o homem seu pai e sua mãe, e se unirá à sua mulher, e serão os dois uma só carne.&quot;
        </p>
        <span className="verse-ref reveal reveal-fade d3">Mateus 19:5</span>
        <GoldDivider />
      </section>

      {/* ═══ CONVITE PRINCIPAL ═══ */}
      <section id="convite">
        <div className="convite-card reveal reveal-scale">
          <div className="card-corner-tr"></div>
          <div className="card-corner-bl"></div>
          <span className="convite-label">Convite de Casamento</span>
          <GoldDivider />
          <div className="pais-block reveal reveal-up d1">
            <p className="pais-name">João Silva &amp; Maria Silva</p>
          </div>
          <span className="e-comercial reveal reveal-fade d2">&amp;</span>
          <div className="pais-block reveal reveal-up d3">
            <p className="pais-name">
              Carlos Fonseca &amp; Ana Fonseca
              <span className="em-memoria">✦ em memória ✦</span>
            </p>
          </div>
          <GoldDivider />
          <p className="convite-texto reveal reveal-up d5">
            É com imensa alegria que convidam o(a) senhor(a) para a celebração
            do matrimónio dos seus filhos<br />
            <span className="destaque">Noiva</span>
            {" "}&amp;{" "}
            <span className="destaque">Paulo</span>,<br />
            a realizar-se no dia{" "}
            <span className="destaque">14 de Setembro de 2025</span>.
          </p>
          <GoldDivider />
        </div>
      </section>

      {/* ═══ CERIMÓNIA ═══ */}
      <section id="cerimonia">
        <div className="section-header reveal reveal-fade">
          <span className="section-tag">Programa do Dia</span>
          <h2 className="section-title">Cerimónia</h2>
        </div>
        <div className="cerimonia-grid">
          <div className="cerimonia-item reveal reveal-left d2">
            <div className="cerimonia-icon">⚖</div>
            <span className="cerimonia-tipo">Cerimónia Civil</span>
            <span className="cerimonia-hora">10h00</span>
            <p className="cerimonia-local">
              Conservatória do Registo Civil<br />
              <em>Maputo, Moçambique</em>
            </p>
          </div>
          <div className="cerimonia-separator reveal reveal-fade d3"></div>
          <div className="cerimonia-item reveal reveal-right d2">
            <div className="cerimonia-icon">⛪</div>
            <span className="cerimonia-tipo">Cerimónia Religiosa</span>
            <span className="cerimonia-hora">15h00</span>
            <p className="cerimonia-local">
              Igreja Nossa Senhora da Conceição<br />
              <em>Maputo, Moçambique</em>
            </p>
          </div>
        </div>
        <div className="recepcao-block reveal reveal-up d4">
          <span className="recepcao-label">✦ Copo d&apos;Água &amp; Recepção ✦</span>
          <span className="recepcao-hora">18h30</span>
          <p className="recepcao-endereco">
            Salão Nobre do Hotel Cardoso<br />
            Av. Mártires da Machava, 707<br />
            Maputo · Moçambique
          </p>
        </div>
      </section>

      {/* ═══ HONRA ═══ */}
      <div className="honra-block">
        <GoldDivider />
        <p className="honra-text reveal reveal-up d1">
          Sua presença será uma honra para nós!
        </p>
        <span className="honra-assinatura reveal reveal-fade d2">
          Com carinho, Noiva &amp; Paulo
        </span>
        <GoldDivider />
      </div>

      {/* ═══ LISTA DE PRESENTES ═══ */}
      <section id="presentes">
        <div className="section-header reveal reveal-fade">
          <span className="section-tag">Para os Noivos</span>
          <h2 className="section-title">Lista de Presentes</h2>
        </div>
        <p className="presentes-intro reveal reveal-up d1">
          A vossa presença já é o maior presente.<br />
          Caso desejem agraciar-nos, aqui ficam algumas sugestões com carinho.
        </p>
        <div className="presentes-grid">
          {PRESENTES.map((p, i) => (
            <div
              key={p.nome}
              className={`presente-card reveal reveal-up d${(i % 3) + 1}${selectedGift === p.nome ? " selected" : ""}`}
              onClick={() => setSelectedGift(selectedGift === p.nome ? "" : p.nome)}
            >
              <span className="presente-icon">{p.icon}</span>
              <span className="presente-nome">{p.nome}</span>
              <p className="presente-desc">{p.desc}</p>
              <span className="presente-valor">{p.valor}</span>
              {selectedGift === p.nome && (
                <span className="presente-selected-badge">✓ Escolhido</span>
              )}
            </div>
          ))}
        </div>
        <div className="pix-block reveal reveal-up d4">
          <span className="pix-label">✦ Transferência Bancária / M-Pesa ✦</span>
          <span className="pix-key">
            Chave M-Pesa: <strong>+258 84 000 0000</strong>
          </span>
          <span className="pix-key">Titular: Paulo</span>
          <button
            className="pix-copy-btn"
            onClick={handleCopyPix}
            style={pixCopied ? { background: "var(--gold)", color: "var(--black)" } : {}}
          >
            {pixCopied ? "✓ Copiado!" : "Copiar Número"}
          </button>
        </div>
      </section>

      {/* ═══ CONFIRMAÇÃO ═══ */}
      <section id="confirmacao">
        <div className="section-header reveal reveal-fade">
          <span className="section-tag">Confirmar Presença</span>
          <h2 className="section-title">RSVP</h2>
        </div>
        <div className="form-card reveal reveal-up d1">
          {formState !== "success" ? (
            <form id="formContent" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">O seu nome completo</label>
                <input type="text" className="form-input" id="name" name="name" placeholder="Nome do Convidado" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Telefone / WhatsApp</label>
                  <input type="tel" className="form-input" id="phone" name="phone" placeholder="+258 84 000 0000" />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="numberOfPeople">Nº de Pessoas</label>
                  <select className="form-select" id="numberOfPeople" name="numberOfPeople">
                    <option value="1">1 pessoa</option>
                    <option value="2">2 pessoas</option>
                    <option value="3">3 pessoas</option>
                    <option value="4">4 ou mais pessoas</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="attendance">Confirmação de Presença</label>
                <select className="form-select" id="attendance" name="attendance" required>
                  <option value="">Seleccionar</option>
                  <option value="confirmed">✓ Confirmo a minha presença</option>
                  <option value="declined">✗ Lamento, não poderei comparecer</option>
                  <option value="pending">⟳ Ainda não tenho a certeza</option>
                </select>
              </div>
              {selectedGift && (
                <div className="form-group">
                  <label className="form-label">Presente Escolhido</label>
                  <div className="form-input" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold-light)" }}>
                    <span>✦</span>
                    <span>{selectedGift}</span>
                  </div>
                </div>
              )}
              <div className="form-group">
                <label className="form-label" htmlFor="message">Mensagem para os Noivos (opcional)</label>
                <textarea className="form-textarea" id="message" name="message" placeholder="Deixe aqui as suas palavras de carinho..."></textarea>
              </div>
              <button
                className="btn-primary"
                type="submit"
                disabled={formState === "loading"}
              >
                {formState === "loading" ? "A enviar..." : "✦   Confirmar Presença   ✦"}
              </button>
              {formState === "error" && (
                <p style={{ color: "var(--gold)", textAlign: "center", marginTop: "1rem", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                  Ocorreu um erro. Por favor tente novamente.
                </p>
              )}
            </form>
          ) : (
            <div className="form-success show">
              <span className="form-success-icon">✦</span>
              <p className="form-success-text">
                A sua confirmação foi recebida com muito carinho.<br />
                Aguardamos a sua presença com grande alegria!
              </p>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--gold)", display: "block", marginTop: "1.5rem" }}>
                Template Noiva &amp; Paulo
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer>
        <GoldDivider />
        <p className="footer-names">Noiva &amp; Paulo</p>
        <span className="footer-date">14 de Setembro de 2025 · Maputo</span>
        <GoldDivider />
      </footer>
    </>
  );
}
