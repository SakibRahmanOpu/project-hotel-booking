import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../src/Components/CommonSection/CommonSection";
import Room from "../src/Components/Room/Room";

const SerachResultList = () => {
  const location = useLocation();
  const [data] = useState(location.state);
  console.log(data);
  return (
    <>
      <CommonSection title={"Hotel Serach Result"} />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4 className="Text-center"> No hotel Found </h4>
            ) : (
              data?.map((Hotel) => (
                <Col lg="3" className="mb-4" key={Hotel._id}>
                  {" "}
                  <Room hotel={Hotel} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SerachResultList;
