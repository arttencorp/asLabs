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