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
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-2 font-light">Equipo Profesional</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">Nuestro Equipo</h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Profesionales comprometidos con la excelencia en investigación y desarrollo biotecnológico
          </p>
        </div>

        <div className="space-y-16">
          {teamData.map((section, idx) => (
            <div key={idx} className="w-full">
              <div className="text-center mb-8">
                <h3 className="text-xs font-light tracking-widest uppercase text-gray-600 flex items-center justify-center gap-2">
                  <span className="text-orange-500">{section.icon}</span>
                  {section.category}
                </h3>
              </div>

              <div className="flex justify-center w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-6xl">
                  {section.members.map((member, mIdx) => (
                    <div key={mIdx} className="flex justify-center">
                      <div
                        className={`w-full max-w-[180px] aspect-square rounded-lg overflow-hidden flex items-end transition-all duration-300 ${
                          member.isVacancy
                            ? "border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100 hover:border-gray-400"
                            : member.isProtected
                              ? "border border-gray-200 bg-gray-50"
                              : "border border-gray-200 shadow-sm hover:shadow-md"
                        }`}
                      >
                        {member.hasPhoto ? (
                          <>
                            <Image src="/professional-portrait.png" alt={member.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                              <h4 className="text-xs font-light mb-0.5 leading-tight line-clamp-2">{member.name}</h4>
                              <p className="text-xs text-gray-300 line-clamp-2 font-light text-[11px]">{member.role}</p>
                              <div className="flex gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                                  <Linkedin className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                                  <Mail className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : member.isVacancy ? (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <Plus className="w-5 h-5 text-gray-400 mb-1" />
                            <p className="text-xs font-light text-gray-600">{member.name}</p>
                            <p className="text-xs text-gray-500 text-[11px] mt-0.5">{member.role}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full p-3">
                            <Users className="w-5 h-5 text-gray-300 mb-1" />
                            <p className="text-xs font-light text-gray-600 text-center">{member.name}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
