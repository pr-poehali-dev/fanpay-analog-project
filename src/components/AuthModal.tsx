import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = () => {
    setLoading(true);
    // Симуляция входа через Google
    setTimeout(() => {
      const googleUser = {
        id: Math.random().toString(36),
        name: 'Пользователь Google',
        email: 'user@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
        balance: 1000
      };
      onLogin(googleUser);
      setLoading(false);
      onClose();
    }, 1500);
  };

  const handleEmailAuth = (isRegister: boolean) => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36),
        name: isRegister ? name : 'Пользователь',
        email,
        avatar: null,
        balance: isRegister ? 500 : 2000
      };
      onLogin(user);
      setLoading(false);
      onClose();
      // Очистка формы
      setEmail('');
      setPassword('');
      setName('');
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            Добро пожаловать в NapoliFshop
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="login" className="text-white">Вход</TabsTrigger>
            <TabsTrigger value="register" className="text-white">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <Button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3"
            >
              <Icon name="Chrome" size={20} className="mr-2" />
              {loading ? 'Входим...' : 'Войти через Google'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">или</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button
                onClick={() => handleEmailAuth(false)}
                disabled={loading || !email || !password}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Входим...' : 'Войти'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <Button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3"
            >
              <Icon name="Chrome" size={20} className="mr-2" />
              {loading ? 'Регистрируемся...' : 'Регистрация через Google'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">или</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Button
                onClick={() => handleEmailAuth(true)}
                disabled={loading || !email || !password || !name}
                className="w-full bg-green-600 hover:bg-green-700"
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}