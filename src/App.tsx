import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoodBoard } from '@/components/MoodBoard';
import { Sidebar } from '@/components/Sidebar';
import { useTheme } from '@/hooks/use-theme';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [elements, setElements] = useState<MoodElement[]>([]);

  const handleAddElement = (element: MoodElement) => {
    setElements([...elements, { ...element, id: crypto.randomUUID() }]);
  };

  const handleUpdateElement = (updatedElement: MoodElement) => {
    setElements(elements.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  };

  const handleDeleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Moodify
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex gap-6">
        <Sidebar onAddElement={handleAddElement} />
        <MoodBoard
          elements={elements}
          onUpdateElement={handleUpdateElement}
          onDeleteElement={handleDeleteElement}
        />
      </main>
    </div>
  );
}

export default App;