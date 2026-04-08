export interface TeamMember {
  id: string
  name: string
  lastName: string
  role: string
  area: string
  image: string
  email: string
  linkedIn: string
  bio?: string
  education?: string[]
}

export interface TeamSection {
  title: string
  members: TeamMember[]
}

export const teamData: TeamSection[] = [
  {
    title: 'Dirección Ejecutiva',
    members: [
      {
        id: 'marleni-valverde',
        name: 'Marleni G.',
        lastName: 'Valverde',
        role: 'Lic. - Socio Fundador',
        area: 'Dirección',
        image: '/team/default-profile.jpg',
        email: 'ventas@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'natasha-escobar',
        name: 'Natasha',
        lastName: 'Escobar Arana',
        role: 'Blga. - Gerente General',
        area: 'Gerencia',
        image: '/team/default-profile.jpg',
        email: 'ventas@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Natasha Escobar Arana es una bióloga especializada en entomología y crianza de insectos benéficos para control biológico. Como Gerente General de AS Laboratorios Control Biológico S.A.C. desde 2005, dirige la producción de organismos benéficos como Paratheresia claripalpis, Chrysoperla sp. y Trichogramma spp. SENASA la registra como proveedora autorizada de agentes de control biológico, reconociendo específicamente la cría de Paratheresia claripalpis en sus instalaciones.\n\nSu trabajo ha permitido abastecer programas de control biológico en empresas de envergadura como Agroindustrial Laredo (Sol de Laredo), que logró cultivar más de 6 000 hectáreas sin plaguicidas y obtuvo certificación de "Fundo Verde" de SENASA, y Agrolmos S.A., que utilizó insectos benéficos antes de inaugurar su propio laboratorio entomológico en 2021. También ha apoyado a productores del Proyecto Especial Chavimochic, donde el uso de biocontroladores ha reducido hasta en 50% la aplicación de agroquímicos en cultivos como maíz y piña.',
        education: [
          'Biología - Universidad Nacional de Trujillo',
          'Especialización en Entomología - Universidad Nacional de Trujillo',
          'Master en Gestión Pública - Universidad Nacional de Trujillo',
        ],
      },
    ],
  },
  {
    title: 'Gestión Ejecutiva',
    members: [
      {
        id: 'antonio-guevara',
        name: 'Antonio',
        lastName: 'Guevara E.',
        role: 'Gerente de Gestión',
        area: 'Gerencia',
        image: '/team/antonio-guevara-real.jpg',
        email: 'avguevaraes@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Antonio Víctor Gabriel Guevara Escobar es Gerente de Gestión en AS Labs y se desempeña en áreas vinculadas a administración financiera y de personal, así como en procesos de aislamiento e identificación de microorganismos contaminantes y embriogénesis vegetal. De forma paralela, ocupa una jefatura de departamento en Sparked Host LLC, empresa con sede en Utah, Estados Unidos, en la que interviene en procesos técnicos, soporte remoto, gestión de proyectos digitales y análisis de métricas internas.\n\nCuenta con competencias en biotecnología y microbiología aplicada, análisis de datos, ciencia computacional, comunicación científica, diseño visual, gestión ambiental, seguridad industrial, marketing digital y liderazgo de equipos técnicos. Además, posee dominio del español como lengua materna, inglés americano avanzado, inglés británico intermedio y conocimientos básicos de alemán.',
        education: [
          'Especialización en Administración y Gestión de Empresas - The Wharton School',
          'Microbiología y Parasitología - Universidad Nacional de Trujillo',
          'Inglés Avanzado - Asociación Cultural Peruano Británica',
          'Inglés Intermedio - Asociación Peruano Americana El Cultural',
          'Gestión Ambiental - Colegio de Ingenieros del Perú',
          'Análisis de Datos - IBS International Business School Americas',
          'Marketing Digital y Diseño Gráfico Avanzado - Fundación Romero',
        ],
      },
    ],
  },
  {
    title: 'Gestión Administrativa',
    members: [
      {
        id: 'luis-guevara',
        name: 'Luis',
        lastName: 'Guevara',
        role: 'Cont. - Contador',
        area: 'Contabilidad',
        image: '/team/default-profile.jpg',
        email: 'lguevaracano@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'diego-alfaro',
        name: 'Diego Arturo',
        lastName: 'Alfaro del Pozo',
        role: 'Especialista en Recursos Humanos',
        area: 'Recursos Humanos',
        image: '/team/default-profile.jpg',
        email: 'recursoshumanos@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
    ],
  },
  {
    title: 'Área Técnica - Supervisión de Técnicos',
    members: [
      {
        id: 'javier-verastegui',
        name: 'Ing. Javier',
        lastName: 'Verastegui Sancho',
        role: 'Jefe en Biotecnología',
        area: 'Área Técnica',
        image: '/team/default-profile.jpg',
        email: 'javier@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'hassan-espinales',
        name: 'Andy Hassan',
        lastName: 'Espinales',
        role: 'Jefe Microbiología Agroindustrial',
        area: 'Microbiología',
        image: '/team/default-profile.jpg',
        email: 'ahassane@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'jaime-ricardo',
        name: 'Jaime Ricardo',
        lastName: 'Palomino',
        role: 'Jefe de Innovación y Transferencia Tecnológica',
        area: 'Innovación',
        image: '/team/default-profile.jpg',
        email: 'jricardop@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'yvonne-lopez',
        name: 'Blga.',
        lastName: 'Yvonne Lopez L.',
        role: 'Jefa de Control Biológico',
        area: 'Control Biológico',
        image: '/team/default-profile.jpg',
        email: 'yvonne@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'hellem-guevara',
        name: 'Hellem',
        lastName: 'Guevara N.',
        role: 'Supervisora de Técnicos',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'hellemg@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
    ],
  },
  {
    title: 'Técnicas Químicas Principales',
    members: [
      {
        id: 'jurith-aguilar',
        name: 'Jurith',
        lastName: 'Aguilar P.',
        role: 'Técnica Química Principal',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'ajurithp@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'madeleine-isuiza',
        name: 'Madeleine',
        lastName: 'Isuiza F.',
        role: 'Técnica Química Principal',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'misuizaf@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
    ],
  },
  {
    title: 'Área Técnica - Supervisión de Practicantes',
    members: [
      {
        id: 'melissa-torres',
        name: 'Melissa',
        lastName: 'Torres M.',
        role: 'Locador de Servicios en Bacteriologia',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'melissa@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'rosa-nancy-mejia',
        name: 'Rosa Nancy',
        lastName: 'Mejía Ruedell Malabrigo',
        role: 'Practicante de Gestión de la Calidad',
        area: 'Prácticas',
        image: '/team/default-profile.jpg',
        email: 'rnancym@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Rosa Nancy Mejía Ruedell Malabrigo es Bióloga Microbiólogo por la Universidad Nacional de Trujillo, egresada en el período 2021–2026 y destacada por haber obtenido el primer puesto durante los diez semestres académicos de su formación.\n\nSu actualización profesional incluye participación en congresos, simposios, cursos y conferencias durante 2024 y 2025, entre ellos el curso \"Aplicaciones y análisis de resultados de la qPCR en el diagnóstico molecular\", el VII Simposio Nacional de Biología Forense, el III Congreso Nacional sobre Ciencias de la Vida, la XXX Reunión Científica del ICBAR, el congreso internacional EcoGreen 2025, el curso ISO 45001:2018 y diversas jornadas en microbiología, parasitología, biotecnología clínica, hematología, biología estructural y ciencias forenses.\n\nEn producción científica, figura como coautora del artículo \"Efficient Chitin Extraction from Shrimp Exoskeletons through Single-Step Fermentation by Pseudomonas aeruginosa QF50 and Serratia sp. QCS23\", publicado en la revista Processes en 2024.',
        education: [
          'Biología Microbiologa - Universidad Nacional de Trujillo (2021-2026)',
          'Inglés Avanzado - El Cultural (2022)',
          'Certificación TOEFL ITP',
          'Excel Intermedio y Avanzado - IDAT (2023)',
          'Curso: Aplicaciones y análisis de resultados de la qPCR en el diagnóstico molecular',
          'VII Simposio Nacional de Biología Forense',
          'III Congreso Nacional sobre Ciencias de la Vida',
          'XXX Reunión Científica del ICBAR',
          'Congreso Internacional EcoGreen 2025',
          'Curso ISO 45001:2018',
        ],
      },
    ],
  },
  {
    title: 'Laboratorio y Marketing',
    members: [
      {
        id: 'luis-alonso-flores',
        name: 'Luis Alonso',
        lastName: 'Flores Ramírez',
        role: 'Técnico de Laboratorio',
        area: 'Laboratorio',
        image: '/team/default-profile.jpg',
        email: 'luisf@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
      {
        id: 'sebastian-carranza',
        name: 'Arq.',
        lastName: 'Sebastian Carranza A.',
        role: 'Responsable Marketing',
        area: 'Marketing',
        image: '/team/default-profile.jpg',
        email: 'sebastian@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
        education: [],
      },
    ],
  },
]

export function getTeamMemberById(id: string): TeamMember | undefined {
  for (const section of teamData) {
    const member = section.members.find(m => m.id === id)
    if (member) return member
  }
  return undefined
}
