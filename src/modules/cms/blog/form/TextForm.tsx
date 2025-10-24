'use client';
import Button from '@/components/ui/button/Button';
import CheckBox from '@/components/ui/checkbox/CheckBox';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/Textarea';
import cx from '@/libs/cx';
import { TextSchemaType } from '@/schemas/cms/blog/components/mainComponent.schema';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { LuCheck, LuChevronDown, LuCopy, LuList, LuTrash } from 'react-icons/lu';

interface TextFormProps {
  onChange?: (value: TextSchemaType) => void;
  value?: TextSchemaType;
  onDelete?: () => void;
  onDuplicate?: () => void;
  errors?: { [key: string]: string };
}

export default function TextForm({
  onChange,
  value,
  onDelete,
  onDuplicate,
  errors,
}: TextFormProps) {
  const [open, setOpen] = useState(true);

  return (
    <InfoContainer className="gap-y-0 p-0">
      <header className="flex items-center justify-between px-3 py-2.5">
        <span className="flex items-center gap-x-2">
          <LuList className="text-ob-white" size={20} />
          <h1>TEXTO</h1>
        </span>

        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            className="border-ob-gray-4 border dark:bg-transparent dark:text-white"
            onClick={onDuplicate}
          >
            <LuCopy className="size-4" />
            Duplicar
          </Button>
          <Button
            type="button"
            className="border-ob-gray-4 border dark:bg-transparent dark:text-white"
            onClick={onDelete}
          >
            <LuTrash className="size-4" />
            Eliminar
          </Button>

          <button className="cursor-pointer p-2" type="button" onClick={() => setOpen(!open)}>
            <LuChevronDown className={cx('size-4', open && 'rotate-180')} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.section
            className="overflow-hidden p-3"
            initial={{ padding: 0, height: 0 }}
            animate={{ padding: '12px', height: 'auto' }}
            exit={{ padding: 0, height: 0 }}
          >
            <TextArea
              label="Texto"
              placeholder="Ingrese el texto..."
              value={value?.text || ''}
              onChange={(e) => onChange?.({ ...(value || {}), text: e.target.value })}
              error={errors?.text}
            />

            <Input
              label="Text Destacado"
              id="highlightText"
              placeholder="Texto que quiere destacar"
              value={value?.highlight?.text || ''}
              onChange={(e) => {
                onChange?.({
                  text: value?.text || '',
                  highlight: {
                    ...(value?.highlight || {}),
                    text: e.target.value,
                  },
                });
              }}
            />
            <CheckBox
              label="Negrita"
              value={value?.highlight?.bold || false}
              onChange={(checked) => {
                onChange?.({
                  text: value?.text || '',
                  highlight: {
                    text: value?.highlight?.text || '',
                    bold: checked,
                  },
                });
              }}
            >
              <span className="flex items-center gap-x-2">
                <LuCheck size={16} />
                Sí
              </span>
            </CheckBox>
          </motion.section>
        )}
      </AnimatePresence>
    </InfoContainer>
  );
}
