import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/input";
import Select from "@/components/ui/select/Select";
import TextArea from "@/components/ui/textarea/Textarea";
import CheckBox from "@/components/ui/checkbox/CheckBox";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import React from "react";
import { GoHome } from "react-icons/go";
import {
  LuArrowLeft,
  LuCheck,
  LuPill,
  LuSave,
  LuImageUp,
} from "react-icons/lu";

export default function page() {
  return (
    <div className="w-full flex flex-col gap-y-4 p-5 font-medium">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Perfil",
            href: "/perfil",
          },
          {
            title: "Medicina",
            href: "/",
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <div className="flex items-center text-ob-white font-medium">
          <div className="flex items-start gap-x-2.5">
            <span className=" p-1 border-3 border-ob-teal rounded-xl bg-ob-black-4">
              <LuPill size={18} />
            </span>
            <div className="flex flex-col gap-y-0.5">
              <h2 className="text-xl">Crear Medicina</h2>
              <span className="text-sm text-ob-gray-2">
                Registra un nuevo medicamento con sus datos, presentación y
                stock inicial.
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            <LuArrowLeft size={18} />
            Volver
          </Button>
          <Button className="text-ob-black bg-ob-teal">
            <LuSave size={18} />
            Guardar
          </Button>
        </div>
      </section>
      <form className="flex flex-col gap-y-4 ">
        {/* Formulario 1 */}

        <InfoContainer>
          <div className="flex justify-between items-center text-sm">
            <span className="text-ob-white ">Información Básica</span>
            <span className="text-ob-gray-2">
              Ingresa la data de la medicina
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-y-1.5">
              <Input
                label="Nombre de la medicina"
                id="name"
                placeholder="EJ. Paracetamol 500mg"
                className={{ label: "text-sm text-ob-white" }}
              />
              <span className="text-xs text-ob-gray-2">
                Nombre comercial o genérico con la dosis
              </span>
            </div>
            <Input
              label="Código / SKU"
              id="sku"
              placeholder="EJ. 123456"
              className={{ label: "text-sm text-ob-white" }}
            />
            <Select
              placeholder="Seleccionar Categoría"
              label="Categoría"
              className={{ label: "text-sm text-ob-white" }}
              options={[
                { label: "Categoria1", value: "1" },
                { label: "Categoria2", value: "2" },
              ]}
            />
            <Select
              placeholder="Seleccionar Presetación"
              label="Presentación"
              className={{ label: "text-sm text-ob-white" }}
              options={[
                { label: "Tabletas", value: "1" },
                { label: "Jarabe", value: "2" },
              ]}
            />
            <div className="col-start-1 col-end-3">
              <TextArea
                label="Descripción"
                id="description"
                placeholder="Indicaciones, dosis y consideraciones"
                rows={5}
                className={{
                  label: "text-sm text-ob-white",
                }}
              />
            </div>
          </div>
        </InfoContainer>

        {/* Formulario 2 */}

        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white ">Detalles y control</span>
            <span className="text-ob-gray-2">Configura unidades y alertas</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Unidad por empaque"
              id="unit"
              placeholder="EJ. 10 Tabletas"
              className={{ label: "text-sm text-ob-white" }}
            />
            <Input
              label="Dosis (mg/ml)"
              id="dosis"
              placeholder="EJ. 500mg"
              className={{ label: "text-sm text-ob-white" }}
            />
            <Input
              label="Stock Inicial"
              id="initialStock"
              placeholder="20"
              className={{ label: "text-sm text-ob-white" }}
            />
            <Input
              label="Stock Minimo"
              id="minStock"
              placeholder="30"
              className={{ label: "text-sm text-ob-white" }}
            />
            <CheckBox label="Necesita Receta">
              <span className="flex items-center gap-x-2">
                <LuCheck size={16} />
                Sí
              </span>
            </CheckBox>
          </div>
        </InfoContainer>
        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Imagen</span>
            <span className="text-ob-gray-2">Opcional</span>
          </div>
          <div className="flex items-center justify-center bg-ob-black-4 rounded-xl h-[132px] border border-dashed border-ob-gray">
            <span className="flex items-center gap-x-2 text-ob-gray-2">
              <LuImageUp size={22} />
              Subir o Arrastrar imagen del producto
            </span>
          </div>
        </InfoContainer>
        <div className="flex items-center justify-end gap-x-2">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            Cancelar
          </Button>
          <Button>
            <LuSave size={18} />
            Guardar Medicina
          </Button>
        </div>
      </form>
    </div>
  );
}
