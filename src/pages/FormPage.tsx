import { useNavigate, useParams } from 'react-router-dom'
import { Suspense, useEffect, useState } from 'react'
import { Box, CircularProgress, GlobalStyles, Typography } from '@mui/material'

const FormPage = () => {
  const { formId } = useParams<{ formId: string }>()
  const [FormComponent, setFormComponent] = useState<React.ComponentType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadForm = async () => {
      if (!formId) {
        setError('Form ID is required')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        // Dynamically import the form component
        const formModule = await import(`../forms/${formId}/${formId}`);
        setFormComponent(() => formModule.default)
      } catch (err) {
         console.error(`Error loading form: ${error}`);
         navigate("/not-found");
      } finally {
        setLoading(false)
      }
    }

    loadForm()
  }, [formId])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error || !FormComponent) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography variant="h6" color="error">
          {error || 'Form not found'}
        </Typography>
      </Box>
    )
  }

  return (
    <Suspense
      fallback={
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      }
    >
      <Box maxWidth="md" display="flex" flexDirection="column" flex={1} width="100%">
        <GlobalStyles
          styles={{
            "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
        />

        <Box component="form" 
        // onSubmit={handleSubmit} 
        noValidate sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <FormComponent/>
        </Box>
      </Box>
    </Suspense>
  );
}

export default FormPage