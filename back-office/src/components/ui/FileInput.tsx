import { JSX, useRef, useState, ChangeEvent } from "react";
import { MdCloudUpload } from "react-icons/md";
import ImageViewer from "./ImageViewer";

type Props = {
  name: string;
  id?: string;
  accept?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  previewClassName?: string;
};

export default function FileInput({ name, id, accept, onChange, previewClassName = "w-full aspect-video object-cover rounded-lg border border-slate-200" }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    setFileName(file?.name ?? null);
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
    onChange?.(e);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          id={id ?? name}
          name={name}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-primary transition-colors shrink-0"
        >
          <MdCloudUpload className="w-4 h-4 text-primary" />
          Choose File
        </button>
        <span className="text-sm text-slate-500 truncate">
          {fileName ?? "No file chosen"}
        </span>
      </div>

      {preview && (
        <div className="mt-2">
          <ImageViewer src={preview} alt="Preview" className={previewClassName} />
        </div>
      )}
    </div>
  );
}
