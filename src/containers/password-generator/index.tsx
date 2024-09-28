'use client'

import { useState } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Flex } from '@chakra-ui/react';

import { generatePassword } from '@/utils/generate-password';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const toast = useToast();

  const onGenerate = () => {
    const newPassword = generatePassword(12);
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast({
        title: "Copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    });
  };

  return (
    <Flex 
      height="100vh" 
      alignItems="center" 
      justifyContent="center"
    >
      <Box 
        p={{ base: 3, md: 5 }} 
        shadow="md" 
        borderWidth="1px" 
        borderRadius="md"
        width={{ base: '90%', md: '70%', lg: '50%' }}
      >
        <VStack 
          spacing={{ base: 3, md: 4 }}
        >
          <Text 
            fontSize={{ base: "xl", md: "2xl" }}
          >
            Password Generator
          </Text>
          <Input 
            value={password} 
            isReadOnly 
            placeholder="Generated password will appear here" 
            size={{ base: "sm", md: "md", lg: "lg" }}
          />
          <Button 
            onClick={onGenerate} 
            colorScheme="teal"
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            Generate Password
          </Button>
          <Button 
            onClick={copyToClipboard} 
            colorScheme="blue" 
            isDisabled={!password}
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            Copy to Clipboard
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default PasswordGenerator;