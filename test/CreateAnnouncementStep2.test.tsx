import { render, screen } from "@testing-library/react";
import CreateAnnouncementStep2 from "@/components/Organisms/CreateAnnouncementStep2";
import { useCreateAnnouncementContext } from "@/hooks/useCreateAnnouncementContext";

jest.mock("@/hooks/useCreateAnnouncementContext", () => ({
  useCreateAnnouncementContext: jest.fn(),
}));

describe("CreateAnnouncementStep2 Component", () => {
  const mockRegister = jest.fn();
  const mockErrors = {};
  const mockSetValue = jest.fn();

  beforeEach(() => {
    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      errors: mockErrors,
      setValue: mockSetValue,
    });
  });

  it("should render the title and form fields", () => {
    render(<CreateAnnouncementStep2 />);

    const title = screen.getByText(/Crie seu próprio Anúncio/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(
      /Informações Adicionais para seu Anúncio/i
    );
    expect(subtitle).toBeInTheDocument();

    const phoneInput = screen.getByPlaceholderText(/\(xx\) 99999-9999/i);
    expect(phoneInput).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/ex:teste@gmail.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("should display error messages when fields have errors", () => {
    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      errors: {
        phone: { message: "Telefone é obrigatório" },
        email: { message: "Email é obrigatório" },
      },
      setValue: mockSetValue,
    });

    render(<CreateAnnouncementStep2 />);

    const phoneError = screen.getByText(/Telefone é obrigatório/i);
    expect(phoneError).toBeInTheDocument();

    const emailError = screen.getByText(/Email é obrigatório/i);
    expect(emailError).toBeInTheDocument();
  });
});
