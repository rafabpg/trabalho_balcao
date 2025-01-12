import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProfileDisplay from "@/components/Organisms/ProfileDisplay";
import { useAuth } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("ProfileDisplay Component", () => {
  const mockNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

  const mockUser = {
    image: "https://example.com/profile.jpg",
    full_name: "Jane Doe",
    rating: 4.2,
    email: "jane.doe@example.com",
    cpf: "12345678901",
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ currentUser: mockUser });
  });

  it("should render the user information correctly", () => {
    render(
      <BrowserRouter>
        <ProfileDisplay />
      </BrowserRouter>
    );

    const userImage = screen.getByRole("img");
    expect(userImage).toHaveAttribute("src", mockUser.image);

    const userName = screen.getByText(mockUser.full_name);
    expect(userName).toBeInTheDocument();

    const userRating = screen.getByText(mockUser.rating.toFixed(1));
    expect(userRating).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveValue(mockUser.email);

    const cpfInput = screen.getByLabelText(/CPF/i);
    expect(cpfInput).toHaveValue("123.456.789-01");
  });
});
