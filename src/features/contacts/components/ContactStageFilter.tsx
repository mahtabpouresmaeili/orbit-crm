import type { ContactStageFilterValue } from '../types/contactFilter';

export interface ContactStageFilterProps {
  value: ContactStageFilterValue;
  onChange: (value: ContactStageFilterValue) => void;
}

export function ContactStageFilter({ value, onChange }: ContactStageFilterProps) {
  return (
    <select
      className="stage-filter"
      value={value}
      onChange={(event) => onChange(event.target.value as ContactStageFilterValue)}
    >
      <option value="all">All</option>
      <option value="lead">Lead</option>
      <option value="qualified">Qualified</option>
      <option value="customer">Customer</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}
