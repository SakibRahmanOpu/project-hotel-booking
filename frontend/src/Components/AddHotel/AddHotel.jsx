import { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { postData } from "../../utils/api";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Button,
} from "reactstrap";
import { convertBase64 } from "../../utils/convertImage";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddHotel = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    title: "",
    city: "",
    desc: "",
    address: "",
    distance: 0,
    photo: null,
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });
  const navigate = useNavigate();

  if (user.role !== "admin") {
    // return navigate("/dashboard/my-bookings");
    return <Navigate to="/dashboard/my-bookings" />;
  }

  const handleChange = (e) => {
    if (e.target.id === "featured") {
      setState((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.checked,
      }));
    } else if (e.target.id === "photo") {
      const file = e.target.files[0];
      convertBase64(file).then((base64) => {
        setState((prevState) => ({
          ...prevState,
          [e.target.id]: base64,
        }));
      });
    } else {
      setState((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(state);
    try {
      const data = await postData(`${BASE_URL}/hotels`, state);
      if (data?.successs) {
        toast.success("Successfully added hotel!");
        navigate("/hotelList");
      } else {
        toast.error(data?.message ?? "Something went wrong!");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">Add a new Hotel</h1>
      <FormGroup row>
        <Label for="title" sm={2}>
          Title
        </Label>
        <Col sm={10}>
          <Input
            onChange={handleChange}
            id="title"
            name="title"
            placeholder="Enter title"
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="desc" sm={2}>
          Description
        </Label>
        <Col sm={10}>
          <Input
            id="desc"
            name="desc"
            onChange={handleChange}
            type="textarea"
            placeholder="Enter description"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="city" sm={2}>
          City
        </Label>
        <Col sm={10}>
          <Input
            id="city"
            name="city"
            onChange={handleChange}
            placeholder="Enter city"
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="address" sm={2}>
          Address
        </Label>
        <Col sm={10}>
          <Input
            id="address"
            name="address"
            onChange={handleChange}
            placeholder="Enter address"
            type="text"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="distance" sm={2}>
          Distance
        </Label>
        <Col sm={10}>
          <Input
            id="distance"
            onChange={handleChange}
            name="distance"
            placeholder="Enter distance"
            type="number"
          />
        </Col>
      </FormGroup>{" "}
      <FormGroup row>
        <Label for="price" sm={2}>
          Price
        </Label>
        <Col sm={10}>
          <Input
            id="price"
            onChange={handleChange}
            name="price"
            placeholder="Enter price"
            type="number"
          />
        </Col>
      </FormGroup>{" "}
      <FormGroup row>
        <Label for="maxGroupSize" sm={2}>
          Max Group Size
        </Label>
        <Col sm={10}>
          <Input
            onChange={handleChange}
            id="maxGroupSize"
            name="maxGroupSize"
            placeholder="Enter maximum group size"
            type="number"
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="photo" sm={2}>
          File
        </Label>
        <Col sm={10}>
          <Input
            id="photo"
            name="photo"
            onChange={handleChange}
            type="file"
            accept="image/png, image/jpeg"
          />
          <FormText>Upload a good quality picture of the hotel</FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="featured" sm={2}>
          Featured
        </Label>
        <Col
          sm={{
            size: 10,
          }}
        >
          <FormGroup check>
            <Input
              id="featured"
              name="featured"
              type="checkbox"
              onChange={handleChange}
            />
            <Label check>Check this</Label>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col
          className="px-0"
          sm={{
            offset: 2,
            size: 10,
          }}
        >
          <Button disabled={isLoading} color="primary">
            {isLoading ? "Loading..." : "Create Hotel"}
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default AddHotel;
