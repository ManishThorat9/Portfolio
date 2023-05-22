import { useState } from "react"
import { Col, Container,Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg"

export const Contact = () =>{
  const formInitialDetails ={
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message:""
  }
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code === 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };


  return(
    <section className="contact" id="contact">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={contactImg} alt="Contact Us" />
          </Col>
          <Col md={6}>
            <h2>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
            <Row>
            <Col sm={6} classname="px-1">
              <input type="text" name="" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName',e.target.value)} />
            </Col>
            <Col sm={6} classname="px-1">
              <input type="text" name="" value={formDetails.lastName} placeholder="last Name" onChange={(e) => onFormUpdate('lastName',e.target.value)} />
            </Col>
            <Col sm={6} classname="px-1">
              <input type="email" name="" value={formDetails.email} placeholder="Email" onChange={(e) => onFormUpdate('email',e.target.value)} />
            </Col>
            <Col sm={6} classname="px-1">
              <input type="tel" name="" value={formDetails.phone} placeholder="Phone no." onChange={(e) => onFormUpdate('phone',e.target.value)} />
            </Col>
            <Col>
            <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message',e.target.value)}></textarea>
            <button type="submit"><span>{buttonText}</span></button>
            </Col>
            {
              status.message &&
              <Col>
            <p classname={status.success ===false ? "danger" : "success"}>{status.message}</p>
              </Col>

            }
          </Row>


            </form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}