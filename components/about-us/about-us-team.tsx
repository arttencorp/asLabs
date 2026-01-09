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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-4">Equipo Profesional</p>
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-6">Nuestro Equipo</h2>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Profesionales comprometidos con la excelencia en investigación y desarrollo biotecnológico
          </p>
        </div>

        <div className="space-y-16">
          {teamData.map((section, idx) => (
            <div key={idx}>
              <div className="mb-12">
                <div className="flex items-center gap-3 justify-center">
                  <span className="text-gray-300">{section.icon}</span>
                  <h3 className="text-base font-light tracking-widest uppercase text-gray-700">{section.category}</h3>
                  <span className="text-gray-300">{section.icon}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {section.members.map((member, mIdx) => (
                  <div key={mIdx} className="group">
                    <div
                      className={`relative w-full aspect-square rounded-lg overflow-hidden flex items-end transition-all duration-500 ${
                        member.isVacancy
                          ? "border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center"
                          : member.isProtected
                            ? "border border-gray-200 bg-gray-100"
                            : "border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-400"
                      }`}
                    >
                      {member.hasPhoto ? (
                        <>
                          <Image src="/professional-portrait.png" alt={member.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-95 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                            <h4 className="text-sm font-light mb-1 line-clamp-2">{member.name}</h4>
                            <p className="text-xs text-gray-200 mb-3 line-clamp-2">{member.role}</p>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button className="p-2 hover:bg-white/20 rounded transition-colors">
                                <Linkedin className="w-4 h-4" />
                              </button>
                              <button className="p-2 hover:bg-white/20 rounded transition-colors">
                                <Mail className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : member.isVacancy ? (
                        <div className="flex flex-col items-center justify-center w-full">
                          <Plus className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm font-light text-gray-600">{member.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{member.role}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full p-4">
                          <Users className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-sm font-light text-gray-600 text-center italic">{member.name}</p>
                          <p className="text-xs text-gray-500 mt-1 text-center">{member.role}</p>
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
