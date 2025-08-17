import { useState, useEffect, useCallback } from 'react'
import { obtenerPersonas, crearPersona, actualizarPersona, eliminarPersona } from '@/lib/supabase'
import { useBaseCrud } from '@/hooks/useBaseCrud'
import { CLIENTE_FORM_INITIAL } from '../constants'
import { validateClienteForm } from '../utils'
import type { ClienteForm, ClientesStats } from '../types'
import type { ClientePersona } from '@/types/database'
import type { TipoCliente } from '@/constants'

export function useClientes() {
  const [mounted, setMounted] = useState(false)

  // Usar useBaseCrud para la funcionalidad CRUD básica
  const baseCrud = useBaseCrud<ClientePersona, ClienteForm>({
    fetchFn: obtenerPersonas,
    createFn: crearPersona,
    updateFn: async (id: string, data: Partial<ClienteForm>) => {
      return await actualizarPersona(id, data as ClienteForm)
    },
    deleteFn: eliminarPersona,
    initialForm: CLIENTE_FORM_INITIAL,
    validateFn: validateClienteForm,
    getIdFn: (cliente) => cliente.per_id_int
  })

  // Estados y funciones desde useBaseCrud
  const {
    items: clientes,
    loading,
    error,
    success,
    form: clienteForm,
    editingItem: editingCliente,
    isDialogOpen,
    setForm: setClienteForm,
    setError,
    setIsDialogOpen,
    setEditingItem: setEditingCliente,
    loadData,
    handleCreate: handleCreateCliente,
    handleUpdate: handleUpdateCliente,
    handleDelete: handleDeleteCliente,
    showSuccess
  } = baseCrud

  useEffect(() => {
    setMounted(true)
  }, [])

  // Funciones específicas de clientes
  const resetForm = useCallback(() => {
    setClienteForm(CLIENTE_FORM_INITIAL)
    setEditingCliente(null)
  }, [setClienteForm, setEditingCliente])

  const openEditDialog = useCallback((cliente: ClientePersona) => {
    setEditingCliente(cliente)
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
      tipo: cliente.tipo as TipoCliente,
      per_nat_dni_int: cliente.persona_natural?.per_nat_dni_int ?? null,
      per_nat_nomb_vac: cliente.persona_natural?.per_nat_nomb_vac ?? null,
      per_nat_apell_vac: cliente.persona_natural?.per_nat_apell_vac ?? null,
      per_jurd_ruc_int: cliente.persona_juridica?.per_jurd_ruc_int ?? null,
      per_jurd_razSocial_vac: cliente.persona_juridica?.per_jurd_razSocial_vac ?? null
    })
    setIsDialogOpen(true)
  }, [setEditingCliente, setClienteForm, setIsDialogOpen])

  const openCreateDialog = useCallback(() => {
    resetForm()
    setIsDialogOpen(true)
  }, [resetForm, setIsDialogOpen])

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

    // Acciones (usando funciones de useBaseCrud)
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