import { prisma } from '@/lib/prisma'
import { Asset } from '@prisma/client'

export interface CreateAssetData {
  name: string
  file_path: string
  file_type: string
  file_size: number
  site_id: string
  tenant_id: string
  uploaded_by: string
}

export interface UpdateAssetData {
  name?: string
  file_path?: string
}

export interface AssetWithRelations extends Asset {
  site: {
    id: string
    name: string
    slug: string
  }
  uploader: {
    id: string
    name: string
    email: string
  }
}

export class AssetsService {
  // Create a new asset
  static async createAsset(data: CreateAssetData): Promise<Asset> {
    return await prisma.asset.create({
      data
    })
  }

  // Get all assets for a site
  static async getAssetsBySite(site_id: string): Promise<AssetWithRelations[]> {
    return await prisma.asset.findMany({
      where: { site_id },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        uploader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Get a single asset by ID
  static async getAssetById(id: string): Promise<AssetWithRelations | null> {
    return await prisma.asset.findUnique({
      where: { id },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        uploader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  // Update an asset
  static async updateAsset(id: string, data: UpdateAssetData): Promise<Asset> {
    return await prisma.asset.update({
      where: { id },
      data
    })
  }

  // Delete an asset
  static async deleteAsset(id: string): Promise<Asset> {
    return await prisma.asset.delete({
      where: { id }
    })
  }

  // Get assets by file type
  static async getAssetsByType(site_id: string, file_type: string): Promise<AssetWithRelations[]> {
    return await prisma.asset.findMany({
      where: { 
        site_id,
        file_type
      },
      include: {
        site: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        uploader: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })
  }

  // Get total file size for a site
  static async getTotalFileSize(site_id: string): Promise<number> {
    const result = await prisma.asset.aggregate({
      where: { site_id },
      _sum: {
        file_size: true
      }
    })
    return result._sum.file_size || 0
  }

  // Get assets count by type
  static async getAssetsCountByType(site_id: string): Promise<{ file_type: string; count: number }[]> {
    return await prisma.asset.groupBy({
      by: ['file_type'],
      where: { site_id },
      _count: {
        file_type: true
      }
    })
  }
}
