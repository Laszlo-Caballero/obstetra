import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonLink from "@/components/ui/button-link/ButtonLink";
import Button from "@/components/ui/button/Button";
import Title from "@/components/ui/title/Title";
import { ResponseGaleria } from "@/interface/response.interface";
import { fetcher } from "@/libs/fetch";
import FileCard from "@/modules/galeria/components/file/File";
import Folder from "@/modules/galeria/components/folder/Folder";
import { LuFolderPlus, LuHouse, LuImage, LuUpload } from "react-icons/lu";

export default async function GaleriaPage() {
  const res = await fetcher<ResponseGaleria>("files/carpets");

  console.log(res?.data);

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
          <ButtonLink className="text-ob-white bg-ob-blue" href="/citas/crear">
            <LuFolderPlus size={18} />
            Nueva Carpeta
          </ButtonLink>
        </div>
      </section>

      <section className="grid grid-cols-8 gap-2.5">
        {res?.data.folders.map((folder) => (
          <Folder key={folder} name={folder} url={`/galeria/${folder}`} />
        ))}
      </section>

      <section className="grid grid-cols-6 gap-3">
        {res?.data.files.map((file) => (
          <FileCard key={file} name={file} path={``} />
        ))}
      </section>
    </main>
  );
}
