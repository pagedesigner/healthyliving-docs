import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin-right--sm"
            to="/docs/getting-started">
            Start Reading
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/crm-workflows">
            Workflow Guides
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Healthy Living Portal Documentation"
      description="Documentation for the Healthy Living Clinic portal.">
      <HomepageHeader />
      <main>
        <section className={styles.guideGrid}>
          <Link className={styles.guideCard} to="/docs/emr">
            <h2>EMR</h2>
            <p>Patient records, orders, questionnaires, subscriptions, and clinical operations.</p>
          </Link>
          <Link className={styles.guideCard} to="/docs/patient-portal">
            <h2>Patient Portal</h2>
            <p>Patient-facing intake, orders, invoices, appointments, and account workflows.</p>
          </Link>
          <Link className={styles.guideCard} to="/docs/crm-workflows">
            <h2>CRM Workflows</h2>
            <p>Triggers, conditions, wait steps, actions, testing, and workflow release practices.</p>
          </Link>
          <Link className={styles.guideCard} to="/docs/uptime-monitoring">
            <h2>Operations</h2>
            <p>Health checks, uptime monitoring, alerts, and troubleshooting procedures.</p>
          </Link>
        </section>
      </main>
    </Layout>
  );
}
