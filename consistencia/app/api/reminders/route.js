import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const USER_EMAIL = process.env.USER_EMAIL || 'konfettishoppr@gmail.com'

const reminders = {
  morning_bible:   { subject: 'Tu momento con Dios te espera', body: 'Antes de abrir tu email, abre tu Biblia. Un versículo es suficiente.' },
  morning_prayer:  { subject: 'Habla con Dios hoy', body: 'Habla con Dios como hablarías con una amiga. Él te escucha.' },
  evening_home:    { subject: 'Solo 10 minutos para tu hogar', body: 'Solo 10 minutos. Una cosa. Tú puedes.' },
  evening_konfetti:{ subject: 'Una acción para Konfetti', body: 'Solo una acción para tu sueño hoy. Una sola.' },
  night_checkin:   { subject: '¿Qué sí lograste hoy?', body: 'Es momento de tu check-in nocturno. ¿Qué sí lograste hoy?' },
  checkin_done:    { subject: 'Hoy fue suficiente', body: 'Completaste tu check-in. Descansa con paz. Mañana es una nueva oportunidad.' },
}

export async function POST(request) {
  try {
    const { type } = await request.json()
    const reminder = reminders[type] || reminders.morning_prayer

    await resend.emails.send({
      from: 'Consistencia sin Culpa <onboarding@resend.dev>',
      to: USER_EMAIL,
      subject: reminder.subject,
      html: `
        <div style="font-family:'DM Sans',sans-serif;max-width:480px;margin:0 auto;background:#fdf8f0;padding:32px 28px;border-radius:18px">
          <div style="font-family:Georgia,serif;font-size:22px;color:#eb4193;font-style:italic;margin-bottom:8px">Consistencia sin Culpa</div>
          <div style="height:1px;background:rgba(235,65,147,.15);margin-bottom:24px"></div>
          <div style="font-size:16px;color:#3d2620;line-height:1.7;margin-bottom:24px">${reminder.body}</div>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://consistencia.vercel.app'}" style="display:inline-block;background:#eb4193;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:600;font-size:14px">Abrir mi app</a>
          <div style="margin-top:24px;font-size:12px;color:#9b8080;font-style:italic">"Pequeños pasos también construyen grandes sueños."</div>
        </div>
      `,
    })

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
