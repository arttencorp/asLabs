interface Item {
    codigo?: string
    descripcion?: string
    cantidad?: number
    precioUnitario?: number
    total?: number
}

interface TablaProductosProps {
    items?: Item[]
    subtotal?: number
    impuesto?: number
    total?: number
    esLaboratorio: boolean
    preciosConIGV?: boolean
}

export function TablaProductos({
    items,
    subtotal,
    impuesto,
    total,
    esLaboratorio,
    preciosConIGV
}: TablaProductosProps) {
    return (
        <>
            <table className={`w-full border-collapse text-xs ${esLaboratorio ? "border border-gray-200" : ""}`}>
                <thead>
                    <tr className={`${esLaboratorio ? "bg-blue-600 text-white" : "bg-[#5D9848] text-white"}`}>
                        <th className="w-[50%] p-1.5 text-left">Descripción</th>
                        <th className="p-1.5 text-center">Cantidad</th>
                        <th className="p-1.5 text-right">Precio unitario</th>
                        <th className="p-1.5 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        Array.isArray(items) &&
                        items.map(
                            (
                                item: {
                                    codigo?: string
                                    descripcion?: string
                                    cantidad?: number
                                    precioUnitario?: number
                                    total?: number
                                },
                                index: number
                            ) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 ${esLaboratorio && typeof index === "number" && index % 2 === 0 ? "bg-gray-50" : ""
                                        }`}
                                >
                                    <td className="p-1.5 text-left">{item?.descripcion || ""}</td>
                                    <td className="p-1.5 text-center">{item?.cantidad || 0}</td>
                                    <td className="p-1.5 text-right">S/{(item?.precioUnitario || 0).toFixed(2)}</td>
                                    <td className="p-1.5 text-right">S/{(item?.total || 0).toFixed(2)}</td>
                                </tr>
                            )
                        )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}></td>
                        <td className="p-1.5 text-right font-semibold">Subtotal</td>
                        <td className="p-1.5 text-right">S/{(subtotal || 0).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td className="p-1.5 text-right font-semibold">IGV (18%)</td>
                        <td className="p-1.5 text-right">S/{(impuesto || 0).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}></td>
                        <td className="p-1.5 text-right font-bold">Total</td>
                        <td className="p-1.5 text-right font-bold">S/{(total || 0).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-xs text-right italic pt-1">
                            {preciosConIGV
                                ? "* Los precios unitarios incluyen IGV"
                                : "* Los precios unitarios no incluyen IGV"}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="my-3 h-[1px] w-full bg-gray-300"></div>
        </>
    )
}