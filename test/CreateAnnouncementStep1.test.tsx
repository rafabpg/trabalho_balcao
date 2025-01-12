import { render, screen } from "@testing-library/react";
import CreateAnnouncementStep1 from "@/components/Organisms/CreateAnnouncementStep1";
import { useCreateAnnouncementContext } from "@/hooks/useCreateAnnouncementContext";

jest.mock("@/hooks/useCreateAnnouncementContext", () => ({
  useCreateAnnouncementContext: jest.fn(),
}));

describe("CreateAnnouncementStep1 Component", () => {
  const mockRegister = jest.fn();
  const mockErrors = {};

  beforeEach(() => {
    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      errors: mockErrors,
    });
  });

  it("should render the title and form fields", () => {
    render(<CreateAnnouncementStep1 />);

    const title = screen.getByText(/Crie seu próprio Anúncio/i);
    expect(title).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText(/Nome do Anúncio/i);
    expect(titleInput).toBeInTheDocument();

    const descriptionInput = screen.getByPlaceholderText(
      /Adicione descrição do seu anúncio/i
    );
    expect(descriptionInput).toBeInTheDocument();

    const priceInput = screen.getByPlaceholderText(/123,00/i);
    expect(priceInput).toBeInTheDocument();
  });

  it("should display error messages when fields have errors", () => {
    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: mockRegister,
      errors: {
        title: { message: "Título é obrigatório" },
        description: { message: "Descrição é obrigatória" },
        price: { message: "Preço é obrigatório" },
      },
    });

    render(<CreateAnnouncementStep1 />);

    const titleError = screen.getByText(/Título é obrigatório/i);
    expect(titleError).toBeInTheDocument();

    const descriptionError = screen.getByText(/Descrição é obrigatória/i);
    expect(descriptionError).toBeInTheDocument();

    const priceError = screen.getByText(/Preço é obrigatório/i);
    expect(priceError).toBeInTheDocument();
  });
});
