import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  topic: string;
  description: string;
}

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    topic: '',
    description: '',
  });

  const [emailError, setEmailError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setFormData((prevData) => ({ ...prevData, email }));
    validateEmail(email);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? null : 'Invalid email address');
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, topic: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>
          Support Ticket Form
        </Typography>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <RadioGroup
          name="topic"
          value={formData.topic}
          onChange={handleTopicChange}
        >
          <Typography variant="subtitle1" gutterBottom>
            What can we help you with today?
          </Typography>

          <FormControlLabel
            value="general"
            control={<Radio />}
            label="General"
          />
          <FormControlLabel
            value="bug"
            control={<Radio />}
            label="Bug"
          />
          <FormControlLabel
            value="feature"
            control={<Radio />}
            label="Feature Request"
          />
        </RadioGroup>

        <TextField
          label="Description (optional)"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send
        </Button>
      </form>
    </Container>
  );
};

export default SupportPage;
