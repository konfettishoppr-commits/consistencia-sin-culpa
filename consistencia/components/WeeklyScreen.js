'use client'
const PK = '#eb4193', OR = '#ec6524', LV = '#b896c6', SK = '#afccdc', SAGE = '#6b7c5c'

export default function WeeklyScreen({ weekData }) {
  const totalDone = weekData.filter(d => d.completed_count >= 3).length
  const totalPromesas = weekData.reduce((a, d) => a + (d.completed_count || 0), 0)
  const flowers = weekData.filter(d => d.completed_count >= 3).length

  const promesaCounts = [
    { name: 'Oración', count: weekData.filter(d => d.p_oracion).length, color: PK },
    { name: 'Biblia', count: weekData.filter(d => d.p_biblia).length, color: OR },
    { name: 'Hogar', count: weekData.filter(d => d.p_hogar).length, color: LV },
    { name: 'Konfetti', count: weekData.filter(d => d.p_konfetti).length, color: SK },
  ]
  const best = [...promesaCounts].sort((a, b) => b.count - a.count)[0]
  const needs = [...promesaCounts].sort((a, b) => a.count - b.count)[0]

  const energyDays = ['LU','MA','MI','JU','VI','SÁ','DO']
  const card = (extra = {}) => ({ background: 'white', border: '1px solid rgba(235,65,147,.12)', borderRadius: 18, padding: '16px 18px', marginBottom: 12, ...extra })
  const pill = (col) => ({ display: 'inline-block', padding: '4px 11px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: col + '18', color: col })

  return (
    <div className="fade-in" style={{ padding: '22px 22px 20px' }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, fontWeight: 700, color: '#3d2620' }}>Resumen Semanal</div>
      </div>

      <div style={{ background: SAGE, borderRadius: 18, padding: 20, marginBottom: 16, color: 'white' }}>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 15, fontStyle: 'italic', lineHeight: 1.6 }}>
          {totalDone >= 5
            ? '"Esta semana completaste la mayoría de tus promesas. Eso es un acto de amor propio."'
            : totalDone >= 3
            ? '"Cada día que intentaste cuenta. Estás construyendo algo hermoso."'
            : '"Los comienzos también son válidos. Mañana es una nueva oportunidad."'}
        </div>
        <div style={{ fontSize: 11, opacity: .6, marginTop: 8, letterSpacing: '.3px' }}>— Tu reflexión del domingo</div>
      </div>

      <div style={card()}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase', color: '#9b8080', marginBottom: 12 }}>Resumen de la semana</div>
        {[['Días completados (3+)', `${totalDone} / 7`], ['Total promesas cumplidas', `${totalPromesas} / 28`], ['Flores ganadas', `${flowers}`]].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(235,65,147,.08)' }}>
            <div style={{ fontSize: 13, color: '#3d2620' }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: PK }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={card()}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase', color: '#9b8080', marginBottom: 12 }}>Tus promesas</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(235,65,147,.08)' }}>
          <div style={{ fontSize: 13, color: '#3d2620' }}>Más consistente</div>
          <span style={pill(best?.color || PK)}>{best?.name} {best?.count}/7</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(235,65,147,.08)' }}>
          <div style={{ fontSize: 13, color: '#3d2620' }}>Necesita amor</div>
          <span style={pill(needs?.color || LV)}>{needs?.name} {needs?.count}/7</span>
        </div>
        {promesaCounts.map(p => (
          <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(235,65,147,.08)' }}>
            <div style={{ fontSize: 13, color: '#3d2620' }}>{p.name}</div>
            <span style={pill(p.color)}>{p.count}/7</span>
          </div>
        ))}
      </div>

      <div style={card()}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase', color: '#9b8080', marginBottom: 12 }}>Tendencia de energía</div>
        {energyDays.map((day, i) => {
          const log = weekData[i]
          const e = log?.energy_level
          const col = e === 'alta' ? PK : e === 'media' ? LV : e === 'baja' ? SK : 'rgba(235,65,147,.1)'
          const pct = e === 'alta' ? 90 : e === 'media' ? 55 : e === 'baja' ? 30 : 0
          return (
            <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9b8080', width: 24, letterSpacing: '.3px' }}>{day}</div>
              <div style={{ flex: 1, height: 6, background: 'rgba(235,65,147,.08)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', background: col, borderRadius: 999, width: `${pct}%`, transition: 'width .8s' }}></div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: col || 'rgba(235,65,147,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  {e === 'alta' && <path d="M12 2l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z"/>}
                  {e === 'media' && <><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/></>}
                  {(e === 'baja' || !e) && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>}
                </svg>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ background: '#fdf8f0', border: '1px solid rgba(107,124,92,.2)', borderRadius: 18, padding: '16px 18px', marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.8px', textTransform: 'uppercase', color: SAGE, marginBottom: 8 }}>Patrón detectado</div>
        <div style={{ fontSize: 13, color: '#3d2620', lineHeight: 1.6 }}>
          Basado en tu historial, los días con mayor energía son los más consistentes. Agenda tus acciones de Konfetti en esos días para mayor consistencia.
        </div>
      </div>
    </div>
  )
}
