'use client'
export default function BottomNav({ screen, onNav }) {
  const items = [
    { id: 'home', label: 'Inicio', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>, icon2: <polyline points="9,22 9,12 15,12 15,22"/> },
    { id: 'weekly', label: 'Semana', icon: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></> },
    { id: 'checkin', label: 'Check-in', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
    { id: 'weekly', label: 'Jardín', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
  ]
  return (
    <div style={{ background: 'white', borderTop: '1px solid rgba(235,65,147,.1)', display: 'flex', padding: '12px 0 28px', position: 'sticky', bottom: 0 }}>
      {items.map((item, i) => (
        <div key={i} onClick={() => onNav(item.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', opacity: screen === item.id ? 1 : .4, color: screen === item.id ? '#eb4193' : '#3d2620', transition: 'opacity .2s' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{item.icon}{item.icon2}</svg>
          <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.3px' }}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
