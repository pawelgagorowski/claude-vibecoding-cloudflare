import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type CustomerStatus, customers } from '@/mocks/customers'

const statusLabel: Record<CustomerStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
}

const statusVariant: Record<CustomerStatus, 'default' | 'secondary' | 'outline'> = {
  active: 'default',
  pending: 'secondary',
  inactive: 'outline',
}

export function CustomersScreen() {
  const [query, setQuery] = useState('')

  const visibleCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.city}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Customers</CardTitle>
          <CardDescription>
            Example screen: a table backed by src/mocks/customers.ts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              aria-label="Search customers"
              placeholder="Search by name, email or city…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button>Add customer</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Last order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-muted-foreground">{customer.email}</div>
                  </TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[customer.status]}>
                      {statusLabel[customer.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{customer.lastOrderAt}</TableCell>
                </TableRow>
              ))}
              {visibleCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No results for “{query}”.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
