"use client";
import GoogleMapsIcon from "@/assets/svg/GoogleMapsIcon";
import Badge from "@/components/ui/badge/Badge";
import Table from "@/components/ui/table/Table";
import { ResponsePosta } from "@/interface/response.interface";
import cx from "@/libs/cx";
import Link from "next/link";
import React from "react";
import { LuBuilding2 } from "react-icons/lu";
import ButtonLink from "@/components/ui/link/Link";
import { TbEdit, TbTrash } from "react-icons/tb";

interface PostaTableProps {
  data: ResponsePosta[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function PostaTable({ data, ...props }: PostaTableProps) {
  return (
    <Table
      {...props}
      data={data}
      columns={[
        {
          header: "",
          cell: () => {
            return (
              <span className="w-4 block">
                <LuBuilding2 className="size-4 text-ob-white" />
              </span>
            );
          },
        },
        {
          header: "Ipress",
          cell: ({ row }) => {
            return (
              <span className="text-nowrap">
                {row.ipress.toString().padStart(4, "0")}
              </span>
            );
          },
        },
        {
          header: "Codigo",
          cell: ({ row }) => {
            return (
              <span className="text-nowrap">
                PC-{row.postaId.toString().padStart(4, "0")}
              </span>
            );
          },
        },
        {
          header: "Nombre",
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.nombre}</span>;
          },
        },
        {
          header: "Region",
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.region.nombre}</span>;
          },
        },
        {
          header: "Dirección",
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.direccion}</span>;
          },
        },
        {
          header: "Capacidad",
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.capacidad}</span>;
          },
        },
        {
          header: "Estado",
          cell: ({ row }) => {
            return (
              <Badge className={cx(row.estado ? "bg-ob-green" : "bg-ob-red")}>
                {row.estado ? "Activo" : "Inactivo"}
              </Badge>
            );
          },
        },
        {
          header: "Ver en mapa",
          cell: ({ row }) => {
            return (
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${row.lat},${row.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center"
              >
                <GoogleMapsIcon className="size-8" />
              </Link>
            );
          },
        },
        {
          header: "Acciones",
          cell: ({ row }) => {
            return (
              <div className="flex gap-2">
                <ButtonLink
                  href={`/posta/${row.postaId}`}
                  className="text-ob-lightblue bg-ob-black-2 w-1/2"
                >
                  <TbEdit className="size-[18px]" />
                  Editar
                </ButtonLink>
                <ButtonLink
                  href={`/posta/${row.postaId}/delete`}
                  className="text-red-400 border border-ob-gray bg-transparent w-1/2"
                >
                  <TbTrash className="size-[18px]" />
                  Eliminar
                </ButtonLink>
              </div>
            );
          },
        },
      ]}
    />
  );
}
