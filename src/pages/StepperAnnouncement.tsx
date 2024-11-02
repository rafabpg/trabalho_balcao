import Button from '@/components/Atoms/Button';
import CreateAnnouncementStep1 from '@/components/Organisms/CreateAnnouncementStep1';
import CreateAnnouncementStep2 from '@/components/Organisms/CreateAnnouncementStep2';
import { useCreateAnnouncementContext } from '@/hooks/useCreateAnnouncementContext';
import { Step } from '@material-tailwind/react';
import { useEffect, useState } from 'react';



const notActiveClassName =
  "flex items-center justify-center rounded-full bg-lighter-primary h-4 w-4 cursor-pointer";
const activeClassName =
  "flex items-center justify-center rounded-full bg-primary-default h-4 w-4 cursor-pointer ";


const StepperAnnouncement = () => {
  
  const { stepState, setStepState,isStepValid,onSubmit } = useCreateAnnouncementContext();

  function handleNextStep() {
    if (stepState < 2) setStepState(stepState + 1);
  }

  function handlePreviousStep() {
    if (stepState > 1) setStepState(stepState - 1);
  }

  function getCurrentStep() {
    switch(stepState) {
      case 1: 
        return <CreateAnnouncementStep1 />;
      case 2: 
        return <CreateAnnouncementStep2 />;
      default:
        return null;
    }
  }

  function handleCreateAnnouncement() {
    if (stepState === 2) {
      onSubmit(); 
    } else {
      handleNextStep();
    }
  }

  return (
    <div className="flex flex-col  gap-9 items-center mt-12">
        {getCurrentStep()}
        <div className='flex gap-3'>
            {[1, 2].map((number) => (
              <Step
                key={number}
                className={stepState === number ? activeClassName : notActiveClassName}
                placeholder={number} >
              </Step>
            ))}
        </div>
        <div className="flex gap-4 py-4 justify-between">
          <Button  onClick={handlePreviousStep} hidden={stepState === 1} text='Voltar' className='px-20 bg-red-color'/>
          <Button text={stepState === 2 ? 'Criar Anúncio' : 'Proxima Etapa'}    disabled={!isStepValid} onClick={handleCreateAnnouncement}  className='px-14' />
        </div>
    </div>
  )
}

export default StepperAnnouncement