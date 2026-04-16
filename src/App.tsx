import { useState, useEffect } from 'react'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('Yo')
  const [confirmed, setConfirmed] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number; duration: number }>>([])

  useEffect(() => {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#ff6b9d', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#cc5de8'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
    }))
    setConfetti(pieces)
  }, [])

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement | null
    if (!audio) return
    if (musicPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setMusicPlaying(!musicPlaying)
  }

  const handleConfirm = () => {
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre')
      return
    }

    // Construir mensaje para WhatsApp
    const mensaje = `🎉 ¡CONFIRMACIÓN DE ASISTENCIA! 🎉

Nombre: ${name}
Asistentes: ${guests}

¡Nos vemos el sábado 18 de abril! 🥳`

    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje)
    
    // Número de WhatsApp (Venezuela +58)
    const numeroWhatsApp = '584148123630'
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`
    
    // Abrir WhatsApp en nueva ventana
    window.open(urlWhatsApp, '_blank')
    
    // Marcar como confirmado y cerrar modal
    setConfirmed(true)
    setShowModal(false)
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }} className="relative min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(5deg); }
          50% { transform: translateY(-22px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slide-up {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes rainbow-text {
          0% { color: #ff6b9d; }
          25% { color: #ffd93d; }
          50% { color: #6bcb77; }
          75% { color: #4d96ff; }
          100% { color: #ff6b9d; }
        }
        @keyframes bg-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes balloon-float {
          0%, 100% { transform: translateY(0) rotate(-8deg); }
          50% { transform: translateY(-30px) rotate(8deg); }
        }
        @keyframes star-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.3); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.15); }
        }
        .capy-float { animation: float 4s ease-in-out infinite; }
        .capy-float2 { animation: float2 5s ease-in-out infinite; }
        .capy-float3 { animation: float3 3.5s ease-in-out infinite; }
        .wiggle { animation: wiggle 2s ease-in-out infinite; }
        .bounce-in { animation: bounce-in 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        .slide-up { animation: slide-up 0.8s ease-out both; }
        .star-spin { animation: star-spin 6s linear infinite; }
        .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .rainbow { animation: rainbow-text 3s ease-in-out infinite; }
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 1rem;
        }
        .btn-confirm {
          background: linear-gradient(135deg, #ff6b9d, #ff922b);
          color: white; border: none; border-radius: 50px;
          padding: 18px 40px; font-size: 1.3rem; font-weight: 900;
          cursor: pointer; font-family: 'Fredoka One', cursive;
          box-shadow: 0 8px 25px rgba(255,107,157,0.5);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.5px;
        }
        .btn-confirm:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 12px 35px rgba(255,107,157,0.6); }
        .btn-confirm:active { transform: translateY(0) scale(0.98); }
      `}</style>

      {/* Animated background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #ffeef8, #fff9e6, #eeffee, #e8f4ff, #ffeef8)',
        backgroundSize: '400% 400%',
        animation: 'bg-shift 12s ease infinite',
      }} />

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'fixed',
            top: '-20px',
            left: `${piece.left}%`,
            width: '12px',
            height: '12px',
            background: piece.color,
            borderRadius: '50%',
            zIndex: 1,
            animation: `fall ${piece.duration}s linear infinite`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Music controls */}
      <button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: musicPlaying ? 'linear-gradient(135deg, #ff6b9d, #ff922b)' : 'linear-gradient(135deg, #ccc, #aaa)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 50,
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
          transition: 'all 0.3s',
        }}
        className="heartbeat"
      >
        {musicPlaying ? '🎵' : '🔇'}
      </button>
      <audio id="bg-music" loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
          {/* Floating capibaras */}
          <div style={{ position: 'absolute', top: '10%', left: '5%' }} className="capy-float">
            <CapybaraSmall color="#ff6b9d" hat="🎈" />
          </div>
          <div style={{ position: 'absolute', top: '15%', right: '8%' }} className="capy-float2">
            <CapybaraSmall color="#4d96ff" hat="🎂" />
          </div>
          <div style={{ position: 'absolute', bottom: '15%', left: '10%' }} className="capy-float3">
            <CapybaraMedium />
          </div>

          {/* Main capybara */}
          <div className="bounce-in" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
            <CapybaraLarge />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              marginBottom: '1.5rem',
              fontFamily: "'Fredoka One', cursive",
              textShadow: '4px 4px 0 rgba(255,107,157,0.3)',
            }}
            className="slide-up rainbow"
          >
            ¡Leticia Vita cumple 10 años!
          </h1>

          {/* Details */}
          <div
            style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 15px 50px rgba(0,0,0,0.15)',
              marginBottom: '3rem',
              border: '4px solid #ff6b9d',
            }}
            className="slide-up"
          >
            <p style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', marginBottom: '1.2rem', fontWeight: 700, color: '#ff6b9d' }}>
              📅 Sábado 18 de Abril, 2026
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', marginBottom: '1.2rem', fontWeight: 600, color: '#4d96ff' }}>
              🕒 5:00 PM
            </p>
            <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 600, color: '#6bcb77' }}>
              📍 Casa de Leticia
            </p>
          </div>

          {/* Party capybara */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <CapybaraParty />
          </div>

          {/* Confirmation button */}
          {!confirmed ? (
            <button onClick={() => setShowModal(true)} className="btn-confirm wiggle">
              ¡CONFIRMAR ASISTENCIA! 🎉
            </button>
          ) : (
            <div
              style={{
                background: 'linear-gradient(135deg, #6bcb77, #4d96ff)',
                color: 'white',
                borderRadius: '50px',
                padding: '1.5rem 3rem',
                fontSize: '1.5rem',
                fontWeight: 900,
                fontFamily: "'Fredoka One', cursive",
                boxShadow: '0 8px 25px rgba(107,203,119,0.5)',
              }}
              className="bounce-in"
            >
              ¡Confirmado! Nos vemos pronto 🥳
            </div>
          )}

          {/* Decorative elements */}
          <div style={{ marginTop: '3rem', fontSize: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <span className="star-spin">⭐</span>
            <span className="heartbeat">🎈</span>
            <span className="wiggle">🎂</span>
            <span className="heartbeat">🎁</span>
            <span className="star-spin">✨</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '5px solid #ff6b9d',
            }}
            className="bounce-in"
          >
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                color: '#ff6b9d',
                fontFamily: "'Fredoka One', cursive",
                textAlign: 'center',
              }}
            >
              ¡Confirma tu asistencia! 🎊
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#333',
                }}
              >
                Tu nombre:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre aquí..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '3px solid #ff6b9d',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#ff922b')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#ff6b9d')}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: '#333',
                }}
              >
                ¿Cuántos vienen?
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '15px',
                  border: '3px solid #4d96ff',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  background: 'white',
                }}
              >
                <option value="Yo">Solo yo 🙋</option>
                <option value="Yo + 1">Yo + 1 acompañante 👥</option>
                <option value="Yo + 2">Yo + 2 acompañantes 👨‍👩‍👦</option>
                <option value="Yo + 3">Yo + 3 acompañantes 👨‍👩‍👧‍👦</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#aaa')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#ccc')}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="btn-confirm"
                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
              >
                Enviar por WhatsApp 📱
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componentes de Capibaras
function CapybaraLarge() {
  return (
    <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="130,10 95,70 130,58 165,70" fill="#ff6b9d" stroke="#ff922b" strokeWidth="2.5"/>
      <circle cx="95" cy="70" r="8" fill="#ffd93d"/>
      <circle cx="130" cy="58" r="8" fill="#4d96ff"/>
      <circle cx="165" cy="70" r="8" fill="#6bcb77"/>
      <text x="115" y="42" fontSize="22">🎂</text>
      <ellipse cx="130" cy="160" rx="70" ry="50" fill="#c49a6c"/>
      <ellipse cx="130" cy="165" rx="60" ry="42" fill="#d4aa7d"/>
      <ellipse cx="130" cy="100" rx="50" ry="45" fill="#c49a6c"/>
      <ellipse cx="130" cy="103" rx="45" ry="40" fill="#d4aa7d"/>
      <ellipse cx="130" cy="122" rx="26" ry="16" fill="#c49a6c"/>
      <ellipse cx="130" cy="125" rx="22" ry="12" fill="#e8c4a0"/>
      <ellipse cx="120" cy="120" rx="5" ry="4" fill="#8b5e3c"/>
      <ellipse cx="140" cy="120" rx="5" ry="4" fill="#8b5e3c"/>
      <ellipse cx="112" cy="92" rx="12" ry="12" fill="white"/>
      <ellipse cx="148" cy="92" rx="12" ry="12" fill="white"/>
      <ellipse cx="114" cy="93" rx="7" ry="7" fill="#3d2b1f"/>
      <ellipse cx="150" cy="93" rx="7" ry="7" fill="#3d2b1f"/>
      <circle cx="116" cy="90" r="3" fill="white"/>
      <circle cx="152" cy="90" r="3" fill="white"/>
      <path d="M118,130 Q130,140 142,130" stroke="#8b5e3c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="84" cy="68" rx="14" ry="12" fill="#c49a6c"/>
      <ellipse cx="84" cy="68" rx="9" ry="8" fill="#ffb3c6"/>
      <ellipse cx="176" cy="68" rx="14" ry="12" fill="#c49a6c"/>
      <ellipse cx="176" cy="68" rx="9" ry="8" fill="#ffb3c6"/>
      <ellipse cx="90" cy="200" rx="20" ry="14" fill="#c49a6c"/>
      <ellipse cx="170" cy="200" rx="20" ry="14" fill="#c49a6c"/>
      <ellipse cx="100" cy="112" rx="12" ry="8" fill="#ffb3c6" opacity="0.7"/>
      <ellipse cx="160" cy="112" rx="12" ry="8" fill="#ffb3c6" opacity="0.7"/>
    </svg>
  )
}

