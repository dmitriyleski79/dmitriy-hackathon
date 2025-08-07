import { prisma } from '@/lib/prisma'
import { Page, PageStatus } from '@prisma/client'

export interface CreatePageData {
  title: string
  slug: string
  content: Record<string, unknown>
  status: PageStatus
  site_id: string
  tenant_id: string
  created_by: string
}

export interface UpdatePageData {
  title?: string
  slug?: string
  content?: Record<string, unknown>
  status?: PageStatus
}

export interface PageWithRelations extends Page {
  site: {
    id: string
    name: string
    slug: string
  }
  creator: {
    id: string
    email: string
  }
  versions: {
    id: string
    version_number: number
    title: string
    content: Record<string, unknown>
    status: PageStatus
    created_at: Date
    is_current: boolean
  }[]
}

export class PagesService {
  // Create a new page
  static async createPage(data: CreatePageData): Promise<Page> {
    return await prisma.page.create({
      data
    })
  }

  // Get all pages for a site
  static async getPagesBySite(site_id: string): Promise<PageWithRelations[]> {
    return await prisma.page.findMany({
      where: { site_id },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            email: true
          }
        },
        versions: {
          orderBy: { version_number: 'desc' },
          take: 5 // Get last 5 versions
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Get a single page by ID
  static async getPageById(id: string): Promise<PageWithRelations | null> {
    return await prisma.page.findUnique({
      where: { id },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            email: true
          }
        },
        versions: {
          orderBy: { version_number: 'desc' }
        }
      }
    })
  }

  // Get a page by slug
  static async getPageBySlug(slug: string, site_id: string): Promise<PageWithRelations | null> {
    return await prisma.page.findFirst({
      where: { 
        slug,
        site_id
      },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            email: true
          }
        },
        versions: {
          orderBy: { version_number: 'desc' }
        }
      }
    })
  }

  // Update a page
  static async updatePage(id: string, data: UpdatePageData): Promise<Page> {
    return await prisma.page.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      }
    })
  }

  // Delete a page
  static async deletePage(id: string): Promise<Page> {
    return await prisma.page.delete({
      where: { id }
    })
  }

  // Create a new version of a page
  static async createPageVersion(page_id: string, data: {
    title: string
    content: Record<string, unknown>
    status: PageStatus
    created_by: string
  }): Promise<Record<string, unknown>> {
    // Get the current version number
    const currentVersion = await prisma.pageVersion.findFirst({
      where: { page_id },
      orderBy: { version_number: 'desc' }
    })

    const newVersionNumber = (currentVersion?.version_number || 0) + 1

    // Set all existing versions as not current
    await prisma.pageVersion.updateMany({
      where: { page_id },
      data: { is_current: false }
    })

    // Create new version
    return await prisma.pageVersion.create({
      data: {
        page_id,
        version_number: newVersionNumber,
        title: data.title,
        content: data.content,
        status: data.status,
        created_by: data.created_by,
        is_current: true
      }
    })
  }

  // Get page versions
  static async getPageVersions(page_id: string): Promise<Record<string, unknown>[]> {
    return await prisma.pageVersion.findMany({
      where: { page_id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { version_number: 'desc' }
    })
  }

  // Check if slug is available
  static async isSlugAvailable(slug: string, site_id: string, excludeId?: string): Promise<boolean> {
    const existingPage = await prisma.page.findFirst({
      where: {
        slug,
        site_id,
        ...(excludeId && { id: { not: excludeId } })
      }
    })
    return !existingPage
  }
}
