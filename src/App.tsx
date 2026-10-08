import { Route, Routes } from 'react-router'
import { PrototypeLayout } from '@/components/PrototypeLayout'
import { screens } from '@/screens'
import { HomeScreen } from '@/screens/HomeScreen'
import { NotFoundScreen } from '@/screens/NotFoundScreen'

export function App() {
  return (
    <Routes>
      <Route element={<PrototypeLayout />}>
        <Route index element={<HomeScreen />} />
        {screens.map(({ path, component: Screen }) => (
          <Route key={path} path={path} element={<Screen />} />
        ))}
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  )
}
