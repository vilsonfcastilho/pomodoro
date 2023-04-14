import { NavLink } from 'react-router-dom';
import { Timer, Scroll } from 'phosphor-react';

import { HeaderContainer } from './styles';

import logoPomodoro from '../../assets/logo-pomodoro.svg';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoPomodoro} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
