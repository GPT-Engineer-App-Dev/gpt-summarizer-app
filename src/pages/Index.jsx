import { Box, Button, Container, Textarea, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { create } from "lib/openai";

const Index = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSummarize = async () => {
    if (text.trim() === "") {
      alert("Please enter some text to summarize.");
      return;
    }

    const response = await create({
      messages: [{ role: "user", content: text }],
      model: "gpt-3.5-turbo",
      instructions: "Provide a summary",
      temperature: 0.7,
      max_tokens: 150,
    });

    if (response.choices && response.choices.length > 0) {
      setSummary(response.choices[0].message.content);
    } else {
      setSummary("Failed to generate summary.");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Textarea placeholder="Enter your text here..." value={text} onChange={handleTextChange} size="lg" minHeight="200px" />
        <Button colorScheme="blue" onClick={handleSummarize}>
          Summarize
        </Button>
        <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
          <Text fontWeight="bold">Summary:</Text>
          <Text>{summary || "Your summary will appear here..."}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
