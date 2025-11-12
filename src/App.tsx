import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Outlet />
    </Container>
  )
}

export default App

