import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState("");

  const formSchema = yup.object().shape({
    userName: yup.string().required("This field cannot be empty"),
    email: yup.string().email().required("This field cannot be empty"),
    password: yup.string().required("This field cannot be empty"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };

  const onSubmit = handleSubmit(async (value) => {
    console.log(value);
    const { userName, email, password } = value;
    const url = "http://localhost:1200/api/register";

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const config = {
      "content-type": "multipart/form-data",
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    };

    const options = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    };

    await axios.post(url, formData, config).then((res) => {
      console.log("Error Data: ", res);
    });
    navigate("/signin");
    // swal.fire({
    //   title: "Thanks",
    //   text: "thank you for visiting us here we we care",
    //   icon: "success",
    //   button: "success",
    // });
  });

  return (
    <Container>
      <Overlay>
        <Form onSubmit={onSubmit} type="multipart/form-data">
          <Head>Welcome</Head>
          <Title>create an account</Title>
          <ImageHolder>
            <Image src={image} />
            <ImageLabel htmlFor="pix">Upload your Image</ImageLabel>
            <ImageInput
              id="pix"
              onChange={handleImage}
              type="file"
              accept="image/*"
            />
          </ImageHolder>
          <Inputs>
            <Input placeholder="name" {...register("userName")} />
            <Input placeholder="Email" {...register("email")} />
            <Input placeholder="Password" {...register("password")} />
            <Input placeholder="confirm" {...register("confirm")} />
          </Inputs>
          <Agree>
            <Check type="checkbox" />
            <Span>i agree to the terms & conditions </Span>
          </Agree>
          <Button type="submit">Create account</Button>
          <Alt>
            Already have an account?
            <NavLink
              to="/signin"
              style={{
                textDecoration: "none",
              }}
            >
              <span>Log in</span>
            </NavLink>
          </Alt>
        </Form>
      </Overlay>
    </Container>
  );
};

export default SignUp;
const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 6px 10px;
  /* background-color: #004080; */
  color: white;
  border-radius: 3px;
  transition: all 350ms;
  color: black;
  :hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;
const ImageHolder = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  /* background-color: darkorange; */
  margin-bottom: 20px;

  transition: all 350ms;
  :hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;
const Container = styled.div`
  background-image: url("/image/back.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

const Overlay = styled.div`
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Form = styled.form`
  width: 80%;
  height: 70%;
  background: white;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const Head = styled.div`
  font-weight: 700;
  font-size: 30px;
`;

const Title = styled.div`
  font-size: 17px;
  opacity: 70%;
  font-weight: 500;
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 78%;
  height: 40px;
  background: #d9d9d9;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  padding-left: 20px;
`;

const Agree = styled.div`
  display: flex;
  align-items: center;
  width: 84%;
  margin-top: 10px;
`;

const Check = styled.input``;

const Span = styled.div`
  margin-left: 10px;
  font-size: 13px;
  font-weight: 500;
`;

const Button = styled.button`
  background: #0a58ed;
  color: white;
  width: 84%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-top: 20px;
  border-radius: 5px;
  text-decoration: none;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: all 350ms;
  }
`;

const Alt = styled.div`
  margin-top: 10px;
  font-weight: 500;
  span {
    color: #0a58ed;
    margin-left: 5px;
  }
`;
