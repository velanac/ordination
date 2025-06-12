function FormTime({
  value,
  onChange,
  label,
  required = false,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}) {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input
        type='time'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='input input-bordered'
        required={required}
      />
    </div>
  );
}

export { FormTime };
