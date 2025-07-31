interface MetodosPagoProps {
  esLaboratorio: boolean
}

export function MetodosPago({ esLaboratorio }: MetodosPagoProps) {
  return (
    <>
      <div className={`mt-4 ${esLaboratorio ? "bg-blue-50" : "bg-[#f0f7ed]"} p-3 rounded-md text-xs`}>
          <h3 className="font-bold text-sm">Métodos de Pago</h3>
          <p>Realizar su depósito a la Cuenta Corriente de AS LABORATORIOS CONTROL BIOLOGICO S.A.C.</p>
          <p>Banco de Crédito del Perú BCP</p>
          <p>Cuenta corriente: 570 1149166-0-11</p>
          <p>CCI: 002-57-000-1149-1660-1101</p>
        </div>
      
      <div className="mt-6 h-1.5 w-full bg-[#5D9848] print:h-1.5"></div>
    </>
  )
}