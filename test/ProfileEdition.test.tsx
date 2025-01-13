import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileEdition from "@/components/Organisms/ProfileEdition";
import { useAuth } from "@/hooks/useAuth";
import usePutData from "@/hooks/usePutData";
import { useNotification } from "@/hooks/useNotification";

jest.mock("@/hooks/useAuth");
jest.mock("@/hooks/usePutData");
jest.mock("@/hooks/useNotification");
jest.mock("@/components/Molecules/FormInput", () => ({ label, value, onChange }: any) => (
  <div>
    <label>{label}</label>
    <input value={value} onChange={onChange} />
  </div>
));
jest.mock("@/components/Atoms/Button", () => ({ text, onClick }: any) => (
  <button onClick={onClick}>{text}</button>
));
jest.mock("@/components/Atoms/UserImage", () => ({ src }: any) => <img src={src} alt="User" />);

describe("ProfileEdition Component", () => {
  const mockUser = {
    full_name: "John Doe",
    email: "john.doe@example.com",
    cpf: "12345678901",
    image: "user_image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      currentUser: mockUser,
      auth: "mock-auth-token",
    });
    (useNotification as jest.Mock).mockReturnValue({
      showError: jest.fn(),
      showSuccess: jest.fn(),
    });
    (usePutData as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
  });

  it("renders the user's current information", () => {
    render(<ProfileEdition />);

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123.456.789-01")).toBeInTheDocument();
    expect(screen.getByAltText("User")).toHaveAttribute("src", "user_image.jpg");
  });

  it("enables save and cancel buttons when the name is changed", () => {
    render(<ProfileEdition />);

    const nameInput = screen.getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(screen.getByText("Salvar Alterações")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("resets changes when cancel is clicked", () => {
    render(<ProfileEdition />);

    const nameInput = screen.getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(nameInput).toHaveValue("John Doe");
  });

  it("saves changes and shows success notification", async () => {
    const mockMutateAsync = jest.fn().mockResolvedValue({});
    (usePutData as jest.Mock).mockReturnValue({ mutateAsync: mockMutateAsync });
    const showSuccess = jest.fn();
    (useNotification as jest.Mock).mockReturnValue({ showSuccess, showError: jest.fn() });

    render(<ProfileEdition />);

    const nameInput = screen.getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const saveButton = screen.getByText("Salvar Alterações");
    fireEvent.click(saveButton);

    await waitFor(() => expect(mockMutateAsync).toHaveBeenCalled());
    expect(mockMutateAsync).toHaveBeenCalledWith({
      httpClient: expect.anything(),
      data: { ...mockUser, full_name: "Jane Doe" },
      url: "/auth",
      headers: "mock-auth-token",
    });
    expect(showSuccess).toHaveBeenCalledWith("Perfil atualizado com sucesso!");
  });

  it("shows error notification when save fails", async () => {
    const mockMutateAsync = jest.fn().mockRejectedValue(new Error("Update failed"));
    (usePutData as jest.Mock).mockReturnValue({ mutateAsync: mockMutateAsync });
    const showError = jest.fn();
    (useNotification as jest.Mock).mockReturnValue({ showError, showSuccess: jest.fn() });

    render(<ProfileEdition />);

    const nameInput = screen.getByDisplayValue("John Doe");
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    const saveButton = screen.getByText("Salvar Alterações");
    fireEvent.click(saveButton);

    await waitFor(() => expect(mockMutateAsync).toHaveBeenCalled());
    expect(showError).toHaveBeenCalledWith(
      "Erro ao atualizar perfil, verifique os campos e tente novamente"
    );
  });
});
