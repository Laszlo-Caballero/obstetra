import { toast } from 'sonner';
import ToastSuccess from '@/components/ui/toast/save/ToastSave';
import ToastFailed from '@/components/ui/toast/failed/ToastFailed';
import ToastWarning from '@/components/ui/toast/warning/ToastWarning';
import ToastUpdate from '@/components/ui/toast/update/ToastUpdate';

interface NotifySuccess {
  message: string;
  title?: string;
  onUndo?: () => void;
  undo?: boolean;
}

interface NotifyError {
  message: string;
  title?: string;
  onRetry?: () => void;
  retry?: boolean;
}

interface NotifyWarning {
  message: string;
  title?: string;
  onDetails?: () => void;
  details?: boolean;
}

interface NotifyInfo {
  title?: string;
  message: string;
}

export const notify = {
  success: ({ message, title, onUndo, undo }: NotifySuccess) => {
    toast.custom((id) => (
      <ToastSuccess
        message={message}
        onClose={() => toast.dismiss(id)}
        title={title}
        onUndo={onUndo}
        undo={undo}
      />
    ));
  },
  error: ({ message, onRetry, title, retry }: NotifyError) => {
    toast.custom((id) => (
      <ToastFailed
        message={message}
        onClose={() => toast.dismiss(id)}
        title={title}
        onRetry={onRetry}
        retry={retry}
      />
    ));
  },
  warning: ({ message, title, onDetails, details }: NotifyWarning) => {
    toast.custom((id) => (
      <ToastWarning
        message={message}
        onClose={() => toast.dismiss(id)}
        title={title}
        onDetails={onDetails}
        details={details}
      />
    ));
  },
  info: ({ message, title }: NotifyInfo) => {
    toast.custom((id) => (
      <ToastUpdate message={message} title={title} onClose={() => toast.dismiss(id)} />
    ));
  },
};
