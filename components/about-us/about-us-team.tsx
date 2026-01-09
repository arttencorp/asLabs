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
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-3 font-light">Equipo Profesional</p>
          <h2 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">Nuestro Equipo</h2>
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <div className="w-16 h-px bg-gradient-to-l from-gray-200 to-transparent"></div>
          </div>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed font-light">
            Profesionales comprometidos con la excelencia en investigación y desarrollo biotecnológico
          </p>
        </div>

        <div className="space-y-20">
          {teamData.map((section, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="mb-10 text-center">
                <h3 className="text-xs font-light tracking-widest uppercase text-gray-500 flex items-center justify-center gap-3">
                  <span className="text-gray-300">{section.icon}</span>
                  {section.category}
                  <span className="text-gray-300">{section.icon}</span>
                </h3>
              </div>

              <div className="w-full flex justify-center">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl">
                  {section.members.map((member, mIdx) => (
                    <div key={mIdx} className="group flex justify-center">
                      <div
                        className={`w-full aspect-square rounded-xl overflow-hidden flex items-end transition-all duration-500 ${
                          member.isVacancy
                            ? "border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-150 hover:border-gray-300"
                            : member.isProtected
                              ? "border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100"
                              : "border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-300"
                        }`}
                      >
                        {member.hasPhoto ? (
                          <>
                            <Image src="/professional-portrait.png" alt={member.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-100 group-hover:opacity-95 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-3 text-white">
                              <h4 className="text-xs font-light mb-1 leading-tight line-clamp-2">{member.name}</h4>
                              <p className="text-xs text-gray-200 mb-3 line-clamp-2 font-light">{member.role}</p>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center">
                                <button className="p-1.5 hover:bg-white/30 rounded-full transition-colors">
                                  <Linkedin className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 hover:bg-white/30 rounded-full transition-colors">
                                  <Mail className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </>
                        ) : member.isVacancy ? (
                          <div className="flex flex-col items-center justify-center w-full h-full">
                            <Plus className="w-6 h-6 text-gray-400 mb-2" />
                            <p className="text-xs font-light text-gray-600">{member.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full p-3">
                            <Users className="w-6 h-6 text-gray-300 mb-2" />
                            <p className="text-xs font-light text-gray-600 text-center italic">{member.name}</p>
                            <p className="text-xs text-gray-400 mt-1 text-center">{member.role}</p>
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
