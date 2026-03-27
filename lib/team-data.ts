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
        email: 'marleni@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
      {
        id: 'natasha-escobar',
        name: 'Natasha',
        lastName: 'Escobar Arana',
        role: 'Blga. - Gerente General',
        area: 'Gerencia',
        image: '/team/default-profile.jpg',
        email: 'natasha@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Natasha Escobar Arana es una bióloga especializada en entomología y crianza de insectos benéficos para control biológico. Como Gerente General de AS Laboratorios Control Biológico S.A.C. desde 2005, dirige la producción de organismos benéficos como Paratheresia claripalpis, Chrysoperla sp. y Trichogramma spp. SENASA la registra como proveedora autorizada de agentes de control biológico, reconociendo específicamente la cría de Paratheresia claripalpis en sus instalaciones.\n\nSu trabajo ha permitido abastecer programas de control biológico en empresas de envergadura como Agroindustrial Laredo (Sol de Laredo), que logró cultivar más de 6 000 hectáreas sin plaguicidas y obtuvo certificación de "Fundo Verde" de SENASA, y Agrolmos S.A., que utilizó insectos benéficos antes de inaugurar su propio laboratorio entomológico en 2021. También ha apoyado a productores del Proyecto Especial Chavimochic, donde el uso de biocontroladores ha reducido hasta en 50% la aplicación de agroquímicos en cultivos como maíz y piña.\n\n## Formación Académica\n• Biología - Universidad Nacional de Trujillo\n• Especialización en Entomología - Universidad Nacional de Trujillo\n• Master en Gestión Pública - Universidad Nacional de Trujillo',
      },
    ],
  },
  {
    title: 'Gestión Administrativa',
    members: [
      {
        id: 'antonio-guevara',
        name: 'Antonio Victor Gabriel',
        lastName: 'Guevara Escobar',
        role: 'Gerente de Gestión',
        area: 'Administración',
        image: '/team/antonio-guevara-real.jpg',
        email: 'avguevaraes@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Antonio Víctor Gabriel Guevara Escobar es Gerente de Gestión en AS Labs y se desempeña en áreas vinculadas a administración financiera y de personal, así como en procesos de aislamiento e identificación de microorganismos contaminantes y embriogénesis vegetal. De forma paralela, ocupa una jefatura de departamento en Sparked Host LLC, empresa con sede en Utah, Estados Unidos, en la que interviene en procesos técnicos, soporte remoto, gestión de proyectos digitales y análisis de métricas internas.\n\nCuenta con competencias en biotecnología y microbiología aplicada, análisis de datos, ciencia computacional, comunicación científica, diseño visual, gestión ambiental, seguridad industrial, marketing digital y liderazgo de equipos técnicos. Además, posee dominio del español como lengua materna, inglés americano avanzado, inglés británico intermedio y conocimientos básicos de alemán.\n\n## Formación Académica\n• Especialización en Administración y Gestión de Empresas - The Wharton School\n• Microbiología y Parasitología - Universidad Nacional de Trujillo\n• Inglés Avanzado - Asociación Cultural Peruano Británica\n• Inglés Intermedio - Asociación Peruano Americana El Cultural\n• Gestión Ambiental - Colegio de Ingenieros del Perú\n• Análisis de Datos - IBS International Business School Americas\n• Marketing Digital y Diseño Gráfico Avanzado - Fundación Romero',
      },
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
      },
      {
        id: 'diego-alfaro',
        name: 'Diego Arturo',
        lastName: 'Alfaro del Pozo',
        role: 'Especialista en Recursos Humanos',
        area: 'Recursos Humanos',
        image: '/team/default-profile.jpg',
        email: 'diegoal@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
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
      },
      {
        id: 'hellem-guevara',
        name: 'Hellem',
        lastName: 'Guevara N.',
        role: 'Supervisora de Técnicos',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'higuevaranu@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
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
        role: 'Supervisora de Practicantes',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'melissa@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
      {
        id: 'estrella-silva',
        name: 'Estrella',
        lastName: 'Silva Núñez',
        role: 'Practicante',
        area: 'Prácticas',
        image: '/team/default-profile.jpg',
        email: 'estrellaj@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
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
        bio: 'Biografía por completar',
      },
    ],
  },
  {
    title: 'Control Biológico',
    members: [
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
      },
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
      },
    ],
  },
  {
    title: 'Innovación y Transferencia Tecnológica',
    members: [
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
