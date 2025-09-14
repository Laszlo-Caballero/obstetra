'use client';
import { ResponseGaleria } from '@/interface/response.interface';
import { useGalery } from '../context/GaleryContext';
import { useEffect } from 'react';
import Folder from '../components/folder/Folder';

interface FoldersSectionProps {
  initialData?: ResponseGaleria['folders'];
  path?: string;
}

export default function FoldersSection({ initialData, path }: FoldersSectionProps) {
  const {
    data: { folders },
    setData,
  } = useGalery();
  useEffect(() => {
    if (initialData) {
      setData((prev) => ({ ...prev, folders: initialData }));
    }
  }, [initialData]);
  return (
    <section className="flex flex-wrap gap-2.5">
      {folders.length > 0
        ? folders?.map((folder) => (
            <Folder key={folder} name={folder} url={`/galeria/${path}${folder}`} />
          ))
        : initialData?.map((folder) => (
            <Folder key={folder} name={folder} url={`/galeria/${path}${folder}`} />
          ))}
    </section>
  );
}
