import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";

// Mocking hooks
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/hooks/useNotification", () => ({
  useNotification: jest.fn(),
}));

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    // Mock implementations
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
    (useNotification as jest.Mock).mockReturnValue({ showError: mockShowError });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(<LoginForm />);

    expect(screen.getByText(/faça seu login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByText(/entrar/i)).toBeInTheDocument();
  });

  it("calls login with correct credentials", async () => {
    render(<LoginForm />);

    // Input the CPF and password
    fireEvent.change(screen.getByLabelText(/cpf/i), {
      target: { value: "772.859.910-71" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/entrar/i));

    // Assert login function is called with correct arguments
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("772.859.910-71", "password123");
    });
  });

  it("shows error when login fails", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));
    render(<LoginForm />);

    // Input the CPF and password
    fireEvent.change(screen.getByLabelText(/cpf/i), {
      target: { value: "772.859.910-71" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/entrar/i));

    // Assert showError is called when login fails
    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("Login ou senha inválidos");
    });
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginForm />);

    // Submit the form without entering any data
    fireEvent.click(screen.getByText(/entrar/i));

    // Assert error messages are displayed
    await waitFor(() => {
      expect(screen.getByText(/cpf é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    });
  });
});
