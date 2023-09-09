import { Link, Outlet } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import CommonSection from "../../Components/CommonSection/CommonSection";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <CommonSection />
      <section>
        <div>
          <Container className="border p-4 mb-4">
            <Row>
              <Col md={3}>
                <ListGroup>
                  {user?.role && user.role === "admin" && (
                    <>
                    <ListGroupItem>
                      <Link to="/dashboard/add-hotel">
                        <h5 className="py-0">Add New Hotel</h5>
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link to="/dashboard/add-room">
                        <h5 className="py-0">Add New Room</h5>
                      </Link>
                    </ListGroupItem>
                    </>
                  )}
                  <ListGroupItem>
                    <Link to="/dashboard/my-bookings">
                      <h5>My Bookings</h5>
                    </Link>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={9}>
                <Outlet />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
