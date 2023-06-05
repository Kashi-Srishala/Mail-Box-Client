import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:8000";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Send Successfully !");
        }
      });
  };

  return (
    <Container>
      <h1>Send email to the account</h1>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Receiver's Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the subject here..."
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message here..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={() => sendEmail()}>
          Send Email
        </Button>
      </Form>
    </Container>
  );
}
