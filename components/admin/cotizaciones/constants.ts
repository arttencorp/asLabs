export const productosPreexistentes = [
  {
    id: "ASWG",
    descripcion: "Material Vegetal Banano Código ASWG",
    precioUnitario: 4.5,
    certificados: [
      {
        titulo: "Negativo a la presencia de Bacterias Fitopatógenas",
        codigo: "2023114632010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114644-2023-AG-SENASA-OCDP-UCDSV",
        detalle: [
          "MET-UCDSV/BM-22: FUSARIUM OXYSPORUM F. SP CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR CONVENCIONAL - REGIÓN IGS",
          "MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE  CON PCR CONVENCIONAL - REGIÓN IGS",
          "MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR CONVENCIONAL PRIMERS LI",
        ],
      },
      {
        titulo: "Negativo a la presencia de Ralstonia solanacearum",
        codigo: "2023114630010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114535-2023-AG-SENASA-OCDP-UCDSV",
        detalle: [
          "MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR CONVENCIONAL PRIMERS LI",
        ],
      },
      {
        titulo: "Negativo a la presencia de banana Streak virus.",
        codigo: "2020109320010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 100341-2021-AG-SENASA-OCDP-UCDSV",
        detalle: ["MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL"],
      },
    ],
    fichaTecnica: {
      titulo: "FICHA TÉCNICA BANANO CAVENDISH - CLON WILLIAMS",
      descripcion: "Información técnica del producto Banano Cavendish - Clon Williams (CÓDIGO: WG)",
      archivo: "/fichas/ficha-tecnica-aswg.png",
    },
    tipoProducto: "vegetal",
  },
  {
    id: "ASC5",
    descripcion: "Material Vegetal Banano Código ASC5",
    precioUnitario: 4.5,
    certificados: [
      {
        titulo: "Negativo a la presencia de Fusarium oxysporum f.sp. cubense Raza 4 Tropical",
        codigo: "2023114627010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114531-2023-AG-SENASA-OCDP-UCDSV",
        detalle: [
          "MET-UCDSV/BM-22: FUSARIUM OXYSPORUM F. SP CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR CONVENCIONAL - REGIÓN IGS",
        ],
      },
      {
        titulo: "Negativo a la presencia de Fusarium oxysporum f.sp. cubense Raza 4 Tropical",
        codigo: "2023114627010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114531-2023-AG-SENASA-OCDP-UCDSV",
        detalle: [
          "MET-UCDSV/BM-102: FUSARIUM OXYSPORUM F.SP. CUBENSE RAZA 4 TROPICAL (FOC R4T) CON PCR CONVENCIONAL PRIMERS LI",
        ],
      },
      {
        titulo: "Negativo a la presencia de Bacterias Fitopatógenas",
        codigo: "2023114632010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114644-2023-AG-SENASA-OCDP-UCDSV",
        detalle: ["MET-UCDSV/BAC-005: DIAGNÓSTICO DE BACTERIAS FITOPATÓGENAS EN MATERIAL VEGETAL"],
      },
      {
        titulo: "Negativo a la presencia de Ralstonia solanacearum",
        codigo: "2023114632010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 114644-2023-AG-SENASA-OCDP-UCDSV",
        detalle: ["MET-UCDSV/BAC-004: BACTERIAS FITOPATÓGENAS POR SEROLOGÍA EN MATERIAL VEGETAL"],
      },
      {
        titulo: "Negativo a la presencia de banana Streak virus.",
        codigo: "2020109321010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 100342-2021-AG-SENASA-OCDP-UCDSV",
        detalle: ["MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL"],
      },
      {
        titulo: "Negativo a la presencia de banana Streak virus.",
        codigo: "2020109319010001",
        tipo: "PLANTA COMPLETA",
        informe: "Nº 100340-2021-AG-SENASA-OCDP-UCDSV",
        detalle: ["MET-UCDSV/VIR-002: DAS ELISA PARA DETECCIÓN DE VIRUS FITOPATÓGENO EN MATERIAL VEGETAL"],
      },
    ],
    fichaTecnica: {
      titulo: "FICHA TÉCNICA BANANO CAVENDISH - CLON VALERY",
      descripcion: "Información técnica del producto Banano Cavendish - Clon Valery (CÓDIGO: ASC5)",
      archivo: "/fichas/ficha-tecnica-asc5.png",
    },
    tipoProducto: "vegetal",
  },
  {
    id: "LAB",
    descripcion: "Material/Instrumento de laboratorio",
    precioUnitario: 0,
    tipoProducto: "laboratorio",
  },
]

export const terminosCondicionesDefault = 
  "Las plantas meristemáticas son producidas en nuestro laboratorio, procedentes de nuestra parcela de plantas madre de procedencia nacional.\n\nPRESENTACIÓN DEL PRODUCTO:\nPlantas de 20 a 25 cm de altura desde la base de bolsa.\nPlantas libres de enfermedades y patógenos.\nCertificado de prueba de virus";

export const terminosCondicionesLaboratorio = 
  "Términos y condiciones para materiales e instrumentos de laboratorio:\n\n" +
  "1. Los precios incluyen IGV.\n" +
  "2. Garantía según especificaciones del fabricante.\n" +
  "3. Soporte técnico disponible para consultas sobre el uso de los equipos.\n" +
  "4. Los materiales cumplen con estándares de calidad para uso en laboratorio.";

export const certificadosDefault = 
  "- Certificado de calidad genética\n- Certificado de sanidad vegetal\n- Certificado libre de virus";