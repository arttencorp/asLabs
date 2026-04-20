export type TeamMember = {
  slug: string
  area: string
  name: string
  role: string
  email: string
  accent: string
  biography: string
  linkedin?: string
  imagePath?: string
}

export const teamMembers: TeamMember[] = [
  // Para hardcodear imagenes, agrega imagePath con ruta desde /public.
  // Ejemplo: imagePath: "/images/equipo/natasha.jpg"
  {
    slug: "marleni-g-valverde",
    area: "Dirección",
    name: "Marleni G. Valverde",
    role: "Lic. - Socio Fundador",
    email: "",
    accent: "#2f8a3f",
    biography: "Biografía por completar",
  },
  {
    slug: "natasha-escobar-arana",
    area: "Gerencia",
    name: "Natasha Escobar Arana",
    role: "Blga. - Gerente General",
    email: "ventas@aslaboratorios.com",
    accent: "#01304f",
    biography: "Natasha Escobar Arana es una bióloga especializada en entomología y crianza de insectos benéficos para control biológico. Como Gerente General de AS Laboratorios Control Biológico S.A.C. desde 2005, dirige la producción de organismos benéficos como Paratheresia claripalpis, Chrysoperla sp. y Trichogramma spp. SENASA la registra como proveedora autorizada de agentes de control biológico, reconociendo específicamente la cría de Paratheresia claripalpis en sus instalaciones. \n\n Su trabajo ha permitido abastecer programas de control biológico en empresas de envergadura como Agroindustrial Laredo (Sol de Laredo), que logró cultivar más de 6 000 hectáreas sin plaguicidas y obtuvo certificación de 'Fundo Verde' de SENASA, y Agrolmos S.A., que utilizó insectos benéficos antes de inaugurar su propio laboratorio entomológico en 2021. También ha apoyado a productores del Proyecto Especial Chavimochic, donde el uso de biocontroladores ha reducido hasta en 50% la aplicación de agroquímicos en cultivos como maíz y piña.",
    imagePath: "/about-us/NatashaEscobar.webp",
  },
  {
    slug: "antonio-guevara-e",
    area: "Gerencia",
    name: "Antonio Guevara E.",
    role: "Gerente de Gestión",
    email: "avguevaraes@aslaboratorios.com",
    accent: "#01304f",
    biography: "Antonio Víctor Gabriel Guevara Escobar es Gerente de Gestión en AS Labs y se desempeña en áreas vinculadas a administración financiera y de personal, así como en procesos de aislamiento e identificación de microorganismos contaminantes y embriogénesis vegetal. De forma paralela, ocupa una jefatura de departamento en Sparked Host LLC, empresa con sede en Utah, Estados Unidos, en la que interviene en procesos técnicos, soporte remoto, gestión de proyectos digitales y análisis de métricas internas. \n\n Cuenta con competencias en biotecnología y microbiología aplicada, análisis de datos, ciencia computacional, comunicación científica, diseño visual, gestión ambiental, seguridad industrial, marketing digital y liderazgo de equipos técnicos. Además, posee dominio del español como lengua materna, inglés americano avanzado, inglés británico intermedio y conocimientos básicos de alemán.",
    imagePath: "/about-us/Antonio.webp",
    linkedin: "https://www.linkedin.com/in/th3antonio/",
  },
  {
    slug: "luis-guevara",
    area: "Contabilidad",
    name: "Luis Guevara",
    role: "Cont. - Contador",
    email: "",
    accent: "#e3a621",
    biography: "Biografía por completar",
  },
  {
    slug: "diego-arturo-alfaro-del-pozo",
    area: "Recursos Humanos",
    name: "Diego Arturo Alfaro del Pozo",
    role: "Especialista en Recursos Humanos",
    email: "",
    accent: "#d73932",
    biography: "Biografía por completar",
  },
  {
    slug: "javier-verastegui-sancho",
    area: "Área Técnica",
    name: "Ing. Javier Verastegui Sancho",
    role: "Jefe en Biotecnología",
    email: "",
    accent: "#2f8a3f",
    biography: "Biografía por completar",
  },
  {
    slug: "andy-hassan-espinales-gutierrez",
    area: "Microbiología",
    name: "Andy Hassan Espinales Gutiérrez",
    role: "Jefe Microbiología Agroindustrial",
    email: "",
    accent: "#4e76d5",
    biography: "Biografía por completar",
    imagePath: "/about-us/AndyHassan.webp",
  },
  {
    slug: "jaime-ricardo-palomino",
    area: "Innovación",
    name: "Jaime Ricardo Palomino",
    role: "Jefe de Innovación y Transferencia Tecnológica",
    email: "jpalominoc3@gmail.com",
    accent: "#eb9f1e",
    biography: "Biografía por completar",
    imagePath: "/about-us/jaimepro.png",
    linkedin: "https://www.linkedin.com/in/jaime-palomino/",
  },
  {
    slug: "yvonne-lopez-l",
    area: "Control Biológico",
    name: "Blga. Yvonne Lopez L.",
    role: "Jefa de Control Biológico",
    email: "",
    accent: "#4e76d5",
    biography: "Biografía por completar",
    imagePath: "/about-us/Madeleine.webp",
  },
  {
    slug: "hellem-guevara-n",
    area: "Técnica",
    name: "Hellem Guevara N.",
    role: "Supervisora de Técnicos",
    email: "hellemg@aslaboratorios.com",
    accent: "#8f61d9",
    biography: "Biografía por completar",
    imagePath: "/about-us/HellemGuevara.webp",
  },
  {
    slug: "jurith-aguilar-p",
    area: "Técnica",
    name: "Jurith Aguilar P.",
    role: "Técnica Química Principal",
    email: "",
    accent: "#8f61d9",
    biography: "Biografía por completar",
    imagePath: "/about-us/Jurith.webp",
  },
  {
    slug: "madeleine-isuiza-f",
    area: "Técnica",
    name: "Madeleine Isuiza F.",
    role: "Técnica Química Principal",
    email: "",
    accent: "#8f61d9",
    biography: "Biografía por completar",
  },
  {
    slug: "melissa-torres-m",
    area: "Técnica",
    name: "Melissa Torres M.",
    role: "Líder de Servicios en Bacteriología",
    email: "",
    accent: "#8f61d9",
    biography: "Biografía por completar",
  },
  {
    slug: "rosa-nancy-mejia-ruedell-malabrigo",
    area: "Prácticas",
    name: "Rosa Nancy Mejía Ruedell Malabrigo",
    role: "Practicante de Gestión de la Calidad",
    email: "rnancym@aslaboratorios.com",
    accent: "#4e76d5",
    biography: "Biografía por completar",
    imagePath: "/about-us/RosaNancy.webp",
  },
  {
    slug: "luis-alonso-flores-ramirez",
    area: "Laboratorio",
    name: "Luis Alonso Flores Ramírez",
    role: "Técnico de Laboratorio",
    email: "",
    accent: "#13a8b2",
    biography: "Biografía por completar",
    imagePath: "/about-us/LuisAlonso.webp",
  },
  {
    slug: "sebastian-carranza-alvites",
    area: "Laboratorio",
    name: "Sebastian Carranza Alvites",
    role: "Responsable de Marketing",
    email: "",
    accent: "#13a8b2",
    biography: "Biografía por completar",
  },
]

export function getTeamMemberBySlug(slug: string) {
  return teamMembers.find((member) => member.slug === slug)
}