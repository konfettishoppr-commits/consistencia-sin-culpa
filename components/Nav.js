'use client'
export default function Nav() {
  const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const n = new Date()
  const dateStr = (days[n.getDay()].slice(0,3) + ' ' + n.getDate()).toUpperCase()

  return (
    <div style={{ background: '#fdf8f0', padding: '18px 22px 12px', borderBottom: '1px solid rgba(235,65,147,.12)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 15, fontStyle: 'italic', color: '#eb4193', letterSpacing: '.3px' }}>
          Consistencia sin Culpa
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 11, color: '#9b8080', letterSpacing: '.4px' }}>{dateStr}</div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eb4193', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
