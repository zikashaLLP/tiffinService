// src/pages/admin/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { loginService } from "@/services/auth";
import { useToast } from "@/hooks/use-toast"; // Import useToast hook
import { login } from "@/utils/auth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast(); // Destructure toast function from useToast
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      loginService({ email, password })
        .then((resp) => {
          // console.log(resp);
          // localStorage.setItem("token", resp.token);
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            variant: "default",
          });
          login(resp.token,'admin');
          navigate("/admin/dashboard/orders");
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Login Failed",
            description: "Please check your credentials and try again.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

      <div className="mb-4">
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-1 p-2 border rounded-md"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <Button
        onClick={handleLogin}
        className="w-full p-2 bg-neutral-700 text-white rounded-md hover:bg-black"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center">
            <span className="animate-spin mr-2 border-t-2 border-b-2 border-white rounded-full w-4 h-4"></span>
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
};

export default AdminLogin;
