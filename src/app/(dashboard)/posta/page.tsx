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
import { fetcher } from "@/libs/fetch";
import { ResponsePosta } from "@/interface/response.interface";
import Table from "@/components/ui/table/Table";
import PostaTable from "@/modules/posta/table/PostaTable";

export default async function PostaPage() {
  const data = await fetcher<ResponsePosta[]>("posta", "get");
  console.log(data);
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

        <Search
          placeholder="Buscar postas..."
          className={{
            container: "max-w-[389px] ml-8",
          }}
        />

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

      <div className="flex items-center gap-x-3">
        <Filter
          placeholder="Region:"
          icon={<TbMapPin />}
          className={{
            container: "min-w-[260px]",
          }}
          value="0"
          values={[
            { label: "Todas", value: "0" },
            { label: "Region 2", value: "region-2" },
            { label: "Region 3", value: "region-3" },
          ]}
        />
        <Filter
          placeholder="Region:"
          className={{
            container: "min-w-[153px]",
          }}
          value="0"
          values={[
            { label: "Activas", value: "0" },
            { label: "Desactivas", value: "region-2" },
          ]}
        />
      </div>

      <PostaTable
        data={data?.data || []}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
        limit={10}
      />
    </div>
  );
}
