import { AddProductFieldLabel } from "@/app/components/Form_fields/AddProductFieldLabel";

type AddProductSelectFieldProps = {
  label: string;
  required?: boolean;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function AddProductSelectField({
  label,
  required,
  options,
  value,
  onChange,
}: AddProductSelectFieldProps) {
  return (
    <div>
      <AddProductFieldLabel label={label} required={required} />
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-900 outline-none transition focus:border-indigo-700 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
