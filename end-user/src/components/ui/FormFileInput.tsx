import { JSX, useRef, useState, ChangeEvent } from "react";
import { MdCloudUpload } from "react-icons/md";

type Props = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  accept?: string;
  hint?: string;
};

export default function FormFileInput({ label, name, required, error, accept, hint }: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="flex items-center gap-x-3">
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-x-2 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <MdCloudUpload className="w-4 h-4 text-slate-500" />
          Choose File
        </button>
        <span className="text-sm text-slate-500 truncate max-w-[200px]">
          {fileName || "No file chosen"}
        </span>
      </div>
      {hint && (
        <p className="text-xs text-slate-400">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
