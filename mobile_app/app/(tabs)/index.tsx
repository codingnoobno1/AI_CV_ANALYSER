import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E3F2FD', dark: '#0D47A1' }}
      headerImage={
        <Image
          source={{
            uri: 'https://www.crowdcomms.com/wp-content/uploads/2023/06/Untitled-design-56-768x644.png',
          }}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AI_SKILL_SIGHT</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Explore Projects</ThemedText>
        <ThemedText>
          Visit the <ThemedText type="defaultSemiBold">Jobs</ThemedText> tab to find open projects or recruit teammates.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Upload Your Work</ThemedText>
        <ThemedText>
          Head to <ThemedText type="defaultSemiBold">Upload</ThemedText> to submit your prototype or pitch deck.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Verify Credentials</ThemedText>
        <ThemedText>
          Go to <ThemedText type="defaultSemiBold">Verify</ThemedText> to submit your student ID or team details.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 4: Connect with Others</ThemedText>
        <ThemedText>
          Use the <ThemedText type="defaultSemiBold">Profile</ThemedText> tab to view your badges, saved teams, and networking info.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  headerImage: {
    height: 180,
    width: 300,
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
});
