import { prisma } from '@/lib/prisma'
import { Site, User } from '@prisma/client'

export interface CreateSiteData {
  name: string
  slug: string
  description?: string
  tenant_id: string
  created_by: string
}

export interface UpdateSiteData {
  name?: string
  slug?: string
  description?: string
}

export interface SiteWithRelations extends Site {
  tenant: {
    id: string
    name: string
    slug: string
  }
  creator: {
    id: string
    name: string
    email: string
  }
  _count: {
    pages: number
    assets: number
  }
}

export class SitesService {
  // Create a new site
  static async createSite(data: CreateSiteData): Promise<Site> {
    return await prisma.site.create({
      data
    })
  }

  // Get all sites for a tenant
  static async getSitesByTenant(tenant_id: string): Promise<SiteWithRelations[]> {
    return await prisma.site.findMany({
      where: { tenant_id },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            pages: true,
            assets: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Get a single site by ID
  static async getSiteById(id: string): Promise<SiteWithRelations | null> {
    return await prisma.site.findUnique({
      where: { id },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            pages: true,
            assets: true
          }
        }
      }
    })
  }

  // Get a site by slug
  static async getSiteBySlug(slug: string, tenant_id: string): Promise<SiteWithRelations | null> {
    return await prisma.site.findFirst({
      where: { 
        slug,
        tenant_id
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            pages: true,
            assets: true
          }
        }
      }
    })
  }

  // Update a site
  static async updateSite(id: string, data: UpdateSiteData): Promise<Site> {
    return await prisma.site.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      }
    })
  }

  // Delete a site
  static async deleteSite(id: string): Promise<Site> {
    return await prisma.site.delete({
      where: { id }
    })
  }

  // Check if slug is available
  static async isSlugAvailable(slug: string, tenant_id: string, excludeId?: string): Promise<boolean> {
    const existingSite = await prisma.site.findFirst({
      where: {
        slug,
        tenant_id,
        ...(excludeId && { id: { not: excludeId } })
      }
    })
    return !existingSite
  }
}
