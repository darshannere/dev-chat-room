import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface LoginFormProps {
  namePlaceholder?: string;
  emailPlaceholder?: string;
  nameValue?: string;
  emailValue?: string;
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}

export function LoginForm({
  namePlaceholder = "Name",
  nameValue = "",
  onNameChange,
  onSubmit,
}: LoginFormProps) {
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 4) {
      setError("Name must be at least 4 characters long.");
    } else {
      setError("");
    }
    
    if (onNameChange) {
      onNameChange(e);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to join the chat.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            placeholder={namePlaceholder}
            value={nameValue}
            onChange={handleNameChange}
            required
          />
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onSubmit} disabled={!!error}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
