import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonLink from "@/components/ui/button-link/ButtonLink";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import Button from "@/components/ui/button/Button";
import Title from "@/components/ui/title/Title";
import { ResponseGaleria } from "@/interface/response.interface";
import { fetcher } from "@/libs/fetch";
import FileCard from "@/modules/galeria/components/file/File";
import Folder from "@/modules/galeria/components/folder/Folder";
import CrearCarpeta from "@/modules/galeria/modal/CrearCarpeta";
import FileSection from "@/modules/galeria/sections/FilesSecion";
import FoldersSection from "@/modules/galeria/sections/FoldersSection";
import { notFound } from "next/navigation";
import { LuFolderPlus, LuHouse, LuImage, LuUpload } from "react-icons/lu";

export default async function GaleryPageRest({
  params,
}: {
  params: Promise<{ rest: string[] }>;
}) {
  const { rest } = await params;
  const folderPath = rest.join("/");

  const res = await fetcher<ResponseGaleria>(`files/carpets/${folderPath}`);

  if (!res) {
    return notFound();
  }

  return (
    <main className="flex flex-col w-full h-full gap-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <LuHouse />,
            href: "/",
          },
          {
            title: "Galeria",
            href: "/galeria/",
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Galeria"
          description="Gestiona las imagenes de la galeria"
          icon={<LuImage size={16} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="bg-ob-black-2 text-ob-lightblue">
            <LuUpload size={18} />
            Subir Archivo
          </Button>
          <ButtonModal
            modal={<CrearCarpeta />}
            className="text-ob-white bg-ob-blue"
          >
            <LuFolderPlus size={18} />
            Nueva Carpeta
          </ButtonModal>
        </div>
      </section>

      <FoldersSection initialData={res?.data.folders} path={`${folderPath}/`} />
      <FileSection initialData={res?.data.files} path={`/`} />
    </main>
  );
}
