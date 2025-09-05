"use client";
import { useFilter } from "@/components/context/FilterContext";
import { useTableContext } from "@/components/context/TableContext";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Modal from "@/components/ui/modal/Modal";
import ModalContent from "@/components/ui/modal/modal-content/ModalContent";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import { useDrop } from "@/hooks/useDrop";
import { useMutation } from "@/hooks/useMutation";
import { Response, ResponsePosta } from "@/interface/response.interface";
import cx from "@/libs/cx";
import axios from "axios";
import React, { useState } from "react";
import { LuDownload, LuUpload, LuX } from "react-icons/lu";
import { LuFile } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { LuCircleX } from "react-icons/lu";
import { LuFolderOpen } from "react-icons/lu";
import { toast } from "sonner";
import { FilterPosta } from "../types";

interface ModalImportProps {
  onClose?: () => void;
}

export default function ModalImport({ onClose }: ModalImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const { refresh } = useTableContext<ResponsePosta>();
  const { setMetadata } = useFilter<FilterPosta>();

  const { isOver, divProps, inputProps, onClickInput } = useDrop({
    onDrop: (files) => {
      setFile(files[0]);
    },
  });

  const { mutate } = useMutation<File, Response<ResponsePosta[]>>({
    mutationFn: async (data, urlApi) => {
      const formData = new FormData();
      formData.append("file", data);

      const res = await axios.post(`${urlApi}/posta/import-excel`, formData);

      return res.data;
    },
    onSuccess: (data) => {
      setFile(null);
      toast.success("Archivo subido correctamente");
      onClose?.();
      refresh(data.data);
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });
    },
    onError: () => {
      toast.error("Error al subir el archivo");
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Subir archivo (solo Excel)">
          <span className=" size-7 flex items-center rounded-xl border-ob-teal justify-center border-2 bg-ob-blue-3">
            <LuUpload />
          </span>
        </ModalTitle>

        <CloseButton>
          <LuX size={18} className="text-ob-white" />
          Cerrar
        </CloseButton>
      </ModalHeader>
      <ModalContent className="gap-4">
        <p className="font-medium text-ob-gray-2 max-w-[504px]">
          Arrastra y suelta tu archivo aquí o selecciónalo. Solo se permiten
          formatos .xlsx y .xls.
        </p>

        <input {...inputProps} />

        <div
          className="p-[26px] cursor-pointer min-h-[126px] gap-y-[10px] flex flex-col justify-center items-center border-[2px] bg-ob-black-8 border-ob-gray-4 border-dashed"
          {...divProps}
        >
          {!isOver ? (
            <>
              <Badge className="flex bg-ob-blue-3 items-center gap-2">
                <LuFile />
                Suelta tu Excel aqui
              </Badge>

              <div className="flex items-center gap-x-2">
                <Badge className="flex items-center bg-ob-black-7 text-ob-gray-2 gap-x-[6px]">
                  <LuCheck />
                  .xlsx
                </Badge>
                <Badge className="flex items-center bg-ob-black-7 text-ob-gray-2 gap-x-[6px]">
                  <LuCheck />
                  .xls
                </Badge>
                <Badge className="flex items-center bg-ob-black-7 text-ob-gray-2 gap-x-[6px]">
                  <LuCircleX />
                  No .csv
                </Badge>
                <Badge className="flex items-center bg-ob-black-7 text-ob-gray-2 gap-x-[6px]">
                  <LuCircleX />
                  No .pdf
                </Badge>
              </div>
            </>
          ) : (
            <span className="text-ob-teal font-medium">Suelta el archivo</span>
          )}
        </div>

        <div className="flex justify-between items-center w-full">
          <p className="max-w-[100px] font-medium text-ob-gray-2">
            Archivo seleccionado:
          </p>
          <div className="flex justify-between gap-x-2 min-w-[346px] items-center py-[11px] px-[13px] rounded-xl bg-ob-black-8 border border-ob-gray-4">
            {file ? (
              <p className="text-ob-gray-2 font-medium">{file.name}</p>
            ) : (
              <p className="text-ob-gray-2 font-medium">Ningun archivo</p>
            )}

            <Badge
              className={cx(
                !file ? "bg-ob-red text-ob-white" : "bg-ob-teal text-ob-black-6"
              )}
            >
              {file ? "Cargado" : "Esperando excel"}
            </Badge>
          </div>
        </div>
      </ModalContent>

      <ModalFooter>
        <ContainerButton>
          <Button
            className="text-ob-white bg-transparent border border-ob-gray-2"
            onClick={() => {
              onClickInput();
            }}
          >
            <LuFolderOpen />
            Elegir archivo
          </Button>
          <Button className="text-ob-teal-2 bg-ob-blue-3">
            <LuDownload />
            Elegir archivo
          </Button>

          <Button
            className="text-ob-black-9 bg-ob-teal disabled:cursor-default disabled:opacity-50"
            disabled={!file}
            onClick={() => {
              if (file) {
                mutate(file);
              }
            }}
          >
            <LuDownload />
            Subir archivo
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
