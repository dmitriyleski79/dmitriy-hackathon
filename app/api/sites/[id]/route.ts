import { NextRequest, NextResponse } from 'next/server'
import { SitesService } from '@/lib/db/sites'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const site = await SitesService.getSiteById(params.id)
    
    if (!site) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(site)
  } catch (error) {
    console.error('Error fetching site:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, slug, description } = body

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug is available (excluding current site)
    const isSlugAvailable = await SitesService.isSlugAvailable(slug, body.tenant_id, params.id)
    if (!isSlugAvailable) {
      return NextResponse.json(
        { error: 'Site slug already exists' },
        { status: 409 }
      )
    }

    const site = await SitesService.updateSite(params.id, {
      name,
      slug,
      description
    })

    return NextResponse.json(site)
  } catch (error) {
    console.error('Error updating site:', error)
    return NextResponse.json(
      { error: 'Failed to update site' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const site = await SitesService.deleteSite(params.id)
    return NextResponse.json(site)
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json(
      { error: 'Failed to delete site' },
      { status: 500 }
    )
  }
}
