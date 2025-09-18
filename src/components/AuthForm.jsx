import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

const AuthForm = ({ isLogin, onSubmit }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
