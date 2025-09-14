'use client';
import { ResponseGaleria } from '@/interface/response.interface';
import { useGalery } from '../context/GaleryContext';
import { useEffect } from 'react';
import FileCard from '../components/file/File';

interface FoldersSectionProps {
  initialData?: ResponseGaleria['files'];
  path: string;
}

export default function FileSection({ initialData, path }: FoldersSectionProps) {
  const {
    data: { files },
    setData,
  } = useGalery();

  useEffect(() => {
    if (initialData) {
      setData((prev) => ({ ...prev, files: initialData }));
    }
  }, [initialData]);

  return (
    <section className="grid w-full grid-cols-6 gap-2.5">
      {files.length > 0
        ? files?.map((file) => <FileCard key={file} name={file} path={path} />)
        : initialData?.map((file) => <FileCard key={file} name={file} path={path} />)}
    </section>
  );
}