function CapybaraSmall({ color, hat }: { color: string; hat: string }) {
  return (
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="25" y="14" fontSize="18">{hat}</text>
      <ellipse cx="45" cy="65" rx="30" ry="24" fill="#c49a6c"/>
      <ellipse cx="45" cy="42" rx="24" ry="20" fill="#c49a6c"/>
      <ellipse cx="45" cy="44" rx="22" ry="18" fill="#d4aa7d"/>
      <ellipse cx="45" cy="52" rx="12" ry="8" fill="#c49a6c"/>
      <ellipse cx="45" cy="53" rx="10" ry="6" fill={color}/>
      <ellipse cx="36" cy="38" rx="5" ry="5" fill="white"/>
      <ellipse cx="54" cy="38" rx="5" ry="5" fill="white"/>
      <ellipse cx="36" cy="38" rx="3" ry="3" fill="#3d2b1f"/>
      <ellipse cx="54" cy="38" rx="3" ry="3" fill="#3d2b1f"/>
      <path d="M38,57 Q45,63 52,57" stroke="#8b5e3c" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="28" cy="28" rx="8" ry="7" fill="#c49a6c"/>
      <ellipse cx="62" cy="28" rx="8" ry="7" fill="#c49a6c"/>
    </svg>
  )
}

function CapybaraMedium() {
  return (
    <svg width="110" height="120" viewBox="0 0 110 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="55,6 42,28 55,22 68,28" fill="#ffd93d" stroke="#ff922b" strokeWidth="1.5"/>
      <circle cx="42" cy="28" r="4" fill="#ff6b9d"/>
      <circle cx="55" cy="22" r="4" fill="#4d96ff"/>
      <circle cx="68" cy="28" r="4" fill="#ff922b"/>
      <ellipse cx="55" cy="82" rx="38" ry="30" fill="#c49a6c"/>
      <ellipse cx="55" cy="52" rx="30" ry="26" fill="#c49a6c"/>
      <ellipse cx="55" cy="66" rx="16" ry="11" fill="#c49a6c"/>
      <ellipse cx="43" cy="48" rx="7" ry="7" fill="white"/>
      <ellipse cx="67" cy="48" rx="7" ry="7" fill="white"/>
      <ellipse cx="44" cy="48" rx="4.5" ry="4.5" fill="#3d2b1f"/>
      <ellipse cx="68" cy="48" rx="4.5" ry="4.5" fill="#3d2b1f"/>
      <path d="M44,72 Q55,80 66,72" stroke="#8b5e3c" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <text x="78" y="78" fontSize="20">🎂</text>
    </svg>
  )
}

function CapybaraParty() {
  return (
    <svg width="200" height="130" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="30" rx="16" ry="20" fill="#ff6b9d" opacity="0.85"/>
      <ellipse cx="170" cy="25" rx="16" ry="20" fill="#4d96ff" opacity="0.85"/>
      <ellipse cx="150" cy="35" rx="14" ry="18" fill="#ffd93d" opacity="0.85"/>
      <ellipse cx="100" cy="95" rx="42" ry="30" fill="#c49a6c"/>
      <ellipse cx="100" cy="64" rx="32" ry="28" fill="#c49a6c"/>
      <ellipse cx="100" cy="78" rx="17" ry="11" fill="#c49a6c"/>
      <path d="M84,58 Q88,53 92,58" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M108,58 Q112,53 116,58" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M86,83 Q100,95 114,83" stroke="#8b5e3c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="74" cy="44" rx="12" ry="11" fill="#c49a6c"/>
      <ellipse cx="126" cy="44" rx="12" ry="11" fill="#c49a6c"/>
      <text x="88" y="18" fontSize="18">🎊</text>
    </svg>
  )
}

export default App
