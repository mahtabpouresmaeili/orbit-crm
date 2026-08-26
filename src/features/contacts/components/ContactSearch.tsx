interface ContactSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ContactSearch({ value, onChange }: ContactSearchProps) {
  return (
    <input
      type="search"
      className="contact-search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search contacts..."
      aria-label="Search contacts"
    />
  );
}
