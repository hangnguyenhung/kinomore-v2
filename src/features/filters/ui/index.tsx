import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEvent } from 'effector-react';
import { filtersModel } from 'features/filters';
import { useLockedBody, useToggler } from 'shared/lib';
import { Button, CloseIcon, SortIcon, Title } from 'shared/ui';
import { sort, filters } from '../config';
import { Select } from './select';
import { DrawerSelect } from './drawer-select';
import styles from './styles.module.scss';

export const Filters = () => {
  const { query } = useRouter();
  const { isOpen, close } = useToggler(filtersModel.toggler);
  const optionSelected = useEvent(filtersModel.optionSelected);
  const showResults = useEvent(filtersModel.showResults);
  const sendOption = useEvent(filtersModel.sendOption);

  useLockedBody(isOpen);

  /* добавить кнопку сбросить */

  return (
    <div className={clsx(styles.root, isOpen && styles.isOpen)}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image priority className={styles.image} width={131} height={26} src="/logo.svg" alt="Kinomore" />
        </div>
        <button onClick={close} className={clsx('btn-reset', styles.close)}>
          <CloseIcon />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Title size="medium">Фильтры</Title>
        </div>
        <div className={styles.filters}>
          <div className={styles.row}>
            {filters.map((option, idx) => {
              const { queryName, ...rest } = option;

              return (
                <Select
                  key={idx}
                  value={query[queryName]}
                  onSelect={({ value }) => optionSelected({ [queryName]: value })}
                  className={styles.select}
                  {...rest}
                />
              );
            })}
          </div>
          <div className={styles.row}>
            <Select
              value={query.sort}
              onSelect={(option) => optionSelected({ sort: option.value })}
              options={sort}
              startIcon={<SortIcon />}
              placement="bottom-end"
              className={styles.select}
              label="Рекомендуемые"
            />
          </div>
        </div>
        <div className={styles.options}>
          <DrawerSelect
            value={query.sort}
            onSelect={(option) => sendOption({ sort: option.value })}
            options={sort}
            label="Сортировка"
          />
          {filters.map((option, idx) => {
            const { queryName, ...rest } = option;

            return (
              <DrawerSelect
                key={idx}
                value={query[queryName]}
                onSelect={(option) => sendOption({ [queryName]: option.value })}
                {...rest}
              />
            );
          })}
        </div>
        <Button onClick={showResults} className={styles.btn} variant="primary">
          Показать результаты
        </Button>
      </div>
    </div>
  );
};
