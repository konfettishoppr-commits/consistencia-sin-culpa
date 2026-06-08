'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Nav from '../components/Nav'
import BottomNav from '../components/BottomNav'
import HomeScreen from '../components/HomeScreen'
import WeeklyScreen from '../components/WeeklyScreen'
import CheckinScreen from '../components/CheckinScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [energy, setEnergy] = useState(null)
  const [checks, setChecks] = useState([false, false, false, false])
  const [rewards, setRewards] = useState({ flowers: 0, stars: 0, streak: 0 })
  const [weekData, setWeekData] = useState([])
  const [todayLog, setTodayLog] = useState(null)

  useEffect(() => {
    loadTodayLog()
    loadRewards()
    loadWeekData()
  }, [])

  async function loadTodayLog() {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('date', today)
      .single()
    if (data) {
      setTodayLog(data)
      setEnergy(data.energy_level)
      setChecks([data.p_oracion, data.p_biblia, data.p_hogar, data.p_konfetti])
    }
  }

  async function loadRewards() {
    const { data } = await supabase.from('rewards').select('*').single()
    if (data) setRewards({ flowers: data.flowers_total, stars: data.stars_total, streak: data.streak_current })
  }

  async function loadWeekData() {
    const today = new Date()
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 6)
    const { data } = await supabase
      .from('daily_logs')
      .select('*')
      .gte('date', weekAgo.toISOString().split('T')[0])
      .order('date', { ascending: true })
    if (data) setWeekData(data)
  }

  async function handleEnergySet(e) {
    setEnergy(e)
    const today = new Date().toISOString().split('T')[0]
    if (todayLog) {
      await supabase.from('daily_logs').update({ energy_level: e }).eq('date', today)
    } else {
      const { data } = await supabase.from('daily_logs').insert({ date: today, energy_level: e }).select().single()
      setTodayLog(data)
    }
  }

  async function handleCheck(i) {
    const newChecks = [...checks]
    newChecks[i] = !newChecks[i]
    setChecks(newChecks)
    const done = newChecks.filter(Boolean).length
    const today = new Date().toISOString().split('T')[0]
    const fields = ['p_oracion', 'p_biblia', 'p_hogar', 'p_konfetti']
    const update = { [fields[i]]: newChecks[i], completed_count: done }
    if (todayLog) {
      await supabase.from('daily_logs').update(update).eq('date', today)
    } else {
      const { data } = await supabase.from('daily_logs').insert({ date: today, ...update }).select().single()
      setTodayLog(data)
    }
    if (done >= 3) {
      const newFlowers = rewards.flowers + 1
      await supabase.from('rewards').update({ flowers_total: newFlowers }).eq('id', (await supabase.from('rewards').select('id').single()).data.id)
      setRewards(r => ({ ...r, flowers: newFlowers }))
    }
    if (done === 4) {
      const newStars = rewards.stars + 1
      await supabase.from('rewards').update({ stars_total: newStars }).eq('id', (await supabase.from('rewards').select('id').single()).data.id)
      setRewards(r => ({ ...r, stars: newStars }))
    }
  }

  return (
    <div style={{ maxWidth: 390, margin: '0 auto', minHeight: '100vh', background: '#fdf8f0', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <div style={{ flex: 1 }}>
        {screen === 'home' && (
          <HomeScreen
            energy={energy}
            checks={checks}
            rewards={rewards}
            weekData={weekData}
            onEnergySet={handleEnergySet}
            onCheck={handleCheck}
            onGoCheckin={() => setScreen('checkin')}
          />
        )}
        {screen === 'weekly' && <WeeklyScreen weekData={weekData} />}
        {screen === 'checkin' && (
          <CheckinScreen
            checks={checks}
            energy={energy}
            todayLog={todayLog}
            onSave={loadTodayLog}
          />
        )}
      </div>
      <BottomNav screen={screen} onNav={setScreen} />
    </div>
  )
}
