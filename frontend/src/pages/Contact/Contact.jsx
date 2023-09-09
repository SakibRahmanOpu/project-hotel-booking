import { toast } from "react-toastify";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import CommonSection from "../../Components/CommonSection/CommonSection";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    toast.success("Message sent successfully");
  };

  return (
    <>
      <CommonSection title={"Contact Us"} />
      <Container className="py-5">
        <h1 className="my-3 text-center">Leave Us a message</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                type="text"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="text" sm={2}>
              Message
            </Label>
            <Col sm={10}>
              <Input
                id="text"
                name="text"
                type="textarea"
                placeholder="Type your message..."
              />
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col
              sm={{
                offset: 2,
                size: 10,
              }}
            >
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default Contact;
