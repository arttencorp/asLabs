import type { ResearchProjectDetail } from "@/data/research-project-details"

export default function ResearchProjectStructuredData({ project }: { project: ResearchProjectDetail }) {
  const url = `https://aslaboratorios.com/research/${project.slug}`
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchProject",
        name: project.title,
        description: project.summary,
        url,
        image: `https://aslaboratorios.com${project.heroImage}`,
        inLanguage: "es-PE",
        about: [project.line, project.scientificFocus],
        member: project.team.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.role,
        })),
        parentOrganization: {
          "@type": "Organization",
          name: "AS Laboratorios",
          url: "https://aslaboratorios.com",
          logo: {
            "@type": "ImageObject",
            url: "https://aslaboratorios.com/Frame23.png",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://aslaboratorios.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Investigación",
            item: "https://aslaboratorios.com/research",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.shortTitle,
            item: url,
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  )
}
