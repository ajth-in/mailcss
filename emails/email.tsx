import { Button, Html, Head, Body } from "@react-email/components";
import css from "./css";

export default function Email() {
  return (
    <Html>
      <Head />
      <Body>
        <Button
          href="https://example.com"
          style={css({ backgroundColor: "black.sa", accentColor: "red" })}
        >
          Click me
        </Button>
      </Body>
    </Html>
  );
}
