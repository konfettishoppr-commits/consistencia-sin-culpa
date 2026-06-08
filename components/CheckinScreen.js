'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const PK = '#eb4193', OR = '#ec6524', LV = '#b896c6', SK = '#afccdc'

const reflections = [
  '"Hoy mostraste que eres humana y eso es suficiente. Lo que hiciste cuenta. Mañana es una nueva oportunidad y Dios ya lo sabe."',
  '"Cada día que intentas es un día que ganas. No lo que completaste, sino que lo intentaste."',
  '"Tu consistencia no se mide en perfección, sino en la dirección que sigues cada día."',
  '"Dios ve tu corazón, no tu lista de tareas. Hoy fue suficiente."',
  '"Los días pequeños construyen las semanas grandes. Hoy fue un ladrillo más."',
]

export default function CheckinScreen({ checks, energy, todayLog, onSave }) {
  const [answers, setAnswers] = useState({ oracion: null, biblia: null, hogar: null, konfettiText: '', energia: null })
  const [reflection, setReflection] = useState(null)
  const [saving, setSaving] = useState(false)

  function setAnswer(key, val) {
    setAnswers(a => ({ ...a, [key]: val }))
  }

  async function handleSave() {
    setSaving(true)
    const today = new Date().toISOString().split('T')[0]
    const update = {
      p_oracion: answers.oracion === 'si' || answers.oracion === 'poco',
      p_biblia: answers.biblia === 'si' || answers.biblia === 'poco',
      p_hogar: answers.hogar === 'si' || answers.hogar === 'poco',
      konfetti_action: answers.konfettiText,
      energy_level: answers.energia || energy,
    }
    update.completed_count = [update.p_oracion, update.p_biblia, update.p_hogar, checks[3]].filter(Boolean).length
    if (todayLog) {
      await supabase.from('daily_logs').update(update).eq('date', today)
    } else {
      await supabase.from('daily_logs').insert({ date: today, ...update })
    }
    await fetch('/api/reminders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'checkin_done' }) })
    const r = reflections[Math.floor(Math.random() * reflections.length)]
    setReflection(r)
    onSave()
    setSaving(false)
  }

  const qCard = (children) => ({ background: 'white', border: '1px solid rgba(235,65,147,.12)', borderRadius: 16, padding: '15px 17px', marginBottom: 10 })
  const opt = (active, col = PK) => ({ padding: '7px 13px', borderRadius: 10, border: `1px solid ${active ? col : 'rgba(235,65,147,.18)'}`, background: active ? col : '#fafafa', fontSize: 12, fontWeight: active ? 600 : 500, color: active ? 'white' : '#3d2620', cursor: 'pointer', fontFamily: '"DM Sans",sans-serif', transition: 'all .18s' })

  const questions = [
    { key: 'oracion', label: '¿Oraste hoy?', col: PK, icon: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></> },
    { key: 'biblia', label: '¿Leíste tu Biblia?', col: OR, icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></> },
    { key: 'hogar', label: '¿Reset del hogar?', col: LV, icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></> },
  ]

  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', padding: '28px 20px 20px' }}>
        <div style={{ width: 52, height: 52, background: PK, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 21, color: '#3d2620' }}>Check-in nocturno</div>
        <div style={{ fontSize: 13, color: '#9b8080', marginTop: 4 }}>Sin juicio — solo amor propio</div>
      </div>

      <div style={{ padding: '0 22px 20px' }}>
        {questions.map(q => (
          <div key={q.key} style={qCard()}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#3d2620', marginBottom: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 7, background: q.col, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">{q.icon}</svg>
              </div>
              {q.label}
            </div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {[['si','Sí'], ['poco', q.key === 'biblia' ? 'Un versículo' : q.key === 'hogar' ? 'Un poco' : 'Un momento'], ['no','No esta vez']].map(([v, lbl]) => (
                <button key={v} onClick={() => setAnswer(q.key, v)} style={opt(answers[q.key] === v, q.col)}>{lbl}</button>
              ))}
            </div>
          </div>
        ))}

        <div style={qCard()}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#3d2620', marginBottom: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: SK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
            </div>
            ¿Tu acción para Konfetti?
          </div>
          <textarea value={answers.konfettiText} onChange={e => setAnswer('konfettiText', e.target.value)}
            style={{ width: '100%', border: '1px solid rgba(235,65,147,.18)', borderRadius: 10, padding: '11px 13px', fontSize: 12, fontFamily: '"DM Sans",sans-serif', color: '#3d2620', resize: 'none', outline: 'none', background: '#fafafa' }}
            rows={2} placeholder="Describe tu acción (puede ser pequeña)..." />
        </div>

        <div style={qCard()}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#3d2620', marginBottom: 11, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 7, background: PK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
            </div>
            ¿Cómo estuvo tu energía?
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {[['alta','Alta',PK], ['media','Media',LV], ['baja','Baja',SK]].map(([v, lbl, col]) => (
              <button key={v} onClick={() => setAnswer('energia', v)} style={opt(answers.energia === v, col)}>{lbl}</button>
            ))}
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          style={{ width: '100%', padding: 15, background: saving ? '#ccc' : PK, color: 'white', border: 'none', borderRadius: 14, fontFamily: '"DM Sans",sans-serif', fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', letterSpacing: '.4px', transition: 'all .2s', marginTop: 6 }}>
          {saving ? 'Guardando...' : 'Generar mi reflexión'}
        </button>

        {reflection && (
          <div style={{ background: '#fdf8f0', border: '1px solid rgba(107,124,92,.2)', borderRadius: 18, padding: 20, textAlign: 'center', marginTop: 16 }}>
            <div style={{ width: 40, height: 40, background: '#6b7c5c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div style={{ fontFamily: '"Playfair Display",serif', fontSize: 14, fontStyle: 'italic', color: '#3d2620', lineHeight: 1.7 }}>{reflection}</div>
          </div>
        )}
      </div>
    </div>
  )
}
