import { prisma } from '@/lib/prisma'
import { Theme } from '@prisma/client'

export interface CreateThemeData {
  site_id: string
  tenant_id: string
  primary_color: string
  secondary_color: string
  custom_css?: string
}

export interface UpdateThemeData {
  primary_color?: string
  secondary_color?: string
  custom_css?: string
}

export interface ThemeWithRelations extends Theme {
  site: {
    id: string
    name: string
    slug: string
  }
}

export class ThemesService {
  // Create a new theme
  static async createTheme(data: CreateThemeData): Promise<Theme> {
    return await prisma.theme.create({
      data
    })
  }

  // Get theme for a site
  static async getThemeBySite(site_id: string): Promise<ThemeWithRelations | null> {
    return await prisma.theme.findUnique({
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

  // Update a theme
  static async updateTheme(site_id: string, data: UpdateThemeData): Promise<Theme> {
    return await prisma.theme.update({
      where: { site_id },
      data: {
        ...data,
        updated_at: new Date()
      }
    })
  }

  // Upsert a theme (create if doesn't exist, update if it does)
  static async upsertTheme(site_id: string, tenant_id: string, data: CreateThemeData): Promise<Theme> {
    return await prisma.theme.upsert({
      where: { site_id },
      update: {
        ...data,
        updated_at: new Date()
      },
      create: data
    })
  }

  // Delete a theme
  static async deleteTheme(site_id: string): Promise<Theme> {
    return await prisma.theme.delete({
      where: { site_id }
    })
  }
}
