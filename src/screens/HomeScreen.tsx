import { Link } from 'react-router'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prototype } from '@/prototype'
import { screens } from '@/screens'

export function HomeScreen() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{prototype.name}</h1>
        <p className="mt-2 text-muted-foreground">{prototype.description}</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {screens.map((screen) => (
          <li key={screen.path}>
            <Link to={screen.path} className="block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>{screen.title}</CardTitle>
                  <CardDescription>{screen.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
