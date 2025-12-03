'use client';

import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Title from '@/components/ui/title/Title';
import React, { useState } from 'react';
import {
  LuCalendar,
  LuFileText,
  LuFlaskConical,
  LuHistory,
  LuHouse,
  LuPill,
  LuPlus,
  LuSave,
  LuStethoscope,
  LuTrash2,
  LuUser,
} from 'react-icons/lu';
import { ResponseCita } from '@/interface/response.interface';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/Textarea';
import Select from '@/components/ui/select/Select';
import { useConsultaOptions } from '../hooks/useConsultaOptions';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { ConsultaSchema, ConsultaSchemaType } from '@/schemas/atencion/consulta.schema';
import { useMutation } from '@/hooks/useMutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';
import { env } from '@/config/env';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

interface ConsultaViewProps {
  cita: ResponseCita;
}

export default function ConsultaView({ cita }: ConsultaViewProps) {
  const { medicinas } = useConsultaOptions();
  const router = useRouter();
  const { token } = useAuth();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ConsultaSchema),
    defaultValues: {
      receta: {
        recetasMedicinas: [],
      },
      diagnosticos: [],
      laboratorios: [],
    },
  });

  const {
    fields: recetaFields,
    append: appendReceta,
    remove: removeReceta,
  } = useFieldArray({
    control,
    name: 'receta.recetasMedicinas',
  });

  const {
    fields: diagnosticoFields,
    append: appendDiagnostico,
    remove: removeDiagnostico,
  } = useFieldArray({
    control,
    name: 'diagnosticos',
  });

  const {
    fields: laboratorioFields,
    append: appendLaboratorio,
    remove: removeLaboratorio,
  } = useFieldArray({
    control,
    name: 'laboratorios',
  });

  // Temporary states for adding items
  const [tempMedicina, setTempMedicina] = useState('');
  const [tempDosis, setTempDosis] = useState('');
  const [tempIndicacion, setTempIndicacion] = useState('');

  const [tempDiagnosticoNombre, setTempDiagnosticoNombre] = useState('');
  const [tempDiagnosticoDesc, setTempDiagnosticoDesc] = useState('');

  const [tempLaboratorioNombre, setTempLaboratorioNombre] = useState('');

  const [searchMedicina, setSearchMedicina] = useState('');

  const filteredMedicinas = medicinas.filter((m) =>
    m.nombre.toLowerCase().includes(searchMedicina.toLowerCase()),
  );

  const handleAddMedicina = () => {
    if (!tempMedicina || !tempDosis || !tempIndicacion) {
      toast.error('Complete todos los campos de la medicina');
      return;
    }
    appendReceta({
      medicinaId: Number(tempMedicina),
      dosis: tempDosis,
      indicacion: tempIndicacion,
    });
    setTempMedicina('');
    setTempDiagnosticoNombre('');
    setTempDiagnosticoDesc('');
  };

  const handleAddDiagnostico = () => {
    if (!tempDiagnosticoNombre || !tempDiagnosticoDesc) {
      toast.error('Complete todos los campos del diagnóstico');
      return;
    }
    appendDiagnostico({
      nombre: tempDiagnosticoNombre,
      descripcion: tempDiagnosticoDesc,
    });
    setTempDiagnosticoNombre('');
    setTempDiagnosticoDesc('');
  };

  const handleAddLaboratorio = () => {
    if (!tempLaboratorioNombre) {
      toast.error('Ingrese el nombre del laboratorio');
      return;
    }
    appendLaboratorio({
      nombre: tempLaboratorioNombre,
      estado: 'Pendiente',
    });
    setTempLaboratorioNombre('');
  };

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (data: ConsultaSchemaType) => {
      const res = await axios.patch(`${env.url_api}/cita/completar/${cita.citaId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Consulta finalizada correctamente');
      router.push('/atencion');
    },
    onError: () => {
      toast.error('Error al finalizar la consulta');
    },
  });

  const onSubmit = (data: ConsultaSchemaType) => {
    if (!data.diagnosticos || data.diagnosticos.length === 0) {
      toast.error('Debe agregar al menos un diagnóstico');
      return;
    }
    mutate(data);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden p-5">
      <Breadcrums
        items={[
          { title: 'Inicio', icon: <LuHouse />, href: '/' },
          { title: 'Atención', href: '/atencion' },
          { title: 'Consulta en curso', href: '#' },
        ]}
      />

      <div className="mt-2 mb-4 flex items-center justify-between">
        <Title
          title="Consulta en curso"
          description={`Atendiendo a ${cita.paciente.nombres} ${cita.paciente.apellido_paterno}`}
          icon={<LuStethoscope size={20} />}
        />
        <div className="flex gap-2">
          <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">
            <LuHistory /> Historial
          </Button>
          <Button className="bg-ob-teal text-ob-black-4" onClick={handleSubmit(onSubmit)}>
            <LuSave /> {isSubmitting ? 'Finalizando...' : 'Finalizar Consulta'}
          </Button>
        </div>
      </div>

      <div className="grid h-full grid-cols-12 gap-6 overflow-hidden">
        {/* Left Sidebar: Patient Info */}
        <div className="col-span-3 flex h-full flex-col gap-4 overflow-y-auto pb-20">
          <InfoContainer className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-ob-teal flex size-12 items-center justify-center rounded-full text-white">
                <LuUser size={24} />
              </div>
              <div>
                <h3 className="text-ob-white font-medium">
                  {cita.paciente.nombres} {cita.paciente.apellido_paterno}
                </h3>
                <p className="text-ob-gray-2 text-sm">DNI: {cita.paciente.dni}</p>
              </div>
            </div>
            <div className="border-ob-gray-4 border-t pt-3">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-ob-gray-2">Edad:</span>
                <span className="text-ob-white text-right">24 años</span> {/* Placeholder */}
                <span className="text-ob-gray-2">Sexo:</span>
                <span className="text-ob-white text-right">{cita.paciente.sexo}</span>
                <span className="text-ob-gray-2">Teléfono:</span>
                <span className="text-ob-white text-right">{cita.paciente.telefono}</span>
              </div>
            </div>
          </InfoContainer>

          <InfoContainer title="Signos Vitales (Ref)">
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-ob-gray-2">PA:</span>{' '}
              <span className="text-ob-white text-right">120/80</span>
              <span className="text-ob-gray-2">FC:</span>{' '}
              <span className="text-ob-white text-right">78 lpm</span>
              <span className="text-ob-gray-2">Temp:</span>{' '}
              <span className="text-ob-white text-right">36.6 °C</span>
              <span className="text-ob-gray-2">Peso:</span>{' '}
              <span className="text-ob-white text-right">65 kg</span>
            </div>
          </InfoContainer>
        </div>

        {/* Center: Forms */}
        <div className="col-span-6 flex h-full flex-col gap-4 overflow-y-auto pb-20">
          {/* Diagnosticos */}
          <InfoContainer title="Diagnósticos">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-2">
                <Input
                  label="Nombre del diagnóstico"
                  placeholder="Nombre del diagnóstico"
                  value={tempDiagnosticoNombre}
                  onChange={(e) => setTempDiagnosticoNombre(e.target.value)}
                />
                <TextArea
                  label="Descripción"
                  placeholder="Descripción"
                  rows={2}
                  value={tempDiagnosticoDesc}
                  onChange={(e) => setTempDiagnosticoDesc(e.target.value)}
                />
                <Button
                  className="bg-ob-black-3 text-ob-white border-ob-gray-4 border"
                  onClick={handleAddDiagnostico}
                >
                  <LuPlus /> Añadir Diagnóstico
                </Button>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                {diagnosticoFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-ob-black-2 border-ob-gray-4 flex items-start justify-between rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-ob-white font-medium">{field.nombre}</p>
                      <p className="text-ob-gray-2 text-sm">{field.descripcion}</p>
                    </div>
                    <button
                      onClick={() => removeDiagnostico(index)}
                      className="text-ob-red-5 hover:text-red-400"
                    >
                      <LuTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </InfoContainer>

          {/* Recetas */}
          <InfoContainer title="Receta Médica">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3">
                  <Select
                    placeholder="Buscar medicina..."
                    options={filteredMedicinas.map((m) => ({
                      label: m.nombre || '',
                      value: m.medicinaId.toString(),
                    }))}
                    value={
                      tempMedicina
                        ? {
                            label:
                              medicinas.find((m) => m.medicinaId.toString() === tempMedicina)
                                ?.nombre || '',
                            value: tempMedicina,
                          }
                        : undefined
                    }
                    onChange={(opt) => setTempMedicina(opt.value)}
                    search={searchMedicina}
                    onSearch={setSearchMedicina}
                  />
                </div>
                <Input
                  label="Dosis"
                  placeholder="Dosis (ej. 500mg)"
                  value={tempDosis}
                  onChange={(e) => setTempDosis(e.target.value)}
                />
                <Input
                  label="Indicación"
                  placeholder="Indicación"
                  value={tempIndicacion}
                  onChange={(e) => setTempIndicacion(e.target.value)}
                />
                <Button
                  className="bg-ob-black-3 text-ob-white border-ob-gray-4 border"
                  onClick={handleAddMedicina}
                >
                  <LuPlus /> Añadir
                </Button>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                {recetaFields.map((field, index) => {
                  const med = medicinas.find((m) => m.medicinaId === field.medicinaId);
                  return (
                    <div
                      key={field.id}
                      className="bg-ob-black-2 border-ob-gray-4 flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="text-ob-white font-medium">
                          {med?.nombre || 'Medicina desconocida'}
                        </p>
                        <p className="text-ob-gray-2 text-sm">
                          {field.dosis} - {field.indicacion}
                        </p>
                      </div>
                      <button
                        onClick={() => removeReceta(index)}
                        className="text-ob-red-5 hover:text-red-400"
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  );
                })}
              </div>
              <TextArea
                label="Detalle general de la receta"
                placeholder="Indicaciones generales..."
                {...register('receta.detalle')}
              />
            </div>
          </InfoContainer>
        </div>

        {/* Right Sidebar: Labs & Actions */}
        <div className="col-span-3 flex h-full flex-col gap-4 overflow-y-auto pb-20">
          <InfoContainer title="Laboratorios">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  label="Nombre del examen"
                  placeholder="Nombre del examen"
                  value={tempLaboratorioNombre}
                  onChange={(e) => setTempLaboratorioNombre(e.target.value)}
                />
                <Button
                  className="bg-ob-black-3 text-ob-white border-ob-gray-4 border px-3"
                  onClick={handleAddLaboratorio}
                >
                  <LuPlus />
                </Button>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                {laboratorioFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="bg-ob-black-2 border-ob-gray-4 flex items-center justify-between rounded-lg border p-2"
                  >
                    <span className="text-ob-white text-sm">{field.nombre}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-ob-orange bg-ob-orange/10 rounded-full px-2 py-0.5 text-xs">
                        Pendiente
                      </span>
                      <button
                        onClick={() => removeLaboratorio(index)}
                        className="text-ob-red-5 hover:text-red-400"
                      >
                        <LuTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </InfoContainer>
        </div>
      </div>
    </div>
  );
}
