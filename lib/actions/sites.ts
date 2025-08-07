'use server'

import { SitesService } from '@/lib/db/sites'

export async function getSites(tenant_id: string) {
  try {
    const sites = await SitesService.getSitesByTenant(tenant_id)
    return { success: true, data: sites }
  } catch (error) {
    console.error('Error fetching sites:', error)
    return { success: false, error: 'Failed to fetch sites', data: [] }
  }
}

export async function getSite(site_id: string) {
  try {
    const site = await SitesService.getSiteById(site_id)
    return { success: true, data: site }
  } catch (error) {
    console.error('Error fetching site:', error)
    return { success: false, error: 'Failed to fetch site' }
  }
}

export async function getSiteBySlug(slug: string, tenant_id: string) {
  try {
    const site = await SitesService.getSiteBySlug(slug, tenant_id)
    return { success: true, data: site }
  } catch (error) {
    console.error('Error fetching site by slug:', error)
    return { success: false, error: 'Failed to fetch site' }
  }
}
