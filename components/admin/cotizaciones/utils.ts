export function generarNumeroCotizacion(): string {
  const año = new Date().getFullYear();
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return `${numero}-${año}`;
}

export function calcularFechaVencimiento(dias: number): string {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().split("T")[0];
}

export function numeroATexto(numero: number): string {
  if (typeof numero !== "number") {
    return "cero y 00/100";
  }

  const unidades = [
    "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete",
    "dieciocho", "diecinueve"
  ];
  
  const decenas = [
    "", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta",
    "ochenta", "noventa"
  ];
  
  const centenas = [
    "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
    "seiscientos", "setecientos", "ochocientos", "novecientos"
  ];

  if (numero === 0) return "cero";

  const entero = Math.floor(numero);
  const decimal = Math.round((numero - entero) * 100);

  let resultado = "";

  if (entero >= 1000) {
    const miles = Math.floor(entero / 1000);
    resultado += miles === 1 ? "mil " : numeroATexto(miles) + " mil ";
    numero = entero % 1000;
  } else {
    numero = entero;
  }

  if (numero >= 100) {
    resultado += centenas[Math.floor(numero / 100)] + " ";
    numero = numero % 100;
  }

  if (numero >= 20) {
    resultado += decenas[Math.floor(numero / 10)];
    if (numero % 10 !== 0) {
      resultado += " y " + unidades[numero % 10];
    }
  } else {
    resultado += unidades[numero];
  }

  resultado = resultado.trim();

  if (decimal > 0) {
    resultado += ` y ${decimal}/100`;
  } else {
    resultado += " y 00/100";
  }

  return resultado;
}

export function generarCertificadosTexto(certificados: any[]): string {
  if (!certificados || certificados.length === 0) return "";

  return certificados
    .map(
      (cert) =>
        `${cert.titulo}\n` +
        `CÓDIGO DE MUESTRA: ${cert.codigo}\n` +
        `TIPO: ${cert.tipo}\n` +
        `INFORME DE ENSAYO: ${cert.informe}\n` +
        `${cert.detalle.join("\n")}\n`
    )
    .join("\n");
}