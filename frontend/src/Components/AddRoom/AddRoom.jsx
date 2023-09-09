import { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { postData } from "../../utils/api";
import useFetch from "../../hooks/useFetch";
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

const AddRoom = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hotelId, setHotelId] = useState("");
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
    bathroom: 0,
    bedroom: "Single",
    wifi: false,
    shuttle: false,
  });
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(`${BASE_URL}/hotels`);

  if (user.role !== "admin") {
    // return navigate("/dashboard/my-bookings");
    return <Navigate to="/dashboard/my-bookings" />;
  }

  const handleSelectHotel = (e) => {
    setHotelId(e.target.value);
    console.log(e.target.value);
  };

  const handleChange = (e) => {
    if (
      e.target.id === "featured" ||
      e.target.id === "wifi" ||
      e.target.id === "shuttle"
    ) {
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
      const data = await postData(`${BASE_URL}/rooms`, state);
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
      <h1 className="text-center mb-4">Add a new Room</h1>
      <FormGroup row>
        <Label for="bathroom" sm={2}>
          Select Hotel
        </Label>
        <Col sm={10}>
          <Input
            defaultValue={""}
            id="hotelId"
            name="hotelId"
            type="select"
            onChange={handleChange}
          >
            {/* <option selected>Single</option>
            <option>Double</option> */}
            <option></option>
            {data?.length > 0 &&
              data.map((hotel) => (
                <option value={hotel._id}>{hotel.title}</option>
              ))}
          </Input>
        </Col>
      </FormGroup>
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
        <Label for="bathroom" sm={2}>
          Bed Size
        </Label>
        <Col sm={10}>
          <Input
            defaultValue={"Single"}
            id="bedSize"
            name="bedSize"
            type="select"
            onChange={handleChange}
          >
            <option selected>Single</option>
            <option>Double</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="bathroom" sm={2}>
          Bathroom
        </Label>
        <Col sm={10}>
          <Input
            id="bathroom"
            name="bathroom"
            type="select"
            onChange={handleChange}
            defaultValue={1}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="wifi" sm={2}>
          WiFi
        </Label>
        <Col
          sm={{
            size: 10,
          }}
        >
          <FormGroup check>
            <Input
              id="wifi"
              name="wifi"
              type="checkbox"
              onChange={handleChange}
            />
            <Label check htmlFor="wifi">
              Add WiFi
            </Label>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="shuttle" sm={2}>
          Shuttle
        </Label>
        <Col
          sm={{
            size: 10,
          }}
        >
          <FormGroup check>
            <Input
              id="shuttle"
              name="shuttle"
              type="checkbox"
              onChange={handleChange}
            />
            <Label check htmlFor="shuttle">
              Add Shuttle
            </Label>
          </FormGroup>
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

export default AddRoom;
