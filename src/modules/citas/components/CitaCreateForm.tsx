'use client';

import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import InputDate from '@/components/ui/input-date/InputDate';
import Search from '@/components/ui/search/Search';
import Select from '@/components/ui/select/Select';
import TextArea from '@/components/ui/textarea/Textarea';
import { useCreateCitaOptions } from '../hooks/useCreateCitaOptions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CitaSchema, CitaSchemaType } from '@/schemas/citas/cita.schema';
import { LuArrowLeft, LuPlus, LuUser } from 'react-icons/lu';
import { useState } from 'react';
import axios from 'axios';
import { Response, ResponseCita, ResponsePaciente } from '@/interface/response.interface';
import { env } from '@/config/env';
import { toast } from 'sonner';
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/context/AuthContext';

export default function CitaCreateForm() {
  const { personal, turnos, programas } = useCreateCitaOptions();
  const [patientDni, setPatientDni] = useState('');
  const [patientData, setPatientData] = useState<ResponsePaciente | null>(null);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CitaSchemaType>({
    resolver: zodResolver(CitaSchema),
  });

  const searchPatient = async (dni: string) => {
    if (dni.length !== 8) return;
    try {
      const res = await axios.get<Response<ResponsePaciente>>(`${env.url_api}/pacientes/${dni}`);
      if (res.data.data) {
        setPatientData(res.data.data);
        setValue('pacienteId', res.data.data.pacienteId);
        toast.success('Paciente encontrado');
      }
    } catch (error) {
      setPatientData(null);
      setValue('pacienteId', 0); // Reset or handle error
      toast.error('Paciente no encontrado');
    }
  };
  const { token } = useAuth();
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (data: CitaSchemaType) => {
      const res = await axios.post(
        `${env.url_api}/cita`,
        {
          ...data,
          pacienteId: Number(data.pacienteId),
          personalId: Number(data.personalId),
          programaId: Number(data.programaId),
          turnoId: Number(data.turnoId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('Cita registrada correctamente');
      router.push('/citas');
    },
    onError: () => {
      toast.error('Error al registrar la cita');
    },
  });

  const onSubmit = (data: CitaSchemaType) => {
    mutate(data);
  };

  const getPersonalLabel = (id: string) => {
    const p = personal.find((p) => p.personalId.toString() === id);
    return p ? `${p.nombre} ${p.apellidoPaterno}` : '';
  };

  const getTurnoLabel = (id: string) => {
    const t = turnos.find((t) => t.turnoId.toString() === id);
    return t ? `${t.horaInicio} - ${t.horaFin}` : '';
  };

  const getProgramaLabel = (id: string) => {
    const p = programas.find((p) => p.programaId.toString() === id);
    return p ? p.nombre : '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
      <InfoContainer>
        <span>Informacion Básica</span>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-y-1">
            <span className="text-ob-gray-2 text-sm">Paciente (DNI):</span>
            <Search
              placeholder="Buscar por DNI (8 dígitos)"
              value={patientDni}
              onSearch={(val) => {
                setPatientDni(val);
                if (val.length === 8) {
                  searchPatient(val);
                } else {
                  setPatientData(null);
                }
              }}
            />
            {patientData && (
              <div className="bg-ob-black-2 mt-2 flex items-center gap-2 rounded-lg p-2">
                <div className="bg-ob-teal flex size-8 items-center justify-center rounded-full text-white">
                  <LuUser />
                </div>
                <div className="flex flex-col">
                  <span className="text-ob-white text-sm font-medium">
                    {patientData.nombres} {patientData.apellido_paterno}
                  </span>
                  <span className="text-ob-gray-2 text-xs">DNI: {patientData.dni}</span>
                </div>
              </div>
            )}
            {errors.pacienteId && (
              <span className="text-sm text-red-500">{errors.pacienteId.message}</span>
            )}
          </div>

          <Controller
            control={control}
            name="personalId"
            render={({ field }) => (
              <Select
                label="Obstetra"
                placeholder="Seleccione Obstetra"
                value={
                  field.value
                    ? {
                        value: field.value,
                        label: getPersonalLabel(field.value),
                      }
                    : undefined
                }
                onChange={(opt) => field.onChange(opt.value)}
                options={personal.map((p) => ({
                  label: `${p.nombre} ${p.apellidoPaterno}`,
                  value: p.personalId.toString(),
                }))}
                error={errors.personalId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="fecha"
            render={({ field }) => (
              <InputDate
                label="Fecha"
                id="fecha"
                value={field.value ? new Date(field.value) : undefined}
                onChange={(date) => field.onChange(date.toISOString())}
                error={errors.fecha?.message}
                className={{ label: 'text-sm' }}
              />
            )}
          />

          <Controller
            control={control}
            name="turnoId"
            render={({ field }) => (
              <Select
                label="Turno"
                placeholder="Seleccione Turno"
                value={
                  field.value
                    ? {
                        value: field.value,
                        label: getTurnoLabel(field.value),
                      }
                    : undefined
                }
                onChange={(opt) => field.onChange(opt.value)}
                options={turnos.map((t) => ({
                  label: `${t.horaInicio} - ${t.horaFin}`,
                  value: t.turnoId.toString(),
                }))}
                error={errors.turnoId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="programaId"
            render={({ field }) => (
              <Select
                label="Programa"
                placeholder="Seleccione Programa"
                value={
                  field.value
                    ? {
                        value: field.value,
                        label: getProgramaLabel(field.value),
                      }
                    : undefined
                }
                onChange={(opt) => field.onChange(opt.value)}
                options={programas.map((p) => ({
                  label: p.nombre,
                  value: p.programaId.toString(),
                }))}
                error={errors.programaId?.message}
              />
            )}
          />

          <TextArea
            label="Notas (opcional)"
            placeholder="Instrucciones para la cita"
            className={{ main: 'col-start-1 col-end-3' }}
            rows={3}
            {...register('nota')}
          />
        </div>
      </InfoContainer>

      <div className="flex items-center justify-end gap-x-3">
        <ButtonLink className="border-ob-gray border" href="/citas">
          <LuArrowLeft size={18} />
          Cancelar
        </ButtonLink>
        <Button className="text-ob-white bg-ob-blue" type="submit" disabled={isSubmitting}>
          <LuPlus size={18} />
          Registrar Cita
        </Button>
      </div>
    </form>
  );
}
