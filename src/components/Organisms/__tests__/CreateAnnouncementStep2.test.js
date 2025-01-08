import { render, screen } from '@testing-library/react';
import CreateAnnouncementStep2 from './CreateAnnouncementStep2';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';

jest.mock('@/hooks/useCreateAnnouncementContext');

test('renderiza o passo 2 corretamente', () => {
  useCreateAnnouncementContext.mockReturnValue({
    register: jest.fn(),
    errors: {},
    setValue: jest.fn(),
  });

  render(<CreateAnnouncementStep2 />);
  
  expect(screen.getByText('Crie seu próprio Anúncio')).toBeInTheDocument();
  expect(screen.getByText('Informações Adicionais para seu Anúncio')).toBeInTheDocument();
});
