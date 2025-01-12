import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyAds from "@/pages/MyAds";
import { useAuth } from "@/hooks/useAuth";
import useGetData from "@/hooks/useGetMyAds";
import useDeleteAd from "@/hooks/useDeleteAd";
import { useNavigate } from "react-router-dom";

jest.mock("@/hooks/useAuth");
jest.mock("@/hooks/useGetMyAds");
jest.mock("@/hooks/useDeleteAd");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("@/components/Atoms/LoadingSpinner", () => () => (
  <div>Loading...</div>
));
jest.mock(
  "@/components/Organisms/AdList",
  () =>
    ({ onDelete, onEdit, adTitle }: any) =>
      (
        <div>
          <span>{adTitle}</span>
          <button onClick={onDelete}>Delete</button>
          <button onClick={onEdit}>Edit</button>
        </div>
      )
);
jest.mock(
  "@/components/Molecules/Pagination",
  () =>
    ({ currentPage, totalPages, paginate }: any) =>
      (
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )
);

describe("MyAds Component", () => {
  const mockNavigate = jest.fn();
  const mockDeleteAd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      auth: "mock-auth-token",
      currentUser: { id: "user123" },
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useDeleteAd as jest.Mock).mockReturnValue({ mutate: mockDeleteAd });
  });

  it("renders loading spinner while loading", () => {
    (useGetData as jest.Mock).mockReturnValue({ isLoading: true, data: null });
    render(<MyAds />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error message on error", () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch"),
      data: null,
    });
    render(<MyAds />);
    expect(
      screen.getByText("Erro ao carregar anúncios: Failed to fetch")
    ).toBeInTheDocument();
  });

  it("renders ads and pagination when data is loaded", () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        itens: [
          {
            id: 1,
            title: "Ad 1",
            campus: "NITEROI",
            category: "TECH",
            price: 100,
            user: { id: "user123" },
          },
          {
            id: 2,
            title: "Ad 2",
            campus: "RIO",
            category: "BOOK",
            price: 200,
            user: { id: "user456" },
          },
        ],
        page: 1,
        page_count: 2,
      },
    });
    render(<MyAds />);

    expect(screen.getByText("Ad 1")).toBeInTheDocument();
    expect(screen.getByText("Ad 2")).toBeInTheDocument();
  });

  it("calls delete function when delete button is clicked", async () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        itens: [
          {
            id: 1,
            title: "Ad 1",
            campus: "NITEROI",
            category: "TECH",
            price: 100,
            user: { id: "user123" },
          },
        ],
        page: 1,
        page_count: 1,
      },
    });
    render(<MyAds />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() =>
      expect(mockDeleteAd).toHaveBeenCalledWith({
        httpClient: expect.anything(),
        url: "/advertisements/1",
        headers: "mock-auth-token",
      })
    );
  });

  it("navigates to edit page when edit button is clicked", () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        itens: [
          {
            id: 1,
            title: "Ad 1",
            campus: "NITEROI",
            category: "TECH",
            price: 100,
            user: { id: "user123" },
          },
        ],
        page: 1,
        page_count: 1,
      },
    });
    render(<MyAds />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("/anuncio/editar/1");
  });

  it("changes status filter and resets page when filter buttons are clicked", () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        itens: [],
        page: 1,
        page_count: 1,
      },
    });
    render(<MyAds />);

    const activeButton = screen.getByText("Ativos");
    const pastButton = screen.getByText("Passados");

    fireEvent.click(pastButton);
    expect(pastButton).toHaveClass("bg-blue-950 text-white font-bold");
    expect(activeButton).not.toHaveClass("bg-blue-950 text-white font-bold");

    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass("bg-blue-950 text-white font-bold");
    expect(pastButton).not.toHaveClass("bg-blue-950 text-white font-bold");
  });

  it("navigates between pages using pagination", () => {
    (useGetData as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        itens: [],
        page: 1,
        page_count: 2,
      },
    });
    render(<MyAds />);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
  });
});
