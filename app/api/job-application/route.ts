import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: "Nueva Postulación - Prácticas",
        nombre: data.nombresApellidos,
        dni: data.dni,
        universidad: data.universidadInstituto,
        ciclo: data.ciclo,
        carrera: data.carrera,
        puesto: data.puestoActual,
        areas: Array.isArray(data.areasPreferidas) ? data.areasPreferidas.join(", ") : data.areasPreferidas,
        financiamiento: data.financiamientoTesis,
        cv_link: data.linkCurriculum,
        info_adicional: data.sobreUsted,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return NextResponse.json({ success: true, message: "Enviado" })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
