import { useState, useEffect } from 'react'
import { obtenerPersonas, crearPersona, actualizarPersona, eliminarPersona } from '@/lib/supabase'
import { CLIENTE_FORM_INITIAL } from '../constants'
import { validateClienteForm } from '../utils'
import { formatDate } from '@/utils'
import type { Cliente, ClienteForm, ClientesStats } from '../types'

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Estados del formulario
  const [clienteForm, setClienteForm] = useState<ClienteForm>(CLIENTE_FORM_INITIAL)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      const clientesData = await obtenerPersonas()
      setClientes(clientesData)
      if (mounted) {
        showSuccess(`Datos cargados: ${clientesData.length} clientes`)
      }
    } catch (error: any) {
      setError(error.message || 'Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(null), 5000)
  }

  const resetForm = () => {
    setClienteForm(CLIENTE_FORM_INITIAL)
    setEditingCliente(null)
  }

  const handleCreateCliente = async () => {
    const errors = validateClienteForm(clienteForm)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const nuevoCliente = await crearPersona(clienteForm)
      if (nuevoCliente) {
        setClientes([nuevoCliente, ...clientes])
        showSuccess(`Cliente creado exitosamente`)
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error: any) {
      console.error('Error creando cliente:', error)
      setError(error.message || 'Error al crear el cliente')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCliente = async () => {
    if (!editingCliente) return

    const errors = validateClienteForm(clienteForm)
    if (errors.length > 0) {
      setError(errors.join(', '))
      return
    }

    setLoading(true)
    setError(null)

    try {
      const clienteActualizado = await actualizarPersona(editingCliente.per_id_int, clienteForm)
      if (clienteActualizado) {
        setClientes(clientes.map((c) => 
          c.per_id_int === editingCliente.per_id_int ? clienteActualizado : c
        ))
        showSuccess(`Cliente actualizado exitosamente`)
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error: any) {
      console.error('Error actualizando cliente:', error)
      setError(error.message || 'Error al actualizar el cliente')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCliente = async (id: string) => {
    const cliente = clientes.find((c) => c.per_id_int === id)
    if (!cliente) return

    if (!confirm(`¿Estás seguro de eliminar este cliente?`)) return

    setLoading(true)
    setError(null)

    try {
      await eliminarPersona(id)
      setClientes(clientes.filter((c) => c.per_id_int !== id))
      showSuccess(`Cliente eliminado exitosamente`)
    } catch (error: any) {
      console.error('Error eliminando cliente:', error)
      setError(error.message || 'Error al eliminar el cliente')
    } finally {
      setLoading(false)
    }
  }

  const openEditDialog = (cliente: Cliente) => {
    setEditingCliente(cliente)
    // Mapear datos del cliente al formulario
    setClienteForm({
      per_nom_contac_vac: cliente.per_nom_contac_vac,
      per_email_vac: cliente.per_email_vac,
      per_telef_int: cliente.per_telef_int,
      per_direc_vac: cliente.per_direc_vac,
      per_cultivo_vac: cliente.per_cultivo_vac,
      per_cantidad_int: cliente.per_cantidad_int,
      per_fec_prob_dt: cliente.per_fec_prob_dt,
      per_hec_disp_int: cliente.per_hec_disp_int,
      per_hec_inst_int: cliente.per_hec_inst_int,
      per_observaciones_vac: cliente.per_observaciones_vac,
      tipo: cliente.tipo,
      per_nat_dni_int: cliente.persona_natural?.per_nat_dni_int || null,
      per_nat_nomb_vac: cliente.persona_natural?.per_nat_nomb_vac || '',
      per_nat_apell_vac: cliente.persona_natural?.per_nat_apell_vac || '',
      per_jurd_ruc_int: cliente.persona_juridica?.per_jurd_ruc_int || null,
      per_jurd_razSocial_vac: cliente.persona_juridica?.per_jurd_razSocial_vac || ''
    })
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Calcular estadísticas mejoradas
  const stats: ClientesStats = {
    totalClientes: clientes.length,
    clientesNaturales: clientes.filter(c => c.tipo === 'natural').length,
    clientesJuridicos: clientes.filter(c => c.tipo === 'juridica').length,
    nuevosEsteMes: clientes.filter(c => {
      const fechaActual = new Date()
      const inicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1)
      return new Date(c.per_created_at_dt) >= inicioMes
    }).length
  }

  return {
    // Estados
    clientes,
    loading,
    mounted,
    error,
    success,
    clienteForm,
    editingCliente,
    isDialogOpen,
    stats,

    // Acciones
    setClienteForm,
    setError,
    setIsDialogOpen,
    loadData,
    handleCreateCliente,
    handleUpdateCliente,
    handleDeleteCliente,
    openEditDialog,
    openCreateDialog,
    resetForm
  }
}