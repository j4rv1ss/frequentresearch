import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Img,
  Input,
} from "@chakra-ui/react";
import React from "react";
import blogLogo from "../assets/blog-logo.png";
import { useState } from "react";
import {registerUser} from "../service/api.js"

const defaultValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
};

const Signup = () => {
  const [values, setValues] = useState(defaultValues);

  const heandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitData=()=>{
    registerUser(values)
  }

  return (
    <Container h={"100vh"} bg={"gray.100"} maxW={"container.xl"} p={10}>
      <Container h={"90vh"} bg={"white"}>
        <Box p={"1rem"}>
          <Img src={blogLogo} m={"auto"} h={"50px"} />
        </Box>
        <FormControl h={"75vh"} p={"1rem"}>
          <Box m={"10px 0"}>
            <FormLabel>Firstname</FormLabel>
            <Input
              type={"text"}
              placeholder={"Enter Name.."}
              name="firstname"
              required
              onChange={(e) => heandleChange(e)}
            />
          </Box>
          <Box m={"10px 0"}>
            <FormLabel>Lastname</FormLabel>
            <Input
              type={"text"}
              placeholder={"Enter Name.."}
              name="lastname"
              required
              onChange={(e) => heandleChange(e)}
            />
          </Box>
          <Box m={"10px 0"}>
            <FormLabel>Phone</FormLabel>
            <Input
              type={"number"}
              required
              placeholder={"Enter Number.."}
              name="phone"
              onChange={(e) => heandleChange(e)}
            />
          </Box>
          <Box m={"10px 0"}>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              required
              placeholder={"Enter Email.."}
              name="email"
              onChange={(e) => heandleChange(e)}
            />
          </Box>
          <Box m={"10px 0"}>
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              required
              placeholder={"Enter Password.."}
              name="password"
              onChange={(e) => heandleChange(e)}
            />
          </Box>
        
          <Button
            m={"10px 0"}
            variant={"outline"}
            colorScheme={"orange"}
            w={"full"}
            onClick={()=>{submitData(values)}}
          >
            Signup
          </Button>
        </FormControl>
      </Container>
    </Container>
  );
};

export default Signup;
