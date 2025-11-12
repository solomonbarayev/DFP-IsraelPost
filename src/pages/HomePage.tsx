import { Box, Typography, Paper } from '@mui/material'
import { Home } from 'lucide-react'

function HomePage() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Home size={32} />
        <Typography variant="h4" component="h1">
          Welcome to DFP IsraelPost
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        Your React + TypeScript + Vite project is ready to go!
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Installed packages:
        </Typography>
        <Typography component="ul" sx={{ pl: 3 }}>
          <li>React 18 with TypeScript</li>
          <li>Vite</li>
          <li>React Router</li>
          <li>Material-UI v6</li>
          <li>Redux Toolkit & RTK Query</li>
          <li>Lucide React (Icons)</li>
        </Typography>
      </Box>
    </Paper>
  )
}

export default HomePage

