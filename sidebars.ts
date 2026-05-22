import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Portal Guides',
      items: [
        'emr',
        'patient-portal',
        'crm-workflows',
        'intake-forms',
        'orders-subscriptions',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: ['uptime-monitoring', 'troubleshooting'],
    },
  ],
};

export default sidebars;
