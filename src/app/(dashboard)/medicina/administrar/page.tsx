import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import Button from "@/components/ui/button/Button";
import ButtonLink from "@/components/ui/button-link/ButtonLink";
import SearchMedicina from "@/modules/medicina/Filtros/SearchMedicina";
import FiltrosAdministrar from "@/modules/medicina/Filtros/FiltrosAdministrar";
import TablaMedicina from "@/modules/medicina/Tabla/TablaMedicina";
import React from "react";
import { GoHome } from "react-icons/go";
import { LuPill, LuPlus } from "react-icons/lu";
import { fetcher } from "@/libs/fetch";
import {
  Categoria,
  Presentacion,
  ResponseMedicina,
} from "@/interface/response.interface";
import InfoContainer from "@/components/ui/info-container/InfoContainer";

export default async function page() {
  const data = await fetcher<ResponseMedicina[]>("farmacia/medicina");

  const categorias = await fetcher<Categoria[]>(
    "farmacia/categoria/raw-categorias"
  );

  const presentaciones = await fetcher<Presentacion[]>(
    "farmacia/presentacion/raw-presentaciones"
  );

  return (
    <div className="w-full flex flex-col gap-y-4 p-5">
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
            href: "/medicina/crear",
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
              <h2 className="text-xl">Catálogo y Stock de Medicinas</h2>
              <span className="text-sm text-ob-gray-2">
                Crea, importa y administra el inventario de medicamentos.
              </span>
            </div>
          </div>
        </div>
        <ButtonLink
          className=" text-ob-black bg-ob-teal"
          href="/medicina/crear"
        >
          <LuPlus size={18} />
          Registrar Medicina
        </ButtonLink>
      </section>

      <InfoContainer className="bg-ob-black-6">
        <div className="flex items-center gap-x-2">
          <SearchMedicina />
          <FiltrosAdministrar
            categorias={categorias?.data}
            presentaciones={presentaciones?.data}
          />
        </div>
        <TablaMedicina
          data={data?.data || []}
          total={data?.metadata?.totalItems}
          totalPage={data?.metadata?.totalPages}
          limit={10}
        />
      </InfoContainer>
    </div>
  );
}
