'use client';

import { useState } from 'react';
import { Icon } from '../../../components';
import css from './InputCopyText.module.scss';

interface InputCopyTextProps {
  text: string;
  message?: string | null;
}

const InputCopyText: React.FC<InputCopyTextProps> = ({ text, message = null }) => {
  const [copy, setCopy] = useState(false);

  const handleCopyText = (e: React.MouseEvent<HTMLDivElement>) => {
    if (copy) return;

    const targetText = (e.target as HTMLDivElement).textContent || '';

    navigator.clipboard
      .writeText(targetText)
      .then(() => {
        setCopy(true);
        setTimeout(() => setCopy(false), 2500);
      })
      .catch(err => console.error('Copy text error:', err));
  };

  return (
    <div className={`${css.Wrapper} ${copy ? css.Copied : ''}`}>
      <div className={css.CopyText} onClick={handleCopyText}>
        <span>{text}</span>
        <button type="button">
          <Icon name={copy ? 'done' : 'copy'} />
        </button>
      </div>
      <span className={css.Message}>{copy ? 'Copied to buffer' : message}</span>
    </div>
  );
};

export default InputCopyText;
