import { prisma } from '@/lib/prisma'
import { Navigation } from '@prisma/client'

export interface CreateNavigationData {
  site_id: string
  tenant_id: string
  structure: any
}

export interface UpdateNavigationData {
  structure: any
}

export interface NavigationWithRelations extends Navigation {
  site: {
    id: string
    name: string
    slug: string
  }
}

export class NavigationService {
  // Create a new navigation
  static async createNavigation(data: CreateNavigationData): Promise<Navigation> {
    return await prisma.navigation.create({
      data
    })
  }

  // Get navigation for a site
  static async getNavigationBySite(site_id: string): Promise<NavigationWithRelations | null> {
    return await prisma.navigation.findUnique({
      where: { site_id },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })
  }

  // Update navigation
  static async updateNavigation(site_id: string, data: UpdateNavigationData): Promise<Navigation> {
    return await prisma.navigation.update({
      where: { site_id },
      data: {
        ...data,
        updated_at: new Date()
      }
    })
  }

  // Upsert navigation (create if doesn't exist, update if it does)
  static async upsertNavigation(site_id: string, tenant_id: string, data: CreateNavigationData): Promise<Navigation> {
    return await prisma.navigation.upsert({
      where: { site_id },
      update: {
        structure: data.structure,
        updated_at: new Date()
      },
      create: data
    })
  }

  // Delete navigation
  static async deleteNavigation(site_id: string): Promise<Navigation> {
    return await prisma.navigation.delete({
      where: { site_id }
    })
  }
}
