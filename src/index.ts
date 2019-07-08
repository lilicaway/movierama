import { pageComponent } from './components/page_component';
import './index.css';
import { Injector } from './injector';

document.addEventListener('DOMContentLoaded', () => {
  const injector = new Injector();
  document.body.appendChild(pageComponent(injector));
});
