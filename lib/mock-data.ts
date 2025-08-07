export interface Site {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  department: string;
  recentActivity: string;
  userCount: number;
  pageCount: number;
  lastUpdated: string;
  layout?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'normal';
  avatar?: string;
}

export const mockSites: Site[] = [
  {
    id: '1',
    name: 'Human Resources',
    slug: 'hr',
    description: 'HR policies, employee resources, and company information',
    status: 'active',
    department: 'HR',
    recentActivity: 'Updated employee handbook',
    userCount: 45,
    pageCount: 12,
    lastUpdated: '2 hours ago',
    layout: 'modern'
  },
  {
    id: '2',
    name: 'Finance & Accounting',
    slug: 'finance',
    description: 'Financial reports, budget information, and expense policies',
    status: 'active',
    department: 'Finance',
    recentActivity: 'Added Q4 budget report',
    userCount: 23,
    pageCount: 8,
    lastUpdated: '1 day ago',
    layout: 'classic'
  },
  {
    id: '3',
    name: 'Information Technology',
    slug: 'it',
    description: 'IT support, software resources, and technical documentation',
    status: 'active',
    department: 'IT',
    recentActivity: 'Updated software inventory',
    userCount: 67,
    pageCount: 15,
    lastUpdated: '3 hours ago',
    layout: 'minimal'
  },
  {
    id: '4',
    name: 'Development Team',
    slug: 'dev',
    description: 'Development resources, coding standards, and project documentation',
    status: 'active',
    department: 'Development',
    recentActivity: 'Added new API documentation',
    userCount: 34,
    pageCount: 20,
    lastUpdated: '5 hours ago',
    layout: 'portal'
  },
  {
    id: '5',
    name: 'Sales & Marketing',
    slug: 'sales',
    description: 'Sales tools, marketing materials, and customer resources',
    status: 'active',
    department: 'Sales',
    recentActivity: 'Updated sales playbook',
    userCount: 28,
    pageCount: 10,
    lastUpdated: '1 day ago',
    layout: 'modern'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Admin',
  email: 'john.admin@company.com',
  role: 'admin',
  avatar: '/api/placeholder/32/32'
};
