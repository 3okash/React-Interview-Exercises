import type { Question } from '../../types';

const data: Question[] = [
  {
    id: 1,
    question: "What are accordion components?",
    answer:
      "Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They are great for FAQs and menus."
  },
  {
    id: 2,
    question: "What are they used for?",
    answer:
      "They are commonly employed in various contexts, including FAQs, product features, and any situation where you want to hide details until requested."
  },
  {
    id: 3,
    question: "Accordion as a musical instrument",
    answer:
      "The accordion is a musical instrument with a keyboard and bellows, played by compressing or expanding the bellows while pressing keys or buttons."
  },
  {
    id: 4,
    question: "Can I create an accordion component with React?",
    answer:
      "Yes of course, it is very common to create an accordion component with React using state to track which item is currently expanded."
  },
];

export default data;