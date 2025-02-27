'use client';

import { useProject } from '@/hooks/useProject';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '../../../components';
import css from './ProjectsFilters.module.scss';

const ProjectsFilters: React.FC = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const { filters, setFilters } = useProject();
  const orderSelectRef = useRef<HTMLDivElement | null>(null);

  const toggleOrder = () => {
    setIsOrderOpen(!isOrderOpen);
  };

  const handleSortChange = (sort: 'visit' | 'name' | 'views' | 'createdAt') => {
    setFilters({ ...filters, sort });
  };

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setFilters({ ...filters, order });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (orderSelectRef.current && !orderSelectRef.current.contains(e.target as Node)) {
        setIsOrderOpen(false);
      }
    };

    if (isOrderOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOrderOpen]);

  return (
    <nav className={css.Navigation}>
      <ul className={css.ProjectsFilter}>
        <li>
          <button data-active={filters.sort === 'visit'} onClick={() => handleSortChange('visit')}>
            Last visited
          </button>
        </li>
        <li>
          <button data-active={filters.sort === 'name'} onClick={() => handleSortChange('name')}>
            Alphabetically
          </button>
        </li>
        <li>
          <button data-active={filters.sort === 'views'} onClick={() => handleSortChange('views')}>
            By views
          </button>
        </li>
        <li>
          <button data-active={filters.sort === 'createdAt'} onClick={() => handleSortChange('createdAt')}>
            Date created
          </button>
        </li>
      </ul>
      <div className={css.Orders}>
        <div
          ref={orderSelectRef}
          className={`${css.ProjectsOrder} ${isOrderOpen ? css.Open : ''}`}
          onClick={toggleOrder}
        >
          <span>{filters.order === 'desc' ? 'Newest first' : 'Oldest first'}</span>
          <Icon name="select-arrow" size="12" />
          <ul>
            <li onClick={() => handleOrderChange('desc')}>Newest first</li>
            <li onClick={() => handleOrderChange('asc')}>Oldest first</li>
          </ul>
        </div>
        <button className={css.ChangeViewButton}></button>
      </div>
    </nav>
  );
};

export default ProjectsFilters;
