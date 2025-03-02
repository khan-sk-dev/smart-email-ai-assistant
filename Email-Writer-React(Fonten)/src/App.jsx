import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"; // Importing Material-UI components for styling and layout
import axios from "axios"; // Importing Axios for making API requests
import { useState } from "react"; // Importing useState for managing component state
import "./App.css"; // Importing external CSS file for styling

function App() {
  // State variables for user input, response, and error handling
  const [emailContent, setEmailContent] = useState(""); // Stores the original email content
  const [tone, setTone] = useState(""); // Stores the selected tone (optional)
  const [generatedReply, setGeneratedReply] = useState(""); // Stores the AI-generated reply
  const [error, setError] = useState(""); // Stores error messages
  const [loading, setLoading] = useState(false); // Tracks whether the API request is in progress

  /**
   * Handles submission of the email content to the AI API for reply generation
   */
  const handelSubmit = async () => {
    setLoading(true); // Show loading indicator during API call
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate", // API endpoint for email generation
        {
          emailContent,
          tone,
        }
      );

      // Ensure response is properly formatted
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError(
        "An error occurred while generating the reply. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false); // Hide loading indicator once API call is complete
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      {/* Input Fields Section */}
      <Box sx={{ mx: 3 }}>
        {/* Email Content Input */}
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ""}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Tone Selection Dropdown */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            value={tone || ""}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        {/* Generate Reply Button */}
        <Button
          variant="contained"
          onClick={handelSubmit}
          disabled={!emailContent || loading} // Disable button when no input or while loading
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>

      {/* Error Message Display */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Generated Reply Display */}
      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ""}
            inputProps={{ readOnly: true }} // Makes the text field read-only
          />
          {/* Copy to Clipboard Button */}
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
