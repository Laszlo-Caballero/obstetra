"use client";

import Button from "@/components/ui/button/Button";
import Table from "@/components/ui/table/Table";
import { useQuery } from "@/hooks/useQuery";
import { Response, ResponseMedicina } from "@/interface/response.interface";
import axios from "axios";
import React, { useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaRegDotCircle } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { FiltersMedicina } from "../types";
import { useFilter } from "@/components/context/FilterContext";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import EliminarMedicina from "../Eliminar/EliminarMedicina";

interface TablaMedicinaProps {
  data: ResponseMedicina[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaMedicina({ data, ...props }: TablaMedicinaProps) {
  const { filters, setFilter, setMetadata, metadata } =
    useFilter<FiltersMedicina>();

  const { data: queryData } = useQuery<Response<ResponseMedicina[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/farmacia/medicina`);

      parseUrl.searchParams.append("limit", props.limit?.toString() || "10");
      parseUrl.searchParams.append("page", filters.page);

      if (filters.status != "") {
        parseUrl.searchParams.append("status", filters.status);
      }

      if (filters.categoriaId != "") {
        parseUrl.searchParams.append("categoriaId", filters.categoriaId);
      }

      if (filters.presentacionId != "") {
        parseUrl.searchParams.append("presentacionId", filters.presentacionId);
      }

      if (filters.search != "") {
        parseUrl.searchParams.append("search", filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponseMedicina[]> = res.data;
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });
      return data;
    },
    dependencies: [filters],
  });
  return (
    <Table
      metadata={metadata}
      initialMetadata={{
        total: props.total || 0,
        totalPage: props.totalPage || 0,
        limit: props.limit || 10,
      }}
      value={Number(filters.page) || 1}
      onChangePage={(page) => {
        setFilter("page", page.toString());
      }}
      initialData={data}
      data={queryData?.data}
      columns={[
        {
          header: "Nombre",
          cell: ({ row }) => {
            return <span>{row.nombre}</span>;
          },
        },
        {
          header: "Descipcion",
          cell: ({ row }) => {
            return <span>{row.descripcion}</span>;
          },
        },
        {
          header: "Categoria",
          cell: ({ row }) => {
            return <span>{row.categoria.nombre}</span>;
          },
        },
        {
          header: "Presentacion",
          cell: ({ row }) => {
            return <span>{row.presentacion.nombre}</span>;
          },
        },
        {
          header: "Acciones",
          cell: () => {
            return (
              <div className="flex items-center gap-x-2">
                <Button className="bg-ob-blue-3 text-ob-lightblue ">
                  <BiSolidEditAlt size={18} />
                  Editar
                </Button>
                <ButtonModal
                  className="bg-transparent border border-ob-gray text-ob-white"
                  modal={<EliminarMedicina />}
                >
                  <LuTrash2 size={18} />
                  Eliminar
                </ButtonModal>
              </div>
            );
          },
        },
      ]}
    ></Table>
  );
}
