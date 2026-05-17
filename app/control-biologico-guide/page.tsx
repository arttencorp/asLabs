import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guía Completa de Control Biológico en Agricultura | Trichoderma, Trichogramma, Paratheresia",
  description:
    "Guía completa sobre control biológico para agricultura sostenible. Aprende sobre Trichoderma, Trichogramma, Paratheresia claripalpis y otras estrategias de biocontrol. Producción en Trujillo, Perú por AS Laboratorios.",
  keywords: [
    "control biológico",
    "guía de biocontrol",
    "Trichoderma",
    "Trichogramma",
    "Paratheresia claripalpis",
    "manejo integrado de plagas",
    "agricultura sostenible",
    "biocontroladores",
    "alternativa a plaguicidas",
    "control de plagas natural",
    "Perú",
    "Trujillo",
  ],
}

export default function BiologicalControlGuide() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Guía Completa de Control Biológico en Agricultura
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            El control biológico es una estrategia sostenible y efectiva para proteger cultivos. En esta guía, aprenderás sobre los principales agentes biocontroladores desarrollados e investigados por AS Laboratorios en Trujillo, La Libertad, Perú.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué es el Control Biológico?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El control biológico es el uso de organismos vivos (predadores, parásitos o patógenos) para reducir las poblaciones de plagas agrícolas. Es una alternativa segura y sostenible a los plaguicidas químicos, reduciendo costos de producción hasta en 50% según datos de agricultores peruanos.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
              <p className="text-gray-700">
                <strong>Ventajas clave:</strong> Reduce costos operativos, preserva el medio ambiente, mantiene la salud del suelo, produce alimentos más seguros, y es compatible con agricultura orgánica certificada.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trichoderma: El Hongo Antagonista</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Trichoderma es un hongo benéfico que controla enfermedades fúngicas en plantas. AS Laboratorios produce cepas nativas de Trichoderma aisladas de La Libertad, con comprobada efectividad contra:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4 ml-6">
              <li>✓ Fusarium oxysporum (incluyendo Raza 2)</li>
              <li>✓ Rhizoctonia solani</li>
              <li>✓ Sclerotium rolfsii</li>
              <li>✓ Otras enfermedades del suelo</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Trichoderma actúa mediante mecanismos como la producción de antibióticos, competencia por nutrientes y degradación enzimática de patógenos. El proyecto CATFOM-001 de AS Laboratorios analiza estos mecanismos moleculares en detalle.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trichogramma: Parasitoide de Huevos</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Trichogramma es un pequeño parasitoide que controla plagas como polillas y mariposas parasitando sus huevos. Es ampliamente utilizado en manejo integrado de plagas (MIP) en cultivos de:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4 ml-6">
              <li>✓ Maíz</li>
              <li>✓ Tomate</li>
              <li>✓ Papa</li>
              <li>✓ Frutas tropicales</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Una sola hembra de Trichogramma puede parasitar cientos de huevos durante su vida, reduciendo significativamente poblaciones de plagas sin afectar cultivos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Paratheresia claripalpis: Mosca Parasitoide</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Paratheresia claripalpis es una mosca parasitoide especializada en control de plagas de hemípteros. AS Laboratorios es reconocida por SENASA como productora autorizada de esta especie. Sus beneficios incluyen:
            </p>
            <ul className="text-gray-700 space-y-2 mb-4 ml-6">
              <li>✓ Control de chinches</li>
              <li>✓ Especificidad hacia plagas objetivo</li>
              <li>✓ Segura para cultivos y fauna benéfica</li>
              <li>✓ Compatible con otros biocontroladores</li>
            </ul>
          </section>

          <section className="mb-12 bg-green-50 p-8 rounded-lg border border-green-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manejo Integrado de Plagas (MIP)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El MIP combina el control biológico con prácticas agrícolas sostenibles para un manejo holístico de plagas:
            </p>
            <ul className="text-gray-700 space-y-3 mb-4">
              <li><strong>Monitoreo:</strong> Inspección regular de cultivos para detectar plagas tempranamente</li>
              <li><strong>Umbral económico:</strong> Aplicar control solo cuando poblaciones justifiquen inversión</li>
              <li><strong>Métodos culturales:</strong> Rotación de cultivos, manejo de residuos, riego estratégico</li>
              <li><strong>Control biológico:</strong> Introducción de enemigos naturales</li>
              <li><strong>Control químico selectivo:</strong> Solo si es necesario y con productos de baja toxicidad</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Casos de Éxito en Perú</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Proyecto Chavimochic</h3>
                <p className="text-gray-700 text-sm">
                  Implementación exitosa de Trichoderma para control de Fusarium en producción de espárragos, reduciendo uso de fungicidas en 70%.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Agricultores La Libertad</h3>
                <p className="text-gray-700 text-sm">
                  Uso de Trichogramma en cultivos de maíz y tomate resultó en reducción de 50% en costos de control de plagas.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-purple-50 p-8 rounded-lg border border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué AS Laboratorios?</h2>
            <ul className="text-gray-700 space-y-3">
              <li>✓ <strong>SENASA Autorizado:</strong> Reconocimiento oficial como productor de biocontroladores</li>
              <li>✓ <strong>Cepas Nativas:</strong> Microorganismos adaptados a condiciones locales de La Libertad</li>
              <li>✓ <strong>Investigación Rigurosa:</strong> Análisis molecular de mecanismos de acción</li>
              <li>✓ <strong>Asesoría Técnica:</strong> Apoyo en implementación y manejo de biocontrol</li>
              <li>✓ <strong>Producción Sostenible:</strong> Procesos sin químicos sintéticos</li>
            </ul>
          </section>

          <section className="text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contacta a AS Laboratorios</h2>
            <p className="text-gray-700 mb-6">
              Solicita asesoría técnica para implementar control biológico en tu operación agrícola.
            </p>
            <a href="/contacto" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Solicitar Información
            </a>
          </section>
        </article>
      </div>
    </div>
  )
}
          <h1 className="text-5xl font-bold text-white mb-6">
            Guía Completa de Control Biológico en Agricultura
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            El control biológico es una estrategia sostenible y efectiva para proteger cultivos. En esta guía, aprenderás sobre los principales agentes biocontroladores desarrollados e investigados por AS Laboratorios en Trujillo, La Libertad, Perú.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-emerald-300 mb-4">¿Qué es el Control Biológico?</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              El control biológico es el uso de organismos vivos (predadores, parásitos o patógenos) para reducir las poblaciones de plagas agrícolas. Es una alternativa segura y sostenible a los plaguicidas químicos, reduciendo costos de producción hasta en 50% según datos de agricultores peruanos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Trichoderma: El Hongo Antagonista</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Trichoderma es un hongo benéfico que controla enfermedades fúngicas en plantas. AS Laboratorios produce cepas nativas de Trichoderma aisladas de La Libertad, con comprobada efectividad contra:
            </p>
            <ul className="text-slate-300 space-y-2 mb-4 ml-6">
              <li>• Fusarium oxysporum (incluyendo Raza 2)</li>
              <li>• Rhizoctonia solani</li>
              <li>• Sclerotium rolfsii</li>
              <li>• Otras enfermedades del suelo</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Trichoderma actúa mediante mecanismos como la producción de antibióticos, competencia por nutrientes y degradación enzimática de patógenos. El proyecto CATFOM-001 de AS Laboratorios analiza estos mecanismos moleculares en detalle.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-300 mb-4">Trichogramma: Parasitoide de Huevos</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Trichogramma es un pequeño parasitoide que controla plagas como polillas y mariposas parasitando sus huevos. Es ampliamente utilizado en manejo integrado de plagas (MIP) en cultivos de:
            </p>
            <ul className="text-slate-300 space-y-2 mb-4 ml-6">
              <li>• Maíz</li>
              <li>• Tomate</li>
              <li>• Papa</li>
              <li>• Frutas tropicales</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Una sola hembra de Trichogramma puede parasitar cientos de huevos durante su vida, reduciendo significativamente poblaciones de plagas sin afectar cultivos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-300 mb-4">Paratheresia claripalpis: Mosca Parasitoide</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Paratheresia claripalpis es una mosca parasitoide especializada en control de plagas de hemípteros. AS Laboratorios es reconocida por SENASA como productora autorizada de esta especie. Sus beneficios incluyen:
            </p>
            <ul className="text-slate-300 space-y-2 mb-4 ml-6">
              <li>• Control de chinches y otros hemípteros</li>
              <li>• Alta especificidad por plagas objetivo</li>
              <li>• Segura para insectos benéficos</li>
              <li>• Producción a escala comercial</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              El uso de Paratheresia claripalpis ha permitido a empresas agroindustriales como Sol de Laredo reducir drasticamente el uso de insecticidas químicos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-300 mb-4">Bacillus: Bacteria Entomopatógena</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Bacillus thuringiensis es una bacteria que produce toxinas efectivas contra larvas de insectos plagas. AS Laboratorios desarrolla cepas de Bacillus biocontrolador con múltiples aplicaciones:
            </p>
            <ul className="text-slate-300 space-y-2 mb-4 ml-6">
              <li>• Control de lepidópteros (mariposas)</li>
              <li>• Bioprotección de plantas</li>
              <li>• Consorcios microbianos especializados</li>
              <li>• Productos seguros para agricultura orgánica</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-orange-300 mb-4">Beneficios del Control Biológico</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-emerald-300 font-bold mb-3">Económico</h3>
                <p className="text-slate-300 text-sm">Reducción de hasta 50% en costos de agroquímicos. Inversión que se recupera rápidamente.</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-blue-300 font-bold mb-3">Sostenible</h3>
                <p className="text-slate-300 text-sm">Sin residuos químicos. Protege ecosistemas y biodiversidad agrícola. Certificado para agricultura orgánica.</p>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-purple-300 font-bold mb-3">Efectivo</h3>
                <p className="text-slate-300 text-sm">Resultados comprobados. Reconocimiento de SENASA. Casos exitosos en todo Perú.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">AS Laboratorios: Líderes en Control Biológico en Perú</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Desde 2005, AS Laboratorios ha estado investigando y produciendo agentes de control biológico de calidad mundial. Con instalaciones en Trujillo, La Libertad, producimos:
            </p>
            <ul className="text-slate-300 space-y-2 mb-8 ml-6">
              <li>• Trichoderma nativo y mejorado</li>
              <li>• Trichogramma spp. (múltiples especies)</li>
              <li>• Paratheresia claripalpis (SENASA autorizado)</li>
              <li>• Bacillus biocontrolador</li>
              <li>• Consorcios microbianos personalizados</li>
              <li>• Hongos entomopatógenos</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Nuestro equipo de investigadores, liderados por Natasha Escobar Arana (Gerente General) y especialistas en microbiología, desarrolla constantemente nuevas estrategias de biocontrol adaptadas a condiciones peruanas.
            </p>
          </section>

          <section className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4">Contacta a AS Laboratorios</h2>
            <p className="text-slate-300 mb-4">
              ¿Interesado en implementar control biológico en tu cultivo? Contáctanos para asesoría técnica y productos de calidad.
            </p>
            <p className="text-slate-300">
              <strong>Email:</strong> ventas@aslaboratorios.com<br />
              <strong>Ubicación:</strong> Trujillo, La Libertad, Perú<br />
              <strong>Visitanos:</strong> aslaboratorios.com
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
