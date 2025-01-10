import { render, screen, waitFor} from '@testing-library/react';
import { jest ,expect,describe,it} from '@jest/globals';
import CreateAnnouncementStep1 from '@/components/Organisms/CreateAnnouncementStep1';
import { CreateAnnouncementProvider } from '@/context/CreateAnnouncementContext';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';

jest.mock('@/hooks/useCreateAnnouncementContext', () => ({
  useCreateAnnouncementContext: jest.fn(),
}));

describe('CreateAnnouncementStep1 Component', () => {
  it('deve renderizar o título corretamente', async () => {

    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: jest.fn(),
      errors: {},
      onSubmit: jest.fn(),
      setValue: jest.fn(),
      stepState: 1,
      isStepValid: true,
    });

    render(
      <CreateAnnouncementProvider>
        <CreateAnnouncementStep1 />
      </CreateAnnouncementProvider>
    );

    const title = screen.getByText(/Crie seu próprio Anúncio/i);
    expect(title).toBeTruthy();
  });

  it('deve exibir os campos do formulário', async () => {
    (useCreateAnnouncementContext as jest.Mock).mockReturnValue({
      register: jest.fn(),
      errors: {},
      onSubmit: jest.fn(),
      setValue: jest.fn(),
      stepState: 1,
      isStepValid: true,
    });

    render(
      <CreateAnnouncementProvider>
        <CreateAnnouncementStep1 />
      </CreateAnnouncementProvider>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Nome do Anúncio/i)).toBeTruthy();
      expect(screen.getByPlaceholderText(/Adicione descrição do seu anúncio/i)).toBeTruthy();
      expect(screen.getByPlaceholderText(/Selecione uma categoria/i)).toBeTruthy();
    });
  });
});
