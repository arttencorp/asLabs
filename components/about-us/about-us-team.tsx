import Image from "next/image"
import { Users, ShieldCheck, Beaker, GraduationCap, PenTool, Search, Linkedin, Mail, Plus } from "lucide-react"

const teamData = [
  {
    category: "Gerencia",
    icon: <ShieldCheck className="w-5 h-5" />,
    members: [
      { name: "Blga. Natasha Escobar Arana", role: "Gerente General", hasPhoto: true },
      { name: "Luz Marleni Guevara Valverde", role: "Socio", hasPhoto: true },
    ],
  },
  {
    category: "Área Legal",
    icon: <ShieldCheck className="w-5 h-5" />,
    members: [{ name: "Luis Guevara Valverde", role: "Contador Público", hasPhoto: true }],
  },
  {
    category: "Supervisores",
    icon: <Users className="w-5 h-5" />,
    members: [
      { name: "Ing. Javier Verastegui Sancho", role: "Supervisor Ingeniero", hasPhoto: true },
      { name: "Información Protegida", role: "Supervisora Control Biológico", hasPhoto: false, isProtected: true },
      { name: "Mblga. Melissa Torres Medina", role: "Supervisora Microbiología Aplicada", hasPhoto: true },
    ],
  },
  {
    category: "Área Técnica",
    icon: <Beaker className="w-5 h-5" />,
    members: [
      { name: "Jurith Aguilar Pichen", role: "Jefa del Área Técnica", hasPhoto: true },
      { name: "Madeleine Isuiza Flores", role: "Técnica de Laboratorio", hasPhoto: true },
      { name: "Información Protegida", role: "Técnicos Secundarios (7 técnicos)", hasPhoto: false, isProtected: true },
    ],
  },
  {
    category: "Investigadores",
    icon: <Search className="w-5 h-5" />,
    members: [
      {
        name: "Guevara Escobar Antonio Victor",
        role: "Investigador Practicante Universidad Nacional de Trujillo",
        hasPhoto: true,
      },
      {
        name: "Guevara Nuñez Hellem Iveth",
        role: "Investigador Practicante Universidad Nacional de Trujillo",
        hasPhoto: true,
      },
    ],
  },
  {
    category: "Diseño y Publicidad",
    icon: <PenTool className="w-5 h-5" />,
    members: [{ name: "Sebastian Carranza Alvites", role: "Diseñador", hasPhoto: true }],
  },
  {
    category: "Practicantes",
    icon: <GraduationCap className="w-5 h-5" />,
    members: [
      { name: "Andy Hassan Espinales Gutierrez", role: "Practicante Universidad Nacional de Trujillo", hasPhoto: true },
      { name: "Luis Alonso Flores Ramirez", role: "Practicante Universidad Nacional de Trujillo", hasPhoto: true },
      { name: "Posición Disponible", role: "Postúlate aquí", hasPhoto: false, isVacancy: true },
      { name: "Posición Disponible", role: "Postúlate aquí", hasPhoto: false, isVacancy: true },
    ],
  },
]

export default function AboutUsTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-4">Equipo Profesional</p>
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-6">Nuestro Equipo</h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Profesionales comprometidos con la excelencia en investigación y desarrollo biotecnológico
          </p>
        </div>

        <div className="space-y-20">
          {teamData.map((section, idx) => (
            <div key={idx}>
              <div className="mb-16">
                <div className="flex items-center gap-3 justify-center">
                  <span className="text-gray-400">{section.icon}</span>
                  <h3 className="text-lg font-light tracking-widest uppercase text-gray-900">{section.category}</h3>
                  <span className="text-gray-400">{section.icon}</span>
                </div>
                <div className="w-16 h-px bg-gray-200 mx-auto mt-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {section.members.map((member, mIdx) => (
                  <div key={mIdx} className="group">
                    <div
                      className={`h-full flex flex-col items-center transition-all duration-500 ${
                        member.isProtected ? "opacity-60" : ""
                      }`}
                    >
                      <div
                        className={`w-48 h-56 mb-8 rounded-sm overflow-hidden flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          member.isVacancy
                            ? "border border-dashed border-gray-400 bg-gray-50"
                            : member.isProtected
                              ? "border border-gray-200 bg-gray-100"
                              : "border border-gray-200 bg-gray-50 group-hover:border-gray-900 group-hover:shadow-xl"
                        }`}
                      >
                        {member.hasPhoto ? (
                          <Image
                            src="/professional-portrait.png"
                            alt={member.name}
                            width={192}
                            height={224}
                            className="object-cover w-full h-full"
                          />
                        ) : member.isVacancy ? (
                          <Plus className="w-16 h-16 text-gray-300" />
                        ) : (
                          <Users className="w-16 h-16 text-gray-300" />
                        )}
                      </div>

                      <div className="text-center w-full">
                        <h4
                          className={`text-lg font-light mb-2 transition-colors duration-300 ${
                            member.isProtected ? "text-gray-500 italic" : "text-gray-900 group-hover:text-gray-700"
                          }`}
                        >
                          {member.name}
                        </h4>
                        <p
                          className={`text-sm leading-relaxed mb-6 ${
                            member.isVacancy ? "text-gray-500 font-medium" : "text-gray-600"
                          }`}
                        >
                          {member.role}
                        </p>
                      </div>

                      {!member.isVacancy && !member.isProtected && (
                        <div className="flex gap-4 mt-2">
                          <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-all duration-300">
                            <Linkedin className="w-5 h-5" />
                          </button>
                          <button className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-sm transition-all duration-300">
                            <Mail className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
