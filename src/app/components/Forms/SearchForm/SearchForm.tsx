'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import { Icon } from '../../../components';
import { useDebounce } from '@/hooks/useDebounce';
import { useProject } from '@/hooks/useProject';
import css from './SearchForm.module.scss';

const SearchForm: React.FC = () => {
  const { filters, setFilters } = useProject();
  const [search, setSearch] = useState(filters.search || '');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearch });
  }, [debouncedSearch, filters, setFilters]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={css.SearchForm}>
      <div className={css.Icon}>
        <Icon name="search" size="14" />
      </div>
      <input type="text" name="search" placeholder="Search for anything" value={search} onChange={handleChange} />
    </div>
  );
};

export default SearchForm;
