import * as zod from 'zod';
import { useContext } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';

import { NewCycleForm } from '../../components/NewCycleForm';
import { Countdown } from '../../components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

import {
  HomeContainer,
  StopCountdownButton,
  StartCountdownButton,
} from './styles';

export function Home() {
  const {
    createNewCycle,
    interruptCycle,
    activeCycle,
  } = useContext(CyclesContext);

  const newCicleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
      .number()
      .min(5, 'O ciclo precisa ser no mínimo de 5 minutos')
      .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
  });

  type NewCycleFormData = zod.infer<typeof newCicleFormValidationSchema>;

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
      <HomeContainer>
        <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />

          {activeCycle ? (
            <StopCountdownButton type="button" onClick={interruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </HomeContainer>
  );
}
