import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = () => {
const [name,setName] = useState();
const [email, setEmail] = useState();
const[password, setPassword] = useState();
const[confirmPassword, setConfirmpassword] = useState();
const [show, setShow] = useState(false);
const [pic, setPic] = useState();
const [loading, setLoading] = useState(false)
const toast = useToast()
const history = useHistory()

const handleClick = ()=>setShow(!show);

const postDetails = (pics)=>{
setLoading(true);
if(pics === undefined){
  toast({
    title: 'Account created.',
    status: 'success',
    duration: 9000,
    isClosable: true,
    position:"top"
  })
  setLoading(false)
  return;
}
if(password !== confirmPassword){
  toast({
    title: 'Password do not match',
    status: 'warning',
    duration: 9000,
    isClosable: true,
    position:"top"
  })
  return;
}
if(pics.type ==='image/jpeg'||'image/png'){
  const data = new FormData();
  data.append("file",pics);
  data.append("upload_preset", "V-Chat-App");
  data.append("cloud_name","vishant");
  fetch('https://api.cloudinary.com/v1_1/vishant/image/upload',{
    method:"post",
    body:data
  }).then((res)=>res.json())
  .then(data=>{
    setPic(data.url.toString())
    console.log(data.url.toString());
    setLoading(false)
  })
  .catch((err)=>{
    console.log(err)
    setLoading(false);
  })
}else{
  toast({
    title: 'Please select an image',
    status: 'warning',
    duration: 9000,
    isClosable: true,
    position:"bottom"
  })
  setLoading(false)
return;
}
}

const submitHandler = async()=>{
if(!name || !email || !password || !confirmPassword){
  toast({
    title: 'Please fill all the fields',
    status: 'warning',
    duration: 9000,
    isClosable: true,
    position:"bottom"
  })
  return;
}
try {
  const config = {
    headers:{
      "Content-type":"application/json",
    }
  }

  const {data} = await axios.post(
    "/api/user",
    {name, email, password, pic},config
  )
  toast({
    title: 'Registration Successfull.',
    status: 'success',
    duration: 9000,
    isClosable: true,
    position:"top"
  })
  localStorage.setItem("userInfo", JSON.stringify(data));
  setLoading(false)
  history.push('/chats')
} catch (error) {
  toast({
    title: 'Error Occured',
    description:error.response.data.message,
    status: 'warning',
    duration: 9000,
    isClosable: true,
    position:"top"
  })
  setLoading(false)
}

}
  return (
    <>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id='pic'>
            <FormLabel>Upload Your Picture</FormLabel>
            <input 
            type='file'
            p={1.5}
            accept='image/*'
            onChange={(e)=>postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
        colorScheme='green'
        width='100%'
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}
        >
            Sign Up
        </Button>
      </VStack>
    </>
  )
}

export default Signup