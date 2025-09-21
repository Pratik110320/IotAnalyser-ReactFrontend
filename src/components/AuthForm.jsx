import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success && isLogin) {
      navigate("/dashboard");
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="username" value={formData.username} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
      </FormControl>
      <Button type="submit" colorScheme="blue" w="full">{isLogin ? "Login" : "Register"}</Button>
    </VStack>
  );
};

export default AuthForm;