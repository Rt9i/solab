import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

/**
 * A simple, scrollable policy page
 * you can adapt for either Privacy Policy or Terms of Service.
 */
export default function Policy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.paragraph}>
        1. <Text style={styles.subtitle}>Introduction</Text>
      </Text>
      <Text style={styles.paragraph}>
        Welcome to [Your Company Name]. We respect your privacy and are committed
        to protecting the personal information you share with us. This policy
        describes how we collect, use, and share your personal information.
      </Text>
      
      <Text style={styles.paragraph}>
        2. <Text style={styles.subtitle}>Information We Collect</Text>
      </Text>
      <Text style={styles.paragraph}>
        We collect information you provide to us, such as your name and email
        address, when you register for our services or communicate with us. We
        may also automatically collect information like device identifiers or
        usage data when you use our application.
      </Text>
      
      <Text style={styles.paragraph}>
        3. <Text style={styles.subtitle}>How We Use Information</Text>
      </Text>
      <Text style={styles.paragraph}>
        We may use the information collected to provide and improve our services,
        personalize user experiences, and communicate updates. We do not share
        your personal information with third parties except for trusted partners
        who assist in our operations, or when required by law.
      </Text>
      
      <Text style={styles.paragraph}>
        4. <Text style={styles.subtitle}>Data Security</Text>
      </Text>
      <Text style={styles.paragraph}>
        We implement reasonable security measures to protect your data. However,
        no method of transmission over the Internet is 100% secure, and we cannot
        guarantee absolute security of your information.
      </Text>
      
      <Text style={styles.paragraph}>
        5. <Text style={styles.subtitle}>Changes to This Policy</Text>
      </Text>
      <Text style={styles.paragraph}>
        We may update this policy from time to time. We will notify you of any
        significant changes by posting the new policy on this page.
      </Text>
      
      <Text style={styles.paragraph}>
        6. <Text style={styles.subtitle}>Contact Us</Text>
      </Text>
      <Text style={styles.paragraph}>
        If you have questions or concerns about this Privacy Policy, please
        contact us at [Your Contact Email].
      </Text>

      <Text style={styles.divider} />

      <Text style={styles.heading}>Terms of Service</Text>
      <Text style={styles.paragraph}>
        1. <Text style={styles.subtitle}>Acceptance of Terms</Text>
      </Text>
      <Text style={styles.paragraph}>
        By accessing or using [Your Company Name]'s application, you agree to be
        bound by these Terms of Service. If you do not agree, please refrain from
        using our services.
      </Text>
      
      <Text style={styles.paragraph}>
        2. <Text style={styles.subtitle}>Use of the Application</Text>
      </Text>
      <Text style={styles.paragraph}>
        You agree not to misuse the application or engage in illegal activities.
        We reserve the right to suspend or terminate accounts that violate our
        policies.
      </Text>
      
      <Text style={styles.paragraph}>
        3. <Text style={styles.subtitle}>Intellectual Property</Text>
      </Text>
      <Text style={styles.paragraph}>
        All content, including trademarks and logos, are owned by [Your Company Name]
        or used under license. You must not reproduce or distribute any content
        without our express written permission.
      </Text>
      
      <Text style={styles.paragraph}>
        4. <Text style={styles.subtitle}>Limitation of Liability</Text>
      </Text>
      <Text style={styles.paragraph}>
        We provide the application “as is” and assume no liability for errors,
        bugs, or interruptions. Our liability to you is limited to the maximum
        extent permitted by law.
      </Text>
      
      <Text style={styles.paragraph}>
        5. <Text style={styles.subtitle}>Governing Law</Text>
      </Text>
      <Text style={styles.paragraph}>
        These terms are governed by and construed in accordance with the laws of
        [Your Country/State]. Any disputes arising from these terms shall be
        resolved in the courts of [Your Jurisdiction].
      </Text>
      
      <Text style={styles.paragraph}>
        6. <Text style={styles.subtitle}>Contact Us</Text>
      </Text>
      <Text style={styles.paragraph}>
        If you have questions about these Terms, please contact us at [Your
        Contact Email].
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
