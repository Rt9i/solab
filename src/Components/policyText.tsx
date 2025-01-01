import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const policyText = () => {
  const handleLinkPress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Error opening link:', err),
    );
  };
  return (
    <View style={styles.policyBox}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollInner}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.sectionNumber}>
          1. <Text style={styles.subtitle}>Introduction</Text>
        </Text>
        <Text style={styles.paragraph}>
          Welcome to Solab. We respect your privacy and are committed to
          protecting the personal information you share with us. This policy
          describes how we collect, use, and share your personal information.
          For more information, please visit our full privacy policy at{' '}
          <Text
            style={styles.link}
            onPress={() => handleLinkPress('https://www.termsfeed.com/live/0d17353b-348e-4ced-85ea-ef8c630a3f21')}
          >solab's policy </Text>
          .
        </Text>

        <Text style={styles.divider} />

        <Text style={styles.heading}>Terms of Service</Text>
        <Text style={styles.sectionNumber}>
          1. <Text style={styles.subtitle}>Acceptance of Terms</Text>
        </Text>
        <Text style={styles.paragraph}>
          By accessing or using Solab's services, you agree to comply with and
          be bound by these Terms of Service. If you do not agree to these
          terms, please refrain from using our services.
        </Text>

        <Text style={styles.sectionNumber}>
          2. <Text style={styles.subtitle}>Use of the Services</Text>
        </Text>
        <Text style={styles.paragraph}>
          You agree to use our services only for lawful purposes and in
          compliance with these terms. Misuse of the services, such as engaging
          in fraudulent activities, providing false information, or violating
          local laws, is strictly prohibited. We reserve the right to suspend or
          terminate accounts that violate these terms.
        </Text>

        <Text style={styles.sectionNumber}>
          3. <Text style={styles.subtitle}>Orders, Booking, and Payments</Text>
        </Text>
        <Text style={styles.paragraph}>
          - Orders: By placing an order, you confirm the information provided is
          accurate. Orders are subject to availability and payment confirmation.
          {'\n'}- Booking: Appointments must be made via our platform.
          Cancellations should be done 24 hours in advance for a full refund.{' '}
          {'\n'}- Payments: All payments are processed securely using
          third-party payment gateways. We are not responsible for errors caused
          by these services.
        </Text>

        <Text style={styles.sectionNumber}>
          4. <Text style={styles.subtitle}>Intellectual Property</Text>
        </Text>
        <Text style={styles.paragraph}>
          All content, trademarks, and logos are owned by Solab or used under
          license. You must not reproduce, distribute, or modify any content
          without our prior written permission.
        </Text>

        <Text style={styles.sectionNumber}>
          5. <Text style={styles.subtitle}>Shipping, Returns, and Refunds</Text>
        </Text>
        <Text style={styles.paragraph}>
          - Shipping: Orders are processed within 1-2 business days. Delivery
          times may vary by location. {'\n'}- Returns: Unopened products can be
          returned within 30 days for a full refund. Return shipping costs are
          the responsibility of the customer unless the product is defective.{' '}
          {'\n'}- Refunds: Refunds will be issued to the original payment
          method.
        </Text>

        <Text style={styles.sectionNumber}>
          6. <Text style={styles.subtitle}>Limitation of Liability</Text>
        </Text>
        <Text style={styles.paragraph}>
          Solab provides services "as is" and is not liable for any indirect or
          consequential damages. Our maximum liability is limited to the amount
          paid for the services.
        </Text>

        <Text style={styles.sectionNumber}>
          7. <Text style={styles.subtitle}>Governing Law</Text>
        </Text>
        <Text style={styles.paragraph}>
          These terms are governed by the laws of Israel. Any disputes arising
          from these terms will be resolved in the courts of Haifa, Israel.
        </Text>

        <Text style={styles.sectionNumber}>
          8. <Text style={styles.subtitle}>Contact Us</Text>
        </Text>
        <Text style={styles.paragraph}>
          If you have any questions regarding these terms, please contact us at
          solabgrooming@gmail.com.
        </Text>
      </ScrollView>
    </View>
  );
};

export default policyText;

const styles = StyleSheet.create({
  policyBox: {
    flex: 1,
    width: '85%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollInner: {
    paddingVertical: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  sectionNumber: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
    fontWeight: '600',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  divider: {
    marginVertical: 20,
    borderBottomColor: '#999',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
