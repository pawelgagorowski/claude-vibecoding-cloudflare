export type CustomerStatus = 'active' | 'pending' | 'inactive'

export type Customer = {
  id: string
  name: string
  email: string
  city: string
  status: CustomerStatus
  lastOrderAt: string
}

export const customers: Customer[] = [
  { id: 'c-001', name: 'Emily Carter', email: 'emily.carter@example.com', city: 'Boston', status: 'active', lastOrderAt: '2026-09-28' },
  { id: 'c-002', name: 'James Miller', email: 'james.miller@example.com', city: 'Chicago', status: 'pending', lastOrderAt: '2026-09-14' },
  { id: 'c-003', name: 'Olivia Johnson', email: 'olivia.j@example.com', city: 'Denver', status: 'active', lastOrderAt: '2026-10-02' },
  { id: 'c-004', name: 'Michael Brown', email: 'm.brown@example.com', city: 'Austin', status: 'inactive', lastOrderAt: '2026-05-19' },
  { id: 'c-005', name: 'Sophia Davis', email: 'sophia.davis@example.com', city: 'Seattle', status: 'active', lastOrderAt: '2026-10-06' },
]
