import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Продавец', message: 'Привет! Интересуешься этим предметом?', time: '14:32' },
    { id: 2, user: 'Вы', message: 'Да, какая цена?', time: '14:33' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const gameItems = [
    {
      id: 1,
      name: 'AK-47 | Redline',
      price: 2500,
      rarity: 'Запрещённое',
      game: 'CS2',
      image: '/placeholder.svg',
      seller: 'ProGamer123',
      condition: 'Немного поношенное'
    },
    {
      id: 2,
      name: 'Драконий Коготь',
      price: 1200,
      rarity: 'Эпическое',
      game: 'Dota 2',
      image: '/placeholder.svg',
      seller: 'DotaKing',
      condition: 'Новое'
    },
    {
      id: 3,
      name: 'Космический меч',
      price: 3500,
      rarity: 'Легендарное',
      game: 'StarCraft',
      image: '/placeholder.svg',
      seller: 'SpaceLord',
      condition: 'Отличное'
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { 
        id: chatMessages.length + 1, 
        user: 'Вы', 
        message: newMessage, 
        time: new Date().toLocaleTimeString().slice(0, 5)
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                GameMarket
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Главная</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Каталог</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Продать</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Помощь</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input 
                  placeholder="Поиск предметов..." 
                  className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Icon name="Search" className="absolute right-3 top-3 h-4 w-4 text-white/70" />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-6 animate-slide-up">
            Торгуй игровыми предметами
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-slide-up">
            Безопасная торговая площадка для игровых предметов с мгновенными сделками и встроенным чатом
          </p>
          <div className="flex justify-center space-x-4 animate-scale-in">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Начать торговать
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/70">Активных пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-white/70">Успешных сделок</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/70">Поддержка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/70">Безопасность</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Популярные предметы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {item.game}
                    </Badge>
                    <Badge 
                      className={`
                        ${item.rarity === 'Запрещённое' ? 'bg-red-500' : ''}
                        ${item.rarity === 'Эпическое' ? 'bg-purple-500' : ''}
                        ${item.rarity === 'Легендарное' ? 'bg-orange-500' : ''}
                      `}
                    >
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="Gamepad2" size={48} className="text-white/50" />
                  </div>
                  <CardTitle className="text-white">{item.name}</CardTitle>
                  <CardDescription className="text-white/70">
                    Состояние: {item.condition}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-400">₽{item.price}</span>
                    <span className="text-white/70">от {item.seller}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Купить
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Чат с продавцом</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Обсудите детали покупки предмета "{item.name}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-60 overflow-y-auto space-y-2 p-4 bg-white/5 rounded-lg">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.user === 'Вы' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                msg.user === 'Вы' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white/10 text-white'
                              }`}>
                                <div className="text-sm">{msg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                            rows={2}
                          />
                          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-12 text-center">Профиль пользователя</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader className="text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">PG</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-white">ProGamer123</CardTitle>
                  <CardDescription className="text-white/70">Активен 5 мин назад</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white/80">
                    <div className="flex justify-between">
                      <span>Рейтинг:</span>
                      <span className="text-yellow-400">★★★★★ 4.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сделки:</span>
                      <span>247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>На площадке:</span>
                      <span>2 года</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Статистика торговли</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">₽127,500</div>
                      <div className="text-white/70">Общий оборот</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">15</div>
                      <div className="text-white/70">Активных лотов</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">₽8,200</div>
                      <div className="text-white/70">Средний чек</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400">98%</div>
                      <div className="text-white/70">Успешность</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">GameMarket</h4>
              <p className="text-white/70 text-sm">
                Безопасная торговая площадка для игровых предметов
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Платформа</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Как продавать</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как покупать</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Комиссии</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Связаться с нами</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Игры</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">CS2</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dota 2</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team Fortress 2</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70 text-sm">
            © 2024 GameMarket. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}