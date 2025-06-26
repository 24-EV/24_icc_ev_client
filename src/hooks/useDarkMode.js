import { useDarkModeContext } from '../context/DarkModeContext';

export default function useDarkMode() {
  const { dark, toggleDark } = useDarkModeContext();
  return [dark, toggleDark];
}
