import { render, screen, fireEvent } from '@testing-library/react';
import StepperAnnouncement from './StepperAnnouncement';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';


jest.mock('@/hooks/useCreateAnnouncementContext');

test('renderiza o componente corretamente', () => {
  useCreateAnnouncementContext.mockReturnValue({
    stepState: 1,
    setStepState: jest.fn(),
    isStepValid: true,
    onSubmit: jest.fn(),
  });

  render(<StepperAnnouncement />);
  

  expect(screen.getByText('Crie seu próprio Anúncio')).toBeInTheDocument();
});

test('navega para o próximo passo corretamente', () => {
  const setStepStateMock = jest.fn();
  useCreateAnnouncementContext.mockReturnValue({
    stepState: 1,
    setStepState: setStepStateMock,
    isStepValid: true,
    onSubmit: jest.fn(),
  });

  render(<StepperAnnouncement />);
  
  fireEvent.click(screen.getByText('Proxima Etapa'));
  expect(setStepStateMock).toHaveBeenCalledWith(2);
});
