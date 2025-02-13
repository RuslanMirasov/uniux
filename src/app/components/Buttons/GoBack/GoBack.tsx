'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '../../../components';
import css from './GoBack.module.scss';

const GoBack: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button type="button" className={css.GoBack} onClick={handleGoBack} aria-label="Go back">
      <Icon name="back" />
      <span>Back</span>
    </button>
  );
};

export default GoBack;
