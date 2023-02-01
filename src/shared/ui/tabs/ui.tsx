import clsx from 'clsx';
import { Fragment, type ReactNode } from 'react';
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from 'react-tabs';
import styles from './styles.module.scss';

export interface TabItem {
  txt: string;
  condition?: unknown;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  className?: string;
}

export const Tabs = ({ className, tabs }: TabsProps) => {
  return (
    <ReactTabs selectedTabClassName={styles.selected} className={clsx(styles.tabs, className)}>
      <TabList className={styles.list}>
        {tabs.map((tab) => {
          const { txt, condition } = tab;

          return <Fragment key={txt}>{condition ? <Tab className={styles.tab}>{txt}</Tab> : null}</Fragment>;
        })}
      </TabList>
      {tabs.map((tab, idx) => {
        const { content, condition } = tab;

        return <Fragment key={idx}>{condition ? <TabPanel>{content}</TabPanel> : null}</Fragment>;
      })}
    </ReactTabs>
  );
};
