import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Github, Linkedin, MapPin, Brain, Code, Database, ChevronLeft } from 'lucide-react';
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
    name: 'Alex Thompson',
    role: 'GIS Specialist & Team Lead',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80',
    department: 'Geoinformatics Engineering',
    skills: ['GIS Analysis', 'Remote Sensing', 'Python', 'Machine Learning'],
    social: {
      email: 'alex.t@university.edu',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Sarah Chen',
    role: 'Full Stack Developer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
    department: 'Computer Science Engineering',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    social: {
      email: 'sarah.c@university.edu',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Michael Rodriguez',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    department: 'Data Science',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'TensorFlow'],
    social: {
      email: 'michael.r@university.edu',
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Emily Zhang',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    department: 'Computer Science Engineering',
    skills: ['UI Design', 'Figma', 'User Research', 'Prototyping'],
    social: {
      email: 'emily.z@university.edu',
      github: '#',
      linkedin: '#'
    }
  }
];

function TeamPage() {
  return (
    <Box className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950 text-stone-50">
      {/* Header */}
      <Box component="header" className="sticky top-0 z-50 w-full border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm">
        <Container maxWidth="lg" className="flex h-16 items-center justify-between px-4">
          <Box className="flex items-center gap-2">
            <Button
              variant="text"
              className="p-2 hover:bg-stone-800 rounded-full text-stone-50"
              component={Link}
              to="/"
            >
              <ChevronLeft className="h-5 w征5" />
            </Button>
            <Typography variant="h6" className="font-bold text-stone-50">
              Our Team
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box component="section" className="relative py-16 md:py-24 overflow-hidden">
        <Box className="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-950/80" />
        <Container maxWidth="lg" className="relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Typography
              variant="h1"
              className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500"
            >
              Meet Our Team
            </Typography>
            <Typography variant="h7" className="md:text-lg text-stone-300 max-w-2xl mx-auto text-center">
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
                  className="bg-stone-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-200 mb-1">{member.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <p className="text-sm text-amber-400">{member.role}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-4 h-4 text-amber-300" />
                      <p className="text-sm text-amber-300">{member.department}</p>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded-full bg-amber-900/50 text-amber-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4 border-t border-stone-700">
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-amber-400 hover:text-amber-200 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={member.social.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-amber-400 hover:text-amber-200 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={member.social.linkedin}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-amber-400 hover:text-amber-200 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-6 bg-stone-800 rounded-xl shadow-lg">
              <Code className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-200 mb-2">Technical Excellence</h3>
              <p className="text-stone-300">Combining cutting-edge technology with geological expertise</p>
            </div>
            <div className="p-6 bg-stone-800 rounded-xl shadow-lg">
              <Brain className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-200 mb-2">Innovation Focus</h3>
              <p className="text-stone-300">Pushing boundaries in landslide prediction and analysis</p>
            </div>
            <div className="p-6 bg-stone-800 rounded-xl shadow-lg">
              <Database className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-amber-200 mb-2">Data-Driven</h3>
              <p className="text-stone-300">Leveraging advanced analytics for accurate predictions</p>
            </div>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" className="py-8 bg-stone-950 border-t border-stone-900">
        <Container maxWidth="lg" className="px-4">
          <Box className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <Box className="flex items-center gap-4">
              <a
                href="mailto:info@landslide-project.org"
                className="text-stone-400 hover:text-amber-400 transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                <span>info@landslide-project.org</span>
              </a>
            </Box>
            <Typography className="text-sm text-stone-500">
              © {new Date().getFullYear()} Landslide Susceptibility Project. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default TeamPage;