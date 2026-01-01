import Image from "next/image"
import { Users, ShieldCheck, Beaker, GraduationCap, PenTool, Search, Linkedin, Mail } from "lucide-react"

const teamData = [
  {
    category: "Gerencia",
    icon: <ShieldCheck className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Blga. Natasha Escobar Arana", role: "Gerente General", hasPhoto: false },
      { name: "Luz Marleni Guevara Valverde", role: "Socio", hasPhoto: false },
    ],
  },
  {
    category: "Área Legal",
    icon: <ShieldCheck className="w-5 h-5 text-[#d1343e]" />,
    members: [{ name: "Luis Guevara Valverde", role: "Contador Público", hasPhoto: false }],
  },
  {
    category: "Supervisores",
    icon: <Users className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Ing. Javier Verastegui Sancho", role: "Supervisor Ingeniero", hasPhoto: false },
      { name: "Información Protegida", role: "Supervisora Control Biológico", hasPhoto: false, isProtected: true },
      { name: "Mblga. Melissa Torres Medina", role: "Supervisora Microbiología Aplicada", hasPhoto: false },
    ],
  },
  {
    category: "Área Técnica",
    icon: <Beaker className="w-5 h-5 text-[#d1343e]" />,
    members: [
      { name: "Jurith Aguilar Pichen", role: "Jefa del Área Técnica", hasPhoto: false },
      { name: "Madeleine Isuiza Flores", role: "Técnica de Laboratorio", hasPhoto: false },
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#01283c] mb-4 font-serif italic">Nuestro Equipo</h2>
          <div className="w-20 h-1 bg-[#d1343e] mx-auto rounded-full"></div>
        </div>

        <div className="space-y-20">
          {teamData.map((section, idx) => (
            <div key={idx} className="relative">
              <div className="flex items-center gap-3 mb-10 justify-center">
                <span className="h-px bg-gray-200 flex-grow max-w-[100px]"></span>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                  {section.icon}
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">{section.category}</h3>
                </div>
                <span className="h-px bg-gray-200 flex-grow max-w-[100px]"></span>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {section.members.map((member, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex flex-col items-center text-center group max-w-[200px] ${
                      member.isProtected ? "opacity-75" : ""
                    }`}
                  >
                    <div className="relative mb-4">
                      <div
                        className={`w-28 h-28 rounded-full border-2 p-1 transition-all duration-300 group-hover:scale-105 ${
                          member.isVacancy
                            ? "border-dashed border-[#d1343e]"
                            : "border-gray-100 group-hover:border-[#d1343e]"
                        }`}
                      >
                        <div
                          className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden ${
                            member.isVacancy ? "bg-red-50" : "bg-gray-50"
                          }`}
                        >
                          {member.hasPhoto ? (
                            <Image
                              src="/placeholder.svg"
                              alt={member.name}
                              width={112}
                              height={112}
                              className="object-cover"
                            />
                          ) : (
                            <Users className={`w-10 h-10 ${member.isVacancy ? "text-[#d1343e]" : "text-gray-300"}`} />
                          )}
                        </div>
                      </div>

                      {!member.isVacancy && !member.isProtected && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-1.5 bg-white rounded-full shadow-md text-blue-600 hover:bg-blue-50">
                            <Linkedin className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-50">
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4
                        className={`font-bold text-base leading-tight ${
                          member.isProtected ? "italic text-gray-500" : "text-[#01283c]"
                        }`}
                      >
                        {member.name}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed ${
                          member.isVacancy ? "text-[#d1343e] font-semibold" : "text-gray-500 font-medium"
                        }`}
                      >
                        {member.role}
                      </p>
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
