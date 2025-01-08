import { render, screen } from '@testing-library/react';
import CreateAnnouncementStep1 from './CreateAnnouncementStep1';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';

jest.mock('@/hooks/useCreateAnnouncementContext');

test('renderiza o step 1', () => {
  useCreateAnnouncementContext.mockReturnValue({
    register: jest.fn(),
    errors: {},
  });

  render(<CreateAnnouncementStep1 />);
  

  expect(screen.getByText('Crie seu próprio Anúncio')).toBeInTheDocument();
  expect(screen.getByText('Adicione seu Título')).toBeInTheDocument();
});
