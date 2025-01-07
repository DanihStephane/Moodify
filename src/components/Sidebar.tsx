import { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ImageIcon, Type, Smile, Palette, Upload } from 'lucide-react';
import type { MoodElement } from '@/types';

const EMOJIS = ['😊', '😎', '🎨', '💡', '✨', '🌈', '🎭', '💫', '🌟', '🎪'];
const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B5DE5', '#F15BB5'];

interface Props {
  onAddElement: (element: MoodElement) => void;
}

export function Sidebar({ onAddElement }: Props) {
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onAddElement({
          id: '',
          type: 'image',
          content: e.target?.result as string,
          position: { x: 100, y: 100 },
          size: { width: 200, height: 200 },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (!imageUrl) return;
    onAddElement({
      id: '',
      type: 'image',
      content: imageUrl,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 200 },
    });
    setImageUrl('');
  };

  const handleAddEmoji = (emoji: string) => {
    onAddElement({
      id: '',
      type: 'emoji',
      content: emoji,
      position: { x: 100, y: 100 },
      size: { width: 50, height: 50 },
    });
  };

  const handleAddText = () => {
    if (!text) return;
    onAddElement({
      id: '',
      type: 'text',
      content: text,
      position: { x: 100, y: 100 },
      size: { width: 200, height: 50 },
      style: {
        fontSize,
        color: textColor,
      },
    });
    setText('');
  };

  const handleAddColor = (color: string) => {
    onAddElement({
      id: '',
      type: 'color',
      content: color,
      position: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
    });
  };

  return (
    <div className="w-80 bg-card rounded-lg p-4 shadow-lg">
      <Tabs defaultValue="images">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="images">
            <ImageIcon className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="emojis">
            <Smile className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="text">
            <Type className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Image
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <Button onClick={handleAddImage} className="w-full">
            Add Image
          </Button>
        </TabsContent>

        <TabsContent value="emojis" className="grid grid-cols-5 gap-2">
          {EMOJIS.map((emoji) => (
            <Button
              key={emoji}
              variant="outline"
              className="text-2xl"
              onClick={() => handleAddEmoji(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text"
            />
          </div>
          <div className="space-y-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
              min={12}
              max={48}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Color</Label>
            <Input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <Button onClick={handleAddText} className="w-full">
            Add Text
          </Button>
        </TabsContent>

        <TabsContent value="colors" className="grid grid-cols-4 gap-2">
          {COLORS.map((color) => (
            <Button
              key={color}
              className="w-full h-12 rounded"
              style={{ backgroundColor: color }}
              onClick={() => handleAddColor(color)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}