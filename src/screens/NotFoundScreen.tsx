import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function NotFoundScreen() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-4 p-12 text-center">
      <h1 className="text-2xl font-semibold">Screen not found</h1>
      <p className="text-muted-foreground">This link doesn't lead to any screen in the prototype.</p>
      <Button asChild>
        <Link to="/">Back to all screens</Link>
      </Button>
    </main>
  )
}
