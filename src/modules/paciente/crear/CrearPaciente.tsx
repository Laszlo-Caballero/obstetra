"use client";
import Button from "@/components/ui/button/Button";
import InputDate from "@/components/ui/input-date/InputDate";
import Input from "@/components/ui/input/input";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Modal from "@/components/ui/modal/Modal";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import TextArea from "@/components/ui/textarea/Textarea";
import {
  PacienteSchema,
  PacienteType,
} from "@/schemas/paciente/paciente.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  LuCalendar,
  LuIdCard,
  LuMapPin,
  LuPhone,
  LuSave,
  LuSearch,
  LuUser,
  LuX,
} from "react-icons/lu";
import { parse } from "date-fns";
import { useMutation } from "@/hooks/useMutation";
import {
  ResponsePersona,
  ResponseReniec,
} from "@/interface/response.interface";
import axios from "axios";
import { env } from "@/config/env";
import { toast } from "sonner";
import { url } from "inspector";

interface CrearPacienteProps {
  onClose?: () => void;
}

interface BuscarDNIResponse {
  dni: string;
}

export default function CrearPaciente({ onClose }: CrearPacienteProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(PacienteSchema),
  });

  console.log({ errors });

  const onSubmit = (data: PacienteType) => {
    console.log(data);
  };

  const { mutate: mutateCreate } = useMutation<PacienteType, ResponsePersona>({
    mutationFn: async (data, url_api) => {
      const envio = await axios.post(`${url_api}/pacientes`, data);
      return envio.data;
    },
    onSuccess: () => {
      console.log("Envio exitoso");
    },
    onError: (error) => {
      console.error("Error en el envio");
    },
  });

  const { mutate } = useMutation<BuscarDNIResponse, ResponseReniec>({
    mutationFn: async (data) => {
      const response = await axios.get(`${env.api_reniec}/reniec/${data.dni}`);
      return response.data;
    },
    onSuccess(data) {
      const { data: persona } = data;
      setValue("dni", persona.dni);
      setValue("nombres", persona.nombres);
      setValue("apellido_paterno", persona.apellidoPaterno);
      setValue("apellido_materno", persona.apellidoMaterno);
      setValue(
        "fecha_nacimiento",
        parse(persona.fechaNacimiento, "dd/MM/yyyy", new Date())
          .toISOString()
          .split("T")[0]
      );
      setValue("sexo", persona.sexo);
      setValue("direccion", persona.direccion);
      setValue("departamento", persona.departamento);
      setValue("provincia", persona.provincia);
      setValue("distrito", persona.distrito);
      toast.success("Datos cargados correctamente");
    },
    onError() {
      toast.error("No se encontraron datos para el DNI ingresado");
    },
  });

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle title="Crear paciente" badge="Editar Estado">
            <LuUser size={20} />
          </ModalTitle>
          <CloseButton>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </ModalHeader>
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="flex gap-x-2">
            <Input
              label="Documento de Identidad"
              id="dni"
              placeholder="123456789"
              icon={<LuIdCard size={18} />}
              className={{ input: "placeholder: font-light" }}
              {...register("dni")}
              error={errors.dni?.message}
            />
            <Button
              type="button"
              className="bg-ob-teal self-end"
              onClick={() => {
                mutate({ dni: watch("dni") });
              }}
            >
              <LuSearch size={18} className="text-white" />
            </Button>
          </div>
          <Input
            label="Nombres"
            id="nombre"
            placeholder="Ñepito"
            icon={<LuIdCard size={18} />}
            className={{ input: "placeholder: font-light" }}
            {...register("nombres")}
            error={errors.nombres?.message}
          />
          <Input
            label="Apellidos Paterno"
            id="paterno"
            max={8}
            placeholder="Ñispe"
            icon={<LuIdCard size={18} />}
            className={{ input: "placeholder: font-light" }}
            {...register("apellido_paterno")}
            error={errors.apellido_paterno?.message}
          />
          <Input
            label="Apellidos Materno"
            id="materno"
            max={8}
            placeholder="Ñispe"
            icon={<LuIdCard size={18} />}
            className={{ input: "placeholder: font-light" }}
            {...register("apellido_materno")}
            error={errors.apellido_materno?.message}
          />
          <InputDate
            id="fecha_nacimiento"
            label="nacimiento"
            icon={<LuCalendar size={18} />}
            onChange={(date) => {
              setValue("fecha_nacimiento", date.toISOString().split("T")[0]);
            }}
            value={
              watch("fecha_nacimiento")
                ? parse(watch("fecha_nacimiento"), "yyyy-MM-dd", new Date())
                : undefined
            }
            error={errors.fecha_nacimiento?.message}
          />
          <Input
            label="Sexo"
            id="sexo"
            placeholder="Femenino, Masculino"
            icon={<LuUser size={18} />}
            className={{ input: "placeholder: font-light" }}
            {...register("sexo")}
            error={errors.sexo?.message}
          />
          <Input
            label="Telefono"
            id="telefono"
            placeholder="958 154 162"
            icon={<LuPhone size={18} />}
            className={{ input: "placeholder: font-light" }}
            {...register("telefono")}
            error={errors.telefono?.message}
          />
          <Input
            label="Dirección"
            id="direcciion"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: "placeholder: font-light",
              main: "col-start-1 col-end-3",
            }}
            {...register("direccion")}
            error={errors.direccion?.message}
          />

          <Input
            label="Departamento"
            id="departamento"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: "placeholder: font-light",
              main: "col-start-1 col-end-3",
            }}
            {...register("departamento")}
            error={errors.departamento?.message}
          />
          <Input
            label="Provincia"
            id="provincia"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: "placeholder: font-light",
              main: "col-start-1 col-end-3",
            }}
            {...register("provincia")}
            error={errors.provincia?.message}
          />

          <Input
            label="Distrito"
            id="distrito"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: "placeholder: font-light",
              main: "col-start-1 col-end-3",
            }}
            {...register("distrito")}
            error={errors.distrito?.message}
          />

          <TextArea
            label="Notas"
            placeholder="Alergias, antecedentes u otra informacion relevante"
            id="notas"
            rows={3}
            className={{ main: "col-start-1 col-end-3" }}
            {...register("nota")}
          />
        </div>

        <ModalFooter nota="Al guardar, el paciente se añadirá al padrón.">
          <ContainerButton>
            <CloseButton type="button">Cancelar</CloseButton>
            <Button
              type="submit"
              className="font-semibold bg-ob-teal"
              onClick={() => {
                mutateCreate;
              }}
            >
              <LuSave size={18} />
              Guardar
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
