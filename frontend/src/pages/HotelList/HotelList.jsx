import React from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row } from "reactstrap";
import CommonSection from "../../Components/CommonSection/CommonSection";
import Navbar from "../../Components/Navbar/Navbar";
import HotelCard from "../../Components/HotelCard/HotelCard";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const RoomList = () => {
  const searchParams = useSearchParams();
  const url = `${BASE_URL}/hotels?${searchParams[0].toString()}`;

  const { data, error, loading } = useFetch(url);

  return (
    <>
      <Navbar />
      <CommonSection title={"ALL Hotels"} />
      <section>
        <Container>
          <Row>
            {error && (
              <Alert color="danger" className="text-center">
                Oops! Something went wrong!
              </Alert>
            )}
            {data?.length === 0 && !error && !loading && (
              <Alert color="secondary">
                There are currently no hotel entries.
              </Alert>
            )}
            {loading && !error && (
              <Alert color="secondary" className="text-center">
                Loading hotel list...
              </Alert>
            )}
            {data &&
              data?.map((hotel, index) => (
                <Col lg="3" className="mb-4" key={index}>
                  <HotelCard hotel={hotel} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RoomList;
