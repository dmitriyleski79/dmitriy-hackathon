import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a company
  const company = await prisma.company.create({
    data: {
      name: 'ShortPoint Demo Company',
      website: 'https://shortpoint.com'
    }
  })

  // Create a tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Demo Tenant',
      slug: 'demo-tenant',
      company_id: company.id
    }
  })

  // Create a demo user
  const user = await prisma.user.create({
    data: {
      clerk_id: 'demo-user-123',
      email: 'admin@shortpoint.com',
      role: 'ADMIN',
      tenant_id: tenant.id
    }
  })

  // Create demo sites
  const sites = await Promise.all([
    prisma.site.create({
      data: {
        name: 'Human Resources',
        slug: 'hr',
        description: 'HR policies, employee resources, and company information',
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.site.create({
      data: {
        name: 'Finance & Accounting',
        slug: 'finance',
        description: 'Financial reports, budget information, and expense policies',
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.site.create({
      data: {
        name: 'Information Technology',
        slug: 'it',
        description: 'IT support, software resources, and technical documentation',
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.site.create({
      data: {
        name: 'Development Team',
        slug: 'dev',
        description: 'Development resources, coding standards, and project documentation',
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.site.create({
      data: {
        name: 'Sales & Marketing',
        slug: 'sales',
        description: 'Sales tools, marketing materials, and customer resources',
        tenant_id: tenant.id,
        created_by: user.id
      }
    })
  ])

  // Create demo pages for the first site
  const hrSite = sites[0]
  await Promise.all([
    prisma.page.create({
      data: {
        title: 'Welcome Page',
        slug: 'welcome',
        content: { blocks: [{ type: 'paragraph', text: 'Welcome to HR!' }] },
        status: 'PUBLISHED',
        site_id: hrSite.id,
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.page.create({
      data: {
        title: 'Employee Handbook',
        slug: 'employee-handbook',
        content: { blocks: [{ type: 'paragraph', text: 'Employee handbook content...' }] },
        status: 'PUBLISHED',
        site_id: hrSite.id,
        tenant_id: tenant.id,
        created_by: user.id
      }
    }),
    prisma.page.create({
      data: {
        title: 'Company Policies',
        slug: 'company-policies',
        content: { blocks: [{ type: 'paragraph', text: 'Company policies content...' }] },
        status: 'DRAFT',
        site_id: hrSite.id,
        tenant_id: tenant.id,
        created_by: user.id
      }
    })
  ])

  // Create demo assets for the first site
  await Promise.all([
    prisma.asset.create({
      data: {
        name: 'company-logo.png',
        file_path: '/uploads/company-logo.png',
        file_type: 'image',
        file_size: 2500000,
        site_id: hrSite.id,
        tenant_id: tenant.id,
        uploaded_by: user.id
      }
    }),
    prisma.asset.create({
      data: {
        name: 'employee-handbook.pdf',
        file_path: '/uploads/employee-handbook.pdf',
        file_type: 'document',
        file_size: 1800000,
        site_id: hrSite.id,
        tenant_id: tenant.id,
        uploaded_by: user.id
      }
    })
  ])

  // Create demo theme for the first site
  await prisma.theme.create({
    data: {
      site_id: hrSite.id,
      tenant_id: tenant.id,
      primary_color: '#3161D1',
      secondary_color: '#5774A8',
      custom_css: null
    }
  })

  // Create demo navigation for the first site
  await prisma.navigation.create({
    data: {
      site_id: hrSite.id,
      tenant_id: tenant.id,
      structure: [
        {
          id: '1',
          title: 'Home',
          url: '/',
          icon: '🏠',
          isActive: true
        },
        {
          id: '2',
          title: 'About Us',
          url: '/about',
          icon: 'ℹ️',
          children: [
            {
              id: '2-1',
              title: 'Our Mission',
              url: '/about/mission',
              icon: '🎯'
            },
            {
              id: '2-2',
              title: 'Team',
              url: '/about/team',
              icon: '👥'
            }
          ]
        }
      ]
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 1 Company`)
  console.log(`   - 1 Tenant`)
  console.log(`   - 1 User`)
  console.log(`   - ${sites.length} Sites`)
  console.log(`   - 3 Pages`)
  console.log(`   - 2 Assets`)
  console.log(`   - 1 Theme`)
  console.log(`   - 1 Navigation`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
