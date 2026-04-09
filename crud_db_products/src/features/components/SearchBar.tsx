import { GlassIcon } from "@/app/components/icons/GlassIcon";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar productos</span>
      <GlassIcon />
      <input
        type="search"
        className="filter-control h-14 w-full pl-12 pr-4 text-[1.05rem]"
        placeholder="Buscar por descripción..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
