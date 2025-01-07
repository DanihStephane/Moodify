import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { MoodElement } from '@/types';

interface Props {
  elements: MoodElement[];
  onUpdateElement: (element: MoodElement) => void;
  onDeleteElement: (id: string) => void;
}

export function MoodBoard({ elements, onUpdateElement, onDeleteElement }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (id: string, position: { x: number; y: number }) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      onUpdateElement({ ...element, position });
    }
  };

  const handleResize = (id: string, delta: { width: number; height: number }, position: { x: number; y: number }) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      onUpdateElement({
        ...element,
        size: {
          width: Math.max(50, element.size.width + delta.width),
          height: Math.max(50, element.size.height + delta.height)
        },
        position
      });
    }
  };

  const handleExport = async () => {
    if (!boardRef.current) return;
    
    const canvas = await html2canvas(boardRef.current);
    const link = document.createElement('a');
    link.download = 'moodboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex-1">
      <div className="mb-4 flex justify-end">
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export as PNG
        </Button>
      </div>

      <div
        ref={boardRef}
        className="w-full aspect-[4/3] bg-card rounded-lg shadow-lg overflow-hidden relative"
      >
        {elements.map((element) => (
          <motion.div
            key={element.id}
            drag
            dragMomentum={false}
            initial={element.position}
            animate={element.position}
            onDragEnd={(_, info) => handleDragEnd(element.id, info.point)}
            className="absolute cursor-move group"
            style={{
              ...element.style,
              width: element.size.width,
              height: element.size.height,
              left: element.position.x,
              top: element.position.y,
            }}
          >
            {element.type === 'image' && (
              <img
                src={element.content}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            )}
            {element.type === 'emoji' && (
              <span className="text-4xl">{element.content}</span>
            )}
            {element.type === 'text' && (
              <p style={element.style}>{element.content}</p>
            )}
            {element.type === 'color' && (
              <div
                className="w-full h-full rounded"
                style={{ backgroundColor: element.content }}
              />
            )}
            
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDeleteElement(element.id)}
            >
              ×
            </Button>

            {/* Resize handles */}
            <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100"
                 onMouseDown={(e) => {
                   e.stopPropagation();
                   const startX = e.clientX;
                   const startY = e.clientY;
                   const startWidth = element.size.width;
                   const startHeight = element.size.height;
                   const startLeft = element.position.x;
                   const startTop = element.position.y;

                   const handleMouseMove = (e: MouseEvent) => {
                     const deltaX = e.clientX - startX;
                     const deltaY = e.clientY - startY;
                     handleResize(
                       element.id,
                       { width: deltaX, height: deltaY },
                       { x: startLeft, y: startTop }
                     );
                   };

                   const handleMouseUp = () => {
                     document.removeEventListener('mousemove', handleMouseMove);
                     document.removeEventListener('mouseup', handleMouseUp);
                   };

                   document.addEventListener('mousemove', handleMouseMove);
                   document.addEventListener('mouseup', handleMouseUp);
                 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}