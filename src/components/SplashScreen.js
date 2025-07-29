import { useEffect, useState } from 'react'
import { Center, Box, Image, Loader, Stack, Text, Transition } from '@mantine/core';
import '@mantine/core/styles.css';
import pokeSplash from '../Assets/pokeSplash.png';


const SplashScreen = ({ onFinish }) => {

  const [showImage, setShowImage] = useState(false);

  useEffect(() => {

    const imageTimer = setTimeout(() => {
      setShowImage(true);
    }, 200);

    const splashTimer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(splashTimer);
    };
  }, [onFinish]);

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        alignContent: 'center',
        backgroundImage: 'linear-gradient(to bottom , #4f46e5,rgb(230, 234, 242))'
      }}>
      <Center >
        <Transition mounted={showImage} duration={2000} transition="pop" timingFunction='ease'>
          {(styles) => (
            <Image
              src={pokeSplash}
              fit="contain"
              h={450}
              w={450}
              style={styles}
            />
          )}
        </Transition>
        <Box
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            width: "100%"

          }}>
          <Stack align='center'>
            <Loader color='blue' type="dots" size="md" />
            <Text size='lg' c="dimmed">Charging PokéPower... Almost there!</Text>
          </Stack>
        </Box>
      </Center>
    </Box>
  )
}

export default SplashScreen;