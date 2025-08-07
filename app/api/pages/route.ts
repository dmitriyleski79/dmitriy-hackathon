import { NextRequest, NextResponse } from 'next/server'
import { PagesService } from '@/lib/db/pages'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const site_id = searchParams.get('site_id')

    if (!site_id) {
      return NextResponse.json(
        { error: 'Site ID is required' },
        { status: 400 }
      )
    }

    const pages = await PagesService.getPagesBySite(site_id)
    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, status, site_id, tenant_id, created_by } = body

    // Validate required fields
    if (!title || !slug || !site_id || !tenant_id || !created_by) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if slug is available
    const isSlugAvailable = await PagesService.isSlugAvailable(slug, site_id)
    if (!isSlugAvailable) {
      return NextResponse.json(
        { error: 'Page slug already exists' },
        { status: 409 }
      )
    }

    const page = await PagesService.createPage({
      title,
      slug,
      content: content || {},
      status: status || 'DRAFT',
      site_id,
      tenant_id,
      created_by
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
