'use client'

import { useEffect, useState } from 'react';
import { Box, Button, Input, Text, VStack, useToast, Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, InputGroup, InputRightElement, HStack, Switch } from '@chakra-ui/react';
import { CheckIcon, RepeatIcon, CopyIcon } from '@chakra-ui/icons';

import { generatePassword } from '@/utils/generate-password';
import { replaceLettersWithSymbols } from '@/utils/letters-to-symbols';

const PasswordGenerator = () => {
  const toast = useToast();

  const [words, setWords] = useState<string[]>([]);
  const [replacements, setReplacements] = useState<{ [key: string]: string }>({});

  const [useSymbols, setUseSymbols] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(2);
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  const generateNewPassword = () => {
    let newPassword = generatePassword(words, passwordLength);
    if (useSymbols) {
      newPassword = replaceLettersWithSymbols(newPassword, replacements);
    }
    setPassword(newPassword);
  };

  const onGenerate = () => {
    setRepeatPassword('');
    setIsMatch(false);
    generateNewPassword();
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

  const getFontSize = (length: number) => {
    if (length <= 10) return 'lg';
    if (length <= 20) return 'md';
    if (length <= 20) return 'sm';
    return 'xs';
  };

  useEffect(() => {
    import('@/assets/pc-qwerty-left-hand.json')
      .then((module) => module.default)
      .then(({ words, replacements }: { words: string[], replacements: { [key: string]: string } }) => {
        try {
          setWords(words);
          setReplacements(replacements);
        } catch (error) {
          console.error('Error parsing JSON data', error);
        }
      })
      .catch((error) => {
        console.error('Error loading JSON file', error);
      });
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      generateNewPassword();
    }
  }, [words, passwordLength, useSymbols, replacements]);

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      p={{ base: 2, md: 4 }}
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
              fontSize={getFontSize(password.length)}
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
                placeholder="You can check how easy to use this password..."
                size={{ base: "lg" }}
                fontSize={getFontSize(repeatPassword.length)}
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

          <HStack width="100%" justifyContent="space-between">
            <Text>Use Symbols</Text>
            <Switch
              isChecked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
              colorScheme="teal"
              size="lg"
            />
          </HStack>

          <Text>Length: {passwordLength}</Text>
          <Slider
            value={passwordLength}
            onChange={(val) => setPasswordLength(val)}
            min={1}
            max={6}
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
