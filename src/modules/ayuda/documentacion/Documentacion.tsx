'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import Badge from '@/components/ui/badge/Badge';

import { IoDocumentTextOutline } from 'react-icons/io5';
import { FiUpload, FiRotateCcw, FiUploadCloud } from 'react-icons/fi';
import {
  LuZoomIn,
  LuZoomOut,
  LuArrowUpRight,
  LuInfo,
  LuStar,
  LuDownload,
  LuX,
} from 'react-icons/lu';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { BiUpvote } from 'react-icons/bi';
import { TfiReload } from 'react-icons/tfi';
import { LiaGripLinesSolid } from 'react-icons/lia';
import Search from '@/components/ui/search/Search';
import SmallCard from '@/components/ui/small-card/SmallCard';
import Modal from '@/components/ui/modal/Modal';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import { ResponseDocumentacion } from '@/interface/response.interface';
import { parseDate } from '@/libs/parseDate';
import { Document, Page, pdfjs } from 'react-pdf';
import { env } from '@/config/env';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useMutation } from '@/hooks/useMutation';
import { useAuth } from '@/components/context/AuthContext';
import axios from 'axios';
import { notify } from '@/libs/toast';

interface DocumentacionProps {
  data?: ResponseDocumentacion[];
  onClose?: () => void;
}

export default function Documentacion({ data, onClose }: DocumentacionProps) {
  const lastVersion = data?.[0];
  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const [zoom, setZoom] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  const { mutate: downloadDocument } = useMutation<unknown, Blob>({
    mutationFn: async (_, url) => {
      const res = await axios.get(`${url}/documentacion/download-last`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const fileName =
        res.headers['content-disposition']?.toString().split('filename=')[1] || 'documentacion.pdf';
      console.log(fileName);

      const pdfUrl = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return res.data;
    },

    onSuccess: () => {
      notify.success({
        message: 'Descarga iniciada',
      });
    },
    onError: (error) => {
      console.error(error);
      notify.error({
        message: 'Error al descargar el documento',
      });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Exporta Manuales en Pdf" badge="Documentacion">
          <IoDocumentTextOutline size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <div className="flex">
        <div className="border-ob-gray flex flex-col gap-y-3 border-r">
          <section className="border-ob-gray flex items-center gap-x-3 border-b p-4 pb-3">
            <Button
              className="border-ob-gray text-ob-white border bg-transparent"
              onClick={() => setZoom(zoom + 0.1)}
            >
              <LuZoomIn size={18} />
              Zoom In
            </Button>
            <Button
              className="border-ob-gray text-ob-white border bg-transparent"
              onClick={() => setZoom(zoom - 0.1)}
            >
              <LuZoomOut size={18} />
              Zoom Out
            </Button>
            <Button
              className="border-ob-gray text-ob-white border bg-transparent"
              onClick={downloadDocument}
            >
              <FiRotateCcw size={18} />
              Descargar
            </Button>
            <Button className="bg-ob-teal">
              <FiUploadCloud size={18} />
              Subir Nueva Version
            </Button>
          </section>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-3 px-4">
              <span className="text-ob-white text-sm">Tipo de Version</span>
              <div className="text-ob-white border-ob-gray bg-ob-black-4 flex items-center overflow-hidden rounded-xl border text-sm">
                <span className="hover:bg-ob-blue-3 border-ob-gray flex cursor-pointer items-center gap-x-1.5 border-r px-2.5 py-2">
                  <BiUpvote size={18} />
                  Major
                </span>
                <span className="hover:bg-ob-blue-3 flex cursor-pointer items-center gap-x-1.5 px-2.5 py-2">
                  <LuArrowUpRight size={18} />
                  Minor
                </span>
              </div>
              <Badge className="bg-ob-teal flex items-center gap-x-1.5 text-sm">
                <LuInfo size={18} />
                Cambios grandes vs pequeños
              </Badge>
            </div>
            <div className="bg-ob-blue-3 h-[452px] w-[637px] p-4">
              <div className="bg-ob-black-6 flex h-[420px] items-center justify-center">
                {lastVersion ? (
                  <Document
                    file={`${env.api_images}${lastVersion.resource.url}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<span className="text-ob-gray-2 text-sm">Cargando documento...</span>}
                    error={
                      <span className="text-ob-gray-2 text-sm">Error al cargar el documento.</span>
                    }
                    className="flex h-full flex-col gap-y-2 overflow-y-auto"
                  >
                    {Array.from(new Array(numPages), (_, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={zoom} />
                    ))}
                  </Document>
                ) : (
                  <span className="text-ob-gray-2 text-sm">No hay versiones disponibles</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <aside className="flex flex-col gap-y-2.5">
          <div className="border-ob-gray flex items-center justify-between border-b p-4 px-4 py-2">
            <span className="flex items-center gap-x-2">
              <FaClockRotateLeft size={18} />
              Historial de versiones
            </span>
            <span className="border-ob-gray rounded-md border px-3 py-2.5">
              <TfiReload size={18} />
            </span>
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            <Search placeholder="Buscar Version"></Search>

            <div className="pl- flex flex-col gap-y-2">
              {data?.map((doc, i) => {
                if (i === 0) {
                  return (
                    <SmallCard
                      key={doc._id}
                      title={`v${doc.version} Actual`}
                      description={parseDate(doc.resource.fechaSubida)}
                      className={{ description: '' }}
                      icon={<LuStar size={18} className="text-ob-white" />}
                    >
                      <Badge className="bg-ob-blue-2 text-sm">Actual</Badge>
                    </SmallCard>
                  );
                }

                return (
                  <SmallCard
                    key={doc._id}
                    title={`v${doc.version}`}
                    description={parseDate(doc.resource.fechaSubida)}
                    icon={<LiaGripLinesSolid size={18} className="text-ob-white" />}
                  >
                    <Button className="border-ob-gray rounded-md border bg-transparent px-3 py-2.5">
                      <LuDownload size={18} className="text-ob-white" />
                    </Button>
                  </SmallCard>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      <ModalFooter nota="Puedes cargar una nueva version sin perder el historial">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="bg-ob-teal font-semibold">
            <FiUpload size={18} />
            Subir Nueva Version
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
