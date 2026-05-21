export function ServiceDropdown({ dropDownData, onChange, value }) {
  const handleSelect = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative flex-1">
      <select
        className="w-full outline-none bg-transparent"
        value={value}
        onChange={handleSelect}
      >
        {dropDownData.map((service) => (
          <option
            key={service.id}
            value={service.slug}
          >
            {service.label}
          </option>
        ))}
      </select>
    </div>
  );
}