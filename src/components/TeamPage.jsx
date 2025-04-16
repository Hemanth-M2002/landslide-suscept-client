import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Github, Linkedin, Briefcase, Brain, Code, Database, ChevronLeft } from 'lucide-react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} TeamMember
 * @property {string} name - The name of the team member
 * @property {string} role - The role/position of the team member
 * @property {string} image - URL to the team member's image
 * @property {string} department - The department the team member belongs to
 * @property {string[]} skills - Array of skills the team member possesses
 * @property {Object} social - Social media links
 * @property {string} social.email - Email address
 * @property {string} social.github - GitHub profile link
 * @property {string} social.linkedin - LinkedIn profile link
 */

const teamMembers = [
  {
    name: 'Kaarnika A',
    role: 'Team Lead & ARCGis Analyst',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
    department: 'Computer Science and Business Systems',
    skills: ['ArcGIS Analysis', 'Feature Engineering', 'Python', 'Machine Learning'],
    social: {
      email: 'kaarnika.a2021@sece.ac.in',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Srinidhi B',
    role: 'Full Stack Developer , ARCGIS Developer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    department: 'Computer Science and Business Systems',
    skills: ['React', 'Node.js', 'JavaScript', 'ArcGIS','GeoSpatical Data Analysis'],
    social: {
      email: 'srinidhi.b2021@sece.ac.in',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Balaji S',
    role: 'Full Stack Developer',
    image:'https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1744761186~exp=1744764786~hmac=0a68fabf4de62f52089ea4cb9fc012d914a3bb1ef5638410491b3ff6a9f0ce29&w=1380',
    department: 'Computer Science and Business Systems',
    skills: ['React','Node js','JavaScript','MongoDB','Postman'],
    social: {
      email: 'balaji.s2021csbs@sece.ac.in',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Hemanth M',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80',
    department: 'Computer Science and Business Systems',
    skills: ['React','Node js','JavaScript','MongoDB','Postman'],
    social: {
      email: 'hemanth.m2021@sece.ac.in',
      github: '#',
      linkedin: '#'
    }
  }
];

function TeamPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #1c1917, #0c0a09)', 
      color: '#f5f5f4'
    }}>
      {/* Header */}
      <Box component="header" sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        width: '100%', 
        borderBottom: '1px solid #292524',
        background: 'rgba(28, 25, 23, 0.8)',
        backdropFilter: 'blur(8px)'
      }}>
        <Container maxWidth="lg" sx={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="text"
              sx={{ 
                p: 1, 
                minWidth: 'auto',
                borderRadius: '50%',
                color: '#f5f5f4',
                '&:hover': { 
                  background: 'rgba(68, 64, 60, 0.5)' 
                }
              }}
              component={Link}
              to="/"
            >
              <ChevronLeft sx={{ height: 20, width: 20 }} />
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f5f5f4' }}>
              Our Team
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box component="section" sx={{ position: 'relative', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(28, 25, 23, 0.8), rgba(12, 10, 9, 0.8))' 
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <Typography
              variant="h1"
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #fcd34d, #f59e0b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 2
              }}
            >
              Meet Our Team
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: '#d6d3d1',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              A dedicated group of students working on innovative solutions for landslide susceptibility mapping
            </Typography>
          </motion.div>

          {/* Team Members Grid */}
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={6} lg={3} key={member.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{
                    height: '100%',
                    background: '#292524',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.5)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <Box sx={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <Box 
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <Box sx={{ 
                      position: 'absolute', 
                      inset: 0, 
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%)' 
                    }} />
                  </Box>

                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#fcd34d', mb: 0.5 }}>
                      {member.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <Briefcase sx={{ width: 16, height: 16, color: '#f59e0b' }} />
                      <Typography variant="body2" sx={{ color: '#f59e0b' }}>
                        {member.role}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <GraduationCap sx={{ width: 16, height: 16, color: '#fcd34d' }} />
                      <Typography variant="body2" sx={{ color: '#fcd34d' }}>
                        {member.department}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {member.skills.map((skill) => (
                          <Box
                            key={skill}
                            sx={{ 
                              px: 1.5, 
                              py: 0.5, 
                              fontSize: '0.75rem', 
                              borderRadius: 10, 
                              background: 'rgba(146, 64, 14, 0.3)', 
                              color: '#fcd34d' 
                            }}
                          >
                            {skill}
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 3, 
                      pt: 2, 
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
                    }}>
                      <motion.a
                        href={`mailto:${member.social.email}?subject=Regarding Landslide Susceptibility Project`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ color: '#f59e0b', transition: 'color 0.2s' }}
                        aria-label={`Send email to ${member.name}`}
                      >
                        <Mail sx={{ width: 20, height: 20 }} />
                      </motion.a>
                      <motion.a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ color: '#f59e0b', transition: 'color 0.2s' }}
                        aria-label={`${member.name}'s GitHub profile`}
                      >
                        <Github sx={{ width: 20, height: 20 }} />
                      </motion.a>
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ color: '#f59e0b', transition: 'color 0.2s' }}
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin sx={{ width: 20, height: 20 }} />
                      </motion.a>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ 
              marginTop: 64,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24
            }}
          >
            {[
              { icon: Code, title: "Technical Excellence", desc: "Combining cutting-edge technology with geological expertise" },
              { icon: Brain, title: "Innovation Focus", desc: "Pushing boundaries in landslide prediction and analysis" },
              { icon: Database, title: "Data-Driven", desc: "Leveraging advanced analytics for accurate predictions" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (index * 0.2) }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Box sx={{ 
                  p: 4, 
                  background: '#292524', 
                  borderRadius: 3, 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'rgba(146, 64, 14, 0.2)',
                    mb: 3
                  }}>
                    <item.icon sx={{ width: 28, height: 28, color: '#f59e0b' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#fcd34d', mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#d6d3d1' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ 
        py: 4, 
        background: '#0c0a09', 
        borderTop: '1px solid #292524' 
      }}>
        <Container maxWidth="lg" sx={{ px: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 2, 
            textAlign: 'center' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <motion.a
                href="mailto:info@landslide-project.org"
                whileHover={{ scale: 1.05 }}
                style={{ 
                  color: '#a8a29e', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                <Mail sx={{ height: 16, width: 16 }} />
                <span>info@landslide-project.org</span>
              </motion.a>
            </Box>
            <Typography sx={{ fontSize: '0.875rem', color: '#78716c' }}>
              © {new Date().getFullYear()} Landslide Susceptibility Project. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default TeamPage;