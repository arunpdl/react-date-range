import React, { ChangeEvent, FocusEvent, ReactElement, ReactNode } from 'react';

const MIN = 0;
const MAX = 99999;

type InputRangeFieldProps = {
  value?: string | number;
  styles: {
    inputRange: string;
    inputRangeInput: string;
    inputRangeLabel?: string;
  };
  placeholder?: string;
  label: ReactElement | ReactNode;
  onChange: (value: number) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus: (event: FocusEvent<HTMLInputElement>) => void;
};

export default function InputRangeField({
  styles,
  placeholder = '-',
  value = '',
  label,
  onChange,
  onBlur,
  onFocus
}: InputRangeFieldProps) {
  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    if (rawValue === '') {
      // Pass a special value (like null) to indicate the field is cleared
      onChange(null as unknown as number); // TypeScript workaround if onChange only accepts numbers
      return;
    }

    let value = parseInt(rawValue, 10);
    value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);

    onChange(value);
  };

  const onBlurInternal = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      onChange(MIN); // Replace empty value with MIN on blur
    }
    onBlur(event);
  };

  return (
    <div className={styles.inputRange}>
      <input
        className={styles.inputRangeInput}
        placeholder={placeholder}
        value={value}
        min={MIN}
        max={MAX}
        onChange={onChangeInternal}
        onBlur={onBlurInternal}
        onFocus={onFocus}
      />
      <span className={styles.inputRangeLabel}>{label}</span>
    </div>
  );
}
