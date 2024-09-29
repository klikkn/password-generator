'use client'

import { useEffect, useState } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, InputGroup, InputRightElement, HStack, useBreakpointValue } from '@chakra-ui/react';
import { CheckIcon, RepeatIcon, CopyIcon } from '@chakra-ui/icons';

import { generatePassword } from '@/utils/generate-password';

const PasswordGenerator = () => {
  const toast = useToast();

  const [dictionary, setDictionary] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const onGenerate = () => {
    setRepeatPassword('');
    setIsMatch(false);

    const newPassword = generatePassword(dictionary, passwordLength);
    setPassword(newPassword);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "Copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    });
  };

  const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRepeatPassword(value);
    setIsMatch(value === password);
  };

  useEffect(() => {
    import('@/assets/qwerty-left-hand-db.json')
      .then((module) => module.default)
      .then((data: any) => {
        try {
          setDictionary(data);
        } catch (error) {
          console.error('Error parsing JSON data', error);
        }
      })
      .catch((error) => {
        console.error('Error loading JSON file', error);
      });
  }, []);

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
            Offline Left Hand Password Generator
          </Text>

          <HStack width="100%">
            <Input
              value={password}
              isReadOnly
              placeholder="Generated password will appear here"
              size={{ base: "lg" }}
            />
            <Button
              onClick={() => copyToClipboard(password)}
              colorScheme="blue"
              isDisabled={!password}
              size={{ base: "lg" }}
            >
              <CopyIcon />
            </Button>
          </HStack>

          <InputGroup size={{ base: "lg" }}>
            <HStack width="100%">
              <Input
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
                placeholder="Check how easy to enter this password"
                size={{ base: "lg" }}
              />
              {isMatch && (
                <InputRightElement>
                  <CheckIcon color="green.500" />
                </InputRightElement>
              )}
            </HStack>
          </InputGroup>

          <Button
            width={{ base: "100%" }}
            onClick={onGenerate}
            colorScheme="teal"
            size={{ base: "lg" }}
          >
            <HStack>
              <RepeatIcon />
              <span>Generate</span>
            </HStack>
          </Button>

          <Text>Length: {passwordLength}</Text>
          <Slider
            value={passwordLength}
            onChange={(val) => setPasswordLength(val)}
            min={1}
            max={16}
            step={1}
            size={{ base: "sm", md: "md", lg: "lg" }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
    </Flex>
  );
};

export default PasswordGenerator;
