import { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import './App.css'

// UI Components
import CodeModal from './components/ui/CodeModal'

// Home Page
import Home from './components/home/Home'

// Day 1 Components (Original & Migrated)
import Accordion from './components/accordion/Accordion'
import Colors from './components/colors/Colors'
import Stars from './components/stars/Stars'
import Slider from './components/sliders/Slider'
import LoadMore from './components/loadmore/LoadMore'
import ToDo from './components/todo/ToDo'
import MirrorText from './components/mirrortext/MirrorText'
import RenderList from './components/renderlist/RenderList'
import Counter from './components/counter/Counter'
import TaskCounter from './components/taskcounter/TaskCounter'
import ChildrenContainer from './components/children/Children'
import Nested from './components/nested/Nested'
import Guess from './components/guess/Guess'

// New Migrated Components
import Attendee from './components/attendee/Attendee'
import UserSearch from './components/users/UserSearch'
import FruitList from './components/fruits/FruitList'
import MultiStepForm from './components/multistep/MultiStepForm'
import PhoneInput from './components/phone/PhoneInput'
import SelectAll from './components/selectall/SelectAll'
import ShoppingCart from './components/shoppingcart/ShoppingCart'
import Subscribers from './components/subscribers/Subscribers'
import Timer from './components/timer/Timer'
import Issues from './components/issues/Issues'
import ProductList from './components/products/ProductList'
import KanbanBoard from './components/kanban/KanbanBoard'
import VideoDashboard from './components/video/VideoDashboard'

// Source Code Imports (Raw)
import AccordionCode from './components/accordion/Accordion.tsx?raw'
import ColorsCode from './components/colors/Colors.tsx?raw'
import StarsCode from './components/stars/Stars.tsx?raw'
import SliderCode from './components/sliders/Slider.tsx?raw'
import LoadMoreCode from './components/loadmore/LoadMore.tsx?raw'
import ToDoCode from './components/todo/ToDo.tsx?raw'
import MirrorTextCode from './components/mirrortext/MirrorText.tsx?raw'
import RenderListCode from './components/renderlist/RenderList.tsx?raw'
import CounterCode from './components/counter/Counter.tsx?raw'
import TaskCounterCode from './components/taskcounter/TaskCounter.tsx?raw'
import ChildrenCode from './components/children/Children.tsx?raw'
import NestedCode from './components/nested/Nested.tsx?raw'
import GuessCode from './components/guess/Guess.tsx?raw'
import AttendeeCode from './components/attendee/Attendee.tsx?raw'
import UserSearchCode from './components/users/UserSearch.tsx?raw'
import FruitListCode from './components/fruits/FruitList.tsx?raw'
import MultiStepCode from './components/multistep/MultiStepForm.tsx?raw'
import PhoneInputCode from './components/phone/PhoneInput.tsx?raw'
import SelectAllCode from './components/selectall/SelectAll.tsx?raw'
import ShoppingCartCode from './components/shoppingcart/ShoppingCart.tsx?raw'
import SubscribersCode from './components/subscribers/Subscribers.tsx?raw'
import TimerCode from './components/timer/Timer.tsx?raw'
import IssuesCode from './components/issues/Issues.tsx?raw'
import ProductCode from './components/products/ProductList.tsx?raw'
import KanbanCode from './components/kanban/KanbanBoard.tsx?raw'
import VideoCode from './components/video/VideoDashboard.tsx?raw'

type ExerciseKey =
  | 'accordion' | 'colors' | 'stars' | 'sliders' | 'loadmore'
  | 'todo' | 'mirrortext' | 'renderlist' | 'counter'
  | 'taskcounter' | 'children' | 'nested' | 'guess'
  | 'attendee' | 'usersearch' | 'fruits' | 'multistep'
  | 'phone' | 'selectall' | 'shoppingcart' | 'subscribers'
  | 'timer' | 'issues' | 'products' | 'kanban' | 'video';

interface Exercise {
  key: ExerciseKey;
  label: string;
  category: string;
  component: React.ReactNode;
  code: string;
  description: string;
}

const EXERCISES: Exercise[] = [
  // Core Exercises
  { key: 'accordion', label: '🪗 Accordion', category: 'Core', component: <Accordion />, code: AccordionCode, description: 'A classic accordion component that supports singular or multiple expanded items.' },
  { key: 'colors', label: '🎨 Color Tool', category: 'Core', component: <Colors />, code: ColorsCode, description: 'Generate random HEX and RGB colors and copy them to your clipboard.' },
  { key: 'stars', label: '⭐ Star Rating', category: 'Core', component: <Stars />, code: StarsCode, description: 'Interactive star rating component with hover and click states.' },
  { key: 'sliders', label: '🖼️ Image Slider', category: 'Core', component: <Slider url={'https://picsum.photos/v2/list?page=1&limit=5'} limit={10} />, code: SliderCode, description: 'Image carousel with navigation controls and async data fetching.' },
  { key: 'loadmore', label: '⏳ Load More', category: 'Core', component: <LoadMore />, code: LoadMoreCode, description: 'Paginated list loading pattern using a mock API.' },
  { key: 'guess', label: '🎯 Guess Color', category: 'Core', component: <Guess />, code: GuessCode, description: 'Game logic where you guess the correct HEX code for a displayed color.' },

  // Logic & State
  { key: 'todo', label: '📝 To-Do List', category: 'Logic', component: <ToDo />, code: ToDoCode, description: 'Task management with add, delete, and completion status toggling.' },
  { key: 'mirrortext', label: '🪞 Mirror Text', category: 'Logic', component: <MirrorText />, code: MirrorTextCode, description: 'Simple input synchronization demonstrating controlled components.' },
  { key: 'renderlist', label: '📜 Render List', category: 'Logic', component: <RenderList />, code: RenderListCode, description: 'Efficient list rendering with multiple filter criteria.' },
  { key: 'counter', label: '🔢 Simple Counter', category: 'Logic', component: <Counter />, code: CounterCode, description: 'Basic counter state with increment and decrement actions.' },
  { key: 'timer', label: '⏱️ Timer', category: 'Logic', component: <Timer />, code: TimerCode, description: 'Countdown timer with start, pause, and reset functionality.' },
  { key: 'selectall', label: '✅ Select All', category: 'Logic', component: <SelectAll />, code: SelectAllCode, description: 'Master checkbox pattern that controls the state of a list of items.' },

  // Forms & Layout
  { key: 'attendee', label: '🎫 Registration', category: 'Forms', component: <Attendee />, code: AttendeeCode, description: 'Registration form with validation and conditional rendering.' },
  { key: 'multistep', label: '🪜 Multi-Step', category: 'Forms', component: <MultiStepForm />, code: MultiStepCode, description: 'Multi-step wizard form preserving state across different views.' },
  { key: 'phone', label: '📞 Phone Input', category: 'Forms', component: <PhoneInput />, code: PhoneInputCode, description: 'Input masking implementation for formatting US phone numbers.' },
  { key: 'children', label: '👶 Props Children', category: 'Forms', component: <ChildrenContainer />, code: ChildrenCode, description: 'Demonstration of component composition using the children prop.' },
  { key: 'nested', label: '🌳 Nested Selects', category: 'Forms', component: <Nested />, code: NestedCode, description: 'Dependent dropdowns where child options update based on parent selection.' },

  // Mini Apps
  { key: 'usersearch', label: '🔍 User Directory', category: 'Apps', component: <UserSearch />, code: UserSearchCode, description: 'Searchable user table with debounce and API integration.' },
  { key: 'fruits', label: '🍎 Fruit Search', category: 'Apps', component: <FruitList />, code: FruitListCode, description: 'Client-side filtering of a dataset with category isolation.' },
  { key: 'shoppingcart', label: '🛒 Shopping Cart', category: 'Apps', component: <ShoppingCart />, code: ShoppingCartCode, description: 'E-commerce cart logic with product selection and total calculation.' },
  { key: 'subscribers', label: '📧 Subscribers', category: 'Apps', component: <Subscribers />, code: SubscribersCode, description: 'Subscription management dashboard with CRUD-like operations.' },
  { key: 'issues', label: '🐛 Issue Explorer', category: 'Apps', component: <Issues />, code: IssuesCode, description: 'Dashboard for tracking development issues with status filtering.' },
  { key: 'products', label: '🛍️ Product Catalog', category: 'Apps', component: <ProductList />, code: ProductCode, description: 'Product grid with search, sort, and category filters.' },
  { key: 'kanban', label: '📋 Mini Kanban', category: 'Apps', component: <KanbanBoard />, code: KanbanCode, description: 'Drag-and-drop style task board with status columns.' },
  { key: 'taskcounter', label: '📊 Task Timers', category: 'Apps', component: <TaskCounter />, code: TaskCounterCode, description: 'Manage multiple tasks with individual running timers.' },
  { key: 'video', label: '🎥 Video Dashboard', category: 'Apps', component: <VideoDashboard />, code: VideoCode, description: 'Custom video player controls using the useRef hook.' },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const categories = Array.from(new Set(EXERCISES.map(e => e.category)));

  // Determine current exercise from URL to show specific code
  const currentExercise = EXERCISES.find(ex => `/${ex.key}` === location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <CodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        code={currentExercise?.code || ''}
        title={currentExercise?.label || 'Component Code'}
      />

      {/* Sidebar Navigation */}
      <nav className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-6 overflow-y-auto max-h-screen sticky top-0">
        <div className="mb-10">
          <NavLink
            to="/"
            className={({ isActive }) => `block group p-3 rounded-2xl transition-all ${isActive ? 'bg-blue-50' : ''}`}
          >
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter group-hover:text-blue-700 transition-colors">React Interview</h1>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Exercises</p>
          </NavLink>
        </div>

        <div className="space-y-8">
          {categories.map(cat => (
            <div key={cat}>
              <h3 className="text-[10px] uppercase font-bold text-gray-400 tracking-[0.2em] mb-3 px-3">
                {cat}
              </h3>
              <div className="space-y-1">
                {EXERCISES.filter(ex => ex.category === cat).map((ex) => (
                  <NavLink
                    key={ex.key}
                    to={`/${ex.key}`}
                    className={({ isActive }) => `
                      w-full block text-left px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer
                      ${isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    {ex.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 shadow-inner">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-12">
          {currentExercise && (
            <div className="flex justify-between items-center mb-6 px-2">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{currentExercise.label}</h2>
                <p className="text-gray-500 text-sm mt-1">{currentExercise.description}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-xs font-bold bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>{'< />'}</span> View Code
              </button>
            </div>
          )}

          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 min-h-[700px] flex flex-col justify-center relative">
            <Routes>
              <Route path="/" element={<Home />} />
              {EXERCISES.map((ex) => (
                <Route key={ex.key} path={`/${ex.key}`} element={ex.component} />
              ))}
              <Route path="*" element={<div className="p-10 text-center font-bold text-gray-300 uppercase tracking-widest">404 - Page not found</div>} />
            </Routes>
          </div>

          <footer className="mt-8 text-center text-gray-300 text-[10px] font-bold uppercase tracking-[0.3em]">
            React Interview Practice &copy; 2024
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
