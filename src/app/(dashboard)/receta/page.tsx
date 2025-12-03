'use client';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Title from '@/components/ui/title/Title';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuFileText, LuDownload } from 'react-icons/lu';
import Button from '@/components/ui/button/Button';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import { Response, ResponseReceta } from '@/interface/response.interface';
import TablaReceta from '@/modules/receta/tabla/TablaReceta';

export default function RecetaPage() {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponseReceta[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/receta?limit=10&page=1`,
      );
      return res.data.data;
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-4 p-5 font-medium">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Recetas',
            href: '/receta',
            icon: <LuFileText />,
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Historial de recetas"
          description="Consulta, filtra y exporta recetas emitidas por fecha, paciente u obstetra."
          icon={<LuFileText size={18} />}
        />
        <Button className="border-ob-gray text-ob-white border bg-transparent">
          <LuDownload size={18} />
          Exportar
        </Button>
      </section>

      {/* Filters can be added here later */}

      <TablaReceta data={data || []} />
    </div>
  );
}
