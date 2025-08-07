import { NextRequest, NextResponse } from 'next/server'
import { SitesService } from '@/lib/db/sites'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenant_id = searchParams.get('tenant_id')

    if (!tenant_id) {
      return NextResponse.json(
        { error: 'Tenant ID is required' },
        { status: 400 }
      )
    }

    const sites = await SitesService.getSitesByTenant(tenant_id)
    return NextResponse.json(sites)
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, tenant_id, created_by } = body

    // Validate required fields
    if (!name || !slug || !tenant_id || !created_by) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug is available
    const isSlugAvailable = await SitesService.isSlugAvailable(slug, tenant_id)
    if (!isSlugAvailable) {
      return NextResponse.json(
        { error: 'Site slug already exists' },
        { status: 409 }
      )
    }

    const site = await SitesService.createSite({
      name,
      slug,
      description,
      tenant_id,
      created_by
    })

    return NextResponse.json(site, { status: 201 })
  } catch (error) {
    console.error('Error creating site:', error)
    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    )
  }
}
