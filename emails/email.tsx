import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { css } from "./css";

interface AWSVerifyEmailProps {
  verificationCode?: string;
}

const baseUrl = `https://ajth.in`;

export default function AWSVerifyEmail({ verificationCode }: AWSVerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>AWS Email Verification</Preview>
      <Body style={css({ backgroundColor: "gray.100", color: "gray.900", display: "flex" })}>
        <Container
          style={css({ padding: "section", marginX: "auto", backgroundColor: "gray.100" })}
        >
          <Section style={css({ backgroundColor: "gray.50" })}>
            <Section
              style={css({
                boxShadow: "drop-shadow-2xl",
                color: "zinc.800",
                backgroundColor: "button.primary",
                display: "grid",
                marginTop: "calc(100dvw - min(max(100px, 90rem)), 10px)",
                paddingY: "section",
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Img src={`${baseUrl}/static/aws-logo.png`} width="75" height="45" alt="AWS Logo" />
            </Section>

            <Section style={css({ paddingY: "contentY", paddingX: "contentX" })}>
              <Heading
                style={css({
                  color: "gray.800",
                  fontSize: "title",
                  fontWeight: "bold",
                  marginBottom: "heading",
                })}
              >
                Verify your email address
              </Heading>
              <Text
                style={css({
                  color: "gray.800",
                  fontSize: "body",
                  lineHeight: "relaxed",
                  marginTop: "6",
                  marginBottom: "text",
                  marginX: "0",
                })}
              >
                Thanks for starting the new AWS account creation process. We want to make sure it's
                really you. Please enter the following verification code when prompted. If you
                don&apos;t want to create an account, you can ignore this message.
              </Text>
              <Section
                style={css({ display: "flex", alignItems: "center", justifyContent: "center" })}
              >
                <Text
                  style={css({
                    color: "gray.800",
                    margin: "0",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "body",
                  })}
                >
                  Verification code
                </Text>

                <Text
                  style={css({
                    color: "brand.blue",
                    fontSize: "code",
                    marginY: "10px",
                    marginX: "0",
                    fontWeight: "bold",
                    textAlign: "center",
                  })}
                >
                  {verificationCode}
                </Text>
                <Text
                  style={css({
                    color: "gray.800",
                    fontSize: "body",
                    margin: "0",
                    textAlign: "center",
                  })}
                >
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>

            <Hr />

            <Section style={css({ paddingY: "contentY", paddingX: "contentX" })}>
              <Text style={css({ color: "gray.800", fontSize: "body", margin: "0" })}>
                Amazon Web Services will never email you and ask you to disclose or verify your
                password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>

          <Text
            style={css({
              color: "gray.800",
              fontSize: "footer",
              marginY: "24px",
              marginX: "0",
              paddingX: "section",
              paddingY: "0",
            })}
          >
            This message was produced and distributed by Amazon Web Services, Inc., 41 Terry Ave.
            North, Seattle, WA 98109. © 2022, Amazon Web Services, Inc. All rights reserved. AWS is
            a registered trademark of{" "}
            <Link
              href="https://amazon.com"
              target="_blank"
              style={css({ color: "brand.blue", textDecoration: "underline", fontSize: "body" })}
            >
              Amazon.com
            </Link>
            , Inc. View our{" "}
            <Link
              href="https://amazon.com"
              target="_blank"
              style={css({ color: "brand.blue", textDecoration: "underline", fontSize: "body" })}
            >
              privacy policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

AWSVerifyEmail.PreviewProps = {
  verificationCode: "596853",
} satisfies AWSVerifyEmailProps;
