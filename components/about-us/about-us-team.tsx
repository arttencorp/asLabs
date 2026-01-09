import Image from "next/image"
import { Users, ShieldCheck, Beaker, GraduationCap, PenTool, Search, Linkedin, Mail, Plus } from "lucide-react"

const teamData = [
  {
    category: "Gerencia",
    icon: <ShieldCheck className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Blga. Natasha Escobar Arana", role: "Gerente General", hasPhoto: true },
      { name: "Luz Marleni Guevara Valverde", role: "Socio", hasPhoto: true },
    ],
  },
  {
    category: "Área Legal",
    icon: <ShieldCheck className="w-5 h-5 text-[#d1343e]" />,
    members: [{ name: "Luis Guevara Valverde", role: "Contador Público", hasPhoto: true }],
  },
  {
    category: "Supervisores",
    icon: <Users className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Ing. Javier Verastegui Sancho", role: "Supervisor Ingeniero", hasPhoto: true },
      { name: "Información Protegida", role: "Supervisora Control Biológico", hasPhoto: false, isProtected: true },
      { name: "Mblga. Melissa Torres Medina", role: "Supervisora Microbiología Aplicada", hasPhoto: true },
    ],
  },
  {
    category: "Área Técnica",
    icon: <Beaker className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Jurith Aguilar Pichen", role: "Jefa del Área Técnica", hasPhoto: true },
      { name: "Madeleine Isuiza Flores", role: "Técnica de Laboratorio", hasPhoto: true },
      { name: "Información Protegida", role: "Técnicos Secundarios (7 técnicos)", hasPhoto: false, isProtected: true },
    ],
  },
  {
    category: "Investigadores",
    icon: <Search className="w-5 h-5 text-[#d1343e]" />,
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
    icon: <PenTool className="w-5 h-5 text-[#d1343e]" />,
    members: [{ name: "Sebastian Carranza Alvites", role: "Diseñador", hasPhoto: true }],
  },
  {
    category: "Practicantes",
    icon: <GraduationCap className="w-5 h-5 text-[#d1343e]" />,
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#01283c] mb-4 font-serif italic">Nuestro Equipo</h2>
          <div className="w-20 h-1 bg-[#d1343e] mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Profesionales comprometidos con la excelencia en investigación y desarrollo biotecnológico
          </p>
        </div>

        <div className="space-y-16">
          {teamData.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-12 justify-center">
                <div className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#d1343e] rounded-lg shadow-sm">
                  {section.icon}
                  <h3 className="text-base font-bold uppercase tracking-widest text-[#01283c]">{section.category}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                {section.members.map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className={`group relative transition-all duration-300 ${member.isProtected ? "opacity-70" : ""}`}
                  >
                    <div
                      className={`h-full p-6 rounded-lg border-2 transition-all duration-300 flex flex-col items-center text-center group-hover:shadow-xl group-hover:-translate-y-2 ${
                        member.isVacancy
                          ? "border-dashed border-[#d1343e] bg-red-50 group-hover:bg-red-100"
                          : member.isProtected
                            ? "border-gray-200 bg-gray-100"
                            : "border-gray-200 bg-white group-hover:border-[#d1343e]"
                      }`}
                    >
                      <div
                        className={`w-32 h-32 mb-6 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 transition-all duration-300 border-2 ${
                          member.isVacancy
                            ? "border-dashed border-[#d1343e] bg-red-100"
                            : member.isProtected
                              ? "border-gray-300 bg-gray-200"
                              : "border-gray-300 group-hover:border-[#d1343e]"
                        }`}
                      >
                        {member.hasPhoto ? (
                          <Image
                            src="/professional-portrait.png"
                            alt={member.name}
                            width={128}
                            height={128}
                            className="object-cover w-full h-full"
                          />
                        ) : member.isVacancy ? (
                          <Plus className="w-12 h-12 text-[#d1343e]" />
                        ) : (
                          <Users className="w-12 h-12 text-gray-400" />
                        )}
                      </div>

                      <div className="flex-grow w-full">
                        <h4
                          className={`font-bold text-lg leading-tight mb-2 ${
                            member.isProtected ? "italic text-gray-600" : "text-[#01283c]"
                          }`}
                        >
                          {member.name}
                        </h4>
                        <p
                          className={`text-sm leading-relaxed mb-4 ${
                            member.isVacancy ? "text-[#d1343e] font-semibold" : "text-gray-600 font-medium"
                          }`}
                        >
                          {member.role}
                        </p>
                      </div>

                      {!member.isVacancy && !member.isProtected && (
                        <div className="flex gap-3 mt-4 w-full justify-center">
                          <button className="flex-1 p-2.5 bg-blue-50 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center group-hover:scale-105 transform">
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button className="flex-1 p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center group-hover:scale-105 transform">
                            <Mail className="w-4 h-4" />
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
