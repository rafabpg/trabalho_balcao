import { render, screen, fireEvent } from "@testing-library/react";
import Home from "@/pages/Home";
import useGetAllAds from "@/hooks/useGetAllAds";
import { MemoryRouter } from "react-router-dom";

jest.mock("@/hooks/useGetAllAds");
jest.mock("@/components/Organisms/WelcomeBanner", () => () => (
  <div>WelcomeBanner</div>
));
jest.mock(
  "@/components/Organisms/SearchAndFilterBar",
  () =>
    ({ onApplyFilters }: { onApplyFilters: (filters: any) => void }) =>
      (
        <div onClick={() => onApplyFilters({ searchTerm: "test" })}>
          SearchAndFilterBar
        </div>
      )
);
jest.mock("@/components/Organisms/AdCard", () => ({ ad }: { ad: any }) => (
  <div>{ad.title}</div>
));
jest.mock(
  "@/components/Molecules/Pagination",
  () =>
    ({
      currentPage,
      totalPages,
      paginate,
    }: {
      currentPage: number;
      totalPages: number;
      paginate: (page: number) => void;
    }) =>
      (
        <button onClick={() => paginate(currentPage + 1)}>
          Paginate to Page {currentPage + 1}
        </button>
      )
);

describe("Home Component", () => {
  const mockAds = {
    itens: [
      { id: 1, title: "Ad 1" },
      { id: 2, title: "Ad 2" },
    ],
    page: 1,
    page_count: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error message when there's an error fetching data", () => {
    (useGetAllAds as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch"),
      isError: true,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Erro ao carregar anúncios/i)).toBeInTheDocument();
  });

  it("renders the ad cards when data is successfully fetched", () => {
    (useGetAllAds as jest.Mock).mockReturnValue({
      data: mockAds,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Ad 1")).toBeInTheDocument();
    expect(screen.getByText("Ad 2")).toBeInTheDocument();
  });

  it("handles pagination correctly", () => {
    const mockSetCurrentPage = jest.fn();
    (useGetAllAds as jest.Mock).mockReturnValue({
      data: mockAds,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const paginationButton = screen.getByText("Paginate to Page 2");
    fireEvent.click(paginationButton);

    expect(mockSetCurrentPage).not.toBeCalled();
  });
});
