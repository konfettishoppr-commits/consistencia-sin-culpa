'use client'
import { useRef } from 'react'

const PK = '#eb4193', OR = '#ec6524', LV = '#b896c6', SK = '#afccdc'

const subTexts = {
  alta: ['Ora con gratitud profunda hoy','Medita un capítulo completo','Reset completo del hogar','Lanza algo nuevo en Konfetti'],
  media: ['5 minutos de oración','Un versículo es suficiente','Una habitación pequeña','Responde mensajes de clientes'],
  baja: ['Solo di "aquí estoy, Dios"','Solo abre la app de Biblia','Solo haz la cama','Una foto para redes'],
  default: ['Orar — cualquier momento cuenta','Leer la Biblia — un versículo está bien','Reset de 10 min — solo una cosa','Una acción para Konfetti'],
}
const quotes = {
  alta: '"Hoy tienes energía para brillar. Úsala con propósito."',
  media: '"Un paso medio también es un paso hacia adelante."',
  baja: '"Los días difíciles también cuentan. Lo mínimo con amor."',
  default: '"Pequeños pasos también construyen grandes sueños."',
}
const progressMsgs = ['Cada paso cuenta, preciosa','Una promesa cumplida — sigue adelante','Dos promesas — ya estás a mitad','Casi completa — una más','Completaste todas tus promesas hoy']
const promesas = [
  { name: 'Conectar con Dios', color: PK, bg: '#fdf0f7' },
  { name: 'Alimentar mi fe', color: OR, bg: '#fef4ef' },
  { name: 'Cuidar mi espacio', color: LV, bg: '#f9f0ff' },
  { name: 'Construir mi sueño', color: SK, bg: '#f0f7fb' },
]
const weekDays = ['LU','MA','MI','JU','VI','SÁ','DO']

function burst(el) {
  if (!el) return
  const r = el.getBoundingClientRect()
  const colors = [PK, OR, LV, SK]
  for (let i = 0; i < 8; i++) {
    const c = document.createElement('div')
    c.className = 'conf-particle'
    c.style.background = colors[i % 4]
    c.style.left = (r.left + r.width / 2 + (Math.random() - .5) * 60) + 'px'
    c.style.top = (r.top + r.height / 2) + 'px'
    c.style.borderRadius = Math.random() > .5 ? '50%' : '2px'
    document.body.appendChild(c)
    setTimeout(() => c.remove(), 720)
  }
}

