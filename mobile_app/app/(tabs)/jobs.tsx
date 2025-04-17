import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function JobsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="briefcase.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Jobs</ThemedText>
      </ThemedView>
      <ThemedText>Browse various job listings, opportunities, and more.</ThemedText>

      <Collapsible title="Job Categories">
        <ThemedText>
          You can find jobs in various categories such as{' '}
          <ThemedText type="defaultSemiBold">Tech</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">Marketing</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">Design</ThemedText>, and{' '}
          <ThemedText type="defaultSemiBold">Finance</ThemedText>.
        </ThemedText>
        <ExternalLink href="https://www.example.com/jobs">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Apply for Jobs">
        <ThemedText>
          You can apply directly through the platform for any job posting you find.
        </ThemedText>
        <ExternalLink href="https://www.example.com/apply">
          <ThemedText type="link">Apply Now</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Job Alerts">
        <ThemedText>
          Enable notifications to get alerts for jobs that match your skills and preferences.
        </ThemedText>
        <ExternalLink href="https://www.example.com/alerts">
          <ThemedText type="link">Manage Alerts</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
