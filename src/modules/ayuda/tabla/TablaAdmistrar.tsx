"use client";
import { useFilter } from "@/components/context/FilterContext";
import Button from "@/components/ui/button/Button";
import Table from "@/components/ui/table/Table";
import { Response, ResponseConsulta } from "@/interface/response.interface";
import { FaRegDotCircle } from "react-icons/fa";
import { FilterAdministrar } from "../types";
import { useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import axios from "axios";
interface TablaAdmistrarProps {
  data: ResponseConsulta[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaAdmistrar({
  data,
  ...props
}: TablaAdmistrarProps) {
  const { filters, setFilter } = useFilter<FilterAdministrar>();
  const [metadata, setMetadata] = useState(props);

  const { data: queryData } = useQuery<ResponseConsulta[]>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/ayuda/consulta`);

      parseUrl.searchParams.append("limit", props.limit?.toString() || "10");
      parseUrl.searchParams.append("page", filters.page);

      if (filters.moduloId != "") {
        parseUrl.searchParams.append("moduloId", filters.moduloId);
      }

      if (filters.prioridadId != "") {
        parseUrl.searchParams.append("prioridadId", filters.prioridadId);
      }
      if (filters.estadoId != "") {
        parseUrl.searchParams.append("estadoId", filters.estadoId);
      }

      if (filters.search != "") {
        parseUrl.searchParams.append("search", filters.search);
      }

      const res = await axios.get(parseUrl.toString());

      const data: Response<ResponseConsulta[]> = res.data;

      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });

      return data.data;
    },
    dependencies: [filters],
  });

  return (
    <Table
      {...metadata}
      initialData={data}
      data={queryData}
      onChangePage={(page) => {
        setFilter("page", page.toString());
      }}
      value={Number(filters.page) || 1}
      columns={[
        {
          header: "ID",
          cell: ({ row }) => {
            return <span>{row.consultaId}</span>;
          },
        },
        {
          header: "Asunto",
          cell: ({ row }) => {
            return <span>{row.asunto}</span>;
          },
        },
        {
          header: "Módulo",
          cell: ({ row }) => {
            return <span>{row.modulo.nombre}</span>;
          },
        },
        {
          header: "Prioridad",
          cell: ({ row }) => {
            return <span>{row.prioridad.nombre}</span>;
          },
        },
        {
          header: "Acciones",
          cell: () => {
            return (
              <Button className="bg-ob-blue-3 text-ob-lightblue py-1.5">
                <FaRegDotCircle size={18} />
                Editar Estado
              </Button>
            );
          },
        },
      ]}
    />
  );
}