export default function HomeScreen({ energy, checks, rewards, weekData, onEnergySet, onCheck, onGoCheckin }) {
  const cardRefs = useRef([])
  const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const n = new Date()
  const h = n.getHours()
  const greeting = h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches'
  const dateStr = `${days[n.getDay()].charAt(0).toUpperCase() + days[n.getDay()].slice(1)}, ${n.getDate()} de ${months[n.getMonth()]}`
  const done = checks.filter(Boolean).length
  const subs = subTexts[energy] || subTexts.default
  const quote = quotes[energy] || quotes.default

  function handleCheck(i) {
    if (!checks[i]) burst(cardRefs.current[i])
    onCheck(i)
  }

  const card = (style) => ({ background: 'white', border: '1px solid rgba(235,65,147,.12)', borderRadius: 18, ...style })

  return (
    <div className="fade-in" style={{ padding: '22px 22px 20px' }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, fontWeight: 700, color: '#3d2620', lineHeight: 1.2 }}>{greeting}</div>
        <div style={{ fontSize: 13, color: '#9b8080', marginTop: 3 }}>{dateStr}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 18 }}>
        {[['Flores', rewards.flowers, PK], ['Racha', `${rewards.streak}d`, OR], ['Estrellas', rewards.stars, LV]].map(([lbl, val, col]) => (
          <div key={lbl} style={card({ padding: '9px 14px' })}>
            <div style={{ fontSize: 10, letterSpacing: '.5px', textTransform: 'uppercase', color: '#9b8080', fontWeight: 600, marginBottom: 2 }}>{lbl}</div>
            <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 20, color: col }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={card({ padding: 20, marginBottom: 18 })}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: PK, flexShrink: 0 }}></div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#3d2620' }}>¿Cómo está tu energía hoy?</div>
        </div>
        <div style={{ fontSize: 12, color: '#9b8080', marginBottom: 16, paddingLeft: 18 }}>Sé honesta contigo misma</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['alta', PK, 'Alta'], ['media', LV, 'Media'], ['baja', SK, 'Baja']].map(([e, col, lbl]) => (
            <div key={e} onClick={() => onEnergySet(e)} style={{ flex: 1, padding: '14px 8px', borderRadius: 14, border: `1.5px solid ${energy === e ? col : 'rgba(235,65,147,.15)'}`, background: energy === e ? col + '18' : '#fafafa', cursor: 'pointer', textAlign: 'center', transition: 'all .18s' }}>
              <div style={{ width: 28, height: 28, margin: '0 auto 6px', borderRadius: '50%', background: col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {e === 'alta' && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>}
                  {e === 'media' && <><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/></>}
                  {e === 'baja' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}
                </svg>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: energy === e ? col : '#9b8080', letterSpacing: '.3px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.6px', textTransform: 'uppercase', color: '#9b8080' }}>Progreso de hoy</div>
          <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, color: PK }}>{done} / 4</div>
        </div>
        <div style={{ height: 6, background: 'rgba(235,65,147,.12)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: PK, borderRadius: 999, width: `${(done / 4) * 100}%`, transition: 'width .6s cubic-bezier(.34,1.56,.64,1)' }}></div>
        </div>
        <div style={{ fontSize: 12, color: '#9b8080', marginTop: 7, fontStyle: 'italic' }}>{progressMsgs[done]}</div>
      </div>

      <div style={{ background: PK, borderRadius: 18, padding: '18px 20px', marginBottom: 18 }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 15, fontStyle: 'italic', color: 'white', lineHeight: 1.6 }}>{quote}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', marginTop: 8, letterSpacing: '.3px' }}>— Tu promesa diaria</div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, color: '#3d2620' }}>Mis 4 Promesas</div>
          <div onClick={onGoCheckin} style={{ fontSize: 12, fontWeight: 600, color: PK, cursor: 'pointer', letterSpacing: '.3px' }}>Check-in nocturno</div>
        </div>

        {promesas.map((p, i) => (
          <div key={i} ref={el => cardRefs.current[i] = el} onClick={() => handleCheck(i)}
            style={{ ...card({ padding: '16px 18px', marginBottom: 10, cursor: 'pointer', transition: 'all .2s', background: checks[i] ? '#fdf7fb' : 'white', borderColor: checks[i] ? 'rgba(184,150,198,.4)' : 'rgba(235,65,147,.12)' }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.8">
                  {i === 0 && <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>}
                  {i === 1 && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                  {i === 2 && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>}
                  {i === 3 && <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>}
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#3d2620' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#9b8080', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subs[i]}</div>
              </div>
              <div style={{ width: 26, height: 26, borderRadius: '50%', border: `1.5px solid ${checks[i] ? PK : 'rgba(235,65,147,.25)'}`, background: checks[i] ? PK : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .25s' }}>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2.5" style={{ opacity: checks[i] ? 1 : 0, transition: 'opacity .2s' }}>
                  <polyline points="2,7 6,11 12,3"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, color: '#3d2620', marginBottom: 4 }}>Mi Jardín</div>
        <div style={{ fontSize: 12, color: '#9b8080', marginBottom: 14 }}>Esta semana</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5, marginBottom: 4 }}>
          {weekDays.map(d => <div key={d} style={{ fontSize: 9, fontWeight: 600, color: '#9b8080', textAlign: 'center', letterSpacing: '.5px' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
          {weekDays.map((_, i) => {
            const log = weekData[i]
            const count = log ? log.completed_count : 0
            const bg = count >= 3 ? PK : count >= 1 ? 'rgba(235,65,147,.25)' : 'rgba(235,65,147,.06)'
            const stroke = count >= 3 ? 'white' : count >= 1 ? PK : 'rgba(235,65,147,.25)'
            return (
              <div key={i} style={{ aspectRatio: 1, borderRadius: 10, background: bg, border: count === 0 ? '1px solid rgba(235,65,147,.1)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" opacity=".6"/>
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
