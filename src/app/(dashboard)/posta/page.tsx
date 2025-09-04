import Button from "@/components/ui/button/Button";
import Search from "@/components/ui/search/Search";
import React from "react";
import { LuBuilding2 } from "react-icons/lu";
import { LuDownload } from "react-icons/lu";
import { HiOutlinePlus } from "react-icons/hi2";
import Filter from "@/components/ui/filter/Filter";
import { TbMapPin } from "react-icons/tb";
import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import { GoHome } from "react-icons/go";
import { Region, ResponsePosta } from "@/interface/response.interface";
import PostaTable from "@/modules/posta/table/PostaTable";
import Mapa from "@/modules/posta/components/mapa/Mapa";
import { Position } from "@/interface/types";
import { fetcher } from "@/libs/fetch";
import FilterSelect from "@/modules/posta/filters/FilterSelect";
import SearchPosta from "@/modules/posta/filters/SearchPosta";

export default async function PostaPage() {
  const data = await fetcher<ResponsePosta[]>("posta");

  const rawPostas = await fetcher<Position[]>("posta/raw-postas");

  const regiones = await fetcher<Region[]>("utils/regiones");

  return (
    <div className="flex flex-col w-full p-5 gap-y-4">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Postas",
            icon: <LuBuilding2 />,
            href: "/posta",
          },
        ]}
      />

      <section className="flex items-center">
        <div className="flex gap-x-2.5 items-center">
          <span className="px-[6px] py-[5px] rounded-xl border-white border flex items-center justify-center max-w-max">
            <LuBuilding2 className="size-4 text-ob-white" />
          </span>
          <div className="flex flex-col">
            <h2 className="font-medium text-xl">Administrar Postas</h2>
            <p className="max-w-[350px] font-medium text-sm text-ob-gray-2">
              Crea, edita y organiza las postas para asignación de turnos.
            </p>
          </div>
        </div>

        <SearchPosta />

        <div className="flex gap-x-2 ml-auto ">
          <Button className="bg-transparent max-h-10 text-white border border-ob-gray rounded-[6px]">
            <LuDownload /> Exportar
          </Button>

          <Button className="max-h-10 text-white">
            <HiOutlinePlus />
            Nueva posta
          </Button>
        </div>
      </section>

      <FilterSelect regiones={regiones?.data} />

      <PostaTable
        data={data?.data || []}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
        limit={10}
      />

      <div className="p-[6px] flex flex-col gap-y-3 mb-[41px]">
        <h2 className="text-xl font-medium">Mapa de Postas</h2>

        <Mapa markers={rawPostas?.data || []} />
      </div>
    </div>
  );
}
