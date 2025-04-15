import { Card, CardContent, Typography, Grid, Container, Box, Button } from '@mui/material';
import { Mountain, Triangle, Compass, LineChart, Activity, Droplet, Layers, Leaf, Construction, History, Map, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { title: "Elevation", icon: Mountain, desc: "Altitude of terrain, key for identifying slope-based risks." },
  { title: "Slope", icon: Triangle, desc: "Measures steepness — a primary landslide trigger." },
  { title: "Aspect", icon: Compass, desc: "Slope orientation, affects weathering and moisture." },
  { title: "Curvature", icon: LineChart, desc: "Terrain shape that indicates runoff flow and stability." },
  { title: "Distance to Roads", icon: Map, desc: "Human-made elements influencing soil erosion." },
  { title: "Distance to Fault Lines", icon: Activity, desc: "Geological stress zones with landslide likelihood." },
  { title: "Distance to Watercourses", icon: Droplet, desc: "Water bodies nearby can trigger slope failure." },
  { title: "Land Cover Types", icon: Layers, desc: "Surface classification: urban, forest, barren, etc." },
  { title: "Vegetation Coverage", icon: Leaf, desc: "Vegetation reduces erosion and supports slope integrity." },
  { title: "Soil Moisture", icon: Droplets, desc: "Water saturation level, a landslide trigger factor." },
  { title: "Anthropogenic Factors", icon: Construction, desc: "Impact of human activities like mining or urbanization." },
  { title: "Historical Landslide Data", icon: History, desc: "Past events used for training and validation." }
];

export default function FeaturesPage() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="features-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          minHeight: '100vh', 
          background: '#121212',
          py: 6, 
          px: { xs: 2, sm: 4, lg: 8 },
          color: '#fff'
        }}>
          <Container>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom sx={{ color: '#FFC107' }}>
                  Features Used in Landslide Susceptibility Mapping
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', color: '#e0e0e0' }}>
                  Input variables used in the CasNN + SVM hybrid ML model.
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%' }}
                  >
                    <Card sx={{ 
                      borderRadius: 4, 
                      boxShadow: 2,
                      transition: 'all 0.15s ease-out',
                      '&:hover': { 
                        boxShadow: '0 0 20px 5px rgba(255, 193, 7, 0.3)', 
                        backgroundColor: '#252525',
                        cursor: 'pointer'
                      },
                      backgroundColor: '#1E1E1E',
                      border: '1px solid #333',
                      height: '100%'
                    }}>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                        <feature.icon style={{ width: 40, height: 40, color: '#FFC107', marginBottom: 16 }} />
                        <Typography variant="h6" component="h3" gutterBottom sx={{ color: '#fff' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                          {feature.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Box sx={{ textAlign: 'center', mt: 8, maxWidth: '600px', mx: 'auto' }}>
                <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                  All features were normalized and preprocessed before being fed into a hybrid machine learning model combining Cascading Neural Networks and Support Vector Machines (CasNN + SVM).
                </Typography>
                <Button 
                  href="/"
                  sx={{ 
                    mt: 3, 
                    color: '#FFC107', 
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline', background: 'rgba(255, 193, 7, 0.08)' } 
                  }}
                >
                  &larr; Back
                </Button>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
