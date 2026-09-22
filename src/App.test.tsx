import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SiteRoutes } from './App'

function renderRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SiteRoutes />
    </MemoryRouter>,
  )
}

describe('Pip landing page', () => {
  it('guides visitors from the hero into the product story', () => {
    const { container } = renderRoute('/')

    expect(
      screen.getByRole('heading', { name: /your money, ready when you ask/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /explore what pip can do/i }),
    ).toHaveAttribute('href', '#features')
    expect(screen.getByText(/available on google play/i)).toBeInTheDocument()

    expect(container.querySelector('.hero__header')).toBeInTheDocument()
    expect(container.querySelector('.hero__details')).toBeInTheDocument()
    expect(container.querySelector('.hero-demo')).toBeInTheDocument()
    expect(document.title).toBe('Pip')
    expect(
      screen.queryByText(/know your money without turning it into a second job/i),
    ).not.toBeInTheDocument()
  })

  it('links to the FAQ route and Pip Instagram profile', () => {
    renderRoute('/')

    const faqLinks = screen.getAllByRole('link', { name: /^faq$/i })
    expect(faqLinks.length).toBeGreaterThan(0)
    faqLinks.forEach((link) => expect(link).toHaveAttribute('href', '/faq'))
    expect(
      screen.getByRole('link', { name: /connect with us/i }),
    ).toHaveAttribute('href', 'https://www.instagram.com/pipsavings/')
  })

  it('renders a useful FAQ placeholder route', () => {
    renderRoute('/faq')

    expect(
      screen.getByRole('heading', { name: /questions deserve clear answers/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to pip/i })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it('renders the authentic Ask Pip demonstration video', () => {
    renderRoute('/')

    const video = screen.getByLabelText(/demonstration of ask pip/i)
    expect(video).toBeInTheDocument()
    expect(video.tagName.toLowerCase()).toBe('video')
  })

  it('renders the authentic Pip vector logo across the page', () => {
    renderRoute('/')

    const pipLogos = screen.getAllByRole('img', { name: /pip mascot/i })
    expect(pipLogos.length).toBeGreaterThan(0)
    expect(pipLogos[0].tagName.toLowerCase()).toBe('svg')
  })
})

