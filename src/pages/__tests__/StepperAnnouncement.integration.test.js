import { render, screen, fireEvent } from '@testing-library/react';
import StepperAnnouncement from './StepperAnnouncement';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';


jest.mock('@/hooks/useCreateAnnouncementContext');

test('navegação entre passos', () => {
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

  useCreateAnnouncementContext.mockReturnValue({
    stepState: 2,
    setStepState: setStepStateMock,
    isStepValid: true,
    onSubmit: jest.fn(),
  });

  render(<StepperAnnouncement />);
  
  fireEvent.click(screen.getByText('Voltar'));
  expect(setStepStateMock).toHaveBeenCalledWith(1);
});
