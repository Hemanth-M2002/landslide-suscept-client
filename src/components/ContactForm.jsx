import React from 'react';
import { Card, CardContent, TextField, Typography, Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { User, Mail, MessageSquare, ChevronDown } from 'lucide-react';

const ContactForm = () => {
  return (
    <Card className="bg-transparent shadow-lg rounded-lg">
      <CardContent className="p-8 space-y-6 bg-black bg-blur-sm">
        <Typography variant="h5" component="h2" className="text-white font-semibold mb-6">
          Contact Us
        </Typography>
        
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Box className="space-y-1">
            <Typography component="label" htmlFor="first-name" className="text-gray-200 text-sm font-medium flex items-center gap-1">
              <User size={16} /> First name
            </Typography>
            <TextField
              id="first-name"
              placeholder="Enter your first name"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                className: "bg-gray-800 border border-gray-700 focus:border-blue-500 rounded text-white",
              }}
            />
          </Box>

          <Box className="space-y-1">
            <Typography component="label" htmlFor="last-name" className="text-gray-200 text-sm font-medium flex items-center gap-1">
              <User size={16} /> Last name
            </Typography>
            <TextField
              id="last-name"
              placeholder="Enter your last name"
              variant="outlined"
              fullWidth
              size="small"
              InputProps={{
                className: "bg-gray-800 border border-gray-700 focus:border-blue-500 rounded text-white",
              }}
            />
          </Box>
        </Box>

        <Box className="space-y-1">
          <Typography component="label" htmlFor="email" className="text-gray-200 text-sm font-medium flex items-center gap-1">
            <Mail size={16} /> Email
          </Typography>
          <TextField
            id="email"
            type="email"
            placeholder="Enter your email address"
            variant="outlined"
            fullWidth
            size="small"
            InputProps={{
              className: "bg-gray-800 border border-gray-700 focus:border-blue-500 rounded text-white",
            }}
          />
        </Box>

        <Box className="space-y-1">
          <Typography component="label" className="text-gray-200 text-sm font-medium flex items-center gap-1">
            <ChevronDown size={16} /> Inquiry type
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              id="inquiry-type"
              defaultValue="general"
              variant="outlined"
              className="bg-gray-800 text-white rounded border-gray-700"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#374151', // gray-700
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#374151',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3B82F6', // blue-500
                },
              }}
            >
              <MenuItem value="general">General Inquiry</MenuItem>
              <MenuItem value="research">Research Collaboration</MenuItem>
              <MenuItem value="data">Data Request</MenuItem>
              <MenuItem value="press">Press/Media</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="space-y-1">
          <Typography component="label" htmlFor="message" className="text-gray-200 text-sm font-medium flex items-center gap-1">
            <MessageSquare size={16} /> Message
          </Typography>
          <TextField
            id="message"
            placeholder="Enter your message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            size="small"
            InputProps={{
              className: "bg-gray-800 border border-gray-700 focus:border-blue-500 rounded text-white",
            }}
          />
        </Box>

        <Box className="pt-2">
          <Button
            variant="contained"
            fullWidth
            className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm font-medium"
          >
            SEND MESSAGE
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactForm;