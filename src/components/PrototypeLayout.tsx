import { LayoutGrid } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'

export function PrototypeLayout() {
  const { pathname } = useLocation()

  return (
    <>
      <Outlet />
      {pathname !== '/' && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="fixed bottom-4 left-4 shadow-md"
        >
          <Link to="/">
            <LayoutGrid />
            All screens
          </Link>
        </Button>
      )}
    </>
  )
}
