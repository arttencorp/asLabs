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
        lastName: 'Escobar A.',
        role: 'Blga. - Gerente General',
        area: 'Gerencia',
        image: '/team/default-profile.jpg',
        email: 'natasha@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
    ],
  },
  {
    title: 'Gestión Administrativa',
    members: [
      {
        id: 'antonio-guevara',
        name: 'Antonio Victor',
        lastName: 'Guevara',
        role: 'Gerente de Gestión',
        area: 'Administración',
        image: '/team/default-profile.jpg',
        email: 'antonio@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
      {
        id: 'luis-guevara',
        name: 'Luis',
        lastName: 'Guevara',
        role: 'Cont. - Contador',
        area: 'Contabilidad',
        image: '/team/default-profile.jpg',
        email: 'luis@aslaboratorios.com',
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
        email: 'hellem@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
      {
        id: 'jurith-aguilar',
        name: 'Jurith',
        lastName: 'Aguilar P.',
        role: 'Líder Técnica',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'jurith@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
      {
        id: 'madeleine-isuiza',
        name: 'Tec. Quím.',
        lastName: 'Madeleine Isuiza F.',
        role: 'Técnica',
        area: 'Técnica',
        image: '/team/default-profile.jpg',
        email: 'madeleine@aslaboratorios.com',
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
        email: 'estrella@aslaboratorios.com',
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
        name: 'Hassan',
        lastName: 'Espinales',
        role: 'Jefe Microbiología Agroindustrial',
        area: 'Microbiología',
        image: '/team/default-profile.jpg',
        email: 'hassan@aslaboratorios.com',
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
        email: 'luis.flores@aslaboratorios.com',
        linkedIn: '#',
        bio: 'Biografía por completar',
      },
    ],
  },
  {
    title: 'Innovación y Transferencia Tecnológica',
    members: [
      {
        id: 'jaime-palomino',
        name: 'Ing.',
        lastName: 'Jaime Palomino Cuenca',
        role: 'Jefe I+T',
        area: 'Innovación',
        image: '/team/default-profile.jpg',
        email: 'jaime@aslaboratorios.com',
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
