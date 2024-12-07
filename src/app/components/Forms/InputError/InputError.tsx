'use client';

import { useEffect, useRef, useState } from 'react';
import css from './InputError.module.scss';

interface ErrorProps {
  text: string | undefined;
}

const InputError: React.FC<ErrorProps> = ({ text = undefined }) => {
  const [height, setHeight] = useState<string>('0px');
  const errorEl = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (text === undefined) {
      setHeight('0px');
    } else if (errorEl.current) {
      setHeight(`${errorEl.current.scrollHeight}px`);
    }
  }, [text]);

  return (
    <p ref={errorEl} className={css.InputError} style={{ height }}>
      {text}
    </p>
  );
};

export default InputError;
