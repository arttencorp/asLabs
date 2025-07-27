import Image from "next/image"

interface TestimonialProps {
  quote: string
  name: string
  role: string
  university: string
  image: string
}

const Testimonial = ({ quote, name, role, university, image }: TestimonialProps) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <div className="flex items-start mb-4">
      <div className="text-[#2e7d32] mr-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.303-.406.7-.754 1.19-1.045l-.14-.747c-1.1.305-1.933.982-2.496 2.03-.563 1.05-.846 2.34-.846 3.878 0 .26.05.52.15.762.1.242.25.436.45.58.265.173.6.26 1 .26.44 0 .77-.117.99-.35.224-.233.335-.572.335-1.017 0-.435-.11-.774-.334-1.016-.224-.243-.555-.364-.992-.364h-.073c.008-.98.367-1.667 1.075-2.055.707-.388 1.495-.296 2.362.274.685.47 1.112 1.227 1.285 2.27.082.525.124 1.09.124 1.695 0 .185-.032.318-.097.4-.064.08-.24.125-.526.13-.254 0-.45-.058-.59-.175-.14-.117-.21-.29-.21-.521 0-.136.01-.246.03-.33.02-.084.05-.178.09-.283l-.29-.125c-.112.224-.19.485-.24.784-.05.298-.074.608-.074.93 0 .56.19.872.566.934.38.065.833-.087 1.355-.457.303-.215.52-.406.653-.57l.1.303c-.11.196-.336.48-.684.854-.349.375-.595.57-.738.587l-.456.275c-.396-.03-.636-.173-.723-.426-.086-.253-.13-.676-.13-1.27 0-.605.056-1.093.17-1.464.112-.372.352-.676.72-.91z" />
          <path d="M21.632 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.032.302-.406.7-.754 1.19-1.045l-.14-.747c-1.1.305-1.933.982-2.496 2.03-.563 1.05-.846 2.34-.846 3.878 0 .26.05.52.15.762.1.242.25.436.45.58.265.173.6.26 1 .26.44 0 .77-.117.99-.35.224-.233.335-.572.335-1.017 0-.435-.11-.774-.334-1.016-.224-.243-.555-.364-.992-.364h-.073c.008-.98.367-1.667 1.075-2.055.707-.388 1.495-.296 2.362.274.685.47 1.112 1.227 1.285 2.27.082.525.124 1.09.124 1.695 0 .185-.032.318-.097.4-.064.08-.24.125-.526.13-.254 0-.45-.058-.59-.175-.14-.117-.21-.29-.21-.521 0-.136.01-.246.03-.33.02-.084.05-.178.09-.283l-.29-.125c-.112.224-.19.485-.24.784-.05.298-.074.608-.074.93 0 .56.19.872.566.934.38.065.833-.087 1.355-.457.303-.215.52-.406.653-.57l.1.303c-.11.196-.336.48-.684.854-.349.375-.595.57-.738.587l-.456.275c-.396-.03-.636-.173-.723-.426-.086-.253-.13-.676-.13-1.27 0-.605.056-1.093.17-1.464.112-.372.352-.676.72-.91z" />
        </svg>
      </div>
      <p className="text-[#01283c] italic">{quote}</p>
    </div>
    <div className="flex items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-medium text-[#01283c]">{name}</h4>
        <p className="text-sm text-gray-600">
          {role}, {university}
        </p>
      </div>
    </div>
  </div>
)

export default function StudentTestimonials() {
  const testimonials = [
    {
      quote:
        "Los kits educativos de AS Labs me han permitido realizar prácticas de laboratorio de alta calidad para mi tesis. El descuento para estudiantes de la UNT hizo que fuera mucho más accesible.",
      name: "Carlos Mendoza",
      role: "Estudiante de Biotecnología",
      university: "Universidad Nacional de Trujillo",
      image: "/student-1.png",
    },
    {
      quote:
        "La calidad de los reactivos y el asesoramiento técnico que recibí fue excepcional. Definitivamente recomendaría AS Labs a otros estudiantes que necesiten materiales para sus proyectos.",
      name: "María Fernández",
      role: "Tesista en Microbiología",
      university: "Universidad Nacional Agraria La Molina",
      image: "/student-2.png",
    },
    {
      quote:
        "Gracias a los medios de cultivo de AS Labs pude completar mi proyecto de investigación en tiempo récord. El servicio de entrega rápida y los precios especiales para estudiantes hacen toda la diferencia.",
      name: "Javier Rodríguez",
      role: "Estudiante de Biología",
      university: "Universidad Nacional de Trujillo",
      image: "/student-3.png",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#01283c] mb-4">Lo que dicen nuestros estudiantes</h2>
        <p className="text-center text-base text-[#01283c] mb-12 max-w-3xl mx-auto">
          Conoce las experiencias de estudiantes que han utilizado nuestros productos y servicios para sus proyectos
          académicos y de investigación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
